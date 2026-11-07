(function(){
"use strict";

/* =====================================================================
   EDIT YOUR LINKS HERE (one place).
   Lines marked VERIFY were worked out from your handle / phone / email
   and are NOT confirmed. Replace them with the real ones.
   An empty string "" switches that button off.
   ===================================================================== */
var LINKS={
  call:      "tel:+917383958977",
  mail:      "mailto:info@gi1superapp.com",
  maps:      "https://www.google.com/maps/search/?api=1&query=Vadodara",
  instagram: "https://instagram.com/gi1superapp",              // VERIFY
  whatsapp:  "https://wa.me/917383958977",                     // VERIFY (uses the card phone number)
  youtube:   "https://youtube.com/@gi1superapp",               // VERIFY
  website:   "https://gi1superapp.com",                        // VERIFY (from your email domain)
  play:      "https://play.google.com/store/search?q=gi1%20prime%20app&c=apps", // VERIFY: replace with the real app page
  reward:    "",                                               // optional: link for the GPay reward panel
  beacon:    ""                                                // optional: scan counter address (see README). "" = off
};
var CONTACT={name:"Gi1 Prime App",org:"Gi1 Super App",tel:"+917383958977",telShow:"73839 58977",mail:"info@gi1superapp.com",city:"Vadodara",country:"India"};
/* The address the printed QR points to. Leave "" to use the address this page is opened from. */
var PAGE_URL="https://themsd542.github.io/Gi1-Super-App01/";

/* ---------- helpers ---------- */
var $=function(i){return document.getElementById(i)};
var LITE=false;var body=document.body;if(!body.classList.contains("s-live")&&!body.classList.contains("s-land"))body.className="s-land f-front";
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function cv(w,h){var c=document.createElement("canvas");c.width=w;c.height=h;return c}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function toast(t){var e=$("toast");e.textContent=t;e.style.display="block";clearTimeout(toast._t);toast._t=setTimeout(function(){e.style.display="none"},3600)}
function link(a,key){var u=LINKS[key];if(u){a.href=u;if(/^https?:/.test(u)){a.target="_blank";a.rel="noopener"}}else{a.removeAttribute("href");a.classList.add("off");a.setAttribute("aria-disabled","true")}}
function pageUrl(){if(PAGE_URL)return PAGE_URL;if(/^https?:/.test(location.protocol))return location.origin+location.pathname;return LINKS.website||location.href}
var still=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
var GOLD=[[0,"#6e4a06"],[.15,"#d9a21b"],[.3,"#fff2b3"],[.45,"#f0c24a"],[.62,"#a9740c"],[.8,"#f6d778"],[1,"#7a5208"]];

/* ---------- static fill: links, tiles, landing buttons, ticker ---------- */
var TILES={
  phone:{i:"assets/tile-phone.png",l:"Call",lt:"t_call",v:"73839 58977",k:"call"},
  mail:{i:"assets/tile-mail.png",l:"Email",lt:"t_mail",v:"Send a message",vt:"t_msg",k:"mail"},
  web:{i:"assets/tile-web.png",l:"Website",lt:"t_web",v:"gi1superapp",k:"website"},
  loc:{i:"assets/tile-loc.png",l:"Vadodara",lt:"t_loc",v:"Open in Maps",vt:"t_maps",k:"maps"},
  play:{i:"assets/tile-play.png",l:"Gi1 Prime App",v:"Play Store",k:"play"}
};
function fillStatic(){
  var tb=$("tilesB");
  ["loc","phone","mail","web"].forEach(function(n,i){var t=TILES[n],a=document.createElement("a");a.className="panel navy tile";a.style.setProperty("--i",4+i);
    a.innerHTML='<span class="in"><img alt="" src="'+t.i+'"><span><b data-t="'+(t.lt||"")+'">'+t.l+'</b><small'+(t.vt?' data-t="'+t.vt+'"':'')+'>'+t.v+'</small></span></span>';link(a,t.k);tb.appendChild(a)});
  [].forEach.call(document.querySelectorAll("[data-k]"),function(a){link(a,a.getAttribute("data-k"))});
  link($("playP"),"play");
  var rp=$("rewardP");if(LINKS.reward)link(rp,"reward");
  var lc=$("lc");[["Call","call"],["WhatsApp","whatsapp"],["Instagram","instagram"],["Website","website"],["Email","mail"]].forEach(function(p){if(!LINKS[p[1]])return;var a=document.createElement("a");a.className="btn";a.textContent=p[0];link(a,p[1]);lc.appendChild(a)});
  /* background: faint logo watermarks + a few floating gold badges (static / transform only) */
  var wm=$("wm"),W=[[4,10,150,-12],[78,6,120,18],[-4,44,130,8],[84,40,150,-20],[6,76,140,24],[80,74,130,-8]];
  W.forEach(function(w){var im=new Image();im.src="assets/logo-gold.png";im.alt="";im.style.cssText="left:"+w[0]+"%;top:"+w[1]+"%;width:"+w[2]+"px;transform:rotate("+w[3]+"deg)";wm.appendChild(im)});
  var B=["ALL SOCIAL UPDATES","OPEN RANDOM CHATS","GENIE COINS","FREE REWARDS","GET UPTO \u20B9100/-","ALL IN 1, IN Gi1"],bd=$("badges");
  B.forEach(function(t,i){var s=document.createElement("span");s.textContent=t;var left=i%2===0;s.style.cssText=(left?"left:":"right:")+"2.5%;top:"+(8+i*14)+"%;--dx:"+(left?10:-10)+"px;--dy:"+(i%2?-8:8)+"px;animation-delay:"+(i*.8)+"s";bd.appendChild(s)});
}

/* ---------- QR (rounded blue modules, gold Gi1 logo in the centre) ---------- */
var logoImg=new Image();logoImg.src="assets/logo-gold.png";
function modShape(g,x,y,w,tl,tr,br,bl){g.beginPath();g.moveTo(x+tl,y);g.lineTo(x+w-tr,y);if(tr)g.arcTo(x+w,y,x+w,y+tr,tr);else g.lineTo(x+w,y);g.lineTo(x+w,y+w-br);if(br)g.arcTo(x+w,y+w,x+w-br,y+w,br);else g.lineTo(x+w,y+w);g.lineTo(x+bl,y+w);if(bl)g.arcTo(x,y+w,x,y+w-bl,bl);else g.lineTo(x,y+w);g.lineTo(x,y+tl);if(tl)g.arcTo(x,y,x+tl,y,tl);else g.lineTo(x,y);g.closePath()}
function drawQR(g,url,x,y,s,withLogo){
  var q=qrcode(0,"H");q.addData(url);q.make();var n=q.getModuleCount(),m=s/n,cx=n/2,hole=withLogo?n*0.105:0;
  function dark(r,c){if(r<0||c<0||r>=n||c>=n)return false;if(withLogo&&Math.abs(c+.5-cx)<hole&&Math.abs(r+.5-cx)<hole)return false;return q.isDark(r,c)}
  g.fillStyle="#10428f";var rad=m*.42,o=m*.04;
  for(var r=0;r<n;r++)for(var c=0;c<n;c++){
    if(!dark(r,c))continue;
    var U=dark(r-1,c),D=dark(r+1,c),L=dark(r,c-1),R=dark(r,c+1);
    /* round only the corners that are not joined to a neighbour, so shapes stay solid and scannable */
    modShape(g,x+c*m-o,y+r*m-o,m+o*2,(!U&&!L)?rad:0,(!U&&!R)?rad:0,(!D&&!R)?rad:0,(!D&&!L)?rad:0);g.fill();
  }
  if(withLogo){var ls=s*0.215,lx=x+(s-ls)/2,ly=y+(s-ls)/2;
    g.fillStyle="#fff";rr(g,lx-ls*.07,ly-ls*.07,ls*1.14,ls*1.14,ls*.26);g.fill();
    if(logoImg.complete&&logoImg.naturalWidth){g.save();rr(g,lx,ly,ls,ls,ls*.22);g.clip();g.drawImage(logoImg,lx,ly,ls,ls);g.restore()}}
}
function drawQRCard(canvas,url,withLogo){
  var g=canvas.getContext("2d");g.clearRect(0,0,canvas.width,canvas.height);g.fillStyle="#fff";rr(g,0,0,canvas.width,canvas.height,canvas.width*.09);g.fill();
  var pad=canvas.width*.07;drawQR(g,url,pad,pad,canvas.width-pad*2,withLogo)}
function paintMini(){drawQRCard($("qrMini"),pageUrl(),true)}

/* back face of the card: your art, with the old QR replaced by a QR for THIS page */
var K2000=function(img){return img.width/2000};
function paintBackQR(g,k,url){
  g.fillStyle="#fff";rr(g,711*k,281*k,580*k,588*k,56*k);g.fill();
  drawQR(g,url,760*k,336*k,480*k,true);
}
function makeBackCanvas(cb){var im=new Image();im.onload=function(){var c=cv(im.width,im.height),g=c.getContext("2d");g.drawImage(im,0,0);
  var go=function(){paintBackQR(g,K2000(im),pageUrl());cb(c)};if(logoImg.complete&&logoImg.naturalWidth)go();else logoImg.onload=go};im.src="assets/card-back.jpg"}

/* ---------- three.js scene: the 3D card, rings, Genie coins ---------- */
var renderer,scene,camera,holder,card,rings=[],coins=[],shineTex,glReady=false,live=false;
var FOV=32,CAMZ=14,CW=3.5,CH=3.5*1673/2912;
var yaw=0,pitch=0,tYaw=0,tPitch=0,uScale=1,tUScale=1,drag=false,moved=0,lx=0,ly=0,ptrs={},pinch0=0,idle=0,t0=0,faceFront=true;
var gyro={x:0,y:0},cvr={w:300,h:200,l:0,t:0},lastR=0,fsOpen=false;

function goldTex(){var c=cv(256,256),g=c.getContext("2d"),r=g.createLinearGradient(0,0,256,256);GOLD.forEach(function(p){r.addColorStop(p[0],p[1])});g.fillStyle=r;g.fillRect(0,0,256,256);return new THREE.CanvasTexture(c)}
function makeShine(){var c=cv(256,128),g=c.getContext("2d");g.translate(128,64);g.rotate(.35);var r=g.createLinearGradient(-46,0,46,0);r.addColorStop(0,"rgba(255,255,255,0)");r.addColorStop(.5,"rgba(255,250,220,.5)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(-46,-140,92,280);return new THREE.CanvasTexture(c)}
function genieCoinTex(){var c=cv(256,256),g=c.getContext("2d");
  function paint(){g.clearRect(0,0,256,256);var r=g.createRadialGradient(88,80,8,128,128,128);r.addColorStop(0,"#fff6c8");r.addColorStop(.45,"#f0c24a");r.addColorStop(1,"#8a5d0a");g.fillStyle=r;g.beginPath();g.arc(128,128,124,0,6.3);g.fill();
    g.strokeStyle="#6e4a06";g.lineWidth=7;g.beginPath();g.arc(128,128,112,0,6.3);g.stroke();
    if(logoImg.complete&&logoImg.naturalWidth){g.save();g.beginPath();g.arc(128,128,100,0,6.3);g.clip();g.drawImage(logoImg,28,28,200,200);g.restore();g.strokeStyle="#fff2b3";g.lineWidth=4;g.beginPath();g.arc(128,128,101,0,6.3);g.stroke()}}
  paint();var t=new THREE.CanvasTexture(c);if(!(logoImg.complete&&logoImg.naturalWidth))logoImg.addEventListener("load",function(){paint();t.needsUpdate=true});return t}

function initGL(){
  if(glReady)return;
  try{renderer=new THREE.WebGLRenderer({canvas:$("gl"),antialias:(window.devicePixelRatio||1)<2,alpha:true,powerPreference:"high-performance"})}catch(e){glFail();return}
  $("gl").addEventListener("webglcontextlost",function(ev){ev.preventDefault();glFail()});
  renderer.setPixelRatio(LITE?1:Math.min(window.devicePixelRatio||1,1.5));renderer.setClearColor(0,0);
  scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(FOV,1,.1,100);camera.position.z=CAMZ;
  scene.add(new THREE.AmbientLight(0xffffff,.85));var k=new THREE.DirectionalLight(0xffffff,.7);k.position.set(3,4,6);scene.add(k);
  var rim=new THREE.PointLight(0xffd36a,.9,30);rim.position.set(-5,-2,5);scene.add(rim);
  holder=new THREE.Group();scene.add(holder);
  var loader=new THREE.TextureLoader(),gt=goldTex(),aniso=renderer.capabilities.getMaxAnisotropy?Math.min(8,renderer.capabilities.getMaxAnisotropy()):1;
  var edge=new THREE.MeshStandardMaterial({map:gt,metalness:.75,roughness:.28,emissive:0x4a3000});
  var ft=loader.load("assets/card-front.jpg");ft.anisotropy=aniso;
  var fm=new THREE.MeshBasicMaterial({map:ft}),bm=new THREE.MeshBasicMaterial({color:0xffffff});
  card=new THREE.Mesh(new THREE.BoxGeometry(CW,CH,.08),[edge,edge,edge,edge,fm,bm]);holder.add(card);
  makeBackCanvas(function(c){var t=new THREE.CanvasTexture(c);t.anisotropy=aniso;bm.map=t;bm.color.set(0xffffff);bm.needsUpdate=true});
  shineTex=makeShine();
  [[.0405,0],[-.0405,Math.PI]].forEach(function(p){var m=new THREE.Mesh(new THREE.PlaneGeometry(CW,CH),new THREE.MeshBasicMaterial({map:shineTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));m.position.z=p[0];m.rotation.y=p[1];card.add(m)});
  /* four orbiting Genie coins (logo on both faces) */
  var gct=genieCoinTex();/* coin faces carry the Gi1 logo */
  for(var i=0;i<4;i++){var o=new THREE.Group(),r=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.06,32,1,true),new THREE.MeshStandardMaterial({map:gt,metalness:.8,roughness:.25,emissive:0x4a3000,side:THREE.DoubleSide}));r.rotation.x=Math.PI/2;
    var a1=new THREE.Mesh(new THREE.CircleGeometry(.22,40),new THREE.MeshBasicMaterial({map:gct})),a2=a1.clone();a1.position.z=.031;a2.position.z=-.031;a2.rotation.y=Math.PI;o.add(r,a1,a2);holder.add(o);coins.push(o)}
  glReady=true;layoutGL();requestAnimationFrame(loop);
}
/* if 3D cannot run, show the flat card picture instead (still flips on tap) */
var fbImg=null,fbBackUrl="",fbFront=true;
function glFail(){glReady=false;live=false;body.classList.add("nogl");var s=$("slot");
  if(!fbImg){fbImg=new Image();fbImg.alt="The Gi1 Prime Card";fbImg.src="assets/card-front.jpg";fbImg.className="fbcard";s.appendChild(fbImg);
    makeBackCanvas(function(c){try{fbBackUrl=c.toDataURL("image/jpeg",.9)}catch(e){}})}
  toast("3D is not available here, showing the flat card. Tap the card to flip it.")}
function fbFlip(){fbFront=!fbFront;fbImg.src=fbFront?"assets/card-front.jpg":(fbBackUrl||"assets/card-back.jpg");setFace(fbFront)}
/* the 3D canvas covers ONLY the card area (much cheaper than a full-screen layer) */
function layoutGL(){
  if(!glReady)return;if(trk.on){trkSize();return}var r=$("slot").getBoundingClientRect(),m=8,w=Math.max(80,Math.round(r.width)),h=Math.max(80,Math.round(r.height+m*2));
  cvr.w=w;cvr.h=h;cvr.l=Math.round(r.left);cvr.t=Math.round(r.top-m);
  var c=$("gl");c.style.left=cvr.l+"px";c.style.top=cvr.t+"px";c.style.width=w+"px";c.style.height=h+"px";
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
  var rt=document.querySelector(".bg-glow");if(rt){rt.style.setProperty("--gx",(r.left+r.width/2)+"px");rt.style.setProperty("--gy",(r.top+r.height/2)+"px")}
  lastR=0}
var layT;function relayout(){clearTimeout(layT);layT=setTimeout(layoutGL,60)}
addEventListener("resize",relayout);addEventListener("orientationchange",relayout);
if(window.ResizeObserver){new ResizeObserver(relayout).observe($("slot"))}
$("ui").addEventListener("scroll",function(){layoutGL()},{passive:true});
function ease(k){k=clamp(k,0,1);return 1+2.70158*Math.pow(k-1,3)+1.70158*Math.pow(k-1,2)}
function setFace(front){if(front===faceFront)return;faceFront=front;body.classList.toggle("f-front",front);body.classList.toggle("f-back",!front)}
function loop(now){
  requestAnimationFrame(loop);if(!live||!glReady||document.hidden||fsOpen)return;if(trk.on){try{renderTrack(now)}catch(e){stopTrack()}return}
  var e=(now-t0)/1000,s=now/1000;
  /* full speed while something is moving, 30 fps when the card is just idling */
  var busy=drag||e<2.4||Math.abs(tYaw-yaw)>.004||Math.abs(tPitch-pitch)>.004||Math.abs(tUScale-uScale)>.003;
  if(!busy&&now-lastR<33)return;lastR=now;idle++;
  var slotW=cvr.w,slotH=cvr.h-16,pxw=2*CAMZ*Math.tan(FOV*Math.PI/360)/cvr.h;
  var cw=Math.min(slotW*.94,slotH*.94*(CW/CH))*uScale,intro=still?1:ease(e/1.3);
  if(!drag&&idle>150&&!still)tPitch*=.96;
  yaw+=(tYaw-yaw)*.14;pitch+=(tPitch-pitch)*.14;uScale+=(tUScale-uScale)*.15;
  var sway=(still||drag||idle<150)?0:Math.sin(s*.7)*.2*clamp((idle-150)/90,0,1);
  holder.position.set(0,0,0);holder.scale.setScalar(Math.max(cw*pxw/CW*intro,.001));
  holder.rotation.y=yaw+sway+gyro.x;holder.rotation.x=pitch+gyro.y+(still?0:Math.sin(s*1.1)*.03);
  var c=Math.cos(yaw+sway);if(faceFront&&c<-.12)setFace(false);else if(!faceFront&&c>.12)setFace(true);
  if(!still)shineTex.offset.x=.95-((s*.38)%1.9);
  coins.forEach(function(o,i){var a=i*Math.PI/2+s*.55,k=still?1:clamp((e-1.2-i*.18)/.6,0,1);o.scale.setScalar(Math.max(k,.001));o.position.set(Math.cos(a)*1.74,Math.sin(a)*.92,-Math.sin(a)*.9+.1);o.rotation.y=s*2+i});
  try{renderer.render(scene,camera)}catch(e){glFail()}
}

/* ---------- interaction on the card slot ---------- */
function flip(){if(body.classList.contains("nogl")&&fbImg){fbFlip();return}tYaw=(Math.round(tYaw/Math.PI)+1)*Math.PI;idle=0}
(function(){
  var slot=$("slot");
  function dist(){var k=Object.keys(ptrs);return Math.hypot(ptrs[k[0]][0]-ptrs[k[1]][0],ptrs[k[0]][1]-ptrs[k[1]][1])}
  slot.addEventListener("pointerdown",function(e){slot.setPointerCapture(e.pointerId);ptrs[e.pointerId]=[e.clientX,e.clientY];drag=true;moved=0;lx=e.clientX;ly=e.clientY;idle=0;if(Object.keys(ptrs).length==2)pinch0=dist()});
  slot.addEventListener("pointermove",function(e){
    if(ptrs[e.pointerId]){ptrs[e.pointerId]=[e.clientX,e.clientY];
      if(Object.keys(ptrs).length==2){var d=dist();if(pinch0)tUScale=clamp(tUScale*d/pinch0,.5,1.6);pinch0=d;moved=99;return}
      var dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;moved+=Math.abs(dx)+Math.abs(dy);tYaw+=dx*.012;tPitch=clamp(tPitch+dy*.006,-.7,.7);idle=0}
  });
  function up(e){delete ptrs[e.pointerId];pinch0=0;if(!Object.keys(ptrs).length){if(drag&&moved<8)flip();drag=false}}
  slot.addEventListener("pointerup",up);slot.addEventListener("pointercancel",up);
  slot.addEventListener("wheel",function(e){e.preventDefault();tUScale=clamp(tUScale*(e.deltaY<0?1.06:.94),.5,1.6)},{passive:false});
  slot.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();flip()}});
})();

/* ---------- background sparkles: few, pre-drawn, 30 fps ---------- */
(function(){
  var c=$("sparks"),g=c.getContext("2d"),P=[],N=28,W=0,H=0,last=0,spr=cv(48,48),q=spr.getContext("2d"),gr=q.createRadialGradient(24,24,0,24,24,24);
  gr.addColorStop(0,"rgba(255,244,190,1)");gr.addColorStop(.35,"rgba(255,226,140,.5)");gr.addColorStop(1,"rgba(255,220,120,0)");q.fillStyle=gr;q.fillRect(0,0,48,48);
  function size(){var d=1;W=c.width=Math.round(innerWidth*d);H=c.height=Math.round(innerHeight*d)}
  size();addEventListener("resize",size);
  for(var i=0;i<N;i++)P.push({x:Math.random(),y:Math.random(),r:5+Math.random()*9,v:.00012+Math.random()*.0004,p:Math.random()*6.3});
  function frame(t){requestAnimationFrame(frame);if(document.hidden||fsOpen||LITE||body.classList.contains("ar")||t-last<33)return;last=t;
    g.clearRect(0,0,W,H);
    P.forEach(function(p){if(!still)p.y-=p.v*33;if(p.y<-.03){p.y=1.03;p.x=Math.random()}
      g.globalAlpha=.3+.7*Math.abs(Math.sin(t/900+p.p));var r=p.r;g.drawImage(spr,p.x*W-r,p.y*H-r,r*2,r*2)});g.globalAlpha=1}
  requestAnimationFrame(frame);
})();

/* ---------- video: muted autoplay, sound toggle, full screen ----------
   Loading is tried three ways so it works on a normal website AND inside locked-down
   preview windows: (1) the file/address as given, (2) a blob made from the embedded data,
   (3) a silent animated picture. */
var story=$("story"),vsrc=story.getAttribute("data-src"),vTried=0,vFallback=false,vReady=false;
story.muted=true;story.defaultMuted=true;story.setAttribute("muted","");story.setAttribute("playsinline","");story.loop=true;
function syncPlayBtn(){$("vplay").classList.toggle("show",!vFallback&&story.paused&&!!story.getAttribute("src")&&vReady)}
["pause","play","playing"].forEach(function(n){story.addEventListener(n,syncPlayBtn)});
story.addEventListener("canplay",function(){vReady=true;if(live)tryPlay()});
story.addEventListener("loadeddata",function(){vReady=true});
function dataToBlobUrl(uri){var i=uri.indexOf(","),meta=uri.slice(5,i).split(";")[0],bin=atob(uri.slice(i+1)),n=bin.length,a=new Uint8Array(n);for(var k=0;k<n;k++)a[k]=bin.charCodeAt(k);return URL.createObjectURL(new Blob([a],{type:meta||"video/mp4"}))}
function useFallback(){if(vFallback)return;vFallback=true;var im=$("vanim");im.src=im.getAttribute("data-src");im.hidden=false;story.style.display="none";$("vplay").classList.remove("show");$("vsnd").style.display="none";document.querySelector(".vfs").textContent="TAP TO ENLARGE"}
story.addEventListener("error",function(){
  if(vTried===0&&/^data:/.test(vsrc)){vTried=1;try{story.src=dataToBlobUrl(vsrc);story.load();if(live)tryPlay();return}catch(e){}}
  vTried=2;useFallback()});
var hdSrc=vsrc;/* full screen plays the 1080p file; the small panel plays the light 720p file (starts fast, lighter on the phone) */
function loadVideo(){if(!story.getAttribute("src")){var lite=story.getAttribute("data-lite");if(lite)vsrc=lite;story.preload="auto";story.src=vsrc;story.load()}}
function tryPlay(){if(vFallback)return;var p=story.play();if(p&&p.catch)p.catch(function(){syncPlayBtn()});setTimeout(syncPlayBtn,700)}
function startVideo(){loadVideo();tryPlay()}
/* if the browser still blocked autoplay, the first touch anywhere starts it */
["pointerdown","keydown","touchstart"].forEach(function(n){addEventListener(n,function(){if(live&&!vFallback&&story.paused)tryPlay()},{passive:true})});
$("vplay").addEventListener("click",function(e){e.stopPropagation();tryPlay()});
$("vsnd").addEventListener("click",function(e){e.stopPropagation();story.muted=!story.muted;$("icoOff").style.display=story.muted?"":"none";$("icoOn").style.display=story.muted?"none":"";toast(story.muted?"Sound off":"Sound on");if(story.paused)tryPlay()});
document.querySelector(".vp").addEventListener("click",function(){if(!vFallback&&story.paused){tryPlay();return}openFS()});
function openFS(){
  if(vFallback){$("fsv").hidden=true;var i=$("fsi");i.src=$("vanim").src;i.hidden=false;$("fs").hidden=false;fsOpen=true;return}
  var f=$("fsv");$("fsi").hidden=true;f.hidden=false;var ct=story.currentTime||0;f.src=hdSrc||story.currentSrc||story.getAttribute("src");f.addEventListener("loadedmetadata",function mm(){f.removeEventListener("loadedmetadata",mm);try{f.currentTime=ct}catch(e){}});$("fs").hidden=false;fsOpen=true;story.pause();f.muted=false;var p=f.play();if(p&&p.catch)p.catch(function(){f.muted=true;f.play().catch(function(){})})}
function closeFS(){var f=$("fsv");if(!vFallback){try{story.currentTime=f.currentTime}catch(e){}f.pause();f.removeAttribute("src");f.load()}$("fsi").hidden=true;$("fs").hidden=true;fsOpen=false;if(!vFallback)tryPlay()}
$("fsx").addEventListener("click",closeFS);
addEventListener("keydown",function(e){if(e.key==="Escape"){if(!$("sheet").hidden)closeSheet();else if(!$("fs").hidden)closeFS();else if(!$("studio").hidden)location.hash=""}});


/* ---------- camera tracking: panels float on the PRINTED card (MindAR) ---------- */
var trk={on:false,ctrl:null,scene:null,cam:null,anchor:null,hit:[],coins:[],vtex:null,found:false,ray:null,loading:false,fade:0,pw:1,ph:.5745};
function panelCanvas(wu,hu,draw){var sc=640,c=cv(Math.round(wu*sc),Math.round(hu*sc)),g=c.getContext("2d"),w=c.width,h=c.height,r=Math.min(w,h)*.16;
  var gr=g.createLinearGradient(0,0,w,h);GOLD.forEach(function(p){gr.addColorStop(p[0],p[1])});g.fillStyle=gr;rr(g,0,0,w,h,r);g.fill();
  var m=Math.max(5,Math.min(w,h)*.045),n=g.createLinearGradient(0,0,0,h);n.addColorStop(0,"#14489b");n.addColorStop(1,"#071a42");g.fillStyle=n;rr(g,m,m,w-2*m,h-2*m,r-m*.6);g.fill();
  draw(g,w,h,m);return c}
function mkPanel(wu,hu,z,x,y,draw,action){var t=new THREE.CanvasTexture(panelCanvas(wu,hu,draw));t.anisotropy=4;
  var m=new THREE.Mesh(new THREE.PlaneGeometry(wu,hu),new THREE.MeshBasicMaterial({map:t,transparent:true}));m.position.set(x,y,z);m.userData.action=action||"";trk.scene.add(m);trk.anchor.add(m);if(action)trk.hit.push(m);return m}
function txt(g,t,x,y,size,color,weight){g.font=(weight||800)+" "+size+"px Poppins,'Segoe UI',Arial,sans-serif";g.fillStyle=color;g.textAlign="center";g.textBaseline="middle";g.fillText(t,x,y)}
function buildTrackScene(dims){
  var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.01,100000);trk.scene=sc;trk.cam=cam;trk.hit=[];trk.coins=[];
  trk.anchor=new THREE.Group();trk.anchor.matrixAutoUpdate=false;trk.anchor.visible=false;sc.add(trk.anchor);
  var d=dims[0];trk.pw=1;trk.ph=d[1]/d[0];
  var ph=trk.ph;
  /* glowing gold edge around the printed card */
  var em=new THREE.MeshBasicMaterial({color:0xf0c24a,transparent:true,opacity:.95}),t=.012,pad=.012;
  [[0,ph/2+pad,1+pad*2+t,t],[0,-ph/2-pad,1+pad*2+t,t],[-.5-pad,0,t,ph+pad*2],[.5+pad,0,t,ph+pad*2]].forEach(function(b){var m=new THREE.Mesh(new THREE.PlaneGeometry(b[2],b[3]),em);m.position.set(b[0],b[1],.004);trk.anchor.add(m)});
  /* big video above the card */
  var vw=.56,vh=vw*16/9,vy=ph/2+.14+vh/2,vz=.1;
  var frame=new THREE.Mesh(new THREE.PlaneGeometry(vw+.04,vh+.04),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture((function(){var c=cv(256,448),g=c.getContext("2d"),gr=g.createLinearGradient(0,0,256,448);GOLD.forEach(function(p){gr.addColorStop(p[0],p[1])});g.fillStyle=gr;rr(g,0,0,256,448,26);g.fill();return c})()),transparent:true}));
  frame.position.set(0,vy,vz-.003);trk.anchor.add(frame);
  var vmat;if(!vFallback&&story.readyState>=2){trk.vtex=new THREE.VideoTexture(story);trk.vtex.minFilter=THREE.LinearFilter;vmat=new THREE.MeshBasicMaterial({map:trk.vtex})}
  else{var pt=new THREE.TextureLoader().load("assets/gi1-story-poster.jpg");vmat=new THREE.MeshBasicMaterial({map:pt})}
  var vm=new THREE.Mesh(new THREE.PlaneGeometry(vw,vh),vmat);vm.position.set(0,vy,vz);vm.userData.action="video";trk.anchor.add(vm);trk.hit.push(vm);
  /* tags under the card */
  var names=["CDSM","VIDEOS","HEALTH & FITNESS","JOBS","NEWS","OPEN CHATS & MORE"],tw=1,th=.27,ty=-ph/2-.06-th/2;
  mkPanel(tw,th,.08,0,ty,function(g,w,h,m){var cw=(w-2*m-4*14)/3,chh=(h-2*m-3*14)/2;names.forEach(function(n,i){var x=m+14+(i%3)*(cw+14),y=m+14+Math.floor(i/3)*(chh+14);g.strokeStyle="#d9a21b";g.lineWidth=5;rr(g,x,y,cw,chh,chh/2);g.stroke();txt(g,n,x+cw/2,y+chh/2+2,n.length>12?25:30,"#fff")})});
  /* download button */
  var dy=ty-th/2-.05-.075;
  mkPanel(.84,.15,.12,0,dy,function(g,w,h){var s=h*.5,x=w*.2,y=h/2;g.fillStyle="#3b82f6";g.beginPath();g.moveTo(x-s*.4,y-s*.5);g.lineTo(x+s*.02,y);g.lineTo(x-s*.4,y+s*.5);g.fill();g.fillStyle="#22c55e";g.beginPath();g.moveTo(x-s*.4,y-s*.5);g.lineTo(x+s*.18,y-s*.2);g.lineTo(x+s*.02,y);g.fill();g.fillStyle="#fbbf24";g.beginPath();g.moveTo(x+s*.18,y-s*.2);g.lineTo(x+s*.44,y);g.lineTo(x+s*.18,y+s*.2);g.lineTo(x+s*.02,y);g.fill();g.fillStyle="#ef4444";g.beginPath();g.moveTo(x-s*.4,y+s*.5);g.lineTo(x+s*.02,y);g.lineTo(x+s*.18,y+s*.2);g.fill();txt(g,tr("dl")||"Download the app now",w*.6,y+2,h*.3,"#fff",600)},"play");
  /* save contact + share */
  var by=dy-.075-.05-.065;
  mkPanel(.4,.13,.1,-.22,by,function(g,w,h){txt(g,tr("save")||"Save contact",w/2,h/2+2,h*.3,"#ffe9a0")},"save");
  mkPanel(.4,.13,.1,.22,by,function(g,w,h){txt(g,tr("share")||"Share",w/2,h/2+2,h*.3,"#ffe9a0")},"share");
  /* logo coins orbiting the card */
  var gct=genieCoinTex();
  for(var i=0;i<4;i++){var o=new THREE.Group(),a1=new THREE.Mesh(new THREE.CircleGeometry(.05,32),new THREE.MeshBasicMaterial({map:gct,side:THREE.DoubleSide}));o.add(a1);trk.anchor.add(o);trk.coins.push(o)}
  trk.ray=new THREE.Raycaster()}
function trkSize(){
  var W=innerWidth,H=innerHeight,v=$("cam"),c=trk.ctrl;if(!c||!v.videoWidth)return;
  var proj=c.getProjectionMatrix(),vr=v.videoWidth/v.videoHeight,cr=W/H,inRatio=c.inputWidth/c.inputHeight,fovAdj;
  if(inRatio>cr)fovAdj=1;else fovAdj=H/(W/c.inputWidth*c.inputHeight);
  var cam=trk.cam;cam.fov=2*Math.atan(1/proj[5]*fovAdj)*180/Math.PI;cam.near=proj[14]/(proj[10]-1);cam.far=proj[14]/(proj[10]+1);cam.aspect=W/H;cam.updateProjectionMatrix();
  var cv2=$("gl");cv2.style.left="0px";cv2.style.top="0px";cv2.style.width=W+"px";cv2.style.height=H+"px";
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.setSize(W,H,false)}
function startTrack(){
  if(trk.on||trk.loading||!glReady||body.classList.contains("nogl"))return Promise.resolve(false);
  trk.loading=true;var cam=$("cam");
  return import("./vendor/mindar/"+"mindar-image.prod.js").then(function(){
    var MI=window.MINDAR&&window.MINDAR.IMAGE;if(!MI)throw 0;
    return new Promise(function(res){if(cam.videoWidth)res();else cam.addEventListener("loadedmetadata",function(){res()},{once:true})}).then(function(){
      var ctrl=new MI.Controller({inputWidth:cam.videoWidth,inputHeight:cam.videoHeight,maxTrack:1,filterMinCF:.001,filterBeta:1000,missTolerance:6,warmupTolerance:3,onUpdate:function(d){trk.all=(trk.all||0)+1;trk.lt=d.type;
        if(d.type!=="updateMatrix")return;trk.upd=(trk.upd||0)+1;trk.lastWm=!!d.worldMatrix;var wm=d.worldMatrix;
        if(!trk.anchor)return;
        if(wm){var m=new THREE.Matrix4();m.elements=[].slice.call(wm);m.multiply(trk.post[d.targetIndex]||trk.post[0]);trk.anchor.matrix=m;trk.anchor.visible=true;trk.side=d.targetIndex;
          if(!trk.found){trk.found=true;trk.fade=0;$("scanHint").hidden=true;trackSide(d.targetIndex)}}
        else{trk.anchor.visible=false;if(trk.found){trk.found=false;$("scanHint").hidden=false}}}});
      trk.ctrl=ctrl;
      /* feed the tracker from a canvas copy of the camera: reads reliably on every browser */
      var feed=cv(cam.videoWidth,cam.videoHeight),fg=feed.getContext("2d");trk.feed=feed;(function pump(){if(!trk.loading&&!trk.on)return;try{fg.drawImage(cam,0,0,feed.width,feed.height)}catch(e){}requestAnimationFrame(pump)})();
      return ctrl.addImageTargets("assets/"+"card.mind").then(function(r){
        trk.post=r.dimensions.map(function(dm){var P=new THREE.Vector3(dm[0]/2,dm[0]/2+(dm[1]-dm[0])/2,0),Q=new THREE.Quaternion(),S=new THREE.Vector3(dm[0],dm[0],dm[0]);return new THREE.Matrix4().compose(P,Q,S)});
        buildTrackScene(r.dimensions);return ctrl.dummyRun(feed)}).then(function(){
        trk.on=true;body.classList.add("trk");$("scanHint").hidden=false;trkSize();ctrl.processVideo(feed);trk.loading=false;return true})})
  }).catch(function(e){trk.loading=false;try{if(trk.ctrl){trk.ctrl.stopProcessVideo&&trk.ctrl.stopProcessVideo()}}catch(er){}trk.ctrl=null;return false})}
if(/[?&]debug\b/.test(location.search))window.__trk=trk;
function trackSide(i){try{track(i===1?"track_back":"track_front")}catch(e){}}
function stopTrack(){if(!trk.on&&!trk.loading)return;try{trk.ctrl&&trk.ctrl.stopProcessVideo&&trk.ctrl.stopProcessVideo()}catch(e){}trk.on=false;trk.ctrl=null;trk.found=false;body.classList.remove("trk");$("scanHint").hidden=true;if(renderer)renderer.setPixelRatio(LITE?1:Math.min(window.devicePixelRatio||1,1.5));layoutGL()}
function renderTrack(now){
  var s=now/1000;if(trk.anchor.visible){trk.fade=Math.min(1,trk.fade+.06);var k=1-Math.pow(1-trk.fade,3);trk.anchor.scale.setScalar(1);
    trk.coins.forEach(function(o,i){var a=i*Math.PI/2+s*.9;o.position.set(Math.cos(a)*.62,Math.sin(a)*.38,.07+Math.sin(a*2)*.02);o.rotation.y=s*2+i;o.scale.setScalar(Math.max(k,.001))})}
  renderer.render(trk.scene,trk.cam)}
(function(){var g=$("gl");g.addEventListener("pointerdown",function(e){if(!trk.on||!trk.anchor.visible)return;var r=g.getBoundingClientRect(),v=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));trk.ray.setFromCamera(v,trk.cam);var h=trk.ray.intersectObjects(trk.hit,false)[0];if(!h)return;var a=h.object.userData.action;
  if(a==="play"){track("download_app");if(LINKS.play)window.open(LINKS.play,"_blank")}else if(a==="save")$("bSave").click();else if(a==="share")$("bShare").click();else if(a==="video"){story.muted=!story.muted;toast(story.muted?"Sound off":"Sound on")}})})();

/* ---------- AR view (camera behind the floating card) ---------- */
var stream=null,mode="3d";
function onOri(e){if(e.gamma==null)return;gyro.x=clamp(e.gamma/45,-1,1)*.3;gyro.y=clamp((e.beta-60)/45,-1,1)*.22}
function setMode(m){mode=m;body.classList.toggle("ar",m==="ar");$("b3d").classList.toggle("on",m==="3d");$("bar-ar").classList.toggle("on",m==="ar");$("modeLbl").textContent=m==="ar"?"AR view":"3D view";
  if(m==="3d"){stopTrack();if(stream){stream.getTracks().forEach(function(t){t.stop()});stream=null}$("cam").style.display="";$("cam").srcObject=null;removeEventListener("deviceorientation",onOri);gyro.x=gyro.y=0;tUScale=1}else tUScale=.85}
$("b3d").onclick=function(){setMode("3d")};
$("bflip").onclick=flip;
$("bar-ar").onclick=function(){
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){toast("Camera is not available here. Open this page in Chrome or Safari.");return}
  navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false}).then(function(s){
    stream=s;var v=$("cam");v.srcObject=s;v.play&&v.play();setMode("ar");toast("Point the camera at your Gi1 card.");startTrack().then(function(ok){if(!ok&&mode==="ar")toast("AR view: drag to turn the card, pinch to resize.")});
    if(window.DeviceOrientationEvent){if(typeof DeviceOrientationEvent.requestPermission==="function"){DeviceOrientationEvent.requestPermission().then(function(r){if(r==="granted")addEventListener("deviceorientation",onOri)}).catch(function(){})}else addEventListener("deviceorientation",onOri)}
  }).catch(function(){toast("Camera is blocked. Allow camera access for this page, then tap AR view again.")})};

/* ---------- landing -> experience ---------- */
function start(){track("open");
  body.classList.remove("s-land");body.classList.add("s-live");
  initGL();layoutGL();t0=performance.now();live=true;yaw=tYaw=-Math.PI*2;pitch=tPitch=.08;uScale=tUScale=1;idle=0;if(still)yaw=tYaw=0;
  setFace(true);body.classList.add("f-front");startVideo();
  setTimeout(function(){tYaw=0},30);
}
$("go").onclick=start;
(function(){[].forEach.call(document.querySelectorAll("#lw .fu"),function(e,i){e.style.animationDelay=(.15+i*.15)+"s"})})();

/* ---------- QR studio (#qr): make the final QR + the printable card back ---------- */
function studio(){
  var on=location.hash==="#qr";$("studio").hidden=!on;if(!on)return;
  var inp=$("qrUrl");if(!inp.value)inp.value=pageUrl();render();
  function render(){var u=inp.value.trim()||pageUrl();drawQRCard($("qrBig"),u,true);$("qrNote").textContent="This QR opens: "+u}
  inp.oninput=render;
  $("dlQr").onclick=function(){var big=cv(2000,2000);drawQRCard(big,inp.value.trim()||pageUrl(),true);save(big,"Gi1-AR-QR.png")};
  $("dlBack").onclick=function(){var im=new Image();im.onload=function(){var c=cv(im.width,im.height),g=c.getContext("2d");g.drawImage(im,0,0);paintBackQR(g,K2000(im),inp.value.trim()||pageUrl());save(c,"Gi1-Card-Back-with-QR.png")};im.src="assets/card-back-hires.jpg"};
  $("stClose").onclick=function(){location.hash=""};
}
function save(c,name){c.toBlob(function(b){var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},4000)},"image/png")}
addEventListener("hashchange",studio);


/* ---------- languages: English, Hindi, Gujarati ---------- */
var T={
 en:{hint:"Point your camera at the front or back of your Gi1 card"},
 hi:{hint:"कैमरा अपने Gi1 कार्ड के आगे या पीछे की ओर करें",story:"Gi1 की कहानी देखें",ceo:"संस्थापक और सीईओ",scan:"QR कोड स्कैन करें",upto:"₹100/- तक पाएं",arqr:"3D AR QR कोड",dl:"ऐप अभी डाउनलोड करें",save:"संपर्क सेव करें",share:"शेयर करें",b3d:"3D व्यू",bar:"AR व्यू",bflip:"कार्ड पलटें",lh:"Gi1 प्राइम कार्ड",ls:"ALL IN 1, IN Gi1. अपना कार्ड 3D और AR में देखने के लिए नीचे टैप करें।",go:"3D / AR में खोलें",t_call:"कॉल",t_mail:"ईमेल",t_web:"वेबसाइट",t_loc:"वडोदरा",t_maps:"मैप में खोलें",t_msg:"संदेश भेजें",shC:"संपर्क",shS:"कार्ड शेयर करें",cp:"कॉपी",cpd:"कॉपी हो गया",vcf:"संपर्क फ़ाइल (.vcf)",wa:"WhatsApp पर भेजें",cl:"लिंक कॉपी करें"},
 gu:{hint:"કૅમેરા તમારા Gi1 કાર્ડના આગળ અથવા પાછળ તરફ રાખો",story:"Gi1 સ્ટોરી જુઓ",ceo:"સ્થાપક અને સીઈઓ",scan:"QR કોડ સ્કેન કરો",upto:"₹100/- સુધી મેળવો",arqr:"3D AR QR કોડ",dl:"એપ હમણાં ડાઉનલોડ કરો",save:"સંપર્ક સેવ કરો",share:"શેર કરો",b3d:"3D વ્યૂ",bar:"AR વ્યૂ",bflip:"કાર્ડ ફેરવો",lh:"Gi1 પ્રાઇમ કાર્ડ",ls:"ALL IN 1, IN Gi1. તમારું કાર્ડ 3D અને AR માં જોવા નીચે ટેપ કરો.",go:"3D / AR માં ખોલો",t_call:"કૉલ",t_mail:"ઇમેઇલ",t_web:"વેબસાઇટ",t_loc:"વડોદરા",t_maps:"મેપમાં ખોલો",t_msg:"સંદેશ મોકલો",shC:"સંપર્ક",shS:"કાર્ડ શેર કરો",cp:"કૉપિ",cpd:"કૉપિ થયું",vcf:"સંપર્ક ફાઇલ (.vcf)",wa:"WhatsApp પર મોકલો",cl:"લિંક કૉપિ કરો"}
};
var EN={shC:"Contact",shS:"Share this card",cp:"Copy",cpd:"Copied",vcf:"Contact file (.vcf)",wa:"Send on WhatsApp",cl:"Copy link"};
var lang="en";try{lang=localStorage.getItem("gi1lang")||"en"}catch(e){}
if(!T[lang])lang="en";
function tr(k){return (T[lang]&&T[lang][k])||EN[k]||""}
function applyLang(){
  [].forEach.call(document.querySelectorAll("[data-t]"),function(e){var k=e.getAttribute("data-t");if(!k)return;
    if(e._en===undefined)e._en=e.textContent;var v=(T[lang]&&T[lang][k])||e._en;if(e.textContent!==v)e.textContent=v});
  document.documentElement.lang=lang;
  var b=$("blang");if(b)b.textContent=lang==="en"?"A/अ":lang==="hi"?"हि":"ગુ"}
$("blang").onclick=function(){lang=lang==="en"?"hi":lang==="hi"?"gu":"en";try{localStorage.setItem("gi1lang",lang)}catch(e){}applyLang();track("lang_"+lang)};

/* ---------- scan counter (optional) ---------- */
var CODE="";try{CODE=(location.search.match(/[?&]c=([\w\-]{1,24})/)||[])[1]||""}catch(e){}
function track(ev){if(!LINKS.beacon)return;try{var i=new Image();i.src=LINKS.beacon+(LINKS.beacon.indexOf("?")<0?"?":"&")+"e="+encodeURIComponent(ev)+"&c="+encodeURIComponent(CODE)+"&t="+Date.now()}catch(e){}}

/* ---------- save contact + share ---------- */
function vcard(){var C=CONTACT;return["BEGIN:VCARD","VERSION:3.0","N:;"+C.name+";;;","FN:"+C.name,"ORG:"+C.org,"TEL;TYPE=CELL:"+C.tel,"EMAIL;TYPE=WORK:"+C.mail,"URL:"+(LINKS.website||""),"ADR;TYPE=WORK:;;;"+C.city+";;;"+C.country,"NOTE:ALL IN 1\\, IN Gi1","END:VCARD"].join("\r\n")}
function copyTxt(t,btn){var done=function(){if(btn){var o=btn.textContent;btn.textContent=tr("cpd");setTimeout(function(){btn.textContent=o},1400)}};
  try{navigator.clipboard.writeText(t).then(done,function(){fbCopy(t,done)})}catch(e){fbCopy(t,done)}}
function fbCopy(t,done){try{var a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();done&&done()}catch(e){}}
function openSheet(title,rows,actions){
  $("shT").textContent=title;var b=$("shB");b.innerHTML="";
  rows.forEach(function(r){var d=document.createElement("div");d.className="shrow";var sp=document.createElement("span");var sm=document.createElement("small");sm.textContent=r[0];sp.appendChild(sm);sp.appendChild(document.createTextNode(r[1]));d.appendChild(sp);
    var cb=document.createElement("button");cb.textContent=tr("cp");cb.onclick=function(){copyTxt(r[1],cb)};d.appendChild(cb);b.appendChild(d)});
  var row=document.createElement("div");row.className="row";actions.forEach(function(a){var x=document.createElement(a.href?"a":"button");x.className="btn pri";x.textContent=a.t;if(a.href){x.href=a.href;x.target="_blank";x.rel="noopener"}else x.onclick=a.fn;row.appendChild(x)});b.appendChild(row);
  $("sheet").hidden=false;$("shX").focus()}
function closeSheet(){$("sheet").hidden=true}
$("shX").onclick=closeSheet;$("sheet").addEventListener("click",function(e){if(e.target===$("sheet"))closeSheet()});
$("bSave").onclick=function(e){e.stopPropagation();track("save_contact");var C=CONTACT;
  openSheet(tr("shC"),[[C.name,C.telShow],["Email",C.mail],[C.city,C.country]],[{t:tr("vcf"),fn:function(){try{var b=new Blob([vcard()],{type:"text/vcard"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="Gi1-Prime-Card.vcf";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},4000)}catch(er){toast(C.telShow)}}}])};
$("bShare").onclick=function(e){e.stopPropagation();track("share");var u=pageUrl(),tx="Gi1 Prime Card: ALL IN 1, IN Gi1. See the card in 3D and get up to ₹100.";
  if(navigator.share){navigator.share({title:"The Gi1 Prime Card",text:tx,url:u}).catch(function(){});return}
  openSheet(tr("shS"),[["Link",u]],[{t:tr("wa"),href:"https://wa.me/?text="+encodeURIComponent(tx+" "+u)},{t:tr("cl"),fn:function(){copyTxt(u);toast(tr("cpd"))}}])};
$("playP").addEventListener("click",function(){track("download_app")});

/* ---------- boot ---------- */
if(/[?&]debug\b/.test(location.search))body.classList.add("debug");
fillStatic();applyLang();
(function waitLogo(){if(logoImg.complete&&logoImg.naturalWidth)paintMini();else logoImg.addEventListener("load",paintMini)})();
studio();
/* warm up while the landing screen is showing, so the tap on "Open" starts instantly:
   3D scene + textures + shaders get ready, and the video starts buffering */
function goLite(){if(LITE)return;LITE=true;body.classList.add("lite");if(renderer){renderer.setPixelRatio(1);layoutGL()}}
function warm(){if(glReady||body.classList.contains("s-live"))return;initGL();if(glReady)setTimeout(function(){try{renderer.compile(scene,camera);renderer.render(scene,camera)}catch(e){}},1500)}
function afterLoad(){loadVideo();setTimeout(warm,150)}
if(document.readyState==="complete")afterLoad();else addEventListener("load",afterLoad);
/* slow device? switch to the light mode by itself (no endless shine/drift animations, no sparkles, 1x sharpness) */
(function(){
  var m=navigator.deviceMemory,c=navigator.hardwareConcurrency;if((m&&m<=2)||(c&&c<=2))goLite();
  var n=0,slow=0,last=0;
  function f(t){if(LITE||n>=100)return;requestAnimationFrame(f);
    if(!live||document.hidden||fsOpen||trk.on){last=0;return}
    if(last){n++;if(t-last>36)slow++}last=t;
    if(n===100&&slow>34)goLite()}
  requestAnimationFrame(f);
})();
if(/[?&]go\b/.test(location.search)||location.hash==="#open")start();
})();
