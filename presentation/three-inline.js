import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js';

const canvas=document.getElementById('threeCanvas');
const host=document.getElementById('visualStage');
const params=new URLSearchParams(location.search);
const captureMode=params.get('capture')==='1';
const CAPTURE_FPS=30;

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x071014);
scene.fog=new THREE.FogExp2(0x071014,0.012);

const camera=new THREE.PerspectiveCamera(42,1,0.1,500);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:captureMode});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.04;

scene.add(new THREE.HemisphereLight(0xb9d6dc,0x182210,1.35));
const sun=new THREE.DirectionalLight(0xfff1c8,3.5);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);sun.shadow.camera.near=.5;sun.shadow.camera.far=140;sun.shadow.camera.left=-45;sun.shadow.camera.right=45;sun.shadow.camera.top=45;sun.shadow.camera.bottom=-45;scene.add(sun);scene.add(sun.target);
const sunOrb=new THREE.Mesh(new THREE.SphereGeometry(.7,20,14),new THREE.MeshBasicMaterial({color:0xffd166}));scene.add(sunOrb);

const ground=new THREE.Mesh(new THREE.PlaneGeometry(110,110),new THREE.MeshStandardMaterial({color:0x2e3d26,roughness:.96}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const grid=new THREE.GridHelper(90,36,0x28423d,0x172c29);grid.position.y=.015;scene.add(grid);
const cropMat=new THREE.MeshStandardMaterial({color:0x486b37,roughness:1});for(let z=-28;z<=28;z+=2.1){const row=new THREE.Mesh(new THREE.BoxGeometry(62,.12,.34),cropMat);row.position.set(0,.07,z);row.receiveShadow=true;scene.add(row)}

const structureMat=new THREE.MeshStandardMaterial({color:0xa9b4b6,metalness:.72,roughness:.36});
const railMat=new THREE.MeshStandardMaterial({color:0x778588,metalness:.88,roughness:.28});
const pvMat=new THREE.MeshPhysicalMaterial({color:0x0c4652,metalness:.15,roughness:.25,clearcoat:.72,clearcoatRoughness:.22,side:THREE.DoubleSide});
function tri(a,b,c){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array([a.x,a.y,a.z,b.x,b.y,b.z,c.x,c.y,c.z]),3));g.computeVertexNormals();return g}
function beam(a,b,r,m){const d=new THREE.Vector3().subVectors(b,a),len=d.length();const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,8),m);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());mesh.castShadow=true;return mesh}
function solarTree(hero=false){const g=new THREE.Group(),edge=5,apexH=8,R=5.5;const col=new THREE.Mesh(new THREE.CylinderGeometry(.30,.38,edge,18),structureMat);col.position.y=edge/2;col.castShadow=true;col.receiveShadow=true;g.add(col);const collar=new THREE.Mesh(new THREE.CylinderGeometry(.78,.78,.22,18),structureMat);collar.position.y=edge-.08;g.add(collar);const apex=new THREE.Vector3(0,apexH,0),rim=[];for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;rim.push(new THREE.Vector3(R*Math.cos(a),edge,R*Math.sin(a)))}for(let i=0;i<6;i++){const a=rim[i],b=rim[(i+1)%6],p=new THREE.Mesh(tri(apex,a,b),pvMat);p.castShadow=true;p.receiveShadow=true;g.add(p,beam(apex,a,.055,railMat),beam(a,b,.055,railMat));if(hero){const center=new THREE.Vector3().addVectors(apex,a).add(b).multiplyScalar(1/3);g.add(beam(center.clone().lerp(a,.36),center.clone().lerp(b,.36),.025,railMat))}}return g}
const field=new THREE.Group();scene.add(field);field.add(solarTree(true));const CELL=12;for(let i=0;i<6;i++){const a=i*Math.PI/3,t=solarTree(false);t.position.set(CELL*Math.cos(a),0,CELL*Math.sin(a));t.scale.setScalar(.94);field.add(t)}
const hexPts=[];for(let i=0;i<=6;i++){const a=Math.PI/6+(i%6)*Math.PI/3;hexPts.push(new THREE.Vector3(CELL*Math.cos(a),.035,CELL*Math.sin(a)))}scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(hexPts),new THREE.LineBasicMaterial({color:0x5fc7bd,transparent:true,opacity:.38})));
const mark=new THREE.Mesh(new THREE.RingGeometry(1,1.18,32),new THREE.MeshBasicMaterial({color:0x80ddd2,side:THREE.DoubleSide,transparent:true,opacity:.55}));mark.rotation.x=-Math.PI/2;mark.position.y=.03;scene.add(mark);

const target=new THREE.Vector3(0,3.1,0);let active=false,elapsed=0,last=performance.now(),frame=0;
function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;const pr=renderer.getPixelRatio();if(canvas.width!==Math.floor(w*pr)||canvas.height!==Math.floor(h*pr)){renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}}
function sunAnim(t){const phase=.5+.5*Math.sin(t*.28-.6),az=THREE.MathUtils.lerp(-Math.PI*.62,Math.PI*.62,phase),e=12+43*Math.sin(Math.PI*phase),r=44;sun.position.set(r*Math.sin(az),e,r*Math.cos(az));sun.target.position.set(0,0,0);sunOrb.position.copy(sun.position);sun.intensity=THREE.MathUtils.lerp(2.5,4.2,Math.sin(Math.PI*phase))}
function cameraAnim(t){const local=((t%14)+14)%14/14,a=THREE.MathUtils.lerp(-.95,.95,local),radius=THREE.MathUtils.lerp(20,32,local);const y=THREE.MathUtils.lerp(8.5,22,local);camera.position.set(Math.cos(a)*radius,y,Math.sin(a)*radius);camera.lookAt(target)}
function loop(now){resize();let dt;if(captureMode){dt=1/CAPTURE_FPS;frame++}else{dt=Math.min((now-last)/1000,.1);last=now}if(active)elapsed+=dt;cameraAnim(elapsed);sunAnim(elapsed);mark.rotation.z=elapsed*.18;renderer.render(scene,camera);requestAnimationFrame(loop)}
window.addEventListener('solar-scene-change',e=>{active=e.detail.key==='three';if(active){elapsed=0;frame=0;host.dataset.threeReady='true'}});
window.addEventListener('resize',resize);
requestAnimationFrame(loop);
