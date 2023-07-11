let winInfo = localStorage.getItem("winfo");
localStorage.removeItem("winfo");
console.log(winInfo);
let winInfoConf = JSON.parse(winInfo);
console.log(winInfoConf);

$("#winner").html(winInfoConf.winner === null ? "Well, this is embarassing...":`Congrats, ${winInfoConf.winner} !`);
$("#reason").html(winInfoConf.reason);
$("#time").html(winInfoConf.time);
let ratio = "_";
if(parseInt(winInfoConf.lpl) !== 0){
    ratio = parseInt(winInfoConf.lpw) / parseInt(winInfoConf.lpl);
}
$("#lps").html(`${winInfoConf.lpw} <span>/ ${winInfoConf.lpl}</span> (Ratio : ${ratio})`);