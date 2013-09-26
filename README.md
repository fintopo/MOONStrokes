MOONStrokes
===========

enchantMOONのストロークデータを管理、加工するライブラリ

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
### save
### eraseStrokes
### rectangle
### pop
### push
### moveTo

moveTo(x, y)

ページのストローク全体の位置を(x, y)だけ移動します。

## MOONStrokes.Stroke 

一本のストロークを表します。

### info
### points
### length
### add
### eraseStrokes
### beautifyLine
### left
### right
### top
### bottom
### minStrength
### maxStrength
### aveStrength
### sumStrength
### moveTo

moveTo(x, y)

ストロークの位置を(x, y)だけ移動します。

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

## ライセンス

MIT License
