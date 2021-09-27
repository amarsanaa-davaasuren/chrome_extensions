

let performances = [];
let performance_change = 0;


const performance_visualizer_div = document.createElement("DIV");
performance_visualizer_div.classList.add("performance_visualizer");


let canvas = document.createElement("canvas");

let performance_analyzer = document.createElement("DIV");
performance_analyzer.setAttribute("id","performance_analyzer");

canvas.setAttribute("id", "performance_graph");
performance_visualizer_div.appendChild(performance_analyzer);
performance_visualizer_div.appendChild(canvas);

let checkbox = document.getElementsByClassName("checkbox")[0]
checkbox.parentNode.insertBefore(performance_visualizer_div,checkbox);


let box = document.querySelector('.table-responsive');
let style = getComputedStyle(box);
let width = parseInt(style.width);

canvas.width  = width;
canvas.height = 320;


var color_dic = {
    400:"rgb(128, 128, 128)",
    800:"rgb(128, 64, 0)",
    1200:"rgb(0, 128, 0)",
    1600:"rgb(0, 192, 192)",
    2000:"rgb(0, 0, 255)",
    2400:"rgb(192, 192, 0)",
    2800:"rgb(255, 128, 0)",
    10000:"rgb(255, 0, 0)",   
}

function getPerformances(){
    let rows = document.getElementsByTagName("table")[0].rows;

    performances = [];
    performance_change = 0;
    for (row of rows){
        if (row.cells.length === 1){
            break;
        }

        let performance = parseInt(row.cells[3].innerHTML);

        if (!Number.isInteger(performance)){
            continue;
        }
        for (key in color_dic){
            if (performance<key){
                row.cells[3].style.color = color_dic[key];
                break;
            }
        }
        performances.push(performance);
        let sign = row.cells[5].innerHTML[0];
        let value = parseInt(row.cells[5].innerHTML.substring(1));
        if (!Number.isInteger(value)){
            performance_change += parseInt(row.cells[4].getElementsByTagName("span")[0].innerHTML);
        } 
        else{
            if (sign === "+"){
                performance_change += value;
            }
            if (sign === "-"){
                performance_change -= value;
            }
        }

    }
    performance_analyzer.innerHTML = "Rating contribution: " + performance_change;
    performances = performances.reverse();
}

function drawOnCanvas(){

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    let w = Math.floor(canvas.width/(performances.length+1));

    var ctx = canvas.getContext('2d');
    let max_performance = Math.max(...performances) + 400;
    if (max_performance < 0) max_performance = 3200;
    let min_performance = Math.min(0,Math.min(...performances));
    let performance_width = max_performance - min_performance;    
    
    let from = performances[0];
    from /= performance_width;
    from *= canvas.height;
    from = Math.floor(from);
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;

    let prevh = canvas.height;
    ctx.globalAlpha = 0.5;
    
    for (key in color_dic) {
        let h = Math.floor((1-(key-min_performance)/performance_width)*canvas.height);
        h = Math.min(h,canvas.height);
        ctx.fillStyle = color_dic[key];
        ctx.fillRect(0,h,canvas.width,prevh-h);
        if (key > max_performance) break;
        prevh = h;
        
    }
    // ctx.strokeStyle="black";
    ctx.stroke();    
    ctx.beginPath(); 
    ctx.globalAlpha = 1;
    ctx.moveTo(w,canvas.height-from);
    
    for (let i = 0; i < performances.length-1; i++){
    
        let to = performances[i+1];
    
        to /= max_performance;
        to *= canvas.height;
        to = Math.floor(to);
        
        ctx.lineTo((i+2)*w,canvas.height-to); 
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
        ctx.arc((i+1)*w, canvas.height-performance, radius, 0, Math.PI*2, 1);
        
        performance = performances[i];
        for (var key in color_dic){
            if (performance < key){
                ctx.fillStyle = color_dic[key];
                break;
            }
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

getPerformances();
drawOnCanvas();
document.querySelectorAll('input[type=search]').forEach(item => {
    item.addEventListener('keydown', event => {
        getPerformances();
        drawOnCanvas();
    })
})

