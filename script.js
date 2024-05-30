//Peer作成
const peer = new Peer({
    key: 'cf1155ef-ab9f-41a3-bd4a-b99c30cc0663',
    debug: 2
});


const button1 = document.getElementById('button1');
button1.addEventListener('click',()=>{
    peer.on('open',()=>{
        room=peer.joinRoom("may25",{
            mode:'sfu'
        });
        room.on('open',()=>{
    
        });
        room.on('peerJoin',peerId=>{
    
        });
        room.on('peerLeave',peerId=>{
    
        });
        room.on('data',message=>{
            
        });
    });
}



let posx=0, posy=0, posz=0;
let vx=0, vy=0, vz=0;

let alpha = 0, beta = 0, gamma = 0;

window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
  alpha = event.alpha;
  beta = event.beta;
  gamma = event.gamma;
}


function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(255);

    if(frameCount%10==0)    room.send(alpha.toFixed(4) + ',' + beta.toFixed(4) + ',' + gamma.toFixed(4));
    
    
    fill(255, 0, 0);
    textSize(40);
    text('ver1.13', 100, 100);

    text(rotationX, 100, 400);
    text(rotationY, 100, 500);
    text(rotationZ, 100, 600);

    text(alpha, 100, 700);
    text(beta, 100, 800);
    text(gamma, 100, 900);
    
}
