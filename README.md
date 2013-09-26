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
### info
### strokes
### length
### eraseStrokes
### rectangle
### pop
### push
### save

## MOONStrokes.Stroke 

### info
### points
### length
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
### add
### getData

## MOONStrokes.Point

### x
### y
### p
### inRange
### getData


## ライセンス

MIT License
