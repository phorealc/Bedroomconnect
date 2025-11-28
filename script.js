// Remplace les adresses par celles de ton serveur local si tu utilises le proxy
await fetch(`${API_ROOT}/tuya/color`,{
method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({deviceId, h: rgbToHue(rgb), s:1000, v:1000})
});
}


function rgbToHue({r,g,b}){
// conversion simple approximative : on convertit en teinte
let max = Math.max(r,g,b), min = Math.min(r,g,b);
let h=0; if(max==min) h=0; else if(max==r) h = (60*((g-b)/(max-min))+360)%360; else if(max==g) h = (60*((b-r)/(max-min))+120)%360; else h = (60*((r-g)/(max-min))+240)%360;
return Math.round(h);
}


// Buttons
for(const btn of document.querySelectorAll('.btn.apply')){
btn.addEventListener('click', ()=>{
const zone = btn.dataset.zone; const color = document.querySelector(`input[data-zone='${zone}']`).value;
setLedZone(zone,color);
});
}


for(const m of document.querySelectorAll('.mood')){
m.addEventListener('click', async ()=>{
const mood = m.dataset.mood;
// moods définis côté serveur / frontend
if(mood==='chill'){
await setLedZone(1,'#6fb3ff'); await setLedZone(2,'#8ad3ff'); await setLedZone(3,'#a18eff');
// allumer ampoule 1 en blanc chaud
await fetch(`${API_ROOT}/tuya/scene`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scene:'relax'})});
}
if(mood==='gaming'){
await setLedZone(1,'#2800ff'); await setLedZone(2,'#00e5ff'); await setLedZone(3,'#ff0057');
}
if(mood==='party'){
// appelle endpoint serveur pour une animation
await fetch(`${API_ROOT}/wled/party`,{method:'POST'});
}
if(mood==='sunrise'){
await fetch(`${API_ROOT}/wled/sunrise`,{method:'POST'});
await fetch(`${API_ROOT}/tuya/scene`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scene:'sunrise'})});
}
});
}


// Bulb controls
document.getElementById('apply-bulb').addEventListener('click', ()=>{
const id = document.getElementById('bulb-select').value;
const c = document.getElementById('bulb-color').value; setBulb(id,c);
});
document.getElementById('bulb-on').addEventListener('click', ()=>{
fetch(`${API_ROOT}/tuya/power`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({deviceId:document.getElementById('bulb-select').value,power:true})});
});
document.getElementById('bulb-off').addEventListener('click', ()=>{
fetch(`${API_ROOT}/tuya/power`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.s
