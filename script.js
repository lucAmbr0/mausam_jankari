function makeBubble(){
    var clutter = "";
for( var i=1;i<=140;i++){
    var rn = Math.floor(Math.random()*10);  
    clutter += `<div id="bube">${rn}</div>`;
}
document.querySelector("#pbtm").innerHTML = clutter;
}
var  timer=60;
function tickingtimer(){
    var timerint = setInterval(function () {
        if(timer>0){
            timer--;
        document.querySelector(".timer").innerHTML=timer;
        }
        else{
            clearInterval(timerint);
            var overlay2 = document.querySelector('#overlay2')
            var respop = document.querySelector('#respop');
            overlay2.style.display='flex';
            respop.style.display='block';
            document.querySelector('#scoref').innerHTML=score;
    
            }
    }, 1000)
}

function hitc(){
    var rn = Math.floor(Math.random()*10);
    document.querySelector(".hit").textContent=rn;
}
var score = 0;
function incresescore() {
    score += 10;
    document.querySelector('.score').textContent=score;
}
document.querySelector('#pbtm').addEventListener("click",function (dets) {
    var hitnum = parseInt(document.querySelector('.hit').innerHTML);
    let buble = parseInt(dets.target.innerHTML);
    if (buble==hitnum) {
        incresescore();
        hitc();
        makeBubble();
    }
})
function start() {
    
var pop = document.querySelector('#overlay');
var inner =  document.querySelector('#cont');

pop.style.display='none';
inner.style.display='none';
    hitc();
tickingtimer();
makeBubble();
}
function restart() {
    score = 0;//reseting the score to zero after restart button is clicked
    document.querySelector('.score').textContent=score;
    var overlay2 = document.querySelector('#overlay2')
    var respop = document.querySelector('#respop');
    
    overlay2.style.display='none';
    respop.style.display='none';
    hitc()//called the hitc function to generate random hit numbers
    tickingtimer();//calling the timer function
    makeBubble();//creating bubbles again 
    timer = 60;//reseting the timer to 60 sec a
}

