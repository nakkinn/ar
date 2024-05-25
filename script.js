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
        console.log('join');
    });
    room.on('peerJoin',peerId=>{
        console.log(peerId+"参加");
    });
    room.on('peerLeave',peerId=>{
        console.log(peerId+"退出");
    });
    room.on('data',message=>{
        receive(message.data);
    });
});







function receive(arg){
    console.log(arg);
}


function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(10);
}

function draw(){
    background(255);

    room.send(rotationX.toFixed(4) + ',' + rotationY.toFixed(4) + ',' + rotationZ.toFixed(4));
    
    
    fill(255, 0, 0);
    textSize(40);
    text('ver1.07', 100, 100);
}
