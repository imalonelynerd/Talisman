import {ref} from "vue";

export function savePreset(obj) {
    let res = {
        pl1name: obj.p1name === "" ? "Player 1" : obj.p1name,
        pl2name: obj.p2name === "" ? "Player 2" : obj.p2name,
        lp: obj.lps,
        timer:
            {
                choice: "" + (obj.timertype - (-1)),
                countdown: obj.timertype === "1" ? obj.countdown : undefined,
                time: obj.timertype === "2" ? obj.ptime : undefined,
                bonus: obj.timertype === "2" ? obj.atime : undefined
            }
    };
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(res)));
    let date = new Date();
    let datestr = date.getHours() + "" + date.getMinutes() + "_" + date.getDate() + date.getMonth() + date.getFullYear();
    element.setAttribute('download', "preset" + datestr + ".tal");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert("Preset saved successfully !");
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function loadPreset(obj) {
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            if (!isJsonString(content.toString())) {
                alert("Invalid file type and/or content. Please try again");
            } else {
                let res = JSON.parse(content);
                obj.p1name = res.pl1name === undefined ? "Player 1" : res.pl1name;
                obj.p2name = res.pl2name === undefined ? "Player 2" : res.pl2name;
                obj.lps = res.lp === undefined
                || res.lp < 10
                || res.lp > 99999 ? 8000 : res.lp;
                obj.timertype = res.timer.choice === undefined ? "0" : "" + (res.timer.choice - 1);
                obj.countdown = res.timer.countdown === undefined
                || res.timer.countdown < 10
                || res.timer.countdown > 99999 ? 120 : res.timer.countdown;
                obj.ptime = res.timer.time === undefined
                || res.timer.time < 10
                || res.timer.time > 99999 ? 120 : res.timer.time;
                obj.atime = res.timer.bonus === undefined
                || res.timer.bonus < 10
                || res.timer.bonus > 99999 ? 120 : res.timer.bonus;
                alert("Preset loaded successfully !");
            }
        }
    }
    input.click();
}