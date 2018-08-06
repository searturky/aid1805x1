;(function(){
    $('.alert').hide()
})();

var c1 = document.getElementById("myCanvas");
var w = 126;
var h = 38;
var ctx = c1.getContext("2d");
ctx.fillStyle = `#ffd0`;
ctx.fillRect(0, 0, 126, 38);
var text = vcode(ctx);

function vcode(ctx) {
    ctx.clearRect(0, 0, 500, 126);
    var pool = "ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890";
    text = '';
    for (var i = 0; i < 4; i++) {
        var c = pool[parseInt(Math.random() * 37)];//随机的字
        text += c;
        var fs = parseInt(100);//字体的大小
        var deg = parseInt(Math.random() * 20 - 10);//字体的旋转角度
        ctx.font = fs + 'px Simhei';
        ctx.textBaseline = "top";
        ctx.fillStyle = `#ffffff`;
        ctx.save();
        ctx.translate(60 * i + 15, 15);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(c, -15 + 5, -15);
        ctx.restore();
    };
    console.log("text", text);
    return text;
};