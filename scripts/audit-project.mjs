import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import ts from 'typescript'

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const name = `${dir}/${entry.name}`
  return entry.isDirectory() ? walk(name) : [name]
})
const sources = walk('src')
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean)
const texts = new Map(tracked.filter((file) => !/\.(png|jpe?g|webp|woff2)$/.test(file)).map((file) => [file, fs.readFileSync(file, 'utf8')]))
const edges = new Map()
const packages = new Set()
for (const file of sources) {
  if (!/\.[jt]sx?$/.test(file)) continue
  const tree = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
  const imports = []
  const visit = (node) => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.push(node.moduleSpecifier.text)
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) imports.push(node.arguments[0].text)
    ts.forEachChild(node, visit)
  }
  visit(tree)
  const local = []
  for (const spec of imports) {
    if (!spec.startsWith('.') && !spec.startsWith('@/')) { packages.add(spec.split('/').slice(0, spec.startsWith('@') ? 2 : 1).join('/')); continue }
    const base = spec.startsWith('@/') ? `src/${spec.slice(2)}` : path.posix.normalize(`${path.posix.dirname(file)}/${spec}`)
    const resolved = [base, ...['.tsx', '.ts', '.js', '/index.ts', '/index.js'].map((ext) => base + ext)].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
    if (resolved) local.push(resolved)
  }
  edges.set(file, local)
}
const reachable = new Set()
const visit = (file) => { if (reachable.has(file)) return; reachable.add(file); for (const dep of edges.get(file) ?? []) visit(dep) }
visit('src/main.tsx')
const assets = walk('public').map((file) => {
  const buffer = fs.readFileSync(file)
  const url = file.slice(6)
  const refs = [...texts].filter(([name, text]) => name !== file && (text.includes(url) || text.includes(path.posix.basename(file)))).map(([name]) => name)
  return { file, bytes: buffer.length, sha256: crypto.createHash('sha256').update(buffer).digest('hex'), references: refs }
})
const bundle = walk('dist').filter((file) => /\.(js|css|html)$/.test(file)).map((file) => {
  const buffer = fs.readFileSync(file)
  return { file, bytes: buffer.length, gzip: zlib.gzipSync(buffer).length }
})
const secretPatterns = [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g, /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-(?:proj-)?[A-Za-z0-9_-]{30,}|AKIA[A-Z0-9]{16})/g]
const secretFindings = []
for (const [file, text] of texts) for (const pattern of secretPatterns) for (const match of text.matchAll(pattern)) secretFindings.push({ file, line: text.slice(0, match.index).split('\n').length, value: '[REDACTED]' })
const report = {
  commit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  generatedAt: new Date().toISOString(),
  files: sources.map((file) => ({ file, lines: fs.readFileSync(file, 'utf8').split('\n').length, bytes: fs.statSync(file).size, reachable: reachable.has(file) })),
  unreachableProductionModules: [...edges.keys()].filter((file) => !reachable.has(file) && !/\.test\.|src\/test\/|\.d\.ts$/.test(file)),
  importedPackages: [...packages].sort(), assets, bundle, secretFindings,
  limitations: ['Literal import graph only; inspect indirect references before deleting.', 'Pattern scan is not proof of absence of secrets.', 'No browser performance or layout measurements.'],
}
const output = process.argv[2] ?? 'docs/audit/inventory.json'
fs.mkdirSync(path.dirname(output), { recursive: true })
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify({ output, sourceFiles: sources.length, unreachable: report.unreachableProductionModules, unreferencedAssets: assets.filter((asset) => !asset.references.length).map(({ file, bytes }) => ({ file, bytes })), publicBytes: assets.reduce((sum, asset) => sum + asset.bytes, 0), secretFindings }, null, 2))
