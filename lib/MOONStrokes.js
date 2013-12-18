/*
 * MOONStroks.js Ver.1.8.0 (2013/12/15) by fintopo
 * https://github.com/fintopo/MOONStrokes
 * 
 * enchantMOONのストロークデータを管理、加工するライブラリ
 */
(function(){
  var MOONStrokes = this.MOONStrokes = this.MOONStrokes || {};
  //
  var each = MOONStrokes.each = function(arr, callback){
    var i;
    var count = arr.length;
    for (i=0; i<count; i++) {
      callback(arr[i], i);
    }
  };
  var map = MOONStrokes.map = function(arr, callback){
    var ret = [];
    each(arr, function(value, i){
      var v = callback(value, i);
      if (v) {
        ret.push(v);
      }
    });
    return ret;
  };
  var reduce = MOONStrokes.reduce = function(arr, callback, ret){
    each(arr, function(value, i){
      ret = callback(ret, value, i);
    });
    return ret;
  };
  var times = MOONStrokes.times = function(count, callback) {
    var i;
    for (i=0; i<count; i++) {
      callback(i);
    }
  };
  var min = MOONStrokes.min = function(arr, callback){
    reduce(arr, function(memo, value, i){
      var v = callback(value, i);
      if (v < memo.computed) {
        memo.value = value;
      }
      return memo;
    }, {
      computed : Infinity
      ,value: null
    });
  };
  var max = MOONStrokes.max = function(arr, callback){
    reduce(arr, function(memo, value, i){
      var v = callback(value, i);
      if (v > memo.computed) {
        memo.value = value;
      }
      return memo;
    }, {
      computed : -Infinity
      ,value: null
    });
  };
  var isObject = MOONStrokes.isObject = function(obj) {
    return obj === Object(obj);
  };
  // 三角関数
  // 回転時に繰り返し使うので値を保持するようにした。
  // 90度の時だけ固定値を使用する。（Math関数に誤差があるため）
  var cos = (function(){
    var values = {};
    var values90 = [1, 0, -1, 0];
    return function(deg){
      var ret = values[deg];
      if (!ret) {
        if (deg % 90 == 0) {
          var n = Math.floor(deg / 90) % 4;
          n = (n < 0) ? n+4 : n;
          ret = values90[n];
        } else {
          ret = Math.cos(deg * (Math.PI / 180));
        }
        values[deg] = ret;
      }
      return ret;
    };
  })();
  var sin = (function(){
    var values = {};
    var values90 = [0, 1, 0, -1];
    return function(deg){
      var ret = values[deg];
      if (!ret) {
        if (deg % 90 == 0) {
          var n = Math.floor(deg / 90) % 4;
          ret = values90[n];
        } else {
          ret = Math.sin(deg * (Math.PI / 180));
        }
        values[deg] = ret;
      }
      return ret;
    };
  })();

  /* 
   * MOONStrokes.Point 
   */ 
  var Point = MOONStrokes.Point = function(x, y, p) {
    this.x = x;
    this.y = y;
    this.p = p || 1;
  };
  Point.prototype.enlarge = function(rate) {
    // 大きさをrate倍にする
    this.x *= rate;
    this.y *= rate;
    this.p *= rate;
  };
  Point.prototype.moveTo = function(x, y) {
    // 座標を(x, y)だけ移動する。
    this.x += x;
    this.y += y;
  };
  Point.prototype.rotate = function(deg) {
    // deg度回転する
    // deg: 正で右回転、負で左回転
    var cos_deg = cos(deg);
    var sin_deg = sin(deg);
    var x0 = this.x;
    var y0 = this.y;
    this.x = x0 * cos_deg - y0 * sin_deg;
    this.y = x0 * sin_deg + y0 * cos_deg;
  };
  Point.prototype.inRange = function(x0, y0, x1, y1){
    // (x0, y0)-(x1, y1)の範囲に含まれているか調べる
    // 戻り値： 含まれている場合に true、含まれていない倍に false
    return (x0 <= this.x) && (this.x <= x1)
        && (y0 <= this.y) && (this.y <= y1);
  };
  Point.prototype.getData = function(){
    return [this.x, this.y, this.p];
  };

  /* 
   * MOONStrokes.Stroke 
   */ 
  var Stroke = MOONStrokes.Stroke = function(stroke) {
    stroke || (stroke = {});
    this.info = {
      width: stroke.width || 2.5
      ,color: stroke.color || -1
      ,type: stroke.type || "pen"
      ,data: stroke.data || []
    };
    //
    this.points = [];
    var data = this.info.data;
    var count = data.length;
    for (var i=0; i<count; i+=3) {
      this.add(data[i], data[i+1], data[i+2]);
    }
    this._setLength();
  };
  Stroke.prototype.each = function(callback){
    each(this.points, callback);
  };
  Stroke.prototype.map = function(callback){
    return map(this.points, callback);
  };
  Stroke.prototype.reduce = function(callback, ret){
    return reduce(this.points, callback, ret);
  };
  Stroke.prototype.setWidth = function(width){
    this.info.width = width;
  };
  Stroke.prototype.setColor = function(color){
    this.info.color = color;
  };
  Stroke.prototype.leastSquaresMethod = function(mode){
    // 最小二乗法（1次式）
    // mode: 計算の向き。falseはx軸基準、trueはy軸基準。
    var matrix;
    if (mode) {
      matrix = this.reduce(function(memo, point){
        return {
          a01: memo.a01 + point.y
          ,a02: memo.a02 + point.x
          ,a11: memo.a11 + point.y * point.y
          ,a12: memo.a12 + point.y * point.x
        };
      }, {
        a01: 0
        ,a02: 0
        ,a11: 0
        ,a12: 0
      });
    } else {
      matrix = this.reduce(function(memo, point){
        return {
          a01: memo.a01 + point.x
          ,a02: memo.a02 + point.y
          ,a11: memo.a11 + point.x * point.x
          ,a12: memo.a12 + point.x * point.y
        };
      }, {
        a01: 0
        ,a02: 0
        ,a11: 0
        ,a12: 0
      });
    }
    //
    return {
      b: (matrix.a02 * matrix.a11 - matrix.a01 * matrix.a12) / (this.length * matrix.a11 - matrix.a01 * matrix.a01)
      ,a: (this.length * matrix.a12 - matrix.a01 * matrix.a02) / (this.length * matrix.a11 - matrix.a01 * matrix.a01)
    };
  };
  Stroke.prototype.getInclination = function(){
    // ストロークの傾きを得る
    // ストロークの点から最小二乗法で1次式を計算し、その傾きをストーロークの傾きとする。
    var ret;
    var w = this.right() - this.left();
    var h = this.bottom() - this.top();
    return this.leastSquaresMethod(w < h);
  };
  Stroke.prototype.enlarge = function(rate) {
    // 大きさをrate倍にする
    this.each(function(point){
      return point.enlarge(rate);
    });
    //
    return this;
  };
  Stroke.prototype.moveTo = function(x, y) {
    // ストロークを(x, y)だけ移動する。
    this.each(function(point){
      return point.moveTo(x, y);
    });
    //
    return this;
  };
  Stroke.prototype.rotate = function(deg) {
    // deg度回転する
    // deg: 正で右回転、負で左回転
    this.each(function(point){
      point.rotate(deg);
    });
    //
    return this;
  };
  Stroke.prototype.eraseStrokes = function(x0, y0, x1, y1){
    // (x0, y0)-(x1, y1)の範囲のポイントを削除し、ストロークを分割する。
    // 戻り値：分割したストロークの配列
    var _this = this;
    var strokes = this.reduce(function(memo, point){ // 範囲内のポイントを削除し、ストロークを分割する。
      if (point.inRange(x0, y0, x1, y1)) { // 削除対象
        memo.add_mode = false; // 次から新しいストロークにする
      } else { // 残す点
        if (memo.add_mode) { // 追記モード
          var last = memo.strokes.length - 1;
          memo.strokes[last].add(point);
        } else { // 新しいストロークとして追加
          var stroke = new Stroke(_this.info);
          stroke.add(point);
          memo.strokes.push(stroke);
          memo.add_mode = true;
        }
      }
      return memo;
    }, {
      add_mode: false // 追記モード
      ,strokes: [] // 分割したストローク
    }).strokes;
    // 不完全なストロークを削除する
    return reduce(strokes, function(ret, stroke){
      if (stroke.length > 2) {
        ret.push(stroke);
      }
      return ret;
    }, []);
  };
  Stroke.prototype.smooth = function(count){
    // ストロークの平滑化処理
    // 現在のストロークに対して移動平均を計算する
    // count: 移動平均を計算する要素数。前後count個に対して計算する
    var _this = this;
    count = count || 2;
    //
    var points = _this.points.slice(); // _.clone()
    _this.points = [];      
    var buffers = [];      
    var add_point = function(){
      var len = buffers.length;
      var x = reduce(buffers, function(sum, point){
        return sum + point.x;
      }, 0) / len;
      var y = reduce(buffers, function(sum, point){
        return sum + point.y;
      }, 0) / len;
      var p = reduce(buffers, function(sum, point){
        return sum + point.p;
      }, 0) / len;
      _this.add(x, y, p);
    };
    times((count+1), function(){
      var point = points.shift();
      buffers.push(point);        
    });
    add_point();
    each(points, function(point){
      buffers.push(point);        
      add_point();
      buffers.shift();
    });
    times(count, function(){
      add_point();
      buffers.shift();
    });
    //
    return this;
  };
  Stroke.prototype.left = function(){
    return min(this.points, function(point){
      return point.x;
    }).x;
  };
  Stroke.prototype.top = function(){
    return min(this.points, function(point){
      return point.y;
    }).y;
  };
  Stroke.prototype.right = function(){
    return max(this.points, function(point){
      return point.x;
    }).x;
  };
  Stroke.prototype.bottom = function(){
    return max(this.points, function(point){
      return point.y;
    }).y;
  };
  Stroke.prototype.minStrength = function(){
    return min(this.points, function(point){
      return point.p;
    }).p;
  };
  Stroke.prototype.maxStrength = function(){
    return max(this.points, function(point){
      return point.p;
    }).p;
  };
  Stroke.prototype.aveStrength = function(){
    return reduce(this.points, function(sum, point){
      return sum + point.p;
    }, 0) / this.points.length;
  };
  Stroke.prototype.sumStrength = function(){
    return reduce(this.points, function(sum, point){
      return sum + point.p;
    }, 0);
  };
  Stroke.prototype.add = function(x, y, p){
    var point;
    if (isObject(x)) { // Pointオブジェクトの場合
      point = x;
    } else {
      point = new Point(x, y, p);
    }
    var ret = this.points.push(point);
    this._setLength();
    return ret;
  };
  Stroke.prototype.getData = function(){
    var _this = this;
    //
    this.info.data = [];
    this.each(function(point){
      Array.prototype.push.apply(_this.info.data, point.getData());
    });
    return this.info;
  };
  Stroke.prototype._setLength = function(){
    this.length = this.points.length;
  };

  /*
   * MOONStrokes.Paper
   */
  var Paper = MOONStrokes.Paper = function(id, DEBUG) {
    this.id = id;
    this.info = (id) ? DEBUG || MOON.getPaperJSON(this.id) : {
      "version": "0.2"
      ,"x":0
      ,"y":0
      ,"width":768
      ,"height":1024
      ,"scale":1.0
      ,"color":-16777216
      ,"transparent":false
      ,"strokes":[]
    };
    this.strokes = map(this.info.strokes, function(stroke){
      return new Stroke(stroke);
    });
    this._setLength();
  };
  Paper.prototype.each = function(callback) {
    each(this.strokes, callback);
  };
  Paper.prototype.map = function(callback) {
    return map(this.strokes, callback);
  };
  Paper.prototype.reduce = function(callback) {
    return reduce(this.strokes, callback);
  };
  Paper.prototype.enlarge = function(rate) {
    // 大きさをrate倍にする
    var w = this.info.width * (rate - 1) / 2;
    var h = this.info.height * (rate - 1) / 2;
    this.each(function(stroke){
      return stroke.enlarge(rate);
    });
    this.moveTo(-w, -h);
  };
  Paper.prototype.moveTo = function(x, y) {
    // ストロークを(x, y)だけ移動する。
    this.each(function(stroke){
      return stroke.moveTo(x, y);
    });
  };
  Paper.prototype.rotate = function(x, y, deg) {
    // (x, y)を中心としてdeg度回転する
    // deg: 正で右回転、負で左回転
    this.each(function(stroke){
      stroke.moveTo(-x, -y).rotate(deg).moveTo(x, y);
    });
  };
  Paper.prototype.eraseStrokes = function(x0, y0, x1, y1){
    // (x0, y0)-(x1, y1)の範囲のストロークを削除する
    // ストロークの一部が含まれる場合は、ストロークが分割される。
    var strokes = [];
    this.each(function(stroke){
      Array.prototype.push.apply(strokes, stroke.eraseStrokes(x0, y0, x1, y1));
    });
    this.strokes = strokes;
    this._setLength();
  };
  Paper.prototype.addLine = function(size){
    // 長さsizeの線分をページに追加する
    var stroke = new Stroke();
    times(size, function(n){
      stroke.add(n, 0);
    });
    this.push(stroke);
    return stroke;
  };
  Paper.prototype.addSquare = function(size){
    return this.addRectangle(size, size);
  };
  Paper.prototype.addRectangle = function(size1, size2){
    // 2辺がsize1, size2の長方形をページに追加する
    var stroke = new Stroke();
    times(size1, function(n){
      stroke.add(n, 0);
    });
    times(size2, function(n){
      stroke.add(size1, n);
    });
    times(size1, function(n){
      stroke.add(size1-n, size2);
    });
    times(size2, function(n){
      stroke.add(0, size2-n);
    });
    this.push(stroke);
    return stroke;
  };
  Paper.prototype.addRegularPolygon = function(size, number){
    // 正多角形を追加する
    // size: 大きさ
    // number: 角数
    var stroke = new Stroke();
    var deg = 360 / number;
    times(number, function(i){
      var t = i * deg;
      var x = size * cos(t);
      var y = size * sin(t);
      stroke.add(x, y);
      //
      var t = (i+1) * deg;
      var x = size * cos(t);
      var y = size * sin(t);
      stroke.add(x, y);
    });
    this.push(stroke);
    return stroke;
  };
  Paper.prototype.pop = function(){
    var ret = this.strokes.pop();
    this._setLength();
    return ret;
  };
  Paper.prototype.push = function(stroke){
    var ret = this.strokes.push(stroke);
    this._setLength();
    return ret;
  };
  Paper.prototype.mergePaper = function(paper){
    Array.prototype.push.apply(this.strokes, paper.strokes);
    this._setLength();
    return this;
  };
  Paper.prototype.clear = function(){
    this.strokes = [];
  };
  Paper.prototype.convertInfoStrokes = function(){
    this.info.strokes = this.map(function(stroke){
      var ret = stroke.getData();
      if (ret.data.length > 0) {
        return ret;
      }
    });
  };
  Paper.prototype.save = function(){
    this.convertInfoStrokes();
    MOON.setPaperJSON(this.id, this.info);
  };
  Paper.prototype._setLength = function(){
    this.length = this.strokes.length;
  };

  /*
   * MOONStrokes.Page
   */
  var Page = MOONStrokes.Page = function() {
    // 現在のページデータを取得する
    this.info = MOON.getCurrentPage();
    this.paper = new Paper(this.info.backing);
  };
}).call(window);