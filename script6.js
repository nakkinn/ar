
//曲面の2変数関数
let func6 = function(x,y){
    return [x, y, 2 * atan(x*y)];
}

//曲面の2変数関数のx偏微分
let func6dx = function(x, y){
    return 2 * y / (x*x*y*y+1);
};

//曲面の2変数関数のy偏微分
let func6dy = function(x, y){
    return 2 * x / (x*x*y*y+1);
}

//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（どちらかは必須）
addOrthographicCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, 0, 10], up:[0, 1, 0], lookat:[0,0,0]}); //平行投影カメラ　第1引数：オプション（省略可）


//環境光ライト
addAmbientLightC(0xffffff, 0.3);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.8, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.2, -1, -1, 1);


//レンダリング（必須）
animateC();


let tubecolor1 = 0xffffff;
let tubecolor2 = 0x555555;
let meshcolor = 0x00ff88;
let detail1 = 81;   //曲面のポリゴンの分割数
let detail2 = 41;   //チューブの分割数
let detail3 = 10;   //グリッドの分割数
let bottom_height = -4; //底辺の高さ
let xrange6 = [-4, 4];   //xの定義域
let yrange6 = [-4, 4];   //yの定義域
let scale1 = 0.8; //オブジェクトのスケール
let tubethick = 0.04;  //チューブの太さ
let opacity1 = 0.6;
let setsuheimen_size = 2; //接平面の大きさ
let sphere_radius = 0.15;   //球の半径
let yajirusi_length = 1.5;    //傾きを示すチューブの長さ
let yajirusi_thick = 0.08;    //傾きを示すチューブの太さ

let visible6b= true;
let opacity6b = 0.5;

//注目する座標
let x1 = xrange6[1], y1 = yrange6[1];


//底の平面を表す2変数関数　z = c
let func_bottom = function(u, v){
    return [u, v, bottom_height];
}



//曲面のgc
let main_mesh_vts = parametric_vtsC(func6, xrange6, yrange6, detail1, detail1);
let main_mesh_mesh = parametric_indexC(detail1, detail1);


//接平面のgc
let setsuheimen_vts = [ abc1(x1+1,y1,func6(x1,y1)[2]+func6dx(x1,y1)), abc1(x1,y1+1,func6(x1,y1)[2]+func6dy(x1,y1)), abc1(x1-1,y1,func6(x1,y1)[2]-func6dx(x1,y1)), abc1(x1,y1-1,func6(x1,y1)[2]-func6dy(x1,y1)) ];
function abc1(xa, ya, za){
    let xd, yd, zd, r1;
    let z1 = func6(x1,y1)[2];
    xd = xa - x1;
    yd = ya - y1;
    zd = za - z1;
    r1 = sqrt( xd**2 + yd**2 + zd**2)
    let d2 = setsuheimen_size;
    return [x1+xd/r1*d2, y1+yd/r1*d2, z1+zd/r1*d2];
}
let setsuheimen_index = [[0,1,2],[2,3,0]];


//球のgc
let pointer_sphere_vts = points_vtsC([[x1, y1, func6(x1,y1)[2]]], sphere_radius);
let pointer_sphere_index = points_indexC(1);


//傾きを示すチューブのgc
let v1 = [1, 0, func6dx(x1,y1)];
v1 = scaleset(v1, yajirusi_length);
let redtube_core_vts = [[x1, y1, func6(x1,y1)[2]], [x1+v1[0], y1+v1[1], func6(x1,y1)[2]+v1[2]]];
let redtube_vts = tube_vts1C(redtube_core_vts, yajirusi_thick, 6);

let v2 = [0, 1, func6dy(x1,y1)];
v2 = scaleset(v2, yajirusi_length);
let bluetube_core_vts = [[x1, y1, func6(x1,y1)[2]], [x1+v2[0], y1+v2[1], func6(x1,y1)[2]+v2[2]]];
let bluetube_vts = tube_vts1C(bluetube_core_vts, yajirusi_thick, 6);

let tube_index = tube_indexC(1,6);


//グリッドのgc
let list1 = [];
for(let i=0; i<=detail3; i++) list1.push((yrange6[1]-yrange6[0])/detail3*i + yrange6[0]);
let list2 = [];
for(let i=0; i<=detail3; i++)   list2.push((xrange6[1]-xrange6[0])/detail3*i + xrange6[0]);

let utubes_vts = tubeU_vtsC(func6, list1, xrange6, detail2, tubethick, 6);
let vtubes_vts = tubeV_vtsC(func6, list2, yrange6, detail2, tubethick, 6);

let utubes_vts0 = tubeU_vtsC(func_bottom, list1, xrange6, 1, tubethick, 6);
let vtubes_vts0 = tubeV_vtsC(func_bottom, list2, yrange6, 1, tubethick, 6);

let uvtube_index = tube_indexC(detail2, 6, list1.length);
let uvtube_index0 = tube_indexC(1, 6, list2.length);


//スライスのgc
let slice1_vts, slice2_vts;
slice1_vts = uslice_vtsC(func6, y1, xrange6, detail2, bottom_height);
slice2_vts = vslice_vtsC(func6, x1, yrange6, detail2, bottom_height);
let slice_index = ribbon_indexC(detail2);


function scaleset(arg, sc){
    let d1 = sqrt(arg[0]**2 + arg[1]**2 + arg[2]**2);
    return [arg[0]/d1*sc, arg[1]/d1*sc, arg[2]/d1*sc];
}

//スライスの頂点リストの生成
function uslice_vtsC(func, v1, urange, m, soko){
    let result = [];
    for(let i=0; i<=m; i++){
        let t = urange[0] * i / m + urange[1] * (m-i) /m;
        result.push( func(t, v1) );
        result.push( [t, v1, soko] );
    }
    return result;
}

function vslice_vtsC(func, u1, vrange, m, soko){
    let result = [];
    for(let i=0; i<=m; i++){
        let t = vrange[0] * i / m + vrange[1] * (m-i) /m;
        result.push( func(u1, t) );
        result.push( [u1, t, soko] );
    }
    return result;
}



addMeshC("pointer_sphere_vts", pointer_sphere_index, {color:0x00ff00, scale:scale1});   //球

addMeshC("redtube_vts", tube_index, {color:0xff0000, scale:scale1});  //傾き
addMeshC("bluetube_vts", tube_index, {color:0x0000ff, scale:scale1});   //傾き

addMeshC(utubes_vts, uvtube_index, {color:tubecolor1, scale:scale1, visible:"visible6b"});    //曲面上のグリッド
addMeshC(vtubes_vts, uvtube_index, {color:tubecolor2, scale:scale1, visible:"visible6b"});
addMeshC(utubes_vts0, uvtube_index0, {color:tubecolor1, scale:scale1, visible:"visible6b"});  //床グリッド
addMeshC(vtubes_vts0, uvtube_index0, {color:tubecolor2, scale:scale1, visible:"visible6b"});

addMeshC("slice1_vts", slice_index, {color:0xff6600, scale:scale1, visible:"visible6b"});   //スライス
addMeshC("slice2_vts", slice_index, {color:0x00aaff, scale:scale1, visible:"visible6b"});   

addMeshC("setsuheimen_vts", setsuheimen_index, {color:0x00aa00, scale:scale1, opacity:0.8});  //接平面 
addMeshC(main_mesh_vts, main_mesh_mesh, {color:0xffff00, scale:scale1, opacity:"opacity6b"});    //曲面


slider1.func = () =>{
   
    let sv3 = Math.floor(slider1.value*detail3) / detail3;
    if((xrange6[1]-xrange6[0]) * sv3 - xrange6[1] != x1){

        x1 = (xrange6[1]-xrange6[0]) * sv3 + xrange6[0];
    
        setsuheimen_vts = [ abc1(x1+1,y1,func6(x1,y1)[2]+func6dx(x1,y1)*1), abc1(x1,y1+1,func6(x1,y1)[2]+func6dy(x1,y1)*1), abc1(x1-1,y1,func6(x1,y1)[2]-func6dx(x1,y1)*1), abc1(x1,y1-1,func6(x1,y1)[2]-func6dy(x1,y1)*1) ];
        pointer_sphere_vts = points_vtsC([[x1, y1, func6(x1,y1)[2]]], sphere_radius);

        v1 = [1, 0, func6dx(x1,y1)];
        v1 = scaleset(v1, yajirusi_length);
        redtube_core_vts = [[x1, y1, func6(x1,y1)[2]], [x1+v1[0], y1+v1[1], func6(x1,y1)[2]+v1[2]]];
        redtube_vts = tube_vts1C(redtube_core_vts, yajirusi_thick, 6);

        v2 = [0, 1, func6dy(x1,y1)];
        v2 = scaleset(v2, yajirusi_length);
        bluetube_core_vts = [[x1, y1, func6(x1,y1)[2]], [x1+v2[0], y1+v2[1], func6(x1,y1)[2]+v2[2]]];
        bluetube_vts = tube_vts1C(bluetube_core_vts, yajirusi_thick, 6);

        slice1_vts = uslice_vtsC(func6, y1, xrange6, detail2, bottom_height);
        slice2_vts = vslice_vtsC(func6, x1, yrange6, detail2, bottom_height);

        updateObjectC();

    }

}

slider2.func = () =>{
    
    let sv4 = Math.floor(slider2.value*detail3) / detail3;

    if(y1 != (yrange6[1]-yrange6[0]) * sv4 + yrange6[0]){

        y1 = (yrange6[1]-yrange6[0]) * sv4 + yrange6[0];

        setsuheimen_vts = [ abc1(x1+1,y1,func6(x1,y1)[2]+func6dx(x1,y1)*1), abc1(x1,y1+1,func6(x1,y1)[2]+func6dy(x1,y1)*1), abc1(x1-1,y1,func6(x1,y1)[2]-func6dx(x1,y1)*1), abc1(x1,y1-1,func6(x1,y1)[2]-func6dy(x1,y1)*1) ];
        pointer_sphere_vts = points_vtsC([[x1, y1, func6(x1,y1)[2]]], sphere_radius);

        v1 = [1, 0, func6dx(x1,y1)];
        v1 = scaleset(v1, yajirusi_length);
        redtube_core_vts = [[x1, y1, func6(x1,y1)[2]], [x1+v1[0], y1+v1[1], func6(x1,y1)[2]+v1[2]]];
        redtube_vts = tube_vts1C(redtube_core_vts, yajirusi_thick, 6);

        v2 = [0, 1, func6dy(x1,y1)];
        v2 = scaleset(v2, yajirusi_length);
        bluetube_core_vts = [[x1, y1, func6(x1,y1)[2]], [x1+v2[0], y1+v2[1], func6(x1,y1)[2]+v2[2]]];
        bluetube_vts = tube_vts1C(bluetube_core_vts, yajirusi_thick, 6);

        slice1_vts = uslice_vtsC(func6, y1, xrange6, detail2, bottom_height);
        slice2_vts = vslice_vtsC(func6, x1, yrange6, detail2, bottom_height);

        updateObjectC();

    }

}
