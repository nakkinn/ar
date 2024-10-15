//レンダラー
let renderer1 = new THREE.WebGLRenderer({
    canvas : document.getElementById("canvas1"),
    antialias : true
});
renderer1.setClearColor(0xeeeeee, 1);

let renderer2 = new THREE.WebGLRenderer({
    canvas : document.getElementById("canvas2"),
    antialias : true
});
renderer2.setClearColor(0xeeeeee, 1);

let renderer3 = new THREE.WebGLRenderer({
    canvas : document.getElementById("canvas3"),
    antialias : true
});
renderer3.setClearColor(0xeeeeee, 1);


//カメラ
let camera1 = createPerspectiveCameraC({fov:60, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]}); //透視投影カメラ（オブションは省略可能）
let camera2 = createPerspectiveCameraC({fov:60, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]}); //透視投影カメラ（オブションは省略可能）
let camera3 = createPerspectiveCameraC({fov:60, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]}); //透視投影カメラ（オブションは省略可能）


//シーン
let scene1 = new SceneC(renderer1, camera1);
let scene2 = new SceneC(renderer2, camera2);
let scene3 = new SceneC(renderer3, camera3);


//ライト
let lighta1 = new THREE.AmbientLight(0xffffff, 0.3);
let lightd1 = new THREE.DirectionalLight(0xffffff, 0.6);
lightd1.position.set(0, -1, 0);

scene1.add(lighta1.clone());
scene1.add(lightd1.clone());
scene2.add(lighta1.clone());
scene2.add(lightd1.clone());
scene3.add(lighta1.clone());
scene3.add(lightd1.clone());


//オブジェクト

//【キャンバス１】

let parameter1 = 0;
let cube_vts1 = "[[1+parameter1,1,1], [-1,1,1], [-1,-1,1], [1,-1,1], [1,1,-1], [-1,1,-1], [-1,-1,-1], [1,-1,-1]]";
let cube_index1 = [[0,1,2,3], [4,5,6,7], [0,1,5,4], [1,2,6,5], [2,3,7,6], [3,0,4,7]];

let cube1 = createMeshC("cube_vts1", cube_index1, {color:0xff5500, scale:2, flatshade:true});

scene1.add(cube1);

//スライダー操作
slider1.func = () => {
    parameter1 = slider1.value;
    updateObjectC(scene1);
}



//【キャンバス２】

//ポイントリスト
// let points = [];
// for(let i=0; i<30; i++){
//     let a1 = 2;
//     points.push([a1*cos(i*0.5), a1*sin(i*0.5), (i-15)*0.3]);
// }

// for(let i=0; i<30; i++) for(let j=0; j<3; j++){
//     points[i][j] = Math.round(points[i][j]*100) / 100
// }


let points1 = [[2,0,-4.5],[1.76,0.96,-4.2],[1.08,1.68,-3.9],[0.14,1.99,-3.6],[-0.83,1.82,-3.3],[-1.6,1.2,-3],[-1.98,0.28,-2.7],[-1.87,-0.7,-2.4],[-1.31,-1.51,-2.1],[-0.42,-1.96,-1.8],[0.57,-1.92,-1.5],[1.42,-1.41,-1.2],[1.92,-0.56,-0.9],[1.95,0.43,-0.6],[1.51,1.31,-0.3],[0.69,1.88,0],[-0.29,1.98,0.3],[-1.2,1.6,0.6],[-1.82,0.82,0.9],[-1.99,-0.15,1.2],[-1.68,-1.09,1.5],[-0.95,-1.76,1.8],[0.01,-2,2.1],[0.97,-1.75,2.4],[1.69,-1.07,2.7],[2,-0.13,3],[1.81,0.84,3.3],[1.19,1.61,3.6],[0.27,1.98,3.9],[-0.71,1.87,4.2]];

let parameter2 = 1;
function update_points(){
    return [[2.,0.,-4.5],[2*cos(0.5*parameter2),2*sin(0.5*parameter2),-4.2],[2*cos(1.*parameter2),2*sin(1.*parameter2),-3.9],[2*cos(1.5*parameter2),2*sin(1.5*parameter2),-3.5999999999999996],[2*cos(2.*parameter2),2*sin(2.*parameter2),-3.3],[2*cos(2.5*parameter2),2*sin(2.5*parameter2),-3.],[2*cos(3.*parameter2),2*sin(3.*parameter2),-2.6999999999999997],[2*cos(3.5*parameter2),2*sin(3.5*parameter2),-2.4],[2*cos(4.*parameter2),2*sin(4.*parameter2),-2.1],[2*cos(4.5*parameter2),2*sin(4.5*parameter2),-1.7999999999999998],[2*cos(5.*parameter2),2*sin(5.*parameter2),-1.5],[2*cos(5.5*parameter2),2*sin(5.5*parameter2),-1.2],[2*cos(6.*parameter2),2*sin(6.*parameter2),-0.8999999999999999],[2*cos(6.5*parameter2),2*sin(6.5*parameter2),-0.6],[2*cos(7.*parameter2),2*sin(7.*parameter2),-0.3],[2*cos(7.5*parameter2),2*sin(7.5*parameter2),0.],[2*cos(8.*parameter2),2*sin(8.*parameter2),0.3],[2*cos(8.5*parameter2),2*sin(8.5*parameter2),0.6],[2*cos(9.*parameter2),2*sin(9.*parameter2),0.8999999999999999],[2*cos(9.5*parameter2),2*sin(9.5*parameter2),1.2],[2*cos(10.*parameter2),2*sin(10.*parameter2),1.5],[2*cos(10.5*parameter2),2*sin(10.5*parameter2),1.7999999999999998],[2*cos(11.*parameter2),2*sin(11.*parameter2),2.1],[2*cos(11.5*parameter2),2*sin(11.5*parameter2),2.4],[2*cos(12.*parameter2),2*sin(12.*parameter2),2.6999999999999997],[2*cos(12.5*parameter2),2*sin(12.5*parameter2),3.],[2*cos(13.*parameter2),2*sin(13.*parameter2),3.3],[2*cos(13.5*parameter2),2*sin(13.5*parameter2),3.5999999999999996],[2*cos(14.*parameter2),2*sin(14.*parameter2),3.9],[2*cos(14.5*parameter2),2*sin(14.5*parameter2),4.2],[2*cos(15.*parameter2),2*sin(15.*parameter2),4.5]];
}


let vts2 = points_vtsC(points1, 0.3);
let index2 = points_indexC(points1.length);

let points_mesh = createMeshC(vts2, index2, {color:0x00ff55, flatshade:true});

scene2.add( points_mesh );



//【キャンバス３】

let vts3;
let points2 = update_points();
vts3 = tube_vts1C(points2, 0.3, 6)
let index3 = tube_indexC(points2.length-1, 6);
let tube_mesh = createMeshC("vts3", index3, {color:0xff5500});
scene3.add(tube_mesh);


slider2.func = () =>{
    parameter2 = slider2.value;
    points2 = update_points();
    vts3 = tube_vts1C(points2, 0.3, 6);
    updateObjectC( scene3 );
}



//レンダリング
renderer1.render(scene1, camera1);
renderer2.render(scene2, camera2);
renderer3.render(scene3, camera3);
animateC();


/*
knotplot

スライダー生成　js

negative hop hand

fiber knot 

負のぐうｓ

slider
*/