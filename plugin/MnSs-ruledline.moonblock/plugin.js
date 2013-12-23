//リソースの追加
enchant.block.plugin.PluginManager.instance.addResource("en-us.blocks", {"categories":{
  "MnSsRuledLine":"MnSs RuledLine"
}});
enchant.block.plugin.PluginManager.instance.addResource("ja-jp.blocks", {"categories":{
  "MnSsRuledLine":"MnSs RuledLine"
}});

//キットの定義
enchant.block.blocks.MnSsRuledLine = {
  desc: {
    blockCategory: RES('blocks.categories.MnSsRuledLine')
  }
};
enchant.block.plugin.PluginManager.instance.addPlugin(enchant.block.blocks.MnSsRuledLine);

// ブロックの定義
enchant.block.blocks.MnSsRuledLine.ruledLine = enchant.Class.create(enchant.block.Block, {
  initialize: function() {
    enchant.block.Block.call(this, '#FFA07A');
    this.setConnectTarget('evalable');
    this.addLabel('罫線を');
    this.addSelectForm({
      'ページ': 'page.paper'
      ,'グループ': 'paper'
    }, 'master');
    this.addLabel('に追加する');
    this.addBR();
    this.addLabel('種類');
    this.addSelectForm({
      '横罫': 'horizontal'
      ,'縦罫': 'vertical'
    }, 'type');
    this.addLabel('サイズ');
    this.addSliderForm(0, 'size')            
        .range(-1024, 1024, 0);
    this.addSelectForm({
      'mm': 'mm'
      ,'%': 'per'
      ,'pixel': 'pixel'
    }, 'sizeUnit');
    this.addBR();
    this.addLabel('本数');
    this.addSliderForm(0, 'number')
        .range(0, 1024, 0);
    this.addLabel('間隔');
    this.addSliderForm(0, 'space')
        .range(0, 1024, 0);
    this.addSelectForm({
      'mm': 'mm'
      ,'pixel': 'pixel'
    }, 'spaceUnit');
    this.addLabel('角度');
    this.addSliderForm(0, 'angle')
        .range(-45, 45, 0);
    this.addLabel('度');
    this.addBR();
    this.iteratize();
  }
  ,script: {
    get: function(){
      var type = this.getSentence('type');
      var number = Number(this.getSentence('number'));
      var angle = Number(this.getSentence('angle'));
      // サイズ計算
      var size = Number(this.getSentence('size'));
      switch (this.getSentence('sizeUnit')) {
      case 'mm':
        size = Math.round(size * 64 / 10); // 64pixel / cm
        break;
      case 'per':
        if (type == 'horizontal') {
          size = Math.round(size * 768 / 100);
        } else {
          size = Math.round(size * 1024 / 100);
        }
        break;
      }
      // 間隔計算
      var space = Number(this.getSentence('space'));
      switch (this.getSentence('spaceUnit')) {
      case 'mm':
        space = Math.round(space * 64 / 10); // 64pixel / cm
        break;
      }
      //
      var ret = '(function(paper, master){'
          +   'MOONStrokes.times(<% number %>, function(i){'
          + 'paper.addLine('+size+')';
      if (angle != 0) {
        ret += '.rotate('+angle+')';
      }
      if (type == 'horizontal') {
        ret += '.moveTo(0, i * '+space+');';
      } else {
        ret += '.rotate(90).moveTo(i * '+space+', 0);';
      }
      ret +=   '});'
          +   'master.mergePaper(paper);'
          + '})(new MOONStrokes.Paper(), <% master %>);';
      return ret;
    }
  }
});
