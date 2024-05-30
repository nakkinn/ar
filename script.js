function post_function( result_string ) {
    if ( result_string === "granted" ) {
        sensoractive = true;
        console.log(123);
    }
    else if ( result_string === "denied" ) {
// ユーザが拒否した場合、文字列"denied"が返る
    }
}
function permission_request() {
    if ( DeviceOrientationEvent
        && DeviceOrientationEvent.requestPermission
        && typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
DeviceMotionEvent.requestPermission().then( post_function );
window.addEventListener( "devicemotion", function(e) {
            // 何らかの処理
        }, false );
    }
    if ( DeviceOrientationEvent
        && DeviceOrientationEvent.requestPermission
        && typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
        DeviceOrientationEvent.requestPermission().then( postf_unction );
window.addEventListener( "deviceorientation", function(e) {
            // 何らかの処理
        }, false );
    }
}


let connect = false;
let sensoractive = false;


//Peer作成

let peer


const button1 = document.getElementById('button1');

button1.addEventListener('click',()=>{

    peer = new Peer({
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

});


let alpha = 0, beta = 0, gamma = 0;

window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    if(sensoractive){
        alpha = event.alpha;
        beta = event.beta;
        gamma = event.gamma;
    }
}


function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(235);

    if(frameCount%10==0 && connect)    room.send(alpha.toFixed(4) + ',' + beta.toFixed(4) + ',' + gamma.toFixed(4));
    
    
    fill(255, 0, 0);
    textSize(40);
    text('ver1.16', 100, 100);

    text(alpha, 100, 700);
    text(beta, 100, 800);
    text(gamma, 100, 900);

    text(frameCount, 100, 200);
    
}
