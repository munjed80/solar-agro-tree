import * as THREE from 'three';

const canvas=document.querySelector('#scene');
const playPauseBtn=document.querySelector('#playPause');
const restartBtn=document.querySelector('#restart');
const recordBtn=document.querySelector('#record');
const progressFill=document.querySelector('#progressFill');
const titleCard=document.querySelector('#titleCard');
const titleAr=document.querySelector('#titleAr');
const titleEn=document.querySelector('#titleEn');
const lowerThird=document.querySelector('#lowerThird');
const cardAr=document.querySelector('#cardAr');
const cardEn=document.querySelector('#cardEn');
const sceneLabel=document.querySelector('#sceneLabel');
const timerEl=document.querySelector('#timer');

const params=new URLSearchParams(location.search);
const captureMode=params.get('capture')==='1';
const FPS=30;
const LOOP_DURATION=102;
if(captureMode)document.body.dataset.capture='true';

const renderer=new THREE.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:captureMode});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.32;

const scene=new THREE.Scene();
scene.fog=new THREE.Fog(0xb7d9e8,150,620);
const camera=new THREE.PerspectiveCamera(43,1,.1,1200);

// Bright desert-day sky
const sky=new THREE.Mesh(new THREE.SphereGeometry(900,32,18),new THREE.ShaderMaterial({side:THREE.BackSide,uniforms:{top:{value:new THREE.Color(0x65afe4)},horizon:{value:new THREE.Color(0xd9edf4)}},vertexShader:`varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 p;uniform vec3 top;uniform vec3 horizon;void main(){float h=clamp(normalize(p).y,0.,1.);gl_FragColor=vec4(mix(horizon,top,pow(h,.55)),1.);}`}));
scene.add(sky);
scene.add(new THREE.HemisphereLight(0xe7f4ff,0x7b6b3c,2.15));
const sun=new THREE.DirectionalLight(0xfff3c8,4.7);sun.position.set(-95,125,60);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-180;sun.shadow.camera.right=180;sun.shadow.camera.top=180;sun.shadow.camera.bottom=-180;sun.shadow.camera.near=1;sun.shadow.camera.far=420;scene.add(sun);scene.add(sun.target);
const fill=new THREE.DirectionalLight(0xffffff,1.1);fill.position.set(75,45,-90);scene.add(fill);

// Ground: keep it present but visually subordinate to the tree system.
const ground=new THREE.Mesh(new THREE.PlaneGeometry(650,650),new THREE.MeshStandardMaterial({color:0x8f7b4d,roughness:1}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const farmPatch=new THREE.Mesh(new THREE.CircleGeometry(205,96),new THREE.MeshStandardMaterial({color:0x617e3d,roughness:1}));farmPatch.rotation.x=-Math.PI/2;farmPatch.position.y=.012;farmPatch.receiveShadow=true;scene.add(farmPatch);

// Crop rows — deliberately limited to the field under/around trees, not the whole world.
const crops=new THREE.Group();
const cropMat=new THREE.MeshStandardMaterial({color:0x4e7737,roughness:1});
for(let z=-155;z<=155;z+=5){const row=new THREE.Mesh(new THREE.BoxGeometry(310,.18,.7),cropMat);row.position.set(0,.1,z);row.receiveShadow=true;crops.add(row)}scene.add(crops);

const steelMat=new THREE.MeshStandardMaterial({color:0xb9c5c8,metalness:.76,roughness:.3});
const darkSteel=new THREE.MeshStandardMaterial({color:0x66777c,metalness:.82,roughness:.27});
const pvMat=new THREE.MeshPhysicalMaterial({color:0x135a70,metalness:.18,roughness:.22,clearcoat:.75,clearcoatRoughness:.18,side:THREE.DoubleSide});
const pvAlt=new THREE.MeshPhysicalMaterial({color:0x0c465b,metalness:.18,roughness:.22,clearcoat:.72,side:THREE.DoubleSide});

function tri(a,b,c,mat){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([a.x,a.y,a.z,b.x,b.y,b.z,c.x,c.y,c.z],3));g.computeVertexNormals();return new THREE.Mesh(g,mat)}
function tube(a,b,r,mat){const d=new THREE.Vector3().subVectors(b,a),m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),10),mat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());m.castShadow=true;return m}

function createTree(detail=false){
  const g=new THREE.Group(),edge=5,apexH=8,R=5.5;
  const col=new THREE.Mesh(new THREE.CylinderGeometry(.3,.42,edge,20),steelMat);col.position.y=edge/2;col.castShadow=true;g.add(col);
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.75,.9,.35,20),darkSteel);base.position.y=.18;base.castShadow=true;g.add(base);
  const collar=new THREE.Mesh(new THREE.CylinderGeometry(.72,.72,.22,20),steelMat);collar.position.y=4.9;g.add(collar);
  const apex=new THREE.Vector3(0,apexH,0),rim=[];
  for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;rim.push(new THREE.Vector3(R*Math.cos(a),edge,R*Math.sin(a)))}
  for(let i=0;i<6;i++){
    const a=rim[i],b=rim[(i+1)%6],panel=tri(apex,a,b,i%2?pvMat:pvAlt);panel.castShadow=true;panel.receiveShadow=true;g.add(panel);g.add(tube(apex,a,.055,darkSteel));g.add(tube(a,b,.05,darkSteel));
    if(detail){const c=a.clone().lerp(b,.5);g.add(tube(apex.clone().lerp(c,.35),c.clone().lerp(apex,.12),.025,darkSteel));}
  }
  const cap=new THREE.Mesh(new THREE.SphereGeometry(.14,12,8),steelMat);cap.position.copy(apex);g.add(cap);
  return g;
}

// Tree field: dense enough that ground shots feel like moving through a structural forest.
const treeField=new THREE.Group();scene.add(treeField);
const CELL=12;
const treePositions=[];
for(let q=-8;q<=8;q++)for(let r=-8;r<=8;r++){
  const x=CELL*(Math.sqrt(3)*q+Math.sqrt(3)/2*r),z=CELL*(1.5*r);
  if(Math.hypot(x,z)<205)treePositions.push([x,z]);
}
// add shared-vertex-like offset layer to visually evoke periodic D11/S12 density
for(let q=-7;q<=7;q++)for(let r=-7;r<=7;r++){
  const x=CELL*(Math.sqrt(3)*q+Math.sqrt(3)/2*r)+CELL,z=CELL*(1.5*r);
  if(Math.hypot(x,z)<195)treePositions.push([x,z]);
}
const unique=[];const seen=new Set();for(const [x,z] of treePositions){const k=`${x.toFixed(2)},${z.toFixed(2)}`;if(!seen.has(k)){seen.add(k);unique.push([x,z])}}
unique.forEach(([x,z],i)=>{const t=createTree(i===0);t.position.set(x,0,z);treeField.add(t)});

// Highlight the reference 7-tree cell.
const cellGroup=new THREE.Group();scene.add(cellGroup);
const linePts=[];for(let i=0;i<=6;i++){const a=i*Math.PI/3;linePts.push(new THREE.Vector3(CELL*Math.cos(a),.05,CELL*Math.sin(a)))}
cellGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePts),new THREE.LineBasicMaterial({color:0x2ac8bc,transparent:true,opacity:.75})));

// Water-energy infrastructure: visible in its own section rather than generic green land.
const infrastructure=new THREE.Group();scene.add(infrastructure);infrastructure.visible=false;
const tank=new THREE.Mesh(new THREE.CylinderGeometry(6,6,8,28),new THREE.MeshStandardMaterial({color:0xd3e5e8,metalness:.35,roughness:.42}));tank.position.set(115,4,-35);tank.castShadow=true;infrastructure.add(tank);
const tankWater=new THREE.Mesh(new THREE.CylinderGeometry(5.55,5.55,.18,28),new THREE.MeshStandardMaterial({color:0x4fc8eb,transparent:true,opacity:.75}));tankWater.position.set(115,7.4,-35);infrastructure.add(tankWater);
const pump=new THREE.Mesh(new THREE.BoxGeometry(8,4,7),new THREE.MeshStandardMaterial({color:0x405e66,metalness:.4,roughness:.45}));pump.position.set(72,2,-22);pump.castShadow=true;infrastructure.add(pump);
const station=new THREE.Mesh(new THREE.BoxGeometry(14,6,10),new THREE.MeshStandardMaterial({color:0x344852,roughness:.4}));station.position.set(92,3,20);station.castShadow=true;infrastructure.add(station);
function pipe(a,b,color){return tube(a,b,.45,new THREE.MeshStandardMaterial({color,metalness:.25,roughness:.35}))}
infrastructure.add(pipe(new THREE.Vector3(72,2,-22),new THREE.Vector3(112,2,-34),0x42bfe7));infrastructure.add(pipe(new THREE.Vector3(115,1,-35),new THREE.Vector3(25,.5,-15),0x42bfe7));
infrastructure.add(pipe(new THREE.Vector3(28,.55,-15),new THREE.Vector3(-95,.55,-15),0x42bfe7));
const powerLine=pipe(new THREE.Vector3(12,3,8),new THREE.Vector3(90,3,20),0xffd66f);infrastructure.add(powerLine);

const scenes=[
 {start:0,end:9,label:'01 · THE IDEA',title:['نحوّل فائض الشمس من عبء إلى مورد','Shade first. Energy and water serve agriculture.'],card:['المشروع يبدأ من الشجرة','مظلة شمسية مرتفعة تصنع الظل وتنتج الكهرباء من دون احتلال سطح الأرض.'],shot:'approach'},
 {start:9,end:24,label:'02 · THE TREE',card:['شجرة D11','قطر المظلة 11 م، الحافة على ارتفاع 5 م، والقمة 8 م. العمود المجوف يحمل الهيكل والكابلات.'],shot:'treeOrbit'},
 {start:24,end:38,label:'03 · UNDER THE CANOPY',card:['داخل المشروع، لا فوقه فقط','الكاميرا تمر بين الأعمدة والمحاصيل: الظل فوق الزراعة، والآليات تبقى قادرة على الحركة تحت المظلات.'],shot:'groundRun'},
 {start:38,end:51,label:'04 · THE HEXAGON',card:['من شجرة إلى خلية','شجرة في المركز وست حولها. عند تكرار السداسيات تُشارك أشجار الرؤوس بين الخلايا وتصبح الشبكة معيارية.'],shot:'cellReveal'},
 {start:51,end:67,label:'05 · PERIODIC EXPANSION',card:['التوسع مثل خلية النحل','النمط نفسه يتكرر. المرجع النظري يقارب 8,019 شجرة لكل كم² قبل خصم الطرق والخزانات والمحطات.'],shot:'networkRise'},
 {start:67,end:82,label:'06 · WATER + ENERGY',card:['الكهرباء تشغّل الماء','جزء من طاقة الأشجار يشغّل المضخات، الماء يُخزن ثم يُوزع عبر قطاعات الري بالتنقيط.'],shot:'utilityRun'},
 {start:82,end:94,label:'07 · AGRICULTURAL MICROCLIMATE',card:['الزراعة هي الغاية','المطلوب ليس تغطية الأرض بالألواح؛ المطلوب خفض الحمل الحراري والتبخر مع إبقاء الضوء الكافي للمحصول.'],shot:'cropPass'},
 {start:94,end:102,label:'08 · 1 km² SYSTEM',title:['بنية زراعية–طاقية قابلة للتوسع','Solar trees · shade · water · crops · control'],card:['منظومة واحدة','الشجرة وحدة البناء، لكن المشروع الحقيقي هو شبكة ماء وطاقة وزراعة وتحكم تعمل كوحدة واحدة.'],shot:'finalWide'}
];

let elapsed=0,running=true,last=performance.now(),frame=0,activeIndex=-1,recorder=null,chunks=[];

function ease(t){return t*t*(3-2*t)}
function lerpVec(a,b,t){return a.clone().lerp(b,ease(t))}
function shotCamera(name,u){
  let p,l;
  if(name==='approach'){p=lerpVec(new THREE.Vector3(0,2.4,34),new THREE.Vector3(1.5,3.1,16),u);l=new THREE.Vector3(0,4.8,0)}
  else if(name==='treeOrbit'){const a=-1.25+u*2.4,r=13.5;p=new THREE.Vector3(Math.cos(a)*r,5.4+2.2*Math.sin(Math.PI*u),Math.sin(a)*r);l=new THREE.Vector3(0,5,0)}
  else if(name==='groundRun'){const z=65-u*135;p=new THREE.Vector3(3.2*Math.sin(u*Math.PI*2),2.6,z);l=new THREE.Vector3(1.5*Math.sin((u+.08)*Math.PI*2),3.7,z-25)}
  else if(name==='cellReveal'){p=lerpVec(new THREE.Vector3(-18,7,22),new THREE.Vector3(-2,27,30),u);l=new THREE.Vector3(0,3,0)}
  else if(name==='networkRise'){const a=-.4+u*.85,r=80+u*105;p=new THREE.Vector3(Math.cos(a)*r,26+u*88,Math.sin(a)*r);l=new THREE.Vector3(0,2,0)}
  else if(name==='utilityRun'){p=lerpVec(new THREE.Vector3(35,4,45),new THREE.Vector3(125,14,-5),u);l=lerpVec(new THREE.Vector3(55,3,10),new THREE.Vector3(102,4,-20),u)}
  else if(name==='cropPass'){const x=-90+u*180;p=new THREE.Vector3(x,2.9,-38+8*Math.sin(u*Math.PI));l=new THREE.Vector3(x+24,3.2,-30)}
  else {const a=-.5+u*.5;p=new THREE.Vector3(Math.cos(a)*270,155,Math.sin(a)*270);l=new THREE.Vector3(0,1,0)}
  camera.position.copy(p);camera.lookAt(l);
}

function setNarrative(i){
  const s=scenes[i];sceneLabel.textContent=s.label;
  titleCard.classList.toggle('active',!!s.title);if(s.title){titleAr.textContent=s.title[0];titleEn.textContent=s.title[1]}
  lowerThird.classList.toggle('active',!!s.card);if(s.card){cardAr.textContent=s.card[0];cardEn.textContent=s.card[1]}
  infrastructure.visible=s.shot==='utilityRun';
  cellGroup.visible=['cellReveal','networkRise','finalWide'].includes(s.shot);
}
function updateScene(t){
  const idx=Math.max(0,scenes.findIndex(s=>t>=s.start&&t<s.end));const i=idx===-1?scenes.length-1:idx;if(i!==activeIndex){activeIndex=i;setNarrative(i)}
  const s=scenes[i],u=Math.max(0,Math.min(1,(t-s.start)/(s.end-s.start)));shotCamera(s.shot,u);
  const dayPhase=.42+.12*Math.sin(t*.045);sun.position.set(-120+80*dayPhase,118,70);sun.target.position.set(0,0,0);
  const sec=Math.floor(t),mm=String(Math.floor(sec/60)).padStart(2,'0'),ss=String(sec%60).padStart(2,'0');timerEl.textContent=`${mm}:${ss} / 01:42`;progressFill.style.width=`${(t/LOOP_DURATION)*100}%`;
}
function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;if(canvas.width!==Math.floor(w*renderer.getPixelRatio())||canvas.height!==Math.floor(h*renderer.getPixelRatio())){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}}
function loop(now){resize();let dt=captureMode?1/FPS:Math.min((now-last)/1000,.08);last=now;if(captureMode)frame++;if(running){elapsed+=dt;if(elapsed>=LOOP_DURATION)elapsed=0}updateScene(elapsed);renderer.render(scene,camera);requestAnimationFrame(loop)}

playPauseBtn.addEventListener('click',()=>{running=!running;playPauseBtn.textContent=running?'Pause':'Play'});
restartBtn.addEventListener('click',()=>{elapsed=0;frame=0;activeIndex=-1});
recordBtn.addEventListener('click',()=>{
  if(recorder&&recorder.state==='recording'){recorder.stop();return}
  const stream=canvas.captureStream(30);const type=MediaRecorder.isTypeSupported('video/webm;codecs=vp9')?'video/webm;codecs=vp9':'video/webm';chunks=[];recorder=new MediaRecorder(stream,{mimeType:type,videoBitsPerSecond:10000000});
  recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.onstop=()=>{const blob=new Blob(chunks,{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='solar-agro-tree-showreel.webm';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);recordBtn.textContent='Record';recordBtn.classList.remove('recording')};
  elapsed=0;activeIndex=-1;running=true;recorder.start();recordBtn.textContent='Stop';recordBtn.classList.add('recording');setTimeout(()=>{if(recorder?.state==='recording')recorder.stop()},(LOOP_DURATION+.5)*1000);
});

if(captureMode){renderer.setPixelRatio(1);running=true;elapsed=0}
requestAnimationFrame(loop);
