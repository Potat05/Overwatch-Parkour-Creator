


function setVectorElems() {
    const elems = document.querySelectorAll(".vector:not(.vectorSET)");


    for(const elem of elems) {
        elem.classList.add("vectorSET");
        const label = elem.querySelector("label");
        label.setAttribute("contenteditable", "");

        label.addEventListener("keypress", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });

        label.addEventListener("mousemove", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });

        label.addEventListener("paste", (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            const vec = Vector.fromWorkshopVector(e.clipboardData.getData("text"));
            if(vec == null) return;

            elem.querySelector(".x").value = vec.x;
            elem.querySelector(".y").value = vec.y;
            elem.querySelector(".z").value = vec.z;

            elem.querySelectorAll(".x, .y, .z").forEach((comp) => comp.dispatchEvent(new Event("change")));
        });

        label.addEventListener("copy", (e) => {
            e.stopPropagation();
            e.preventDefault();

            const vec = new Vector(
                elem.querySelector(".x").value,
                elem.querySelector(".y").value,
                elem.querySelector(".z").value
            );

            navigator.clipboard.writeText(vec.parse()).then(null, (err) => {
                console.log("Could not copy vector text", err);
                alert("Could not copy text.");
            });
        });
    }


}

setInterval(setVectorElems, 1000);