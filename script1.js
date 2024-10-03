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
    y = u*u + v*v - 1;
    z = v;
    return [x,y,z];
}


//頂点リストの生成
let vts1 = parametric_vtsC(func1C, [-1,1], [-1,1], 50, 50);  

//ポリゴンインデックスリストの生成
let index1 = parametric_indexC(50, 50);

//グラフィックの追加
addMeshC(vts1, index1, {color:0xff6600, scale:2});



/*
addMeshC 第1引数：頂点リスト名（""で囲う,スライダーを使わない場合は""を付けても付けなくてもよい）, 第2引数ポリゴンインデックスリスト名, 第3引数：オプション
parametric_vtsC 　第1引数：(u,v)->(x,y,z)の関数, 第2引数：uの範囲, 第3引数：vの範囲, 第4引数：u方向の分割数, 第5引数：v方向の分割数
parametric_indexC　第1引数：u方向の分割数, 第2引数：v方向の分割数
*/