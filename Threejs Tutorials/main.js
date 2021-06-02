import * as THREE from 'https://cdn.skypack.dev/three@0.129.0'; //three.js kütüphanesini uzaktan import ettik böylece bizim dosyalarımız içinde yer kaplamayacak.
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js'; //aynı şekilde orbit kontrol dosyasını da uzaktan import ettik. 
import Stats from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/libs/stats.module.js";

//başka bir özellik import etmek istersek bunları da bu bölgeye import tagıyla çekeceğiz. 


//WebGL render motorunu çağırıyoruz.... ve antialias değerini true yapıyoruz. 
var renderer = new THREE.WebGLRenderer({ antialias: true });
// şimdi render motorumuzun shadow işleme componentlerini çağırıyoruz. Bununla ilgili detaylı bilgi: https://threejs.org/docs/index.html?q=webGL#api/en/renderers/WebGLRenderer
//dökümanlarının içinde var.
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//şimdi renderın pixel ratio'sunu belirleyeceğiz. Burada device'a göre otomatik belirle diyoruz. 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//burada bazı field of view ya da aspect ratio özelliklerini atayacağız. 
const fov = 60;
const aspect = 1920 / 1080;
//burada renderın renderlayacağı en yakın ve en uzak objelerin mesafelerini belirliyoruz. 
const near = 1;
const far = 1000;

//PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number ) düzenine göre kameramıza yukarıda verdiğimiz 
//değerleri atayacağız. 

var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//kameranın pozisyonunu belirliyoruz. Threejs'te tüm cisimlerin pozisyonu position.set functionu ile belirlenir. 
camera.position.set(75, 20, 0);

//şimdi sahne kuralım...
const scene = new THREE.Scene(); //burada sahneyi kurduk ancak sahneye henüz bir şey eklemedik. Ya da sahneyi renderlamıyoruz. 

// şimdi directional ışık kuracağız...
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light);

//şimdi orbit kontrol nesnesini ekleyelim ki sahnede bulunan objeleri inceleyebilelim. 
const controls = new OrbitControls(camera, renderer.domElement);

//şimdi sahnenin ortasında duracak bir zemin yaratıyoruz. 
let geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
//zemini kaplayacak material yarattık.
let material = new THREE.MeshStandardMaterial({color: 0xffffff});

//şimdi bu zemin objesi ve metariali plane adı altında birleştirdik. 
const plane = new THREE.Mesh(geometry, material);
//plane objesine ekstra özellikler tanımladık, örneğin shadow cast etsin mi, shadow alsın mı, rotasyonu ne olsun gibi. 
plane.castShadow = true;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
//plane objesini sahneye ekledik. 
scene.add(plane);

let stats = new Stats();
document.body.appendChild(stats.dom);

//aynı şekilde bir box objesi ekliyoruz. 
const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
);
box.position.set(0, 1, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

//orbit kontrol ederken durumu anime etmesi için animate function'u oluşturuyor. 
const animate = function () {

    requestAnimationFrame(animate);
    stats.update();
    //her animate function'u çalıştığında renderer'ın içeri sahne ve kamerayı tekrar render etmesi için bir komut. 
    renderer.render(scene, camera)
    
}

//animate function'unu çalıştırıyoruz. 
animate();


