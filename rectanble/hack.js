importJS(["lib/MOON.js", "lib/enchant.js", "lib/ui.enchant.js", "lib/color.enchant.js", "lib/stylus.enchant.js", "lib/puppet.enchant.js", "lib/moon.puppet.enchant.js", 'underscore-min.js', 'MOONStrokes.js'], function() {
  enchant();
  enchant.puppet.prepareTheatre({
    assets: []
  });
  //
  StickerPuppet.create("シール", {
    behavior: [{
      stickertap: function(event) {
        var _this = this;
        /*
         * 最後のストロークを除去し、同じ大きさで四角を描く
         */
        // 現在のページデータを取得する
        var page = new MOONStrokes.Page(); 
        var paper = page.paper;
        // 最後のストロークを除去し、サイズを得る
        var stroke = paper.pop(); // 最後のストロークを取得、除去する
        if (stroke) {
          var left = stroke.left();
          var right = stroke.right();
          var top = stroke.top();
          var bottom = stroke.bottom();
          var size = stroke.aveStrength();
          // 四角をページに追加する
          paper.rectangle(left, top, right, bottom, size, stroke.info);
          paper.save();
        }
        //
        MOON.finish();
      },
      stickerattach: function(event) {
        enchant.puppet.stopTheatre();
      },
      stickerdetach: function(event) {
        enchant.puppet.stopTheatre();
      }
    }]
  });
});
