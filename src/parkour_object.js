


class Parkour_Object {
    constructor(level, type, info="") {
        this.type = type;
        if(this.type == undefined) throw("Parkour_Object: type is undefined");

        this.info = info;

        this.level = level;
        this.id = globalID();
    }

    queryID(id) {
        return (this.id == id ? this : null);
    }

    setType() {
        if(this.type != this.node.querySelector(".objectTypeSelect").value) {
            parkour.queryID(this.level).setObjectType(this.id, this.node.querySelector(".objectTypeSelect").value);
            return;
        }
    }

    set() {

    }

    update() {
        this.updateNode();
    }

    nodeBase() {
        
        const levelIndex = parkour.getLevelIndex(this.level);
        const objectIndex = parkour.levels[levelIndex].getObjectIndex(this.id);

        this.node.innerHTML = `
            <div class="node node-header">
                <label>Object ${objectIndex}</label>
                <select class="objectTypeSelect" onChange="parkour.queryID(${this.id}).setType()" value="${this.type}">${SELECT_OPTIONS.objectTypes}</select>
                <button class="array" onClick="parkour.queryID(${this.level}).removeObject(${this.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        this.node.querySelector(".objectTypeSelect").value = this.type;
        // Gatta do this as well for some weird reason or else it wont set the selected option
        this.node.querySelector(`.objectTypeSelect :nth-child(${OBJECT_TYPES.indexOf(this.type)+1})`).setAttribute("selected", "");



        if(objectIndex < parkour.levels[levelIndex].objects.length - 1) {
            this.node.querySelector(".node-header").innerHTML += `
                <button class="moveDown array" onClick="parkour.queryID(${this.level}).moveObjectDown(${this.id})">
                    <i class="bi bi-arrow-down"></i>
                </button>
            `;
        }

        if(objectIndex > 0) {
            this.node.querySelector(".node-header").innerHTML += `
                <button class="moveUp array" onClick="parkour.queryID(${this.level}).moveObjectUp(${this.id})">
                    <i class="bi bi-arrow-up"></i>
                </button>
            `;
        }


        if(this.info.length > 0) {
            this.node.querySelector(".node-header").innerHTML += `
                <div class="hover info" data-hover="${this.info}">
                    <i class="bi bi-info-circle"></i>
                </div>
            `;
        }

    }

    updateNode() {
        this.nodeBase();
    }

    createNode() {
        this.node = document.createElement("div");
        this.node.classList.add("node");
        this.updateNode();
    }
}