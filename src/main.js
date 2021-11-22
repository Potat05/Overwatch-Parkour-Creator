




let parkour = new Parkour_Map();

parkour.createNode();

document.querySelector("#editor").appendChild(parkour.node);












// PAGE BLUR


function blurOn() {
    document.querySelector(".importexport-background").style.display = "block";

    const blurElements = document.querySelectorAll(".importexport-blur");
    for(let element of blurElements) {
        element.style.filter = "blur(5px)";
    }
}

function blurOff() {
    document.querySelector(".importexport-background").style.display = "none";

    const blurElements = document.querySelectorAll(".importexport-blur");
    for(let element of blurElements) {
        element.style.filter = "";
    }
}




// BACKGROUND CLICK / CANCEL



document.querySelector(".importexport-background").addEventListener("click", () => {
    document.querySelector(".import-div").style.display = "none";
    document.querySelector(".export-div").style.display = "none";
    blurOff();
});



// IMPORTING

document.querySelector("#import").addEventListener("click", () => {
    document.querySelector(".import-div").style.display = "block";
    blurOn();
});

document.querySelector("#import-button").addEventListener("click", () => {
    document.querySelector(".import-div").style.display = "none";
    blurOff();
});



// EXPORTING

document.querySelector("#export").addEventListener("click", () => {

    document.querySelector("#export-textarea").innerHTML = parkour.parse();

    document.querySelector(".export-div").style.display = "block";
    blurOn();
});

document.querySelector("#export-button").addEventListener("click", () => {
    
    navigator.clipboard.writeText(document.querySelector("#export-textarea").innerHTML).then(null, (err) => {
        console.log("Could not copy export text.", err);
        alert("Could not copy text.");
    });

    document.querySelector(".export-div").style.display = "none";
    blurOff();
});