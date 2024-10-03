//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（どちらかは必須）
addPerspectiveCameraC({fov:40});    //透視投影カメラ　第1引数：オプション（省略可）
//addOrthographicCameraC(); //平行投影カメラ　第1引数：オプション（省略可）


//環境光ライト
addAmbientLightC(0xffffff, 0.3);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.8, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.2, -1, -1, 1);


//レンダリング（必須）
animateC();


//スライダーの値を使用した関数
const func1C = function(u,v){
    let x, y, z;
    x = u;
    y = u*u - v*v;
    z = v;
    return [x,y,z];
}


//頂点リストの生成
let vts1 = parametric_vtsC(func1C, [-1,1], [-1,1], 50, 50);  

//ポリゴンインデックスリストの生成
let index1 = parametric_indexC(50, 50);

let utubes_vts1 = tubeU_vtsC(func1C, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1], [-1,1], 50, 0.02, 6);
let vtubes_vts1 = tubeV_vtsC(func1C, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1], [-1,1], 50, 0.02, 6);

let utubes_index1 = tube_indexC(50, 6, 11);
let vtubes_index1 = tube_indexC(50, 6, 11);


//グラフィックの追加
addMeshC(vts1, index1, {color:0xffcc00, scale:2});
addMeshC(utubes_vts1, utubes_index1, {color:0xff0000, scale:2});
addMeshC(vtubes_vts1, vtubes_index1, {color:0x0000ff, scale:2});


/*
addMeshC 第1引数：頂点リスト名（""で囲う,スライダーを使わない場合は""を付けても付けなくてもよい）, 第2引数ポリゴンインデックスリスト名, 第3引数：オプション
parametric_vtsC 　第1引数：(u,v)->(x,y,z)の関数, 第2引数：uの範囲, 第3引数：vの範囲, 第4引数：u方向の分割数, 第5引数：v方向の分割数
parametric_indexC　第1引数：u方向の分割数, 第2引数：v方向の分割数

tubeU_vtsC() ：　媒介変数で表された曲面上のu曲線をチューブで表し、その集合の頂点リストを生成する
　第1引数：(u,v)->(x,y,z)の関数, 第2引数：各u曲線のvの値（リスト）, 第3引数：uの範囲, 第4引数：u方向の分割数, 第5引数：チューブの半径, 第6引数：チューブの断面の角数

tubeV_vtsC() ：　媒介変数で表された曲面上のv曲線をチューブで表し、その集合の頂点リストを生成する
　第1引数：(u,v)->(x,y,z)の関数, 第2引数：各v曲線のuの値（リスト）, 第3引数：vの範囲, 第4引数：v方向の分割数, 第5引数：チューブの半径, 第6引数：チューブの断面の角数

tube_indexC()　：　チューブ（の集合）のポリゴンインデックスリストを生成する。チューブが複数ある場合、それらの分割数、断面の角数は同じである必要がある
　第1引数：分割数, 第2引数：断面の角数, 第3引数：チューブの本数（チューブ1本の場合は省略してもよい）

[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]
の代わりに for文を使って
let listv = new Array(8);   //長さ8の配列を生成
for(let i=-1; i<=1; i+=0.2)  listv[i] = i;  //iを-1から1まで0.2刻みに動かす
と記述して、listvを入れてもよい。
*/