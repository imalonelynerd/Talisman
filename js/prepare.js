let duelConf = localStorage.getItem("conf");
localStorage.removeItem("conf");
let duelConfObj = JSON.parse(duelConf);
$("#calc").hide();

function toClock(time) {
    let mn = Math.floor(time / 60);
    if (mn < 10) {
        mn = "0" + mn;
    }
    let sc = time % 60;
    if (sc < 10) {
        sc = "0" + sc;
    }
    return mn + ':' + sc;
}

$("#p1name").html(duelConfObj.pl1name);
$("#p2name").html(duelConfObj.pl2name);
$("#p1lp").html(duelConfObj.lp);
$("#p2lp").html(duelConfObj.lp);

switch (duelConfObj.timer.choice) {
    case "1":
        $("#timer").html("0");
        $("#timerm").html("00:00");
        $("#addt").remove();
        $("#sw").remove();
        $("#p1time").remove();
        $("#p2time").remove();
        $("#pause").attr("onclick", "chronometer()");
        break;
    case "2":
        $("#timer").html(duelConfObj.timer.countdown);
        $("#timerm").html(toClock(duelConfObj.timer.countdown));
        $("#addt").remove();
        $("#sw").remove();
        $("#p1time").remove();
        $("#p2time").remove();
        $("#pause").attr("onclick", "timer()");
        break;
    case "3":
        $("#timer").html("Click on who should play first");
        $("#timerm").html("-");
        $("#pause").attr("onclick", "");
        $("#p1time").html(duelConfObj.timer.time);
        $("#p2time").html(duelConfObj.timer.time);
        $("#p1").attr("onclick","playerRound(1)");
        $("#p2").attr("onclick","playerRound(2)");
        break;
}

function playerRound(pl) {
    playerR = pl;
    nexus();
    $("#timer").html("0");
    $("#timerm").html("00:00");
    setInterval(function () {
        let t = $("#timer").html();
        $("#timer").html(t - (-1));
        $("#timerm").html(toClock(t - (-1)));
    },1000);
    $("#p1").attr("onclick","updateLP(1)");
    $("#p2").attr("onclick","updateLP(2)");
}