import * as THREE from 'three';

const canvas=document.querySelector('#scene');
const statusEl=document.querySelector('#status');
const titleEl=document.querySelector('#stageTitle');
const cellCountEl=document.querySelector('#cellCount');
const treeCountEl=document.querySelector('#treeCount');
const centerTreeCountEl=document.querySelector('#centerTreeCount');
const vertexTreeCountEl=document.querySelector('#vertexTreeCount');
const noteEl=document.querySelector('#stageNote');
const hexToggle=document.querySelector('#hexToggle');
const sharedToggle=document.querySelector('#sharedToggle');
const dimensionToggle=document.querySelector('#dimensionToggle');

const S=12;
const CELL_CENTER_SPACING=Math.sqrt(3)*S;
const CANOPY_D=11;
const CANOPY_R=CANOPY_D/2;
const EDGE_H=5;
const APEX_H=8;

const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.15;

const scene=new THREE.Scene();
scene.background=new THREE.Color(0xcfeeff);
scene.fog=new THREE.Fog(0xcfeeff,350,1300);
const camera=new THREE.PerspectiveCamera(42,1,0.1,2200);

scene.add(new THREE.HemisphereLight(0xe8f8ff,0x63704b,2.1));
const sun=new THREE.DirectionalLight(0xfff3d2,4.2);sun.position.set(140,220,90);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-300;sun.shadow.camera.right=300;sun.shadow.camera.top=300;sun.shadow.camera.bottom=-300;scene.add(sun);scene.add(sun.target);

const ground=new THREE.Mesh(new THREE.PlaneGeometry(1500,1500),new THREE.MeshStandardMaterial({color:0xa9bf72,roughness:1}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const grid=new THREE.GridHelper(1200,60,0x8aa68e,0xb4c7a7);grid.position.y=.02;scene.add(grid);

const modelRoot=new THREE.Group();scene.add(modelRoot);
const hexRoot=new THREE.Group();const treeRoot=new THREE.Group();const markerRoot=new THREE.Group();const dimensionRoot=new THREE.Group();modelRoot.add(hexRoot,treeRoot,markerRoot,dimensionRoot);

function axialToWorld(q,r){return new THREE.Vector3(Math.sqrt(3)*S*(q+r/2),0,1.5*S*r)}
function hexVertices(center){const a=[];for(let k=0;k<6;k++){const ang=THREE.MathUtils.degToRad(30+60*k);a.push(new THREE.Vector3(center.x+S*Math.cos(ang),0,center.z+S*Math.sin(ang)))}return a}
function key(v){return `${v.x.toFixed(5)},${v.z.toFixed(5)}`}

function ringCells(radius){const out=[];for(let q=-radius;q<=radius;q++){for(let r=-radius;r<=radius;r++){const s=-q-r;if(Math.max(Math.abs(q),Math.abs(r),Math.abs(s))<=radius)out.push({q,r})}}return out}
function firstNCells(n){let radius=0,cells=[];while(cells.length<n){cells=ringCells(radius);radius++}cells.sort((a,b)=>{const da=Math.max(Math.abs(a.q),Math.abs(a.r),Math.abs(-a.q-a.r));const db=Math.max(Math.abs(b.q),Math.abs(b.r),Math.abs(-b.q-b.r));if(da!==db)return da-db;const aa=Math.atan2(axialToWorld(a.q,a.r).z,axialToWorld(a.q,a.r).x);const ab=Math.atan2(axialToWorld(b.q,b.r).z,axialToWorld(b.q,b.r).x);return aa-ab});return cells.slice(0,n)}
function oneKmCells(){const out=[];const lim=42;for(let q=-lim;q<=lim;q++){for(let r=-lim;r<=lim;r++){const p=axialToWorld(q,r);if(Math.abs(p.x)<=500-S&&Math.abs(p.z)<=500-S)out.push({q,r})}}return out}

const stages={
  '1':()=>[{q:0,r:0}],
  '7':()=>ringCells(1),
  '50':()=>firstNCells(50),
  '1km':()=>oneKmCells()
};
const stageNames={'1':'خلية واحدة','7':'سبع خلايا مترابطة','50':'خمسون خلية','1km':'شبكة 1 كم²'};
const stageNotes={
 '1':'شجرة في المركز وست أشجار عند رؤوس السداسي. هذه هي وحدة الفكرة الأولى.',
 '7':'سداسي مركزي وستة حوله. كل خليتين متجاورتين تشتركان في ضلع كامل، لذلك شجرتا ذلك الضلع لا تتكرران.',
 '50':'التكرار يتم على lattice سداسي مستمر؛ أشجار الرؤوس تُدمج حسابياً إذا كانت في الموقع نفسه.',
 '1km':'الحدود هنا مربع 1,000×1,000 م. العدد الظاهر ناتج عن قص الشبكة داخل المربع؛ 8,019 شجرة/كم² تبقى كثافة المرجع الدوري النظري.'
};

function clearGroup(g){while(g.children.length){const c=g.children.pop();c.geometry?.dispose?.();if(c.material){if(Array.isArray(c.material))c.material.forEach(m=>m.dispose?.());else c.material.dispose?.()}}}

function makePentagonalTree(position,isShared=false,scale=1){const g=new THREE.Group();g.position.copy(position);
 const baseMat=new THREE.MeshStandardMaterial({color:0x586560,metalness:.45,roughness:.42});
 const colMat=new THREE.MeshStandardMaterial({color:0xc7cfcc,metalness:.7,roughness:.28});
 const pvMat=new THREE.MeshStandardMaterial({color:0x0b6177,metalness:.25,roughness:.38,side:THREE.DoubleSide});
 const base=new THREE.Mesh(new THREE.CylinderGeometry(.72,.9,.35,16),baseMat);base.position.y=.175;base.castShadow=true;g.add(base);
 const col=new THREE.Mesh(new THREE.CylinderGeometry(.30,.30,EDGE_H,16),colMat);col.position.y=EDGE_H/2;col.castShadow=true;g.add(col);
 const canopy=new THREE.Mesh(new THREE.ConeGeometry(CANOPY_R,APEX_H-EDGE_H,5,1,false,Math.PI/2),pvMat);canopy.position.y=(EDGE_H+APEX_H)/2;canopy.castShadow=true;canopy.receiveShadow=true;g.add(canopy);
 if(isShared){const ring=new THREE.Mesh(new THREE.RingGeometry(.95,1.28,24),new THREE.MeshBasicMaterial({color:0xe3a52b,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.05;g.add(ring)}
 g.scale.setScalar(scale);return g}

function addHexLines(cells){const pts=[];for(const c of cells){const ctr=axialToWorld(c.q,c.r),v=hexVertices(ctr);for(let i=0;i<6;i++){pts.push(v[i],v[(i+1)%6])}}const geo=new THREE.BufferGeometry().setFromPoints(pts);const line=new THREE.LineSegments(geo,new THREE.LineBasicMaterial({color:0x4b8275,transparent:true,opacity:.86}));line.position.y=.06;hexRoot.add(line)}

function addDimensionLine(a,b,color=0xd86f35){const geo=new THREE.BufferGeometry().setFromPoints([a,b]);const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color}));line.position.y=.18;dimensionRoot.add(line);for(const p of [a,b]){const tick=new THREE.Mesh(new THREE.BoxGeometry(.18,.18,.8),new THREE.MeshBasicMaterial({color}));tick.position.set(p.x,.18,p.z);dimensionRoot.add(tick)}}
function addRepresentativeDimensions(){const c=new THREE.Vector3(0,0,0);const v=hexVertices(c)[0];addDimensionLine(c,v);const neighbor=axialToWorld(1,0);addDimensionLine(c,neighbor,0x7c4db6)}

let currentStage='1';let currentCenters=[];let currentVertices=[];
function rebuild(stageKey){currentStage=stageKey;statusEl.textContent='إعادة بناء الهندسة…';clearGroup(hexRoot);clearGroup(treeRoot);clearGroup(markerRoot);clearGroup(dimensionRoot);
 const cells=stages[stageKey]();currentCenters=cells.map(c=>axialToWorld(c.q,c.r));
 const vertexMap=new Map();for(const ctr of currentCenters)for(const v of hexVertices(ctr))vertexMap.set(key(v),v);currentVertices=[...vertexMap.values()];
 addHexLines(cells);
 const heavy=stageKey==='1km';const treeScale=heavy?.82:1;
 for(const p of currentCenters)treeRoot.add(makePentagonalTree(p,false,treeScale));
 for(const p of currentVertices)treeRoot.add(makePentagonalTree(p,true,treeScale));
 addRepresentativeDimensions();
 hexRoot.visible=hexToggle.checked;markerRoot.visible=sharedToggle.checked;dimensionRoot.visible=dimensionToggle.checked;
 titleEl.textContent=stageNames[stageKey];cellCountEl.textContent=cells.length.toLocaleString('en-US');treeCountEl.textContent=(currentCenters.length+currentVertices.length).toLocaleString('en-US');centerTreeCountEl.textContent=currentCenters.length.toLocaleString('en-US');vertexTreeCountEl.textContent=currentVertices.length.toLocaleString('en-US');noteEl.textContent=stageNotes[stageKey];
 document.querySelectorAll('[data-stage]').forEach(b=>b.classList.toggle('active',b.dataset.stage===stageKey));
 frameModel(stageKey);statusEl.textContent=`${cells.length} خلايا · ${currentCenters.length+currentVertices.length} أشجار فريدة`;
}

function boundsOfPoints(points){const box=new THREE.Box3();for(const p of points)box.expandByPoint(p);return box}
let target=new THREE.Vector3(0,0,0),yaw=.75,pitch=.58,distance=90,drag=false,lastX=0,lastY=0;
function setOrbitFromCamera(){const d=camera.position.clone().sub(target);distance=d.length();pitch=Math.asin(d.y/distance);yaw=Math.atan2(d.x,d.z)}
function applyOrbit(){const cp=Math.cos(pitch);camera.position.set(target.x+distance*cp*Math.sin(yaw),target.y+distance*Math.sin(pitch),target.z+distance*cp*Math.cos(yaw));camera.lookAt(target)}
function frameModel(stageKey){const pts=[...currentCenters,...currentVertices];const box=boundsOfPoints(pts);const size=new THREE.Vector3();box.getSize(size);const center=new THREE.Vector3();box.getCenter(center);target.set(center.x,3,center.z);const span=Math.max(size.x,size.z,25);distance=stageKey==='1km'?Math.min(920,span*1.05):span*1.5+28;pitch=stageKey==='1km'?.78:.58;yaw=.72;applyOrbit()}
function topView(){const pts=[...currentCenters,...currentVertices];const box=boundsOfPoints(pts);const size=new THREE.Vector3();box.getSize(size);const center=new THREE.Vector3();box.getCenter(center);target.set(center.x,0,center.z);const span=Math.max(size.x,size.z,24);camera.position.set(center.x,Math.max(55,span*1.05),center.z+.01);camera.lookAt(center.x,0,center.z);setOrbitFromCamera()}
function groundView(){target.set(0,3.8,0);camera.position.set(-28,2.7,18);camera.lookAt(10,4.2,0);setOrbitFromCamera()}
function orbitView(){frameModel(currentStage)}

document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>rebuild(b.dataset.stage)));
document.querySelector('#topView').addEventListener('click',topView);document.querySelector('#groundView').addEventListener('click',groundView);document.querySelector('#orbitView').addEventListener('click',orbitView);
hexToggle.addEventListener('change',()=>hexRoot.visible=hexToggle.checked);sharedToggle.addEventListener('change',()=>{for(const t of treeRoot.children){const ring=t.children.find(c=>c.geometry?.type==='RingGeometry');if(ring)ring.visible=sharedToggle.checked}});dimensionToggle.addEventListener('change',()=>dimensionRoot.visible=dimensionToggle.checked);

canvas.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;yaw-=dx*.006;pitch=Math.max(.08,Math.min(1.48,pitch-dy*.005));applyOrbit()});canvas.addEventListener('wheel',e=>{e.preventDefault();distance=Math.max(12,Math.min(1200,distance*(1+e.deltaY*.001)));applyOrbit()},{passive:false});
let touchDist=0;canvas.addEventListener('touchstart',e=>{if(e.touches.length===2)touchDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)},{passive:true});canvas.addEventListener('touchmove',e=>{if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(touchDist){distance=Math.max(12,Math.min(1200,distance*(touchDist/d)));applyOrbit()}touchDist=d}},{passive:true});

function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);resize();
function animate(){requestAnimationFrame(animate);renderer.render(scene,camera)}
rebuild('1');animate();
