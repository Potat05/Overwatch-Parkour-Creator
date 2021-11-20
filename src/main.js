




let parkour = new Parkour_Map();

parkour.createNode();

document.querySelector("#editor").appendChild(parkour.node);













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



document.querySelector(".importexport-background").addEventListener("click", () => {
    blurOff();
    document.querySelector("#import").style.display = "none";
    document.querySelector("#export").style.display = "none";
});

document.querySelector("#load").addEventListener("click", () => {

    blurOn();
    document.querySelector("#import").style.display = "block";
});

document.querySelector("#save").addEventListener("click", () => {

    document.querySelector("#export-textarea").innerHTML = parkour.parse();

    blurOn();
    document.querySelector("#export").style.display = "block";
});

document.querySelector("#import-button").addEventListener("click", () => {
    blurOff();
    document.querySelector("#import").style.display = "none";
});

document.querySelector("#export-button").addEventListener("click", () => {
    
    navigator.clipboard.writeText(document.querySelector("#export-textarea").innerHTML).then(null, (err) => {
        console.log("Could not copy export text.", err);
        alert("Could not copy text.");
    });

    blurOff();
    document.querySelector("#export").style.display = "none";
});