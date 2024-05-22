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