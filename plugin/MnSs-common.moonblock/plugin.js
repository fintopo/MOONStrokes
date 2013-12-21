//リソースの追加
enchant.block.plugin.PluginManager.instance.addResource("en-us.blocks", {"categories":{
  "strokesCommon":"MnSs Common"
}});
enchant.block.plugin.PluginManager.instance.addResource("ja-jp.blocks", {"categories":{
  "strokesCommon":"MnSs Common"
}});

//キットの定義
enchant.block.blocks.strokesCommon = {
    desc: {
        blockCategory: RES('blocks.categories.strokesCommon')
    }
};
enchant.block.plugin.PluginManager.instance.addPlugin(enchant.block.blocks.strokesCommon);

// ブロックの定義
enchant.block.blocks.strokesCommon.Page = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ページ操作');
        this.addFoldButton('+', '-', [ 'doPage' ]);
        this.addBR();
        this.addMultipleReceptor('evalable', 'doPage');
        this.addBR();
        this.iteratize();
        this.script = '(function(page){'
                      + '<% doPage(\n) %> '
                      + 'page.paper.save();'
                      + '})(new MOONStrokes.Page());';
    }
});

enchant.block.blocks.strokesCommon.Paper = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('グループを生成し');
        this.addSelectForm({
          'ページ': 'page.paper'
          ,'グループ': 'paper'
        }, 'master');
        this.addLabel('に追加する');
        this.addFoldButton('+', '-', [ 'doStroke' ]);
        this.addBR();
        this.addMultipleReceptor('evalable', 'doStroke');
        this.addBR();
        this.iteratize();
        this.script = '(function(paper, master){'
                      + '<% doStroke(\n) %> '
                      + 'master.mergePaper(paper);'
                      + '})(new MOONStrokes.Paper(), <% master %>);';
    }
});

enchant.block.blocks.strokesCommon.eachStrokes = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addSelectForm({
          'ページ': 'page.paper'
          ,'グループ': 'paper'
        }, 'master');
        this.addLabel('の全てのストロークに対して以下の処理をする');
        this.addFoldButton('+', '-', [ 'doStroke' ]);
        this.addBR();
        this.addMultipleReceptor('evalable', 'doStroke');
        this.addBR();
        this.iteratize();
        this.script = 'MOONStrokes.each(<% master %>.strokes, function(stroke){'
                      + '<% doStroke(\n) %> '
                      + '});';
    }
});

enchant.block.blocks.strokesCommon.times = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('以下の処理を');
        this.addReceptor('property number', 'count');
        this.addLabel('回する');
        this.addFoldButton('+', '-', [ 'doStroke' ]);
        this.addBR();
        this.addMultipleReceptor('evalable', 'doStroke');
        this.addBR();
        this.iteratize();
        this.script = 'MOONStrokes.times(<% count %>, function(i){'
                      + '<% doStroke(\n) %> '
                      + '});';
    }
});

enchant.block.blocks.strokesCommon.getTimesIndex = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('インデックスを');
        this.addReceptor('property', 'property');
        this.addLabel('に代入する');
        this.iteratize();
        this.script = '<% property %> = i;';
    }
});

enchant.block.blocks.strokesCommon.getStroke = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ページの');
        this.addSelectForm({
          '最後のストロークを': 'pop'
        }, 'op');
        this.addLabel('グループに追加する');
        this.iteratize();
        this.script = 'paper.push(page.paper.<% op %>());';
    }
});

enchant.block.blocks.strokesCommon.clearPage = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ページをクリアする');
        this.addBR();
        this.iteratize();
        this.script = 'page.paper.clear();';
    }
});

enchant.block.blocks.strokesCommon.pushStroke = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ストロークをグループに追加する');
        this.iteratize();
        this.script = 'paper.push(stroke);';
    }
});

enchant.block.blocks.strokesCommon.MOONStrokes = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('MOONStrokes');
        this.iteratize();
        this.script = '(function(){var e=this.MOONStrokes=this.MOONStrokes||{};var j=e.each=function(o,r){var p;var q=o.length;for(p=0;p<q;p++){r(o[p],p)}};var b=e.map=function(o,q){var p=[];j(o,function(t,s){var r=q(t,s);if(r){p.push(r)}});return p};var h=e.reduce=function(o,q,p){j(o,function(s,r){p=q(p,s,r)});return p};var a=e.times=function(p,q){var o;for(o=0;o<p;o++){q(o)}};var d=e.min=function(o,q){var p=h(o,function(s,u,t){var r=q(u,t);if(r<s.computed){s.computed=r;s.value=u}return s},{computed:Infinity,value:null});return p.value};var i=e.max=function(o,q){var p=h(o,function(s,u,t){var r=q(u,t);if(r>s.computed){s.computed=r;s.value=u}return s},{computed:-Infinity,value:null});return p.value};var l=e.isObject=function(o){return o===Object(o)};var k=(function(){var o={};var p=[1,0,-1,0];return function(r){var q=o[r];if(!q){if(r%90==0){var s=Math.floor(r/90)%4;s=(s<0)?s+4:s;q=p[s]}else{q=Math.cos(r*(Math.PI/180))}o[r]=q}return q}})();var g=(function(){var o={};var p=[0,1,0,-1];return function(r){var q=o[r];if(!q){if(r%90==0){var s=Math.floor(r/90)%4;q=p[s]}else{q=Math.sin(r*(Math.PI/180))}o[r]=q}return q}})();var f=e.Point=function(o,r,q){this.x=o;this.y=r;this.p=q||1};f.prototype.enlarge=function(o){this.x*=o;this.y*=o;this.p*=o};f.prototype.moveTo=function(o,p){this.x+=o;this.y+=p};f.prototype.rotate=function(q){var s=k(q);var r=g(q);var o=this.x;var p=this.y;this.x=o*s-p*r;this.y=o*r+p*s};f.prototype.inRange=function(p,r,o,q){return(p<=this.x)&&(this.x<=o)&&(r<=this.y)&&(this.y<=q)};f.prototype.getData=function(){return[this.x,this.y,this.p]};var c=e.Stroke=function(r){r||(r={});this.info={width:r.width||2.5,color:r.color||-1,type:r.type||"pen",data:r.data||[]};this.points=[];var q=this.info.data;var p=q.length;for(var o=0;o<p;o+=3){this.add(q[o],q[o+1],q[o+2])}this._setLength()};c.prototype.each=function(o){j(this.points,o)};c.prototype.map=function(o){return b(this.points,o)};c.prototype.reduce=function(p,o){return h(this.points,p,o)};c.prototype.setWidth=function(o){this.info.width=o};c.prototype.setColor=function(o){this.info.color=o};c.prototype.leastSquaresMethod=function(p){var o;if(p){o=this.reduce(function(r,q){return{a01:r.a01+q.y,a02:r.a02+q.x,a11:r.a11+q.y*q.y,a12:r.a12+q.y*q.x}},{a01:0,a02:0,a11:0,a12:0})}else{o=this.reduce(function(r,q){return{a01:r.a01+q.x,a02:r.a02+q.y,a11:r.a11+q.x*q.x,a12:r.a12+q.x*q.y}},{a01:0,a02:0,a11:0,a12:0})}return{b:(o.a02*o.a11-o.a01*o.a12)/(this.length*o.a11-o.a01*o.a01),a:(this.length*o.a12-o.a01*o.a02)/(this.length*o.a11-o.a01*o.a01)}};c.prototype.getInclination=function(){var p;var o=this.right()-this.left();var q=this.bottom()-this.top();return this.leastSquaresMethod(o<q)};c.prototype.enlarge=function(o){this.each(function(p){return p.enlarge(o)});return this};c.prototype.moveTo=function(o,p){this.each(function(q){return q.moveTo(o,p)});return this};c.prototype.rotate=function(o){this.each(function(p){p.rotate(o)});return this};c.prototype.eraseStrokes=function(q,s,p,r){var t=this;var o=this.reduce(function(v,u){if(u.inRange(q,s,p,r)){v.add_mode=false}else{if(v.add_mode){var w=v.strokes.length-1;v.strokes[w].add(u)}else{var x=new c(t.info);x.add(u);v.strokes.push(x);v.add_mode=true}}return v},{add_mode:false,strokes:[]}).strokes;return h(o,function(u,v){if(v.length>2){u.push(v)}return u},[])};c.prototype.smooth=function(q){var s=this;q=q||2;var p=s.points.slice();s.points=[];var o=[];var r=function(){var u=o.length;var t=h(o,function(y,x){return y+x.x},0)/u;var w=h(o,function(y,x){return y+x.y},0)/u;var v=h(o,function(y,x){return y+x.p},0)/u;s.add(t,w,v)};a((q+1),function(){var t=p.shift();o.push(t)});r();j(p,function(t){o.push(t);r();o.shift()});a(q,function(){r();o.shift()});return this};c.prototype.rough=function(x,v,u,s,D,z){var t=this;var q=x/10;var p=v/10;var C=u/10;var y=s/10;var F=D/10;var E=z/10;var B=t.right()-t.left();var r=t.bottom()-t.top();var o=0;var A=0;t.each(function(G){o+=(Math.random()-0.5)*F;A+=(Math.random()-0.5)*E;var w=g(p*360*(G.y+A)/r)*C;var H=g(q*360*(G.x+o)/B)*y;G.moveTo(w,H)});return this};c.prototype.left=function(){return d(this.points,function(o){return o.x}).x};c.prototype.top=function(){return d(this.points,function(o){return o.y}).y};c.prototype.right=function(){return i(this.points,function(o){return o.x}).x};c.prototype.bottom=function(){return i(this.points,function(o){return o.y}).y};c.prototype.minStrength=function(){return d(this.points,function(o){return o.p}).p};c.prototype.maxStrength=function(){return i(this.points,function(o){return o.p}).p};c.prototype.aveStrength=function(){return h(this.points,function(p,o){return p+o.p},0)/this.points.length};c.prototype.sumStrength=function(){return h(this.points,function(p,o){return p+o.p},0)};c.prototype.add=function(q,t,s){var o;if(l(q)){o=q}else{o=new f(q,t,s)}var r=this.points.push(o);this._setLength();return r};c.prototype.getData=function(){var o=this;this.info.data=[];this.each(function(p){Array.prototype.push.apply(o.info.data,p.getData())});return this.info};c.prototype._setLength=function(){this.length=this.points.length};var n=e.Paper=function(p,o){this.id=p;this.info=(o)?o:(p)?MOON.getPaperJSON(this.id):{version:"0.2",x:0,y:0,width:768,height:1024,scale:1,color:-16777216,transparent:false,strokes:[]};this.strokes=b(this.info.strokes,function(q){return new c(q)});this._setLength()};n.prototype.each=function(o){j(this.strokes,o)};n.prototype.map=function(o){return b(this.strokes,o)};n.prototype.reduce=function(o){return h(this.strokes,o)};n.prototype.enlarge=function(q){var o=this.info.width*(q-1)/2;var p=this.info.height*(q-1)/2;this.each(function(r){return r.enlarge(q)});this.moveTo(-o,-p)};n.prototype.moveTo=function(o,p){this.each(function(q){return q.moveTo(o,p)})};n.prototype.rotate=function(o,q,p){this.each(function(r){r.moveTo(-o,-q).rotate(p).moveTo(o,q)})};n.prototype.eraseStrokes=function(q,s,p,r){var o=[];this.each(function(t){Array.prototype.push.apply(o,t.eraseStrokes(q,s,p,r))});this.strokes=o;this._setLength()};n.prototype.addLine=function(o){var p=new c();a(o,function(q){p.add(q,0)});this.push(p);return p};n.prototype.addSquare=function(o){return this.addRectangle(o,o)};n.prototype.addRectangle=function(p,o){var q=new c();a(p,function(r){q.add(r,0)});a(o,function(r){q.add(p,r)});a(p,function(r){q.add(p-r,o)});a(o,function(r){q.add(0,o-r)});this.push(q);return q};n.prototype.addRegularPolygon=function(o,q){var r=new c();var p=360/q;a(q,function(v){var u=v*p;var s=o*k(u);var w=o*g(u);r.add(s,w);var u=(v+1)*p;var s=o*k(u);var w=o*g(u);r.add(s,w)});this.push(r);return r};n.prototype.pop=function(){var o=this.strokes.pop();this._setLength();return o};n.prototype.push=function(p){var o=this.strokes.push(p);this._setLength();return o};n.prototype.mergePaper=function(o){Array.prototype.push.apply(this.strokes,o.strokes);this._setLength();return this};n.prototype.clear=function(){this.strokes=[]};n.prototype.convertInfoStrokes=function(){this.info.strokes=this.map(function(p){var o=p.getData();if(o.data.length>0){return o}})};n.prototype.save=function(){this.convertInfoStrokes();MOON.setPaperJSON(this.id,this.info)};n.prototype._setLength=function(){this.length=this.strokes.length};var m=e.Page=function(){this.info=MOON.getCurrentPage();this.paper=new n(this.info.backing)}}).call(window);';
    }
});
