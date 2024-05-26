//Peer作成
const peer = new Peer({
    key: 'cf1155ef-ab9f-41a3-bd4a-b99c30cc0663',
    debug: 2
});


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



let posx=0, posy=0, posz=0;
let vx=0, vy=0, vz=0;


function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(255);


    vx += accelerationX;
    vy += accelerationY;
    vz += accelerationZ;

    posx += vx*deltaTime;
    posy += vy*deltaTime;
    posz += vz*deltaTime;

    if(frameCount%10==0)    room.send(rotationX.toFixed(4) + ',' + rotationY.toFixed(4) + ',' + rotationZ.toFixed(4) + ',' + posx.toFixed(4) + ',' + posy.toFixed(4) + ',' + posz.toFixed(4));
    
    
    fill(255, 0, 0);
    textSize(40);
    text('ver1.10', 100, 100);
}
