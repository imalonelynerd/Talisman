let playerR = 1;

function rollDice() {
    let resetDice = function () {
        $("#dicet").html("Click to roll");
        $("#dicem").attr("onclick","rollDice()");
    }
    let res = Math.floor(Math.random() * 6) + 1;
    $("#dice").attr("src", "../im/tools/d" + res +".png");
    $("#dicet").html(res);
    $("#dicem").attr("onclick","");
    setTimeout(resetDice, 1000);
}

function tossCoin() {
    let resetCoin = function () {
        $("#coint").html("Click to toss");
        $("#coinm").attr("onclick","tossCoin()")
    }
    let res = Math.floor(Math.random() * 2);
    if (res === 0) {
        $("#coin").attr("src", "../im/tools/ct.png");
        $("#coint").html("Tails");
    } else {
        $("#coin").attr("src", "../im/tools/ch.png");
        $("#coint").html("Head");
    }
    $("#coinm").attr("onclick","");
    setTimeout(resetCoin, 1000);
}

function updateLP(id) {
    $("#mainwin").hide();
    $("#calc").show();
}

function timer() {
    let inter = setInterval(function () {
        let t = $("#timer").html();
        if(t === 0){
            //A FINIR
        }
        $("#timer").html(t - 1);
        $("#timerm").html(toClock(t-1));
    },1000);
    $("#pausei").attr("src","../im/tools/pause.png");
    $("#pause").attr("onclick","pauseTimer("+inter+",'timer')");
}

function pauseTimer(id,func){
    clearInterval(id);
    $("#pausei").attr("src","../im/tools/play.png");
    $("#pause").attr("onclick",func +"()");
    $("#p1time").css("background","#404040");
    $("#p2time").css("background","#404040");
}

function chronometer () {
    let inter = setInterval(function () {
        let t = $("#timer").html();
        $("#timer").html(t - (-1));
        $("#timerm").html(toClock(t - (-1)));
    },1000);
    $("#pausei").attr("src","../im/tools/pause.png");
    $("#pause").attr("onclick","pauseTimer("+inter+",'chronometer')");
}

function nexus() {
    let inter = setInterval(function () {
        let t = $("#p" + playerR + "time").html();
        $("#p" + playerR + "time").html(t - 1);
    },1000);
    $("#p" + playerR + "time").css("background","#DF5000");
    let opppl = playerR === 1?2:1
    $("#p" + opppl + "time").css("background","#404040");
    $("#pausei").attr("src","../im/tools/pause.png");
    $("#pause").attr("onclick","pauseTimer("+inter+",'nexus')");
}

function addTime(){
    let t = $("#p" + playerR + "time").html();
    $("#p" + playerR + "time").html(t - (-duelConfObj.timer.bonus));
}

function switchPlayer() {
    playerR = playerR === 1?2:1;
    $("#p" + playerR + "time").css("background","#DF5000");
    let opppl = playerR === 1?2:1
    $("#p" + opppl + "time").css("background","#404040");
}