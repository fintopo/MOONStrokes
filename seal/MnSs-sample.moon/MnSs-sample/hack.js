importJS(["lib/MOON.js", "lib/enchant.js", "lib/ui.enchant.js", "lib/color.enchant.js", "lib/surface.enchant.js", "lib/stylus.enchant.js", "lib/puppet.enchant.js", "lib/moon.puppet.enchant.js"], function() {
    enchant();
    enchant.puppet.prepareTheatre({
        assets: []
    });
    StickerPuppet.create("シール", {
        behavior: [{
            stickertap: function(event) {
                window.enchant.puppet.Theatre.instance.score = 20;
                (function(page) {
                    page.paper.clear();
                    MOONStrokes.times(window.enchant.puppet.Theatre.instance.score, function(i) {
                        window.enchant.puppet.Theatre.instance.life = i;
                        (function(paper, master) {
                            paper.addRegularPolygon(30, 60);
                            paper.addRegularPolygon(30, 3);
                            MOONStrokes.each(paper.strokes, function(stroke) {
                                stroke.moveTo(-250, 0);
                                this.x = 360 / window.enchant.puppet.Theatre.instance.score;
                                this.x *= window.enchant.puppet.Theatre.instance.life;
                                stroke.rotate(this.x);
                            });
                            master.mergePaper(paper);
                        })(new MOONStrokes.Paper(), page.paper);
                    });
                    (function(paper, master) {
                        (function(paper, master) {
                            paper.addRegularPolygon(200, 3);
                            (function(paper, master) {
                                paper.addRegularPolygon(200, 3);
                                MOONStrokes.each(paper.strokes, function(stroke) {
                                    stroke.rotate(60);
                                });
                                master.mergePaper(paper);
                            })(new MOONStrokes.Paper(), paper);
                            master.mergePaper(paper);
                        })(new MOONStrokes.Paper(), page.paper);
                        this.x = 60;
                        paper.addRegularPolygon(200, this.x);
                        paper.addRegularPolygon(220, this.x);
                        paper.addRegularPolygon(280, this.x);
                        paper.addRegularPolygon(300, this.x);
                        master.mergePaper(paper);
                    })(new MOONStrokes.Paper(), page.paper);
                    MOONStrokes.each(page.paper.strokes, function(stroke) {
                        stroke.moveTo(384, 512);
                    });
                    page.paper.save();
                })(new MOONStrokes.Page());
                enchant.puppet.stopTheatre();
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