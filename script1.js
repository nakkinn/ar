
//レンダラー
let renderer1 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas1'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer1.setClearColor(0xeeeeee, 1);  //背景色（第1引数：色, 第2引数：透明度 0のとき透明,1のとき不透明）

let renderer2 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas2'),
    antialias: true,
    alpha:false 
});
renderer2.setClearColor(0xeeeeee, 1);

let renderer3 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas3'),
    antialias: true,
    alpha:false 
});
renderer3.setClearColor(0xeeeeee, 1);

let renderer4 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas4'),
    antialias: true,
    alpha:false 
});
renderer4.setClearColor(0xeeeeee, 1);

let renderer5 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas5'),
    antialias: true,
    alpha:false 
});
renderer5.setClearColor(0xeeeeee, 1);

let renderer6 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas6'),
    antialias: true,
    alpha:false 
});
renderer6.setClearColor(0xeeeeee, 1);

let renderer7 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas7'),
    antialias: true,
    alpha:false 
});
renderer7.setClearColor(0xeeeeee, 1);


//カメラ
let camera1 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]}); //透視投影カメラ（オブションは省略可能）
let camera2 = camera1.clone(); //透視投影カメラ（オブションは省略可能）
let camera3 = camera1.clone();
let camera4 = camera1.clone();
let camera5 = camera1.clone();
let camera6 = camera1.clone();
let camera7 = camera1.clone();


//シーン
let scene1 = new SceneC(renderer1, camera1);
let scene2 = new SceneC(renderer2, camera2);
let scene3 = new SceneC(renderer3, camera3);
let scene4 = new SceneC(renderer4, camera4);
let scene5 = new SceneC(renderer5, camera5);
let scene6 = new SceneC(renderer6, camera6);
let scene7 = new SceneC(renderer7, camera7);


//ライト
let lighta1 = new THREE.AmbientLight(0xffffff, 0.4) //環境ライト
let lightd1 = new THREE.DirectionalLight(0xffffff, 0.7);    //指向性ライト
lightd1.position.set( 0, -1, 1 )


scene1.add( lighta1.clone() );  //シーンにライトを追加する　同じライトを複数のキャンバスに追加する場合 .clone を付ける
scene1.add( lightd1.clone() );
scene2.add( lighta1.clone() ); 
scene2.add( lightd1.clone() );
scene3.add( lighta1.clone() ); 
scene3.add( lightd1.clone() );
scene4.add( lighta1.clone() ); 
scene4.add( lightd1.clone() );
scene5.add( lighta1.clone() ); 
scene5.add( lightd1.clone() );
scene6.add( lighta1.clone() ); 
scene6.add( lightd1.clone() );
scene7.add( lighta1.clone() ); 
scene7.add( lightd1.clone() );




//オブジェクト

const detail = 81;

//【キャンバス１】
let func1 = function(u,v){
    let x, y, z;
    x = u;
    y = v;
    z = Math.atan(x*1.5*PI*y*1.5*PI)*0.5;
    return [x,y,z];
}

let vts1 = parametric_vtsC(func1, [-1,1], [-1,1], detail, detail);
let index_mesh = parametric_indexC(detail, detail);
let surf1 = createMeshC(vts1, index_mesh, {color:0x0066ff, scale:2.2});

scene1.add(surf1);



//【キャンバス２】
let func2 = function(u, v){
    let x, y, z;
    x = u;
    y = v;
    z = Math.atan(y/x) * 0.4;
    return [x,y,z];
}

let vts2 = parametric_vtsC(func2, [-1,1], [-1,1], detail, detail);
let surf2 = createMeshC(vts2, index_mesh, {color:0xff6600, scale:2.2, flatshade:true});

scene2.add(surf2);



//【キャンバス３】
let func3 = function(u, v){
    let x, y, z;
    let u1 = u*3, v1 = v*3;
    x = u;
    y = v;
    z = exp(u1*v1) / (exp(u1) + exp(v1)) - 0.8;
    return [x,y,z];
}

let vts3 = parametric_vtsC(func3, [-1, 1], [-1, 1], detail, detail);
let surf3 = createMeshC(vts3, index_mesh, {color:0x66ff00, scale:2.2, flatshade:false});

scene3.add(surf3);
const cut_plane1 = new THREE.Plane(new THREE.Vector3(0,0,-1.5), 1);
renderer3.clippingPlanes.push(cut_plane1);


//【キャンバス４】
let func4 = function(u, v){
    let x, y, z;
    x = u;
    y = v;
    z = x / sqrt(x*x + y*y);
    return [x,y,z];
}

let vts4 = parametric_vtsC(func4, [-1, 1], [-1, 1], detail, detail);
let surf4 = createMeshC(vts4, index_mesh, {color:0xff0066, scale:2.2, flatshade:false});

scene4.add(surf4);



//【キャンバス5】
let func5 = function(u, v){
    let x, y, z;
    x = u;
    y = v;
    let u1 = u*PI*1, v1 = v*PI*1;
    z = sin(u1*v1) * 0.4;
    return [x,y,z];
}

let vts5 = parametric_vtsC(func5, [-1, 1], [-1, 1], detail, detail);
let surf5 = createMeshC(vts5, index_mesh, {color:0x6600ff, scale:2.2, flatshade:false});

scene5.add(surf5);



//【キャンバス6】
let func6 = function(u, v){
    let x, y, z;
    x = u;
    y = v;
    z = x * y / (x*x + y*y);
    return [x,y,z];
}

let vts6 = parametric_vtsC(func6, [-1, 1], [-1, 1], detail, detail);
let surf6 = createMeshC(vts6, index_mesh, {color:0x00aa00, scale:2.2, flatshade:true});

let points;
let parameter2 = 0
points = [[cos(parameter2), sin(parameter2), sin(2*parameter2)/2], [cos(parameter2+PI), sin(parameter2+PI), sin(2*parameter2)/2]];

let vts6b = tube_vts1C(points, 0.02, 6);
let index6b = tube_indexC(1, 6);
let surf6b = createMeshC("vts6b", index6b, {color:0xffff00, scale:2.2});

scene6.add(surf6);
scene6.add(surf6b);


slider2.func = () =>{
    parameter2 = PI * slider2.value;
    points = [[cos(parameter2), sin(parameter2), sin(2*parameter2)/2], [cos(parameter2+PI), sin(parameter2+PI), sin(2*parameter2)/2]];
    vts6b = tube_vts1C(points, 0.02, 6);
    updateObjectC( scene6 );
}


//【キャンバス7】
let parameter1 = 0.2;

let func7 = function(r, t){
    let x, y, z;
    // x = u;
    // y = v;
    // z = x * y / (x*x + y*y + parameter1);
    x = r * cos(t);
    y = r * sin(t);
    z = sin(t) * cos(t);
    return [x,y,z];
}

let points7 = [[1.5*cos(parameter2), 1.5*sin(parameter2), sin(2*parameter2)/2], [1.5*cos(parameter2+PI), 1.5*sin(parameter2+PI), sin(2*parameter2)/2]];
let vts7b = tube_vts1C(points7, 0.025, 6);
let vts7 = parametric_vtsC(func7, [0, 1.5], [0, 2*PI], detail, detail);
let surf7 = createMeshC(vts7, index_mesh, {color:0x00aa00, scale:2, flatshade:false});
let surf7b = createMeshC("vts7b", index6b, {color:0xffff00, scale:2});

scene7.add(surf7);
scene7.add(surf7b);


slider1.func = () =>{
    parameter2 = PI * slider1.value;
    points7 = [[1.5*cos(parameter2), 1.5*sin(parameter2), sin(2*parameter2)/2], [1.5*cos(parameter2+PI), 1.5*sin(parameter2+PI), sin(2*parameter2)/2]];
    vts7b = tube_vts1C(points7, 0.025, 6);
    updateObjectC( scene7 );
}


//レンダリング
renderer1.render(scene1, camera1);
renderer2.render(scene2, camera2);
renderer3.render(scene3, camera3);
renderer4.render(scene4, camera4);
renderer5.render(scene5, camera5);
renderer6.render(scene6, camera6);
renderer7.render(scene7, camera7);
animateC();



