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





function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(4);
}

function draw(){
    background(255);

    room.send(rotationX.toFixed(4) + ',' + rotationY.toFixed(4) + ',' + rotationZ.toFixed(4));
    
    
    fill(255, 0, 0);
    textSize(40);
    text('ver1.08', 100, 100);
}
