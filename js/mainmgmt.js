function add(isneg) {
    let lpcompt = document.getElementById("lp");
    let addval = parseInt(lpcompt.getAttribute("step"));
    addval *= isneg ? 1 : -1;
    lpcompt.value -= addval;
    return reeditLP();
}

function reeditLP() {
    reeditVal("lp");
}

function reeditVal(id) {
    let lpcompt = document.getElementById(id);
    let minv = parseInt(lpcompt.getAttribute("min"));
    let maxv = parseInt(lpcompt.getAttribute("max"));
    if (lpcompt.value < minv) {
        lpcompt.value = minv;
        return false;
    }
    if (lpcompt.value > maxv) {
        lpcompt.value = maxv;
        return false;
    }
    return true;
}

document.getElementById("lp").addEventListener("blur", reeditLP);

document.getElementById("timerconf").style.display = "none";
document.getElementById("nexusconf").style.display = "none";

document.getElementById("chrono").addEventListener("click", function () {
    document.getElementById("timerconf").style.display = "none";
    document.getElementById("nexusconf").style.display = "none";
});

document.getElementById("timer").addEventListener("click", function () {
    document.getElementById("timerconf").style.display = "flex";
    document.getElementById("nexusconf").style.display = "none";
});

document.getElementById("nexus").addEventListener("click", function () {
    document.getElementById("timerconf").style.display = "none";
    document.getElementById("nexusconf").style.display = "flex";
});

function setup() {
    let pl1 = document.getElementById("pl1").value;
    if (pl1 === "" || pl1 === undefined) {
        pl1 = "Player 1";
    }
    let pl2 = document.getElementById("pl2").value;
    if (pl2 === "" || pl2 === undefined) {
        pl2 = "Player 1";
    }
    let lp = document.getElementById("lp");
    let lpv = lp.value;
    let lpmx = lp.getAttribute("max");
    let lpmn = lp.getAttribute("min");
    if (lpv < lpmn || lpv > lpmx) {
        alert("Error : incorrect LP values. Please, try again.");
        return false;
    }
}