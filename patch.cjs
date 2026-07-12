const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/vendor/cobe/index.js');
let content = fs.readFileSync(file, 'utf8');

// 1. Add D to uniforms
content = content.replace('uniform vec3 F,w;', 'uniform vec3 F,w,D;');

// 2. Change the fragment color calculation
const oldFragCalc = 'm+=vec4(F*(mix((1.-q)*pow(i,.4),q,n.z)+.1)+pow(1.-i,4.)*w,1)';
const newFragCalc = 'm+=vec4(mix(F*(mix((1.-q)*pow(i,.4),q,n.z)+.1),D*i+F*.1,q*(1.-n.z))+pow(1.-i,4.)*w,1)';
content = content.replace(oldFragCalc, newFragCalc);

// 3. Add D to H(...) call
const oldHCall = 'I=H(a,w,["t","s","k","x","v","F","w","n","y","z"])';
const newHCall = 'I=H(a,w,["t","s","k","x","v","F","w","n","y","z","D"])';
content = content.replace(oldHCall, newHCall);

// 4. Add mapColor mapping in Pe's destructuring
const oldDestructure = 'g=t.baseColor||[1,1,1],';
const newDestructure = 'g=t.baseColor||[1,1,1],dC=t.mapColor||[0,0,0],';
content = content.replace(oldDestructure, newDestructure);

// 5. Check if mapColor changed in te
const oldUpdateCheck = 't.baseColor!=q&&(g=t.baseColor),';
const newUpdateCheck = 't.baseColor!=q&&(g=t.baseColor),t.mapColor!=q&&(dC=t.mapColor),';
content = content.replace(oldUpdateCheck, newUpdateCheck);

// 6. Supply D in te's render
const oldUniforms = 'a.uniform3fv(I.F,g),a.uniform3fv(I.w,u),';
const newUniforms = 'a.uniform3fv(I.F,g),a.uniform3fv(I.D,dC),a.uniform3fv(I.w,u),';
content = content.replace(oldUniforms, newUniforms);

fs.writeFileSync(file, content, 'utf8');
console.log('Patched cobe successfully');
