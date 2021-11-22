


class Parkour_Level {
    constructor() {
        this.hero = OVERWATCH_HEROES[0];
        this.startPos = new Vector();
        this.groundOption = GROUND_OPTIONS[0];
        this.objects = [];

        this.id = globalID();
    }

    queryID(id) {
        if(id == this.id) return this;
        for(let i = 0; i < this.objects.length; i++) {
            let query = this.objects[i].queryID(id);
            if(query) return query;
        }
        return null;
    }

    getObjectIndex(id) {
        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].id == id) return i;
        }
        return -1;
    }

    newObject() {
        const object = new OBJECT_CLASSES[0](this.id);
        this.objects.push(object);
        this.update();
    }

    removeObject(id) {
        const index = this.getObjectIndex(id);
        if(index == -1) return;
        this.objects.splice(index, 1);
        this.update();
    }

    moveObjectDown(id) {
        const index = this.getObjectIndex(id);
        if(index == -1) return;
        if(index == this.objects.length - 1) return;
        this.objects.swapItems(index, index + 1);
        this.update();
    }

    moveObjectUp(id) {
        const index = this.getObjectIndex(id);
        if(index == -1) return;
        if(index == 0) return;
        this.objects.swapItems(index, index - 1);
        this.update();
    }

    setObjectType(id, type) {
        const index = this.getObjectIndex(id);
        if(index == -1) return;
        this.objects[index] = new OBJECT_CLASSES[OBJECT_TYPES.indexOf(type)](this.id);
        
        this.update();
    }

    update() {
        this.updateNode();

        for(let i = 0; i < this.objects.length; i++) {
            this.objects[i].update();
        }
        
    }

    set() {

        this.hero = this.node.querySelector(".heroSelect").value;

        this.startPos.x = parseFloat(this.node.querySelector(".startPosX").value);
        this.startPos.y = parseFloat(this.node.querySelector(".startPosY").value);
        this.startPos.z = parseFloat(this.node.querySelector(".startPosZ").value);

        this.groundOption = this.node.querySelector(".groundOptionSelect").value;

    }

    remove() {
        this.node.remove();
    }

    updateNode() {

        const index = parkour.getLevelIndex(this.id);

        this.node.innerHTML = `
            <div class="node node-header">
                <label>Level ${index}</label>

                <button class="array" onClick="parkour.removeLevel(${this.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            
            <div class="node node-body">

                <div class="node node-header">
                    <label>Hero</label>
                    <select class="heroSelect" onChange="parkour.queryID(${this.id}).set()">${SELECT_OPTIONS.heroes}</select>
                </div>
            
                <div class="node node-header vector">
                    <label>Start Position</label>
                    <input class="number x startPosX" type="number" onChange="parkour.queryID(${this.id}).set()" value="${parkour.queryID(this.id).startPos.x}"></input>
                    <input class="number y startPosY" type="number" onChange="parkour.queryID(${this.id}).set()" value="${parkour.queryID(this.id).startPos.y}"></input>
                    <input class="number z startPosZ" type="number" onChange="parkour.queryID(${this.id}).set()" value="${parkour.queryID(this.id).startPos.z}"></input>
                </div>

                <div class="node node-header">
                    <label>Ground Options</label>
                    <select class="groundOptionSelect" onChange="parkour.queryID(${this.id}).set()">${SELECT_OPTIONS.groundOptions}</select>
                </div>

                <div class="node node-header">
                    <label>Objects</label>
                    <button class="array" onClick="parkour.queryID(${this.id}).newObject()">
                        <i class="bi bi-plus-circle"></i>
                        New Object
                    </button>
                </div>
                <div class="node node-body parkour-objectArray"></div>


            </div>
        `;

        this.node.querySelector(".heroSelect").value = this.hero;
        this.node.querySelector(".groundOptionSelect").value = this.groundOption;

        if(index < parkour.levels.length - 1) {
            this.node.querySelector(".node-header").innerHTML += `
                <button class="moveDown array" onClick="parkour.moveLevelDown(${this.id})">
                    <i class="bi bi-arrow-down"></i>
                </button>
            `;
        }


        if(index == 0) {
            this.node.querySelector(".node-header").innerHTML += `
                <div class="hover info" data-hover="This is the level the player will start on.">
                    <i class="bi bi-info-circle"></i>
                </div>
            `;
        } else {
            this.node.querySelector(".node-header").innerHTML += `
                <button class="moveUp array" onClick="parkour.moveLevelUp(${this.id})">
                    <i class="bi bi-arrow-up"></i>
                </button>
            `;
        }


        for(let i=0; i < this.objects.length; i++) {
            this.objects[i].createNode();
            this.node.querySelector(".parkour-objectArray").appendChild(this.objects[i].node);
        }

    }

    createNode() {
        this.node = document.createElement("div");
        this.node.classList.add("node");
        this.updateNode();
    }






    length() {
        let len = 4;
        for(let obj of this.objects) {
            len += obj.length();
        }
        return len;
    }

    parse() {
        let str = `${this.length()}, Hero(${this.hero}), ${this.startPos.parse()}, ${GROUND_OPTIONS.indexOf(this.groundOption)}`;
        if(this.objects.length > 0) {
            str += `, ${this.objects.map((obj) => obj.parse()).join(", ")}`;
        }
        return str;
    }
}