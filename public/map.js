var lat=Number(document.getElementsByClassName("lat")[0].value);
var lng=Number(document.getElementsByClassName("lng")[0].value);
var btn=document.getElementsByTagName("button")[0];
var map=L.map("map").setView([lat,lng],3);
btn.addEventListener("click",()=>{
let osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
let gs=L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{
	subdomains:["mt0","mt1","mt2","mt3"]
}).addTo(map);
let bl={
	"Google Satellite":gs,
	"Open Street Map":osm
};
let ol={
	"Marker":L.marker([lat,lng]).bindPopup(`LAT ${lat} LNG ${lng}`).addTo(map)
};
L.control.layers(bl,ol).addTo(map);
map.doubleClickZoom.disable();
map.on("dblclick",e=>{
	L.marker([map.mouseEventToLatLng(e.originalEvent).lat,map.mouseEventToLatLng(e.originalEvent).lng]).addTo(map)
});
function mc(e) {
	L.popup()
	.setLatLng([lat,lng])
	.setLatLng(e.latlng)
	.setContent(`${e.latlng.toString()}`)
	.openOn(map);
}
map.on('click',mc);},false);
