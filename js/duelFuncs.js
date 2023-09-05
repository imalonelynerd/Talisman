// Functions

function rollDice() {
    let resetDice = function () {
        $("#dicet").html("Click to roll");
        $("#dicem").click(rollDice);
        return true;
    }
    let res = Math.floor(Math.random() * 6) + 1;
    $("#dice").attr("src", "../im/tools/d" + res + ".png");
    $("#dicet").html(res);
    $("#dicem").off("click");
    setTimeout(resetDice, 1000);
    return true;
}

function tossCoin() {
    let resetCoin = function () {
        $("#coint").html("Click to toss");
        $("#coinm").click(tossCoin);
        return true;
    }
    let res = Math.floor(Math.random() * 2);
    if (res === 0) {
        $("#coin").attr("src", "../im/tools/ct.png");
        $("#coint").html("Tails");
    } else {
        $("#coin").attr("src", "../im/tools/ch.png");
        $("#coint").html("Head");
    }
    $("#coinm").off("onclick");
    setTimeout(resetCoin, 1000);
    return true;
}

function updateLP(player) {
    $("#mainwin").hide();
    val1 = player === 1 ? p1lp : p2lp;
    $("#val1").html(val1);
    calcUpdate();
    $("#entr").click(function () {
        calcApply(player)
    });
    $("#calc").show();
    return true;
}

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
        time -= 1;
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
    }, 1000);
    $("#pausei").attr("src", "../im/tools/pause.png");
    $("#pause").click(function () {
        pauseTimer(inter, "timer")
    });
    return true;
}

function pauseTimer(id, func) {
    clearInterval(id);
    $("#pausei").attr("src", "../im/tools/play.png");
    let pause = $("#pause");
    switch (func) {
        case "chronometer":
            pause.click(chronometer);
            break;
        case "timer":
            pause.click(timer);
            break;
        case "nexus":
            pause.click(nexus);
            break;
        default:
            break;
    }
    $("#p1time").css("background", "#404040");
    $("#p2time").css("background", "#404040");
    return true;
}

function chronometer() {
    let inter = setInterval(function () {
        time += 1;
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
    }, 1000);
    $("#pausei").attr("src", "../im/tools/pause.png");
    $("#pause").click(function () {
        pauseTimer(inter, "chronometer")
    });
    return true;
}

function nexus() {
    let inter = setInterval(function () {
        let t = playerR === 1 ? p1t : p2t;
        if (t === 0) {
            let g = p1lp > p2lp ? 1 : 2;
            let opppl = g === 1 ? 2 : 1;
            loseCond($("#p" + g + "name").html(),
                g === 1 ? p1lp : p2lp,
                opppl === 1 ? p2lp : p1lp,
                $("#timer").html(),
                "Time out"
            );
        }
        t -= 1;
        if (playerR === 1) {
            p1t = t;
        } else {
            p2t = t;
        }
        $("#p" + playerR + "time").html(t);
    }, 1000);
    $("#p" + playerR + "time").css("background", "var(--highlight-hover-color)");
    let opppl = playerR === 1 ? 2 : 1
    $("#p" + opppl + "time").css("background", "var(--input-color)");
    $("#pausei").attr("src", "../im/tools/pause.png");
    $("#pause").click(function () {
        pauseTimer(inter, "timer")
    });
    $("#sw").click(switchPlayer);
    $("#addt").click(addTime);
    return true;
}

function addTime() {
    let t = playerR === 1 ? p1t : p2t;
    if (playerR === 1) {
        p1t += parseInt(duelConfObj.timer.bonus);
    } else {
        p2t += parseInt(duelConfObj.timer.bonus);
    }
    t += parseInt(duelConfObj.timer.bonus);
    $("#p" + playerR + "time").html(t);
    return true;
}

function switchPlayer() {
    playerR = playerR === 1 ? 2 : 1;
    $("#p" + playerR + "time").css("background", "var(--highlight-hover-color)");
    let opppl = playerR === 1 ? 2 : 1
    $("#p" + opppl + "time").css("background", "var(--input-color)");
    return true;
}

function calcApp(e) {
    if (val2 === 0) {
        val2 = e;
    } else {
        val2 = parseInt("" + val2 + e);
    }
    $("#val2").html(val2);
    calcUpdate();
    return true;
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
    return true;
}

function calcUpdate() {
    switch (ope) {
        case 1:
            res = parseInt(val1) + parseInt(val2);
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
    $("#res").html(res);
    return true;
}

function calcReset() {
    val2 = 0;
    $("#val2").html(val2);
    calcUpdate();
    return true;
}

function calcApply(pl) {
    switch (pl) {
        case 1:
            p1lp = res;
            $("#p1lp").html(res);
            break;
        case 2:
            p2lp = res;
            $("#p2lp").html(res);
            break;
        default:
            console.log(pl);
            break;
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
    $("#entr").off("click");
    $("#calc").hide();
    $("#mainwin").show();
    calcReset();
    calcOpe(2);
    calcUpdate();
    return true;
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
    $("#p1").off("click").click(function () {
        updateLP(1)
    });
    $("#p2").off("click").click(function () {
        updateLP(2)
    });
    return true;
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

// Setup

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

$("#p1").click(function () {
    updateLP(1)
});
$("#p2").click(function () {
    updateLP(2)
});
$("#dicem").click(rollDice);
$("#coinm").click(tossCoin);

switch (duelConfObj.timer.choice) {
    case "1":
        time = 0;
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
        $("#pause").click(chronometer);
        break;
    case "2":
        time = duelConfObj.timer.countdown;
        $("#timer").html(time);
        $("#timerm").html(toClock(time));
        localStorage.setItem("timer", time);
        $("#pause").click(timer);
        break;
    case "3":
        alert("Click on who should play first !");
        $("#addt").show();
        $("#sw").show();
        $("#p1time").show();
        $("#p2time").show();
        $("#timer").html("-");
        $("#timerm").html("-");
        $("#pause").off("click");
        p1t = duelConfObj.timer.time;
        p2t = duelConfObj.timer.time;
        $("#p1time").html(p1t);
        $("#p2time").html(p2t);
        $("#p1").off("click").click(function () {
            playerRound(1)
        });
        $("#p2").off("click").click(function () {
            playerRound(2)
        });
        break;
}