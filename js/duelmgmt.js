// Functions

function rollDice() {
    let resetDice = function () {
        $("#dicet").html("Click to roll");
        $("#dicem").attr("onclick", "rollDice()");
    }
    let res = Math.floor(Math.random() * 6) + 1;
    $("#dice").attr("src", "../im/tools/d" + res + ".png");
    $("#dicet").html(res);
    $("#dicem").attr("onclick", "");
    setTimeout(resetDice, 1000);
}

function tossCoin() {
    let resetCoin = function () {
        $("#coint").html("Click to toss");
        $("#coinm").attr("onclick", "tossCoin()")
    }
    let res = Math.floor(Math.random() * 2);
    if (res === 0) {
        $("#coin").attr("src", "../im/tools/ct.png");
        $("#coint").html("Tails");
    } else {
        $("#coin").attr("src", "../im/tools/ch.png");
        $("#coint").html("Head");
    }
    $("#coinm").attr("onclick", "");
    setTimeout(resetCoin, 1000);
}

function updateLP(pl) {
    $("#mainwin").hide();
    val1 = pl === 1 ? p1lp : p2lp;
    $("#val1").html(val1);
    calcUpdate();
    $("#entr").attr("onclick", "calcApply(" + pl + ")");
    $("#calc").show();
}

// noinspection JSUnusedGlobalSymbols
function timer() {
    let inter = setInterval(function () {
        if (time === "0") {
            let g = p1lp > p2lp ? 1 : 2;
            let opppl = g === 1 ? 2 : 1;
            let timerl = localStorage.getItem("timer");
            localStorage.removeItem("timer");
            loseCond($("#p" + g + "name").html(),
                $("#p" + g + "lp").html(),
                $("#p" + opppl + "lp").html(),
                timerl,
                "Time out"
            );
        }
        time = -1
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
    }, 1000);
    $("#pausei").attr("src", "../im/tools/pause.png");
    $("#pause").attr("onclick", "pauseTimer(" + inter + ",'timer')");
}

function pauseTimer(id, func) {
    clearInterval(id);
    $("#pausei").attr("src", "../im/tools/play.png");
    $("#pause").attr("onclick", func + "()");
    $("#p1time").css("background", "#404040");
    $("#p2time").css("background", "#404040");
}

function chronometer() {
    let inter = setInterval(function () {
        time += 1;
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
    }, 1000);
    $("#pausei").attr("src", "../im/tools/pause.png");
    $("#pause").attr("onclick", "pauseTimer(" + inter + ",'chronometer')");
}

function nexus() {
    let inter = setInterval(function () {
        let t = playerR === 1 ? p1t : p2t;
        if (t === "0") {
            let g = p1lp > p2lp ? 1 : 2;
            let opppl = g === 1 ? 2 : 1;
            loseCond($("#p" + g + "name").html(),
                $("#p" + g + "lp").html(),
                $("#p" + opppl + "lp").html(),
                $("#timer").html(),
                "Time out"
            );
        }
        $("#p" + playerR + "time").html(t - 1);
    }, 1000);
    $("#p" + playerR + "time").css("background", "var(--highlight-hover-color)");
    let opppl = playerR === 1 ? 2 : 1
    $("#p" + opppl + "time").css("background", "var(--input-color)");
    $("#pausei").attr("src", "../im/tools/pause.png");
    $("#pause").attr("onclick", "pauseTimer(" + inter + ",'nexus')");
    $("#sw").attr("onclick", "switchPlayer()");
    $("#addt").attr("onclick", "addTime()")
}

function addTime() {
    let t = playerR === 1 ? p1t : p2t;
    t += duelConfObj.timer.bonus;
    $("#p" + playerR + "time").html(t);
}

function switchPlayer() {
    playerR = playerR === 1 ? 2 : 1;
    $("#p" + playerR + "time").css("background", "var(--highlight-hover-color)");
    let opppl = playerR === 1 ? 2 : 1
    $("#p" + opppl + "time").css("background", "var(--input-color)");
}

function calcApp(e) {
    if (val2 === 0) {
        val2 = e;
    } else {
        val2 = parseInt("" + val2 + e);
    }
    $("#val2").html(val2);
    calcUpdate();
}

function calcOpe(id) {
    switch (id) {
        case 1:
            $("#ope").html("+");
            break;
        case 2:
            $("#ope").html("-");
            break;
        case 3:
            $("#ope").html("*");
            break;
        case 4:
            $("#ope").html("/");
            break;
    }
    ope = id;
    calcUpdate();
}

function calcUpdate() {
    switch (ope) {
        case 1:
            res = val1 - val2;
            break;
        case 2:
            res = val1 - val2;
            break;
        case 3:
            res = val1 * val2;
            break;
        case 4:
            if (val2 === 0) {
                res = 0
            } else {
                res = Math.floor(val1 / val2);
            }
            break;
    }
    console.log(res)
    $("#res").html(res);
}

function calcReset() {
    val2 = 0;
    $("#val2").html(val2);
    calcUpdate();
}

function calcApply(pl) {
    if (pl === 1) {
        p1lp = res;
        $("#p1lp").html(res);
    } else {
        p2lp = res;
        $("#p2lp").html(res);
    }
    if (res <= 0) {
        let opppl = pl === 1 ? 2 : 1;
        let timerl = time;
        if (localStorage.getItem("timer") !== null) {
            timerl = localStorage.getItem("timer");
            localStorage.removeItem("timer");
            timerl -= time;
        }
        loseCond($("#p" + opppl + "name").html(),
            $("#p" + opppl + "lp").html(),
            $("#p" + pl + "lp").html(),
            timerl,
            "K. O."
        );
    }
    $("#calc").hide();
    $("#mainwin").show();
    calcReset();
    calcOpe(2);
    calcUpdate();
}

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

function loseCond(winner, lpw, lpl, time, reason) {
    let win = {};
    win.winner = (lpw === lpl) ? null : winner;
    win.lpw = lpw;
    win.lpl = lpl;
    win.time = time;
    win.reason = reason;
    localStorage.setItem("win", "base");
    localStorage.setItem("winfo", JSON.stringify(win));
    window.location.href = "../win";
    console.log(win);
    console.log(JSON.stringify((win)));
    return true;
}

function playerRound(pl) {
    playerR = pl;
    nexus();
    time = 0;
    $("#timer").html(time);
    $("#timerm").html(toClock(time));
    setInterval(function () {
        time += 1;
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
    }, 1000);
    $("#p1").attr("onclick", "updateLP(1)");
    $("#p2").attr("onclick", "updateLP(2)");
}

// Global variables

let playerR = 1;
let time = 1;
let p1lp = 1;
let p2lp = 1;
let p1t = 1;
let p2t = 1;

let val1 = 0;
let ope = 0;
let val2 = 0;
let res = 0;

let duelConf = localStorage.getItem("conf");
localStorage.removeItem("conf");
let duelConfObj = JSON.parse(duelConf);
calcOpe(2);
$("#calc").hide();

$("#p1name").html(duelConfObj.pl1name);
$("#p2name").html(duelConfObj.pl2name);
p1lp = duelConfObj.lp;
p2lp = duelConfObj.lp;
$("#p1lp").html(p1lp);
$("#p2lp").html(p2lp);

$("#addt").hide();
$("#sw").hide();
$("#p1time").hide();
$("#p2time").hide();

switch (duelConfObj.timer.choice) {
    case "1":
        time = 0;
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
        $("#pause").attr("onclick", "chronometer()");
        break;
    case "2":
        time = duelConfObj.timer.countdown;
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
        localStorage.setItem("timer", time);
        $("#pause").attr("onclick", "timer()");
        break;
    case "3":
        alert("Click on who should play first !");
        $("#addt").show();
        $("#sw").show();
        $("#p1time").show();
        $("#p2time").show();
        $("#timer").html("-");
        $("#timerm").html("-");
        $("#pause").attr("onclick", "");
        p1t = duelConfObj.timer.time;
        p2t = duelConfObj.timer.time;
        $("#p1time").html(p1t);
        $("#p2time").html(p2t);
        $("#p1").attr("onclick", "playerRound(1)");
        $("#p2").attr("onclick", "playerRound(2)");
        break;
}