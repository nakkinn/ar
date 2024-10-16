let detail1 = 81;     //曲面のポリゴンの分割数
let detail2 = 41;     //グリッドチューブとスライスのポリゴンの分割数
let detail3 = 10;     //グリッドの分割数
let xrange = [-1*PI, 1.5*PI];   //xの定義域
let yrange = [-1*PI, 1.5*PI];   //yの定義域
let bottom_height = -4;   //底面のz座標
let sc1 = 0.5;    //グラフィックのスケール
let setsuheimen_size = 3; //接平面の大きさ
let sphere_radius = 0.15;   //球の半径
let yajirusi_length = 1.5;    //傾きを示すチューブの長さ
let yajirusi_thick = 0.08;    //傾きを示すチューブの太さ
let grid_thick = 0.05;    //グリッドチューブの太さ



//曲面の2変数関数
let func6 = function(x,y){
    return [x,y,Math.atan(x*y)*2];
}

//曲面の2変数関数のx偏微分
let func6dx = function(x, y){
    return y / (x*x*y*y+1) * 2;
};

//曲面の2変数関数のy偏微分
let func6dy = function(x, y){
    return x / (x*x*y*y+1) * 2;
}



//レンダラー
let renderer1 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas1'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer1.setClearColor(0xeeeeee, 1);  //背景色（第1引数：色, 第2引数：透明度 0のとき透明,1のとき不透明）

let renderer2 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas2'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer2.setClearColor(0xeeeeee, 1); 

let renderer3 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas3'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer3.setClearColor(0xeeeeee, 1); 

let renderer4 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas4'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer4.setClearColor(0xeeeeee, 1); 

let renderer5 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas5'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer5.setClearColor(0xeeeeee, 1); 

let renderer6 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas6'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer6.setClearColor(0xeeeeee, 1); 

let renderer7 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas7'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer7.setClearColor(0xeeeeee, 1); 

let renderer8 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas8'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer8.setClearColor(0xeeeeee, 1); 


//カメラ
let camera1 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]}); //透視投影カメラ（オブションは省略可能）
let camera2 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]});
let camera3 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]});
let camera4 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]});
let camera5 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]});
let camera6 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]});
let camera7 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]});
let camera8 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]});

//シーン
let scene1 = new SceneC(renderer1, camera1);
let scene2 = new SceneC(renderer2, camera2);
let scene3 = new SceneC(renderer3, camera3);
let scene4 = new SceneC(renderer4, camera4);
let scene5 = new SceneC(renderer5, camera5);
let scene6 = new SceneC(renderer6, camera6);
let scene7 = new SceneC(renderer7, camera7);
let scene8 = new SceneC(renderer8, camera8);


//ライト
let lighta1 = new THREE.AmbientLight(0xffffff, 0.4) //環境ライト
let lightd1 = new THREE.DirectionalLight(0xffffff, 0.7);    //指向性ライト
lightd1.position.set( 0, -1, 1 )
scene1.add( lighta1.clone() );  //シーンにライトを追加　同じライトを複数のキャンバスに追加する場合 .clone を付ける
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

scene8.add( lighta1.clone() );  
scene8.add( lightd1.clone() );




//注目する座標
let x1 = xrange[1], y1 = yrange[1];


//底の平面を表す2変数関数　z = c
let func_bottom = function(u, v){
    return [u, v, bottom_height];
}



//曲面のgc
let main_mesh_vts = parametric_vtsC(func6, xrange, yrange, detail1, detail1);
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
for(let i=0; i<=detail3; i++) list1.push((yrange[1]-yrange[0])/detail3*i + yrange[0]);
let list2 = [];
for(let i=0; i<=detail3; i++)   list2.push((xrange[1]-xrange[0])/detail3*i + xrange[0]);

let utubes_vts = tubeU_vtsC(func6, list1, xrange, detail2, grid_thick, 6);
let vtubes_vts = tubeV_vtsC(func6, list2, yrange, detail2, grid_thick, 6);

let utubes_vts0 = tubeU_vtsC(func_bottom, list1, xrange, 1, grid_thick, 6);
let vtubes_vts0 = tubeV_vtsC(func_bottom, list2, yrange, 1, grid_thick, 6);

let uvtube_index = tube_indexC(detail2, 6, list1.length);
let uvtube_index0 = tube_indexC(1, 6, list2.length);


//スライスのgc
let slice1_vts, slice2_vts;
slice1_vts = uslice_vtsC(func6, y1, xrange, detail2, bottom_height);
slice2_vts = vslice_vtsC(func6, x1, yrange, detail2, bottom_height);
let slice_index = ribbon_indexC(detail2);



//オブジェクトが原点中心になるようにずらす
function zurashi_allC(){
    zurashi_vtsC(main_mesh_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(setsuheimen_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(pointer_sphere_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(redtube_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(bluetube_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(utubes_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(vtubes_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(utubes_vts0, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(vtubes_vts0, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(slice1_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
    zurashi_vtsC(slice2_vts, -(xrange[0]+xrange[1])/2, -(yrange[0]+yrange[1])/2, 0);
}

zurashi_allC();



//オブジェクトの追加

scene6.add( createMeshC("pointer_sphere_vts", pointer_sphere_index, {color:0x00ff00, scale:sc1}) );   //球

scene6.add( createMeshC("redtube_vts", tube_index, {color:0xff0000, scale:sc1}) );  //傾き
scene6.add( createMeshC("bluetube_vts", tube_index, {color:0x0000ff, scale:sc1}) );   //傾き

scene6.add( createMeshC(utubes_vts, uvtube_index, {color:0xffffff, scale:sc1}));    //曲面上のグリッド
scene6.add( createMeshC(vtubes_vts, uvtube_index, {color:0xffffff, scale:sc1}));
scene6.add( createMeshC(utubes_vts0, uvtube_index0, {color:0xffffff, scale:sc1}));  //床グリッド
scene6.add( createMeshC(vtubes_vts0, uvtube_index0, {color:0xffffff, scale:sc1}));

scene6.add( createMeshC("slice1_vts", slice_index, {color:0xff6600, scale:sc1}));   //スライス
scene6.add( createMeshC("slice2_vts", slice_index, {color:0x00aaff, scale:sc1}));   

scene6.add( createMeshC("setsuheimen_vts", setsuheimen_index, {color:0x00aa00, scale:sc1, opacity:0.8}) );  //接平面
scene6.add(createMeshC(main_mesh_vts, main_mesh_mesh, {color:0xffff00, scale:sc1, opacity:0.52}));    //曲面



function scaleset(arg, sc){
    let d1 = sqrt(arg[0]**2 + arg[1]**2 + arg[2]**2);
    return [arg[0]/d1*sc, arg[1]/d1*sc, arg[2]/d1*sc];
}


slider3.func = () =>{
   
    let sv3 = Math.floor(slider3.value*detail3) / detail3;
    if((xrange[1]-xrange[0]) * sv3 - xrange[1] != x1){

        x1 = (xrange[1]-xrange[0]) * sv3 + xrange[0];
    
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

        slice1_vts = uslice_vtsC(func6, y1, xrange, detail2, bottom_height);
        slice2_vts = vslice_vtsC(func6, x1, yrange, detail2, bottom_height);

        zurashi_allC();

        updateObjectC( scene6 );

    }

}

slider4.func = () =>{
    
    let sv4 = Math.floor(slider4.value*detail3) / detail3;

    if(y1 != (yrange[1]-yrange[0]) * sv4 + yrange[0]){

        y1 = (yrange[1]-yrange[0]) * sv4 + yrange[0];

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

        slice1_vts = uslice_vtsC(func6, y1, xrange, detail2, bottom_height);
        slice2_vts = vslice_vtsC(func6, x1, yrange, detail2, bottom_height);

        zurashi_allC();

        updateObjectC( scene6 );

    }

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

//頂点リストを[dx, dy, dz]だけずらす
function zurashi_vtsC(arg, dx, dy, dz){
    for(let i=0; i<arg.length; i++){
        arg[i][0] += dx;
        arg[i][1] += dy;
        arg[i][2] += dz;
    }
}



//共通
let tubecolor10 = 0xffffff;
let tubecolor11 = 0x666666;



//【キャンバス１】
let func1 = function(x,y){
    return [x,y,x*y];
}
let func1_bottom = function(x,y){
    return [x,y,-1];
}

let xrange1 = [-1, 1];   //xの定義域
let yrange1 = [-1, 1];   //yの定義域

let list1a = [];
for(let i=0; i<=detail3; i++) list1a.push((yrange1[1]-yrange1[0])/detail3*i + yrange1[0]);
let list1b = [];
for(let i=0; i<=detail3; i++)   list1b.push((xrange1[1]-xrange1[0])/detail3*i + xrange1[0]);

let utubes_vts_1 = tubeU_vtsC(func1, list1a, xrange1, detail2, 0.015, 6);
let vtubes_vts_1 = tubeV_vtsC(func1, list1b, yrange1, detail2, 0.015, 6);

let utubes_vts0_1 = tubeU_vtsC(func1_bottom, list1a, xrange1, 1, 0.015, 6);
let vtubes_vts0_1 = tubeV_vtsC(func1_bottom, list1b, yrange1, 1, 0.015, 6);

let uvtube_index_1 = tube_indexC(detail2, 6, list1a.length);
let uvtube_index0_1 = tube_indexC(1, 6, list1b.length);

let main_mesh_vts_1 = parametric_vtsC(func1, xrange1, yrange1, detail1, detail1);
let main_mesh_index_1 = parametric_indexC(detail1, detail1);


scene1.add( createMeshC("utubes_vts_1", uvtube_index_1, {color:tubecolor10, scale:2}));
scene1.add( createMeshC("vtubes_vts_1", uvtube_index_1, {color:tubecolor11, scale:2}));
scene1.add( createMeshC("utubes_vts0_1", uvtube_index0_1, {color:tubecolor10, scale:2}));
scene1.add( createMeshC("vtubes_vts0_1", uvtube_index0_1, {color:tubecolor11, scale:2}));

scene1.add( createMeshC("main_mesh_vts_1", main_mesh_index_1, {color:0xff6600, scale:2}));




//【キャンバス２】
let func2 = function(x,y){
    return [x,y,x*x - y*y];
}
let func2_bottom = function(x,y){
    return [x,y,-1];
}

let xrange2 = [-1, 1];   //xの定義域
let yrange2 = [-1, 1];   //yの定義域

let list2a = [];
for(let i=0; i<=detail3; i++) list1a.push((yrange1[1]-yrange1[0])/detail3*i + yrange1[0]);
let list2b = [];
for(let i=0; i<=detail3; i++)   list1b.push((xrange1[1]-xrange1[0])/detail3*i + xrange1[0]);

let utubes_vts_2 = tubeU_vtsC(func2, list1a, xrange1, detail2, 0.015, 6);
let vtubes_vts_2 = tubeV_vtsC(func2, list1b, yrange1, detail2, 0.015, 6);

let utubes_vts0_2 = tubeU_vtsC(func2_bottom, list1a, xrange1, 1, 0.015, 6);
let vtubes_vts0_2 = tubeV_vtsC(func2_bottom, list1b, yrange1, 1, 0.015, 6);

let uvtube_index_2 = tube_indexC(detail2, 6, list1a.length);
let uvtube_index0_2 = tube_indexC(1, 6, list1b.length);

let main_mesh_vts_2 = parametric_vtsC(func2, xrange1, yrange1, detail1, detail1);
let main_mesh_index_2 = parametric_indexC(detail1, detail1);


scene2.add( createMeshC("utubes_vts_2", uvtube_index_2, {color:tubecolor10, scale:2}));
scene2.add( createMeshC("vtubes_vts_2", uvtube_index_2, {color:tubecolor11, scale:2}));
scene2.add( createMeshC("utubes_vts0_2", uvtube_index0_2, {color:tubecolor10, scale:2}));
scene2.add( createMeshC("vtubes_vts0_2", uvtube_index0_2, {color:tubecolor11, scale:2}));

scene2.add( createMeshC("main_mesh_vts_2", main_mesh_index_2, {color:0xff0088, scale:2}));




//【キャンバス３】
let func3 = function(x,y){
    return [x,y,Math.atan(y/x)*0.4];
}
let func3_bottom = function(x,y){
    return [x,y,-1];
}

let xrange3 = [-1, 1];   //xの定義域
let yrange3 = [-1, 1];   //yの定義域

let list3a = [];
for(let i=0; i<=detail3; i++) list1a.push((yrange1[1]-yrange1[0])/detail3*i + yrange1[0]);
let list3b = [];
for(let i=0; i<=detail3; i++)   list1b.push((xrange1[1]-xrange1[0])/detail3*i + xrange1[0]);

let utubes_vts_3 = tubeU_vtsC(func3, list1a, xrange1, detail2, 0.015, 6);
let vtubes_vts_3 = tubeV_vtsC(func3, list1b, yrange1, detail2, 0.015, 6);

let utubes_vts0_3 = tubeU_vtsC(func3_bottom, list1a, xrange1, 1, 0.015, 6);
let vtubes_vts0_3 = tubeV_vtsC(func3_bottom, list1b, yrange1, 1, 0.015, 6);

let uvtube_index_3 = tube_indexC(detail2, 6, list1a.length);
let uvtube_index0_3 = tube_indexC(1, 6, list1b.length);

let main_mesh_vts_3 = parametric_vtsC(func3, xrange1, yrange1, detail1, detail1);
let main_mesh_index_3 = parametric_indexC(detail1, detail1);


scene3.add( createMeshC("utubes_vts_3", uvtube_index_3, {color:tubecolor10, scale:2}));
scene3.add( createMeshC("vtubes_vts_3", uvtube_index_3, {color:tubecolor11, scale:2}));
scene3.add( createMeshC("utubes_vts0_3", uvtube_index0_3, {color:tubecolor10, scale:2}));
scene3.add( createMeshC("vtubes_vts0_3", uvtube_index0_3, {color:tubecolor11, scale:2}));

scene3.add( createMeshC("main_mesh_vts_3", main_mesh_index_3, {color:0x66ff00, scale:2, opacity:0.6}));




//【キャンバス４】
let func4 = function(x,y){
    return [x,y,x / sqrt(x*x + y*y)];
}
let func4_bottom = function(x,y){
    return [x,y,-1];
}

let xrange4 = [-1, 1];   //xの定義域
let yrange4 = [-1, 1];   //yの定義域

let list4a = [];
for(let i=0; i<=detail3; i++) list1a.push((yrange1[1]-yrange1[0])/detail3*i + yrange1[0]);
let list4b = [];
for(let i=0; i<=detail3; i++)   list1b.push((xrange1[1]-xrange1[0])/detail3*i + xrange1[0]);

let utubes_vts_4 = tubeU_vtsC(func4, list1a, xrange1, detail2, 0.015, 6);
let vtubes_vts_4 = tubeV_vtsC(func4, list1b, yrange1, detail2, 0.015, 6);

let utubes_vts0_4 = tubeU_vtsC(func4_bottom, list1a, xrange1, 1, 0.015, 6);
let vtubes_vts0_4 = tubeV_vtsC(func4_bottom, list1b, yrange1, 1, 0.015, 6);

let uvtube_index_4 = tube_indexC(detail2, 6, list1a.length);
let uvtube_index0_4 = tube_indexC(1, 6, list1b.length);

let main_mesh_vts_4 = parametric_vtsC(func4, xrange1, yrange1, detail1, detail1);
let main_mesh_index_4 = parametric_indexC(detail1, detail1);


scene4.add( createMeshC("utubes_vts_4", uvtube_index_4, {color:tubecolor10, scale:2}));
scene4.add( createMeshC("vtubes_vts_4", uvtube_index_4, {color:tubecolor11, scale:2}));
scene4.add( createMeshC("utubes_vts0_4", uvtube_index0_4, {color:tubecolor10, scale:2}));
scene4.add( createMeshC("vtubes_vts0_4", uvtube_index0_4, {color:tubecolor11, scale:2}));

scene4.add( createMeshC("main_mesh_vts_4", main_mesh_index_4, {color:0x00ff88, scale:2, opacity:0.6}));


//【キャンバス５】
let func5 = function(x,y){
    return [x,y, x*(x*x-1)-y*y+0.4];
}
let func5_bottom = function(x,y){
    return [x,y,-1];
}

let xrange5 = [-1, 1];   //xの定義域
let yrange5 = [-1, 1];   //yの定義域

let list5a = [];
for(let i=0; i<=detail3; i++) list1a.push((yrange1[1]-yrange1[0])/detail3*i + yrange1[0]);
let list5b = [];
for(let i=0; i<=detail3; i++)   list1b.push((xrange1[1]-xrange1[0])/detail3*i + xrange1[0]);

let utubes_vts_5 = tubeU_vtsC(func5, list1a, xrange1, detail2, 0.015, 6);
let vtubes_vts_5 = tubeV_vtsC(func5, list1b, yrange1, detail2, 0.015, 6);

let utubes_vts0_5 = tubeU_vtsC(func5_bottom, list1a, xrange1, 1, 0.015, 6);
let vtubes_vts0_5 = tubeV_vtsC(func5_bottom, list1b, yrange1, 1, 0.015, 6);

let uvtube_index_5 = tube_indexC(detail2, 6, list1a.length);
let uvtube_index0_5 = tube_indexC(1, 6, list1b.length);

let main_mesh_vts_5 = parametric_vtsC(func5, xrange1, yrange1, detail1, detail1);
let main_mesh_index_5 = parametric_indexC(detail1, detail1);


scene5.add( createMeshC("utubes_vts_5", uvtube_index_5, {color:tubecolor10, scale:2}));
scene5.add( createMeshC("vtubes_vts_5", uvtube_index_5, {color:tubecolor11, scale:2}));
scene5.add( createMeshC("utubes_vts0_5", uvtube_index0_5, {color:tubecolor10, scale:2}));
scene5.add( createMeshC("vtubes_vts0_5", uvtube_index0_5, {color:tubecolor11, scale:2}));

scene5.add( createMeshC("main_mesh_vts_5", main_mesh_index_5, {color:0x0066ff, scale:2}));


//キャンバス7


let index_mesh = parametric_indexC(detail1, detail1);
let index6b = tube_indexC(1, 6);

let func7 = function(u, v){
    let x, y, z;
    x = u;
    y = v;
    z = x * y / (x*x + y*y);
    return [x,y,z];
}

let vts7 = parametric_vtsC(func7, [-1, 1], [-1, 1], detail1, detail1);
let surf7 = createMeshC(vts7, index_mesh, {color:0x00aa00, scale:2.2, flatshade:true});

let points;
let parameter7 = 0
points = [[cos(parameter7), sin(parameter7), sin(2*parameter7)/2], [cos(parameter7+PI), sin(parameter7+PI), sin(2*parameter7)/2]];

let vts7b = tube_vts1C(points, 0.02, 6);
let index7b = tube_indexC(1, 6);
let surf7b = createMeshC("vts7b", index7b, {color:0xffff00, scale:2.2});

scene7.add(surf7);
scene7.add(surf7b);


slider1.func = () =>{
    parameter7 = PI * slider1.value;
    points = [[cos(parameter7), sin(parameter7), sin(2*parameter7)/2], [cos(parameter7+PI), sin(parameter7+PI), sin(2*parameter7)/2]];
    vts7b = tube_vts1C(points, 0.02, 6);
    updateObjectC( scene7 );
}




//キャンバス８
let parameter8 = 0.2;

let func8 = function(r, t){
    let x, y, z;
    // x = u;
    // y = v;
    // z = x * y / (x*x + y*y + parameter1);
    x = r * cos(t);
    y = r * sin(t);
    z = sin(t) * cos(t);
    return [x,y,z];
}

let points8 = [[1.5*cos(parameter8), 1.5*sin(parameter8), sin(2*parameter8)/2], [1.5*cos(parameter8+PI), 1.5*sin(parameter8+PI), sin(2*parameter8)/2]];
let vts8b = tube_vts1C(points8, 0.025, 6);
let vts8 = parametric_vtsC(func8, [0, 1.5], [0, 2*PI], detail1, detail1);
let surf8 = createMeshC(vts8, index_mesh, {color:0x00aa00, scale:2, flatshade:false});
let surf8b = createMeshC("vts8b", index6b, {color:0xffff00, scale:2});

scene8.add(surf8);
scene8.add(surf8b);


slider2.func = () =>{
    parameter8 = PI * slider2.value * 3;
    points8 = [[1.5*cos(parameter8), 1.5*sin(parameter8), sin(2*parameter8)/2], [1.5*cos(parameter8+PI), 1.5*sin(parameter8+PI), sin(2*parameter8)/2]];
    vts8b = tube_vts1C(points8, 0.025, 6);
    updateObjectC( scene8 );
}



//レンダリング
renderer1.render(scene1, camera1);
renderer2.render(scene2, camera2);
renderer3.render(scene3, camera3);
renderer4.render(scene4, camera4);
renderer5.render(scene5, camera5);
renderer6.render(scene6, camera6);
renderer7.render(scene7, camera7);
renderer8.render(scene8, camera8);
animateC();
