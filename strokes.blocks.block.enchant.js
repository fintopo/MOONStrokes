
if (enchant.block) {

(function() {

enchant.block.blocks.strokesPage = {
    desc: {
        blockCategory: RES('blocks.categories.strokesPage')
    }
};

enchant.block.blocks.strokesPage.Paper = enchant.Class.create(enchant.block.Block, {
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

enchant.block.blocks.strokesPage.eachStrokes = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ページの全てのストロークに対して以下の処理をする');
        this.addFoldButton('+', '-', [ 'doStroke' ]);
        this.addBR();
        this.addMultipleReceptor('evalable', 'doStroke');
        this.addBR();
        this.iteratize();
        this.script = 'page.paper.each(function(stroke){'
                      + '<% doStroke(\n) %> '
                      + '});';
    }
});

enchant.block.blocks.strokesPage.getStroke = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addReceptor('property', 'a');
        this.addLabel('= ページの');
        this.addSelectForm({
          '最後のストロークを取り出し': 'pop'
          ,'最後のストロークに対し': 'last'
        }, 'op');
        this.addLabel('以下の処理をしたストローク');
        this.addFoldButton('+', '-', [ 'doStroke' ]);
        this.addBR();
        this.addMultipleReceptor('evalable', 'doStroke');
        this.addBR();
        this.iteratize();
        this.script = '<% a %> = (function(stroke){'
                      + '<% doStroke(\n) %> '
                      + 'return stroke;'
                      + '})(page.paper.<% op %>());';
    }
});

enchant.block.blocks.strokesPage.clearStrokes = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ページをクリアする');
        this.addBR();
        this.iteratize();
        this.script = 'page.paper.clear();';
    }
});

enchant.block.blocks.strokesPage.pushStroke = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ストローク');
        this.addReceptor('property', 'b');
        this.addLabel('を');
        this.addSelectForm({
          'ページの最後に追加': 'push'
        }, 'op');
        this.addBR();
        this.iteratize();
        this.script = 'page.paper.<% op %>(<% b %>);';
    }
});

enchant.block.blocks.strokesPage.addStroke = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ページにサイズ');
        this.addReceptor('property number', 'size');
        this.addLabel('の');
        this.addSelectForm({
          '直線': 'Line'
          ,'正方形': 'Square'
        }, 'op');
        this.addLabel('を追加する');
        this.addFoldButton('+', '-', [ 'doStroke' ]);
        this.addBR();
        this.addMultipleReceptor('evalable', 'doStroke');
        this.addBR();
        this.iteratize();
        this.script = '(function(stroke){'
                      + '<% doStroke(\n) %> '
                      + 'return stroke;'
                      + '})(page.paper.add<% op %>(<% size %>));';
    }
});

enchant.block.blocks.strokesPage.addStroke2 = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('ページにサイズ');
        this.addReceptor('property number', 'size1');
        this.addReceptor('property number', 'size2');
        this.addLabel('の');
        this.addSelectForm({
          '長方形': 'Rectangle'
        }, 'op');
        this.addLabel('を追加する');
        this.addFoldButton('+', '-', [ 'doStroke' ]);
        this.addBR();
        this.addMultipleReceptor('evalable', 'doStroke');
        this.addBR();
        this.iteratize();
        this.script = '(function(stroke){'
                      + '<% doStroke(\n) %> '
                      + 'return stroke;'
                      + '})(page.paper.add<% op %>(<% size1 %>, <% size2 %>));';
    }
});

enchant.block.blocks.strokes = {
    desc: {
        blockCategory: RES('blocks.categories.strokes')
    }
};

enchant.block.blocks.strokes.transformStroke = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#3399cc');
        this.setConnectTarget('evalable');
        this.addLabel('ストロークの');
        this.addSelectForm({
          '平滑化 強度': 'smooth'
          ,'回転 角度': 'rotate'
          ,'拡大 倍率': 'enlarge'
          ,'太さ': 'setWidth'
        }, 'op');
        this.addReceptor('property number', 'count');
        this.addBR();
        this.iteratize();
        this.script = 'stroke.<% op %>(<% count %>);';
    }
});

enchant.block.blocks.strokes.strokeMove = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#3399cc');
        this.setConnectTarget('evalable');
        this.addLabel('ストロークを');
        this.addLabel('xに');
        this.addReceptor('property number', 'x');
        this.addLabel('yに');
        this.addReceptor('property number', 'y');
        this.addLabel('だけ移動する ');
        this.addBR();
        this.iteratize();
        this.script = 'stroke.moveTo(<% x %>, <% y %>);';
    }
});

enchant.block.blocks.strokes.getStrokeRect = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#3399cc');
        this.setConnectTarget('evalable');
        this.addReceptor('property', 'a');
        this.addLabel('= ストロークの');
        this.addSelectForm({
          '左端座標': 'left'
          ,'右端座標': 'right'
          ,'上端座標': 'top'
          ,'下端座標': 'bottom'
          ,'筆圧': 'aveStrength'
          ,'傾き': 'getInclination'
          ,'太さ': 'info.width'
          ,'色': 'info.color'
        }, 'op');
        this.addBR();
        this.iteratize();
        this.script = '<% a %> = stroke.<% op %>());';
    }
});

enchant.block.blocks.strokes.changeColor = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#3399cc');
        this.setConnectTarget('evalable');
        this.addLabel('ストロークの色を');
        this.addColorForm('color');
        this.addLabel('にする');
        this.addBR();
        this.iteratize();
    },
    script: {
        get: function() {
          var color = MOON.rgba2int.apply(this, this.getSentence('color'));
          return 'stroke.setColor('+color+');';
        }
    }
});

})();

}
