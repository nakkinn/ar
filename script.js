// let subcanvas;



// const renderer = new THREE.WebGLRenderer({
//     canvas:document.querySelector('#subcanvas')
// });
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(800, 800);
// renderer.setClearColor(0xbbbbbb);


// const scene = new THREE.Scene();


// const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
// camera.position.set(0, 0, 50);



// const geometry = new THREE.BoxGeometry(10, 10, 10);
// const material = new THREE.MeshNormalMaterial();
// const cube = new THREE.Mesh(geometry, material);


// scene.add(cube);


// function setup(){

//     createCanvas(windowWidth, windowHeight);

// }

// function draw(){

//     background(255);


//     // let ax = rotationX / 360 * 2 * PI;
//     // let ay = rotationY / 360 * 2 * PI;
//     //let az = rotationZ / 360 * 2 * PI;

    
//     let el = new THREE.Euler(0, PI/4, 0.4);

//     cube.setRotationFromEuler(el);

//     renderer.render(scene, camera);

// }



let ax, ay, az;
let subcanvas;

function setup(){

    createCanvas(windowWidth, windowHeight);

    subcanvas = createGraphics(800, 800, WEBGL);
}

function draw(){

    background(255);

    ax = rotationX / 360 * 2 * PI;
    ay = rotationY / 360 * 2 * PI;
    az = rotationZ / 360 * 2 * PI;

    fill(0);
    textSize(40);


    text(rotationX, 30, 100);

    text(rotationY, 30, 200);

    text(rotationZ, 30, 300);



    //text(accelerationX, 30, 200);


    subcanvas.clear();
    subcanvas.background(220);

    subcanvas.push();

    subcanvas.rotateZ(az);


    subcanvas.box(200);

    subcanvas.pop();

    image(subcanvas, 30, 400);

    
    

}