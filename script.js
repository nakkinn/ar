

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(255);


    fill(0);
    textSize(40);


    text(rotationX, 30, 100);

    text(rotationY, 30, 200);

    text(rotationZ, 30, 300);

    //text(accelerationX, 30, 200);

}