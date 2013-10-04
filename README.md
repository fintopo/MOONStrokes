MOONStrokes
===========

enchantMOONのストロークデータを管理、加工するライブラリ

## 使用ライブラリ

[Underscore.js](http://underscorejs.org/)

## MOONStrokes.Page

ページを管理するオブジェクトです。
API MOON.getCurrentPage 呼び出して展開します。

### info

API MOON.getCurrentPage の結果を保持します。

### paper

info.backingを展開したPaperオブジェクトです。


## MOONStrokes.Paper

ストロークの集まりを管理するオブジェクトです。
API MOON.getPaperJSONを呼び出して、展開します。


### id

API MOON.getPaperJSONを呼び出した時のpaperIdです。

### info

API MOON.getPaperJSONの結果を保持します。

### strokes

MOONStrokes.Strokeの配列です。

### length

ストロークの数

### save

API MOON.setPaperJSONを呼び出してストロークを書き込みます。

### eraseStrokes
### rectangle
### pop
### push
### moveTo

moveTo(x, y)

ページのストローク全体の位置を(x, y)だけ移動します。

### rotate

rotate(x, y, deg)

(x, y)を中心としてdeg度回転する
deg: 正で右回転、負で左回転

### enlarge

enlarge(rate)

ページ全体を拡大します。
rateは拡大率です。1未満で縮小になります。

## MOONStrokes.Stroke 

一本のストロークを表します。

### info
### points

MOONStrokes.Pointの配列です。

### length

点の数

### add
### eraseStrokes
### beautifyLine

### leastSquaresMethod

leastSquaresMethod(mode)

ストロークのPointから最小二乗法で一次式を得ます。

+ mode:
      計算の向き。falseはx軸基準、trueはy軸基準。

戻り値は、下記の値を持つオブジェクトです。

+ a:
      傾き
+ b:
      切片


### left

ストロークの左端の座標を返します。

### right

ストロークの右端の座標を返します。

### top

ストロークの上端の座標を返します。

### bottom

ストロークの下端の座標を返します。

### minStrength

ストローク中の筆圧の最小値を返します。

### maxStrength

ストローク中の筆圧の最大値を返します。

### aveStrength

ストローク中の筆圧の平均値を返します。

### sumStrength

ストローク中の筆圧の合計値を返します。

### moveTo

moveTo(x, y)

ストロークの位置を(x, y)だけ移動します。

### rotate

rotate(x, y, deg)

(x, y)を中心としてdeg度回転する
deg: 正で右回転、負で左回転

### enlarge

enlarge(rate)

ストロークを拡大します。
rateは拡大率です。1未満で縮小になります。

## MOONStrokes.Point

ストローク中の各点を表します。

### x

ポイントのX座標です。

### y

ポイントのY座標です。

### p

ポイントの筆圧です。

### inRange
### moveTo

moveTo(x, y)

ポイントの位置を(x, y)だけ移動します。

### rotate

rotate(x, y, deg)

(x, y)を中心としてdeg度回転する
deg: 正で右回転、負で左回転
      
### enlarge

enlarge(rate)

ポイントを拡大します。
rateは拡大率です。1未満で縮小になります。
筆圧も同じ割合で変化します。

## ライセンス

MIT License
