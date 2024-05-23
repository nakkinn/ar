let subcanvas;



const renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector('#subcanvas')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(800, 800);
renderer.setClearColor(0xbbbbbb);


const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
camera.position.set(0, 0, 50);


const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);


scene.add(cube);


function setup(){

    createCanvas(windowWidth, windowHeight);

}

function draw(){

    background(255);


    let ax = rotationX / 360 * 2 * PI;
    //let ay = rotationY / 360 * 2 * PI;
    let az = rotationZ / 360 * 2 * PI;

    cube.rotation.x = - ax;
    //cube.rotation.y = - ay;
    cube.rotation.z = - az;

    renderer.render(scene, camera);

}