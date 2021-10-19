

let performances = [];
let performance_change = 0;
let on_flag = 0;
var contest_performance_changes = {
    "ABC":0,
    "ARC":0,
    "AGC":0,
    "other":0
}

const performance_visualizer_div = document.createElement("DIV");
performance_visualizer_div.classList.add("performance_visualizer");


let canvas = document.createElement("canvas");

let performance_analyzer = document.createElement("DIV");
performance_analyzer.setAttribute("id","performance_analyzer");

canvas.setAttribute("id", "performance_graph");


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
    changes = [0,0,0,0];

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
        let change = parseInt(row.cells[5].innerHTML.substring(1));
        if (!Number.isInteger(change)){
            change = parseInt(row.cells[4].getElementsByTagName("span")[0].innerHTML);
        }
        else{
            if (sign === "-"){
                change = -1*change;
            }
        }
        let contest_name = row.children[1].querySelector('a').innerHTML;

        if (contest_name.indexOf("Beginner") != -1){
            contest_performance_changes["ABC"] += change;
        }
        else if (contest_name.indexOf("Regular") != -1){
            contest_performance_changes["ARC"] += change;
        }
        else if (contest_name.indexOf("Grand") != -1){
            contest_performance_changes["AGC"] += change;
        }
        else{
            contest_performance_changes["other"] += change;
        }
        performance_change += change;
    }
    performance_analyzer.innerHTML = "Rating contributions (";
    for (const [key, value] of Object.entries(contest_performance_changes)){
        change = value;
        contest = "<b>"+key+"</b>";
        if (change != 0){
            performance_analyzer.innerHTML = performance_analyzer.innerHTML +contest +": " + change +", ";
        }
    }
    performance_analyzer.innerHTML = performance_analyzer.innerHTML.substring(0,performance_analyzer.innerHTML.length - 2) + ")";


    performances = performances.reverse();
}

function drawOnCanvas(){

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    let unit_width = canvas.width/(performances.length+1);

    var ctx = canvas.getContext('2d');
    let max_performance = Math.max(...performances) + 300;
    if (max_performance < 0) max_performance = 3200;
    let min_performance = Math.min(0,Math.min(...performances));
    let performance_width = max_performance - min_performance;    
    
    let from = performances[0];
    from /= performance_width;
    from *= canvas.height;
    from = (from);
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;

    let prevh = canvas.height;
    ctx.globalAlpha = 0.5;
    
    for (key in color_dic) {
        let h = ((1-(key-min_performance)/performance_width)*canvas.height);
        h = Math.min(h,canvas.height);
        ctx.fillStyle = color_dic[key];
        ctx.fillRect(0,h,canvas.width,prevh-h);
        if (key > max_performance) break;
        prevh = h;
    }

    ctx.stroke();    
    ctx.beginPath(); 
    ctx.globalAlpha = 1;
    ctx.moveTo(unit_width,canvas.height-from);
    for(let i = 0; i < performances.length-1; i++){
        let to_width = (i+2)*unit_width;
        let to_height = canvas.height-canvas.height*performances[i+1]/max_performance;
        ctx.lineTo(to_width,to_height); 
    }
    ctx.strokeStyle="black";
    ctx.stroke(); 

    
    for (let i = 0; i < performances.length; i++){
        ctx.globalAlpha = 0.3;
        if ((i+1)%10 == 0){
            ctx.beginPath();
            ctx.moveTo((i+1)*unit_width,0);
            ctx.lineTo((i+1)*unit_width,canvas.height);
            ctx.lineWidth = 1;
            ctx.strokeStyle="grey";
            ctx.stroke(); 
        }
        ctx.globalAlpha = 1.0;
        let height = canvas.height-canvas.height*performances[i]/max_performance;
        ctx.beginPath();
        let radius = 4.5;
        ctx.arc((i+1)*unit_width, height, radius, 0, Math.PI*2, 1);
        let performance = performances[i];
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


function wrapper(){    
    getPerformances();
    drawOnCanvas();
    getPerformances();
    drawOnCanvas();
}

document.querySelectorAll('input[type=search]').forEach(item => {
    item.addEventListener('keydown', event => {
        wrapper();
    })
    item.addEventListener('keyup', event => {
        wrapper();
    })
})


function main(){
    chrome.storage.sync.get("atcoderLastToggle", function(obj) {
        if (obj.atcoderLastToggle === true){
            performance_visualizer_div.appendChild(performance_analyzer);
            performance_visualizer_div.appendChild(canvas);
            let checkbox = document.getElementsByClassName("checkbox")[0]
            checkbox.parentNode.insertBefore(performance_visualizer_div,checkbox);
            wrapper();
        }
    });
}

main();


