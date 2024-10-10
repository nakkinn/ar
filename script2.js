
//レンダラー
let renderer1 = new THREE.WebGLRenderer({
    canvas:document.getElementById('canvas1'),  //idを指定
    antialias: true,    //境界線のスムーズ
    alpha:false //透過
});
renderer1.setClearColor(0xeeeeee, 1);  //背景色（第1引数：色, 第2引数：透明度 0のとき透明,1のとき不透明）



//カメラ
let camera1 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1, pos:[0, -10, 0], up:[0, 0, 1], lookat:[0,0,0]}); //透視投影カメラ（オブションは省略可能）


//シーン
let scene1 = new SceneC(renderer1, camera1);


//ライト
let lighta1 = new THREE.AmbientLight(0xffffff, 0.4) //環境ライト
let lightd1 = new THREE.DirectionalLight(0xffffff, 0.7);    //指向性ライト
lightd1.position.set( 0, -1, 1 )


scene1.add( lighta1.clone() );  //シーンにライトを追加する　同じライトを複数のキャンバスに追加する場合 .clone を付ける
scene1.add( lightd1.clone() );


//オブジェクト

const detail = 81;

//【キャンバス１】
let func1 = function(u,v){
    let x, y, z;
    x = u;
    y = v;
    z = Math.atan(x*y)*2;
    return [x,y,z];
}

let func_const = function(u, v){
    let x, y, z;
    x = u;
    y = v;
    z = -4;
    return [x, y, z];
}


let func1x = function(u, v){
    return v / (u*u*v*v+1) * 2;
};

let func1y = function(u, v){
    return u / (u*u*v*v+1) * 2;
}




let vts1 = parametric_vtsC(func1, [-1.5*PI,1.5*PI], [-1.5*PI,1.5*PI], detail, detail);
let index_mesh = parametric_indexC(detail, detail);


let x1 = 1.5*PI, y1 = 1.5*PI, d1 = 1;

let vts1b = [ abc1(x1+d1,y1,func1(x1,y1)[2]+func1x(x1,y1)*d1), abc1(x1,y1+d1,func1(x1,y1)[2]+func1y(x1,y1)*d1), abc1(x1-d1,y1,func1(x1,y1)[2]-func1x(x1,y1)*d1), abc1(x1,y1-d1,func1(x1,y1)[2]-func1y(x1,y1)*d1) ];

function abc1(xa, ya, za){
    let xd, yd, zd, r1;
    let z1 = func1(x1,y1)[2];
    xd = xa - x1;
    yd = ya - y1;
    zd = za - z1;
    r1 = sqrt( xd**2 + yd**2 + zd**2)
    let d2 = 3;
    return [x1+xd/r1*d2, y1+yd/r1*d2, z1+zd/r1*d2];
}

let index1b = [[0,1,2],[2,3,0]];

let vts1c = points_vtsC([[x1, y1, func1(x1,y1)[2]]], 0.15);
let index1c = points_indexC(1);


let v1 = [1, 0, func1x(x1,y1)];
v1 = scaleset(v1, 1.5);
let vts_xgrad = [[x1, y1, func1(x1,y1)[2]], [x1+v1[0], y1+v1[1], func1(x1,y1)[2]+v1[2]]];

let xgrad_tube_vts = tube_vts1C(vts_xgrad, 0.08, 6);
let grad_tube_index = tube_indexC(1,6);

let v2 = [0, 1, func1y(x1,y1)];
v2 = scaleset(v2, 1.5);
let vts_ygrad = [[x1, y1, func1(x1,y1)[2]], [x1+v2[0], y1+v2[1], func1(x1,y1)[2]+v2[2]]];

let ygrad_tube_vts = tube_vts1C(vts_ygrad, 0.08, 6);



let list1 = [];
for(let i=0; i<=10; i++) list1.push(3*PI/10*i - 1.5*PI);
let utubes_vts = tubeU_vtsC(func1, list1, [-1.5*PI, 1.5*PI], 40, 0.04, 6);
let vtubes_vts = tubeV_vtsC(func1, list1, [-1.5*PI, 1.5*PI], 40, 0.04, 6);
let utubes_vts0 = tubeU_vtsC(func_const, list1, [-1.5*PI, 1.5*PI], 1, 0.04, 6);
let vtubes_vts0 = tubeV_vtsC(func_const, list1, [-1.5*PI, 1.5*PI], 1, 0.04, 6);

let uvtube_index = tube_indexC(40, 6, list1.length);
let uvtube_index0 = tube_indexC(1, 6, list1.length);




let slice1_vts, slice2_vts;
slice1_vts = uslice_vtsC(func1, y1, [-1.5*PI, 1.5*PI], 40, -4);
slice2_vts = vslice_vtsC(func1, x1, [-1.5*PI, 1.5*PI], 40, -4);
let slice_index = ribbon_indexC(40);



//スケール
let sc1 = 0.5;


scene1.add( createMeshC("vts1c", index1c, {color:0x00ff00, scale:sc1}) );   //球

scene1.add( createMeshC("xgrad_tube_vts", grad_tube_index, {color:0xff0000, scale:sc1}) );  //傾き
scene1.add( createMeshC("ygrad_tube_vts", grad_tube_index, {color:0x0000ff, scale:sc1}) );   //傾き

scene1.add( createMeshC(utubes_vts, uvtube_index, {color:0xffffff, scale:sc1}));    //曲面上のグリッド
scene1.add( createMeshC(vtubes_vts, uvtube_index, {color:0xffffff, scale:sc1}));
scene1.add( createMeshC(utubes_vts0, uvtube_index0, {color:0xffffff, scale:sc1}));  //床グリッド
scene1.add( createMeshC(vtubes_vts0, uvtube_index0, {color:0xffffff, scale:sc1}));

scene1.add( createMeshC("slice1_vts", slice_index, {color:0xff6600, scale:sc1}));   //スライス
scene1.add( createMeshC("slice2_vts", slice_index, {color:0x00aaff, scale:sc1}));   

scene1.add( createMeshC("vts1b", index1b, {color:0x00aa00, scale:sc1, opacity:1}) );  //接平面
scene1.add(createMeshC(vts1, index_mesh, {color:0xffff00, scale:sc1, opacity:0.52}));    //曲面




function scaleset(arg, sc){
    let d1 = sqrt(arg[0]**2 + arg[1]**2 + arg[2]**2);
    return [arg[0]/d1*sc, arg[1]/d1*sc, arg[2]/d1*sc];
}


slider3.func = () =>{
   

    let sv3 = Math.floor(slider3.value*10) / 10;
    if(3 * PI * sv3 - 1.5 * PI != x1){

        x1 = 3 * PI * sv3 - 1.5 * PI;
    
        //vts1b = [ [x1+d1,y1,func1(x1,y1)[2]+func1x(x1,y1)*d1], [x1,y1+d1,func1(x1,y1)[2]+func1y(x1,y1)*d1], [x1-d1,y1,func1(x1,y1)[2]-func1x(x1,y1)*d1], [x1,y1-d1,func1(x1,y1)[2]-func1y(x1,y1)*d1] ];
        vts1b = [ abc1(x1+d1,y1,func1(x1,y1)[2]+func1x(x1,y1)*d1), abc1(x1,y1+d1,func1(x1,y1)[2]+func1y(x1,y1)*d1), abc1(x1-d1,y1,func1(x1,y1)[2]-func1x(x1,y1)*d1), abc1(x1,y1-d1,func1(x1,y1)[2]-func1y(x1,y1)*d1) ];
        vts1c = points_vtsC([[x1, y1, func1(x1,y1)[2]]], 0.15);

        v1 = [1, 0, func1x(x1,y1)];
        v1 = scaleset(v1, 1.5);
        vts_xgrad = [[x1, y1, func1(x1,y1)[2]], [x1+v1[0], y1+v1[1], func1(x1,y1)[2]+v1[2]]];
        xgrad_tube_vts = tube_vts1C(vts_xgrad, 0.08, 6);

        v2 = [0, 1, func1y(x1,y1)];
        v2 = scaleset(v2, 1.5);
        vts_ygrad = [[x1, y1, func1(x1,y1)[2]], [x1+v2[0], y1+v2[1], func1(x1,y1)[2]+v2[2]]];
        ygrad_tube_vts = tube_vts1C(vts_ygrad, 0.08, 6);

        
        slice2_vts = vslice_vtsC(func1, x1, [-1.5*PI, 1.5*PI], 40, -4);

        updateObjectC( scene1 );

    }
}

slider4.func = () =>{
    
    let sv4 = Math.floor(slider4.value*10) / 10;

    if(y1 != 3 * PI * sv4 - 1.5 * PI){

        y1 = 3 * PI * sv4 - 1.5 * PI;

        vts1b = [ abc1(x1+d1,y1,func1(x1,y1)[2]+func1x(x1,y1)*d1), abc1(x1,y1+d1,func1(x1,y1)[2]+func1y(x1,y1)*d1), abc1(x1-d1,y1,func1(x1,y1)[2]-func1x(x1,y1)*d1), abc1(x1,y1-d1,func1(x1,y1)[2]-func1y(x1,y1)*d1) ];
        vts1c = points_vtsC([[x1, y1, func1(x1,y1)[2]]], 0.15);

        v1 = [1, 0, func1x(x1,y1)];
        v1 = scaleset(v1, 1.5);
        vts_xgrad = [[x1, y1, func1(x1,y1)[2]], [x1+v1[0], y1+v1[1], func1(x1,y1)[2]+v1[2]]];
        xgrad_tube_vts = tube_vts1C(vts_xgrad, 0.08, 6);

        v2 = [0, 1, func1y(x1,y1)];
        v2 = scaleset(v2, 1.5);
        vts_ygrad = [[x1, y1, func1(x1,y1)[2]], [x1+v2[0], y1+v2[1], func1(x1,y1)[2]+v2[2]]];
        ygrad_tube_vts = tube_vts1C(vts_ygrad, 0.08, 6);

        slice1_vts = uslice_vtsC(func1, y1, [-1.5*PI, 1.5*PI], 40, -4);

        updateObjectC( scene1 );

    }

}







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






//レンダリング
renderer1.render(scene1, camera1);
animateC();



