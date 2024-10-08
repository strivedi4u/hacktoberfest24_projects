// Bubble JS
var timex = 60;
var score = 0;
var hitrn = 0;


function increseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

function Hit() {
    hitrn = Math.floor(Math.random() * 10)
    document.querySelector("#hitval").textContent = hitrn
}

function Timer() {

    var time = setInterval(function () {
        if (timex > 0) {
            timex--;
            // console.log(time)
            document.querySelector("#time").textContent = timex
        }
        else {
            clearInterval(timex);
            document.querySelector(".pbottom").innerHTML = `<h1>Game Over! Score = ${score}<h1>`
            
        }
    }, 1000)


}

function makeBubble() {
    var clutter = ""
    for (var i = 1; i <= 119; i++) {
        var rn = Math.floor(Math.random() * 10)
        clutter += `<div class="bubble">${rn}</div>`
    }
    document.querySelector(".pbottom").innerHTML = clutter
}

document.querySelector(".pbottom").addEventListener("click",function(details){
    var press = Number(details.target.textContent);
    console.log(press)
    if(hitrn === press){
        increseScore();
        makeBubble();
        Hit();
    }
})

document.querySelector("#btn").addEventListener("click",function(){
    document.querySelector(".pbottom").innerHTML = ""
    start()

})

function start(){
    makeBubble();
    Timer();
    Hit();
}
// IncreseScore();