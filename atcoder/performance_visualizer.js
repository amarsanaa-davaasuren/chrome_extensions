

console.log("A");


let rows = document.getElementsByTagName("table")[0].rows

for (elt of rows){
    let performance = parseInt(elt.cells[3].innerHTML);

    if (!Number.isInteger(performance)){
        continue;
    }


    if (performance < 400){
        elt.cells[3].className = "user-gray"
    }
    else if (performance < 800){
        elt.cells[3].className = "user-brown"
    }
    else if (performance < 1200){
        elt.cells[3].className = "user-green"
    }
    else if (performance < 1600){
        elt.cells[3].className = "user-cyan"
    }
    else if (performance < 2000){
        elt.cells[3].className = "user-blue"
    }
    else if (performance < 2400){
        elt.cells[3].className = "user-yellow"
    }
    else if (performance < 2800){
        elt.cells[3].className = "user-orange"
    }
    else{
        elt.cells[3].className = "user-red"
    }
}
