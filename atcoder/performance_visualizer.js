var script = document.createElement('script');
let url = chrome.runtime.getURL("chart.js");
script.src = url;

//   script.addEventListener('load', postLoadFunction);
document.head.appendChild(script);
let rows = document.getElementsByTagName("table")[0].rows
let performances = [];

for (elt of rows){
    let performance = parseInt(elt.cells[3].innerHTML);
    
    if (!Number.isInteger(performance)){
        continue;
    }

    if (performance < 400){
        elt.cells[3].className = "user-gray";
    }
    else if (performance < 800){
        elt.cells[3].className = "user-brown";
    }
    else if (performance < 1200){
        elt.cells[3].className = "user-green";
    }
    else if (performance < 1600){
        elt.cells[3].className = "user-cyan";
    }
    else if (performance < 2000){
        elt.cells[3].className = "user-blue";
    }
    else if (performance < 2400){
        elt.cells[3].className = "user-yellow";
    }
    else if (performance < 2800){
        elt.cells[3].className = "user-orange";
    }
    else{
        elt.cells[3].className = "user-red";
    }
    performances.push(performance);
}

performances = performances.reverse();

let canvas = document.createElement("canvas");
canvas.width  = 500;
canvas.height = 320;
canvas.setAttribute("id", "performance_graph");
let w = Math.floor(canvas.width/performances.length);

let a = document.getElementsByClassName("user-red");
console.log(a);


document.getElementsByClassName("checkbox")[0].appendChild(canvas);

var ctx = canvas.getContext('2d');
let max_performance = Math.max(...performances);

let from = performances[0];
from /= max_performance;
from *= canvas.height;
from = Math.floor(from);
ctx.beginPath(); 

ctx.strokeRect(0, 0, canvas.width, canvas.height);

let prevh = canvas.height;
ctx.globalAlpha = 0.5;
for (elt of [400,800,1200,1600,2000,2400,2800,100000]) {
    ctx.beginPath(); 
    let h = Math.floor((1-elt/max_performance)*canvas.height);
    h = Math.min(h,canvas.height);
    
    if (elt == 400){
        ctx.fillStyle = "rgb(128, 128, 128)";
    }
    else if (elt == 800){
        ctx.fillStyle = "rgb(128, 64, 0)";
    }
    else if (elt == 1200){
        ctx.fillStyle = "rgb(0, 128, 0)";
    }
    else if (elt == 1600){
        ctx.fillStyle = "rgb(0, 192, 192)";
    }
    else if (elt == 2000){
        ctx.fillStyle = "rgb(0, 0, 255)";
    }
    else if (elt == 2400){
        ctx.fillStyle = "rgb(192, 192, 0)";
    }
    else if (elt == 2800){
        ctx.fillStyle = "rgb(255, 128, 0)";
    }
    else{
        ctx.fillStyle = "rgb(255, 0, 0)";
    }
    ctx.fillRect(0,h,canvas.width,prevh-h);
    if (elt > max_performance) break;
    prevh = h;
    
}
// ctx.strokeStyle="black";
ctx.stroke();    


ctx.beginPath(); 
ctx.globalAlpha = 1;
ctx.moveTo(0,canvas.height-from);

for (let i = 0; i < performances.length-1; i++){

    let to = performances[i+1];

    to /= max_performance;
    to *= canvas.height;
    to = Math.floor(to);
    
    ctx.lineTo((i+1)*w,canvas.height-to);  // Draw a line to (150, 100)
      
}
ctx.strokeStyle="black";
ctx.stroke();    

