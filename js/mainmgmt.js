function pos() {
    let lpcompt = document.getElementById("lp");
    lpcompt.value -= lpcompt.getAttribute("step") * -1;
    if (lpcompt.value > parseInt(lpcompt.getAttribute("max"))) {
        lpcompt.value = lpcompt.getAttribute("max");
    }
    return true;
}

function neg() {
    let lpcompt = document.getElementById("lp");
    lpcompt.value -= lpcompt.getAttribute("step");
    if (lpcompt.value < 0) {
        lpcompt.value = 0;
    }
    return true;
}

document.getElementById("timerconf").style.display = "none";
document.getElementById("nexusconf").style.display = "none";

document.getElementById("chrono").addEventListener("click",function () {
    document.getElementById("timerconf").style.display = "none";
    document.getElementById("nexusconf").style.display = "none";
});

document.getElementById("timer").addEventListener("click",function () {
    document.getElementById("timerconf").style.display = "flex";
    document.getElementById("nexusconf").style.display = "none";
});

document.getElementById("nexus").addEventListener("click",function () {
    document.getElementById("timerconf").style.display = "none";
    document.getElementById("nexusconf").style.display = "flex";
});