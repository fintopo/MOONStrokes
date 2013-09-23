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
         * 最後のストロークに対して美化処理をする。
         */
        // 現在のページデータを取得する
        var page = new MOONStrokes.Page(); 
        var paper = page.paper;
        // 最後のストロークを取得する
        var stroke = paper.last(); // 最後のストロークを取得する
        if (stroke) {
          // ストロークを美化処理する
          stroke.beautifyLine(30);
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
