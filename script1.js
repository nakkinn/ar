//レンダラー
let renderer1 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas1'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer1.setClearColor(0xeeeeee, 1);  //背景色（第1引数：色, 第2引数：透明度 0のとき透明,1のとき不透明）

let renderer2 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas2'),
    antialias: true
});
renderer2.setClearColor(0xeeeeee);  //背景色

let renderer3 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas3'),
    antialias: true
});
renderer3.setClearColor(0xeeeeee);  //背景色



//カメラ
let camera1 = createPerspectiveCameraC({fov:60, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]}); //透視投影カメラ（オブションは省略可能）
let camera2 = createOrthographicCameraC({near:0.01, far:500, zoom:1, range:5, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]}); //平行投影カメラ（オブションは省略可能）
let camera3 = createPerspectiveCameraC();



//シーン
let scene1 = new SceneC(renderer1, camera1);
let scene2 = new SceneC(renderer2, camera2);
let scene3 = new SceneC(renderer3, camera3);



//ライト
let lighta1 = new THREE.AmbientLight(0xffffff, 0.3) //環境ライト

let lightd1 = new THREE.DirectionalLight(0xffffff, 0.6);    //指向性ライト
lightd1.position.set( 0, -1, 1 )

scene1.add( lighta1.clone() );  //シーンにライトを追加する　同じライトを複数のキャンバスに追加する場合 .clone を付ける
scene1.add( lightd1.clone() );
scene2.add( lighta1.clone() );
scene2.add( lightd1.clone() );
scene3.add( lighta1.clone() );
scene3.add( lightd1.clone() );



//オブジェクト

//【キャンバス１】
//正二十面体頂点リスト
let ico_vts = [[2., 3.23607, 0.], [2., -3.23607, 0.], [-2., -3.23607, 0.], [-2., 3.23607, 0.], [0., 2., 3.23607], [0., 2., -3.23607], [0., -2., -3.23607], [0., -2., 3.23607], [3.23607, 0., 2.], [-3.23607, 0., 2.], [-3.23607, 0., -2.], [3.23607, 0., -2.]];
//正二十面体ポリゴンインデックスリスト
let ico_index = [[0,3,4],[0,3,5],[0,4,8],[0,5,11],[0,8,11],[1,2,6],[1,2,7],[1,6,11],[1,7,8],[1,8,11],[2,6,10],[2,7,9],[2,9,10],[3,4,9],[3,5,10],[3,9,10],[4,7,8],[4,7,9],[5,6,10],[5,6,11]];
//正二十面体（橙）
let mesh1 = createMeshC(ico_vts, ico_index, {color:0xff5500, scale:1, flatshade:true, opacity:1, wireframe:false, spherecutradius:-1, side:0, rotation:[0,0,0], position:[0,0,0]});
//シーンに追加
scene1.add(mesh1);


//【キャンバス２】
//u,vを入力とし、(x,y,z)を返す関数
let func1 = function(u,v){
    let x, y, z;
    x = u;
    y = v;
    z = u*u -v*v;
    return [x,y,z];
}

let surf_vts = parametric_vtsC(func1, [-1,1], [-1,1], 40, 40);  //円柱の頂点リスト
let surf_index = parametric_indexC(40, 40); //円柱のポリゴンインデックスリスト
let mesh2 = createMeshC(surf_vts, surf_index, {color:0x0066ff, scale:3});   //円柱
scene2.add(mesh2);


//【キャンバス３】
let parameter1 = 0.5;
let mobius_func = function(u,v){
    let x, y, z;
    let a1 = 5;
    let a2 = 0.1 + 3*parameter1; //slider1はhtmlファイルで定義している　slider1.valueは0以上1以下
    x = cos(u) * (a1 + a2 * v * cos(u/2));
    y = sin(u) * (a1 + a2 * v * cos(u/2));
    z = a2 * v * sin(u/2);
    return [x,y,z];
}

let mobius_vts = parametric_vtsC(mobius_func, [0,2*PI], [-1,1], 60, 5);
let mobius_index = parametric_indexC(60, 5);
let mesh3 = createMeshC("mobius_vts", mobius_index, {color:0x00aa66, scale:0.7});
scene3.add(mesh3);

//スライダー操作時の処理
slider1.func = () => {
    parameter1 = slider1.value; //パラメータにスライダーの値を代入
    mobius_vts = parametric_vtsC(mobius_func, [0,2*PI], [-1,1], 60, 5); //頂点を再計算
    updateObjectC(scene3);  //オブジェクトを更新（シーンを指定する）
};



//レンダリング
renderer1.render(scene1, camera1);
renderer2.render(scene2, camera2);
renderer3.render(scene3, camera3);
animateC();





/*
メモ

scene, camera, rendererはキャンバスの数だけ用意する


*/