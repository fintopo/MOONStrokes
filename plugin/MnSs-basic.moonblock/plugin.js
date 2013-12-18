//リソースの追加
enchant.block.plugin.PluginManager.instance.addResource("en-us.blocks", {"categories":{
  "strokesBasic":"MnSs Basic"
}});
enchant.block.plugin.PluginManager.instance.addResource("ja-jp.blocks", {"categories":{
  "strokesBasic":"MnSs Basic"
}});

//キットの定義
enchant.block.blocks.strokesBasic = {
    desc: {
        blockCategory: RES('blocks.categories.strokesBasic')
    }
};
enchant.block.plugin.PluginManager.instance.addPlugin(enchant.block.blocks.strokesBasic);

// ブロックの定義
enchant.block.blocks.strokesBasic.addStroke = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('サイズ');
        this.addReceptor('property number', 'size');
        this.addLabel('の');
        this.addSelectForm({
          '直線': 'addLine'
          ,'正方形': 'addSquare'
        }, 'op');
        this.addLabel('をグループに追加する');
        this.iteratize();
        this.script = 'paper.<% op %>(<% size %>);';
    }
});

enchant.block.blocks.strokesBasic.addStroke2 = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('サイズ');
        this.addReceptor('property number', 'size1');
        this.addReceptor('property number', 'size2');
        this.addLabel('の');
        this.addSelectForm({
          '長方形': 'addRectangle'
        }, 'op');
        this.addLabel('をグループに追加する');
        this.iteratize();
        this.script = 'paper.<% op %>(<% size1 %>, <% size2 %>);';
    }
});

enchant.block.blocks.strokesBasic.addRegularPolygon = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#FFA07A');
        this.setConnectTarget('evalable');
        this.addLabel('サイズ');
        this.addReceptor('property number', 'size');
        this.addLabel('の正');
        this.addReceptor('property number', 'number');
        this.addLabel('多角形正をグループに追加する');
        this.iteratize();
        this.script = 'paper.addRegularPolygon(<% size %>, <% number %>);';
    }
});

enchant.block.blocks.strokesBasic.transformStroke = enchant.Class.create(enchant.block.Block, {
    initialize: function() {
        enchant.block.Block.call(this, '#3399cc');
        this.setConnectTarget('evalable');
        this.addLabel('ストロークの');
        this.addSelectForm({
          '平滑化 強度': 'smooth'
          ,'回転 角度': 'rotate'
          ,'拡大 倍率': 'enlarge'
          ,'太さを変える': 'setWidth'
        }, 'op');
        this.addReceptor('property number', 'count');
        this.addBR();
        this.iteratize();
        this.script = 'stroke.<% op %>(<% count %>);';
    }
});

enchant.block.blocks.strokesBasic.strokeMove = enchant.Class.create(enchant.block.Block, {
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

enchant.block.blocks.strokesBasic.getStrokeRect = enchant.Class.create(enchant.block.Block, {
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

enchant.block.blocks.strokesBasic.changeColor = enchant.Class.create(enchant.block.Block, {
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
