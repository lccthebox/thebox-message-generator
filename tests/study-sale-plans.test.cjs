const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(process.argv[2]||'index.html','utf8');
for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
function block(start,end){const i=html.indexOf(start),j=html.indexOf(end,i+start.length);assert(i>=0&&j>i,'missing boundary '+start);return html.slice(i,j);}
const context=vm.createContext({});vm.runInContext(block('const STUDY_PLANS =','const THEBOX_SCHEDULE_LINK')+';globalThis.plans=STUDY_PLANS;globalThis.current=STUDY_CONVERSION_CURRENT;globalThis.convert=calcStudyConversion;globalThis.amount=calcStudyMsgAmount;',context);
assert.deepEqual(Array.from(context.plans,x=>x.key),['16','48','custom']);
assert.equal(context.amount('16').amt,277000);assert.equal(context.amount('48').amt,657000);assert.equal(context.amount('custom',20).amt,346250);assert.equal(context.amount('custom',32).amt,554000);assert(context.amount('custom',32).note.includes('표준 상품 아님'));
assert.equal(context.current[32],494000);assert.equal(context.convert(32,48,494000).payment,163000);assert.equal(context.convert(32,96,494000).payment,596000);
const defaults=block('  study: {','const DEFAULT_SECTIONS_BY_TYPE');assert(!defaults.includes('32회'));assert(defaults.includes('48회 657,000원'));
vm.runInContext(block('const FEE_TABLE =','const feeEls=')+';globalThis.fees=FEE_TABLE;',context);
for(const kind of ['new','resit']){assert.deepEqual(Array.from(context.fees.study.only[kind],x=>x.key),['8','16','48']);assert.equal(context.fees.study.only[kind].find(x=>x.key==='48').baseAmount,657000);}
const refund=block('const RF_PRICES=','const IR_COURSES=');assert(refund.includes('p32:494000'));assert(refund.includes('p48:657000'));
assert(process.argv[3],'baseline file required');if(process.argv[3]){const old=fs.readFileSync(process.argv[3],'utf8');const unchanged=(a,b)=>{const slice=s=>s.slice(s.indexOf(a),s.indexOf(b,s.indexOf(a)+a.length));assert.equal(slice(html),slice(old),'legacy section changed: '+a);};unchanged('const STUDY_CONVERSION_CURRENT =','function calcStudyMsgAmount');unchanged('const RF_PRICES=','const IR_COURSES=');unchanged('const ACAD_PRICES','// 스터디 플랜 옵션');unchanged('const FEE_TABLE =','  study:{only:');}
console.log('PASS: inline syntax; sale catalog and default messages; fee new/resit; 16/48/custom prices; legacy32 conversion and refund source preserved');
