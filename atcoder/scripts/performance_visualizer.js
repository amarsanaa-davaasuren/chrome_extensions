



const performance_visualizer_div = document.createElement("DIV");
performance_visualizer_div.classList.add("performance_visualizer");

let canvas = document.createElement("canvas");
canvas.setAttribute("id", "performance_graph");
performance_visualizer_div.appendChild(canvas);
let checkbox = document.getElementsByClassName("checkbox")[0]
checkbox.parentNode.insertBefore(performance_visualizer_div,checkbox);


let box = document.querySelector('.table-responsive');
let style = getComputedStyle(box);
let width = parseInt(style.width);

canvas.width  = width;
canvas.height = 320;


function drawOnCanvas(){

    let rows = document.getElementsByTagName("table")[0].rows;

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

    
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    let w = Math.floor(canvas.width/performances.length);

    var ctx = canvas.getContext('2d');
    let max_performance = Math.max(...performances) + 400;
    let min_performance = Math.min(0,Math.min(...performances));
    let performance_width = max_performance - min_performance;    
    
    let from = performances[0];
    from /= performance_width;
    from *= canvas.height;
    from = Math.floor(from);
    
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    let prevh = canvas.height;
    ctx.globalAlpha = 0.5;
    
    for (elt of [400,800,1200,1600,2000,2400,2800,100000]) {
        let h = Math.floor((1-(elt-min_performance)/performance_width)*canvas.height);
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
        
        ctx.lineTo((i+1)*w,canvas.height-to); 
    }
    ctx.strokeStyle="black";
    ctx.stroke();    
    
    
    
    for (let i = 0; i < performances.length; i++){
        let performance = performances[i];
        performance /= max_performance;
        performance *= canvas.height;
        performance = Math.floor(performance);
        ctx.beginPath();
        let radius = 4
        ctx.arc(i*w, canvas.height-performance, radius, 0, Math.PI*2, 1);
        
        performance = performances[i];
        if (performance < 400){
            ctx.fillStyle = "rgb(128, 128, 128)";
        }
        else if (performance < 800){
            ctx.fillStyle = "rgb(128, 64, 0)";
        }
        else if (performance < 1200){
            ctx.fillStyle = "rgb(0, 128, 0)";
        }
        else if (performance < 1600){
            ctx.fillStyle = "rgb(0, 192, 192)";
        }
        else if (performance < 2000){
            ctx.fillStyle = "rgb(0, 0, 255)";
        }
        else if (performance < 2400){
            ctx.fillStyle = "rgb(192, 192, 0)";
        }
        else if (performance < 2800){
            ctx.fillStyle = "rgb(255, 128, 0)";
        }
        else{
            ctx.fillStyle = "rgb(255, 0, 0)";
        }
    
            
        
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.stroke();
    
    }
    
    
    
};



const rival_id_div = document.createElement("DIV");
rival_id_div.innerHTML = "Compare with: "
const rival_id_input = document.createElement("INPUT");
rival_id_input.id = "rival_id_input";
rival_id_input.type = "search";
rival_id_div.appendChild(rival_id_input)
checkbox.parentNode.insertBefore(rival_id_div,checkbox);

drawOnCanvas();
document.querySelectorAll('input[type=search]').forEach(item => {
    item.addEventListener('keypress', event => {
        drawOnCanvas();
    })
})


