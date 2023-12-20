let playerR = 1;

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
    $("#baselp").html($("#p" + pl + "lp").html());
    calcUpdate();
    console.log("#p" + pl + "lp");
    $("#entr").attr("onclick", "calcApply(" + pl + ")");
    $("#calc").show();
}

// noinspection JSUnusedGlobalSymbols
function timer() {
    let inter = setInterval(function () {
        let t = $("#timer").html();
        if (t === "0") {
            let pl1lp = $("#pl1lp").html();
            let pl2lp = $("#pl2lp").html();
            let g = pl1lp > pl2lp ? 1:2;
            let opppl = g === 1 ? 2 : 1;
            let timer = localStorage.getItem("timer");
            localStorage.removeItem("timer");
            loseCond($("#p" + g + "name").html(),
                $("#p" + g + "lp").html(),
                $("#p" + opppl + "lp").html(),
                timer,
                "Time out"
            );
        }
        $("#timer").html(t - 1);
        $("#timerm").html(toClock(t - 1));
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
        let t = $("#timer").html();
        $("#timer").html(t - (-1));
        $("#timerm").html(toClock(t - (-1)));
    }, 1000);
    $("#pausei").attr("src", "../im/tools/pause.png");
    $("#pause").attr("onclick", "pauseTimer(" + inter + ",'chronometer')");
}

function nexus() {
    let inter = setInterval(function () {
        let t = $("#p" + playerR + "time").html();
        if (t === "0") {
            let pl1lp = $("#pl1lp").html();
            let pl2lp = $("#pl2lp").html();
            let g = pl1lp > pl2lp ? 1:2;
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
    $("#sw").attr("onclick","switchPlayer()");
    $("#addt").attr("onclick","addTime()")
}

function addTime() {
    let t = $("#p" + playerR + "time").html();
    $("#p" + playerR + "time").html(t - (-duelConfObj.timer.bonus));
}

function switchPlayer() {
    playerR = playerR === 1 ? 2 : 1;
    $("#p" + playerR + "time").css("background", "var(--highlight-hover-color)");
    let opppl = playerR === 1 ? 2 : 1
    $("#p" + opppl + "time").css("background", "var(--input-color)");
}

function calcApp(e) {
    let s = $("#sub").html();
    if (s === "0") {
        $("#sub").html(e);
    } else {
        $("#sub").html(s + e);
    }
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
    calcUpdate();
}

function calcUpdate() {
    let a = parseInt($("#baselp").html());
    let b = parseInt($("#sub").html());
    switch ($("#ope").html()) {
        case "+":
            $("#res").html(a + b);
            break;
        case "-":
            $("#res").html(a - b);
            break;
        case "*":
            $("#res").html(a * b);
            break;
        case "/":
            if (b === 0) {
                $("#res").html(0);
            } else {
                $("#res").html(Math.floor(a / b));
            }
            break;
    }
}

function calcReset() {
    $("#sub").html("0");
    calcUpdate();
}

function calcApply(pl) {
    $("#p" + pl + "lp").html($("#res").html());
    if (parseInt($("#res").html()) <= 0) {
        let opppl = pl === 1 ? 2 : 1;
        let timer = $("#timer").html();
        if(localStorage.getItem("timer") !== null) {
            timer = localStorage.getItem("timer");
            localStorage.removeItem("timer");
            timer -= $("#timer").html();
        }
        loseCond($("#p" + opppl + "name").html(),
                $("#p" + opppl + "lp").html(),
                $("#p" + pl + "lp").html(),
                timer,
                "K. O."
        );
    }
    $("#calc").hide();
    $("#mainwin").show();
    $("#sub").html("0");
    $("#ope").html("+");
    calcUpdate();
}

function loseCond(winner, lpw, lpl, time, reason) {
    let win = {};
    win.winner = (lpw === lpl) ? null : winner;
    win.lpw = lpw;
    win.lpl = lpl;
    win.time = time;
    win.reason = reason;
    localStorage.setItem("win","base");
    localStorage.setItem("winfo",JSON.stringify(win));
    window.location.href = "../win";
    console.log(win);
    console.log(JSON.stringify((win)));
    return true;
}