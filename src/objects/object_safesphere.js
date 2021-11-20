

class Parkour_Object_SafeSphere extends Parkour_Object {
    constructor(level) {
        super(level, OBJECT_TYPES[2], "When the player is in this sphere, They won't die from 'Kill on ground' option or lava objects.");
        this.pos = new Vector();
        this.radius = 3;
    }

    set() {

        this.pos.x = parseFloat(this.node.querySelector(".posX").value);
        this.pos.y = parseFloat(this.node.querySelector(".posY").value);
        this.pos.z = parseFloat(this.node.querySelector(".posZ").value);

        this.radius = parseFloat(this.node.querySelector(".radius").value);

        this.updateNode();
    }

    updateNode() {
        this.nodeBase();

        const node = document.createElement("div");
        node.classList.add("node");
        node.classList.add("node-body");

        node.innerHTML = `
            <div class="node node-header">
                <label>Position</label>
                <input type="number" class="number posX" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.x}">
                <input type="number" class="number posY" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.y}">
                <input type="number" class="number posZ" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.z}">
            </div>

            <div class="node node-header">
                <label>Radius</label>
                <input type="number" class="number radius" onChange="parkour.queryID(${this.id}).set()" value="${this.radius}">
            </div>

        `;

        this.node.appendChild(node);
    }
}