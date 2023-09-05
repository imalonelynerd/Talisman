function add(isneg) {
    let lpcompt = $("#lp");
    let addval = parseInt(lpcompt.attr("step"));
    addval *= isneg ? 1 : -1;
    lpcompt.val(lpcompt.val() - addval);
    return reeditLP();
}

function reeditLP() {
    reeditVal("lp");
}

function checkVal(id) {
    let lpcompt = $("#" + id);
    let minv = parseInt(lpcompt.attr("min"));
    let maxv = parseInt(lpcompt.attr("max"));
    if (lpcompt.val() === "" || lpcompt.val() < minv) {
        return -1;
    }
    if (lpcompt.val() > maxv) {
        return 1;
    }
    return 0;
}

function reeditVal(id) {
    let lpcompt = $("#" + id);
    let minv = parseInt(lpcompt.attr("min"));
    let maxv = parseInt(lpcompt.attr("max"));
    let res = checkVal(id);
    if (res < 0) {
        lpcompt.val(minv);
        return false;
    }
    if (res > 0) {
        lpcompt.val(maxv);
        return false;
    }
    return true;
}

$("#lp").on("blur", reeditLP);

$("#timerconf").hide();
$("#nexusconf").hide();

$("#chrono").on("click", function () {
    $("#timerconf").hide();
    $("#nexusconf").hide();
});

function swichSettings() {
    switch ($("#timertype").val()) {
        case "2":
            $("#timerconf").show();
            $("#nexusconf").hide();
            break;
        case "3":
            $("#timerconf").hide();
            $("#nexusconf").show();
            break;
        default:
            $("#timerconf").hide();
            $("#nexusconf").hide();
            break;
    }
}

swichSettings();

$("#timertype").on("change", swichSettings);

function setup() {
    let pl1 = $("#pl1").val();
    if (pl1 === "" || pl1 === undefined) {
        pl1 = "Player 1";
    }
    let pl2 = $("#pl2").val();
    if (pl2 === "" || pl2 === undefined) {
        pl2 = "Player 2";
    }

    if (checkVal("lp") !== 0) {
        alert("Error : incorrect LP values. Please, try again.");
        return false;
    }
    let lpv = $("#lp").val();

    let timerconf = {};

    timerconf.choice = $("#timertype").val();

    switch (timerconf.choice) {
        case "2":
            if (checkVal("timertime") !== 0) {
                alert("Error : incorrect timer value. Please, try again.");
                return false;
            }
            timerconf.countdown = $("#timertime").val();
            break;
        case "3":
            if (checkVal("nexustime") !== 0 || checkVal("nexusbonus") !== 0) {
                alert("Error : incorrect countdown values. Please, try again.");
                return false;
            }
            timerconf.time = $("#nexustime").val();
            timerconf.bonus = $("#nexusbonus").val();
            break;
        default:
            break;
    }

    let gameconf = {};
    gameconf.pl1name = pl1;
    gameconf.pl2name = pl2;
    gameconf.lp = lpv;
    gameconf.timer = timerconf;
    return gameconf;
}

function start() {
    let setp = setup();
    if (!setp) {
        return false;
    }
    localStorage.setItem("duel", "base");
    localStorage.setItem("conf", JSON.stringify(setp));
    window.location.href = "duel";
    return true;
}

function savePreset() {
    let setp = setup();
    if (!setp) {
        return false;
    }
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(setp)));
    let date = new Date();
    let datestr = date.getHours() + "" + date.getMinutes() + "_" + date.getDate() + date.getMonth() + date.getFullYear();
    element.setAttribute('download', "preset" + datestr + ".tal");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return true;
}

//https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server

function startWPRestet() {
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        let file = e.target.files[0];
        let isJsonString = function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target.result; // this is the content!
            localStorage.setItem("duel", "base");
            if (!isJsonString(content.toString())) {
                alert("Invalid file type and/or content. Please try again");
                return false;
            }
            localStorage.setItem("conf", content.toString());
            window.location.href = "duel";
            return true;
        }
    }
    input.click();
}
