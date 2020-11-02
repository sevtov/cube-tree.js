let scene, camera, render

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;

var windowHalfY = window.innerHeight / 2;

function init() {

const canvas = document.querySelector('#c');

scene = new THREE.Scene()


camera = new THREE.PerspectiveCamera(0.01, window.innerWidth/window.innerHeight,1,5000)

camera.rotation.y = 55/180*Math.PI

camera.rotation.x = -10/180*Math.PI

camera.position.x = 100

camera.position.y = 100

camera.position.z = -500


hlight = new THREE.AmbientLight(0xFDC75A, 1)
scene.add(hlight)


renderer = new THREE.WebGLRenderer({
    canvas, 
    antialias: true, 
    alpha: true,
    logarithmicDepthBuffer: true
})

renderer.setSize(window.innerWidth, window.innerHeight)

//controls = new THREE.OrbitControls(camera, renderer.domElement);

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

document.addEventListener( 'touchstart', onDocumentTouchStart, false );

document.addEventListener( 'touchmove', onDocumentTouchMove, false );

window.addEventListener( 'resize', onWindowResize, false );


let loader = new THREE.GLTFLoader()

loader.load('https://raw.githubusercontent.com/sevtov/cube/main/cube/cube-gltf.gltf', function(gltf){

car = gltf.scene.children[0]

car.scale.set(0.022, 0.022, 0.022)

scene.add(gltf.scene)

animate();

})

}

//=======================добавил===========================

function onWindowResize() {

windowHalfX = window.innerWidth / 2;

windowHalfY = window.innerHeight / 2;

camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

mouseX = event.clientX - windowHalfX;

mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

if ( event.touches.length === 2 ) {

event.preventDefault();

mouseX = event.touches[ 0 ].pageX - windowHalfX;

mouseY = event.touches[ 0 ].pageY - windowHalfY;

}

}

function onDocumentTouchMove( event ) {

if ( event.touches.length === 2 ) {

event.preventDefault();

mouseX = event.touches[ 0 ].pageX - windowHalfX;

mouseY = event.touches[ 0 ].pageY - windowHalfY;

}

}

function animate() {

camera.position.x += ( mouseX - camera.position.x ) * .015;

camera.position.y += ( - mouseY - camera.position.y ) * .015;

camera.lookAt( 0, 0, 0 );

renderer.render(scene,camera);

requestAnimationFrame(animate);

}

init()