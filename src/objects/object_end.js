

class Parkour_Object_LevelEnd extends Parkour_Object {
    constructor(level) {
        super(level, OBJECT_TYPES[3], "When the player touches this object, They will be sent to the next level.");
        this.pos = new Vector();
        this.radius = 3;
        this.ground = true;
        this.nextLevel = parkour.getLevelIndex(level) + 1;
    }

    set() {

        this.pos.x = parseFloat(this.node.querySelector(".posX").value);
        this.pos.y = parseFloat(this.node.querySelector(".posY").value);
        this.pos.z = parseFloat(this.node.querySelector(".posZ").value);

        this.radius = parseFloat(this.node.querySelector(".radius").value);

        this.ground = this.node.querySelector(".ground").checked;

        this.nextLevel = parseInt(this.node.querySelector(".nextLevel").value);

        this.updateNode();
    }

    updateNode() {
        this.nodeBase();

        const node = document.createElement("div");
        node.classList.add("node");
        node.classList.add("node-body");

        node.innerHTML = `
            <div class="node node-header vector">
                <label>Position</label>
                <input type="number" class="number x posX" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.x}">
                <input type="number" class="number y posY" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.y}">
                <input type="number" class="number z posZ" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.z}">
            </div>

            <div class="node node-header">
                <label>Radius</label>
                <input type="number" class="number radius" onChange="parkour.queryID(${this.id}).set()" value="${this.radius}">
            </div>

            <div class="node node-header">
                <label>Ground</label>
                <input type="checkbox" class="ground checkbox" onChange="parkour.queryID(${this.id}).set()" ${this.ground ? "checked" : ""}>
                <div class="hover info" data-hover="Whether or not the player needs to be on the ground to end the level.">
                    <i class="bi bi-info-circle"></i>
                </div>
            </div>

            <div class="node node-header">
                <label>Next Level</label>
                <input type="number" class="number nextLevel" onChange="parkour.queryID(${this.id}).set()" value="${this.nextLevel}">
            </div>


        `;

        this.node.appendChild(node);
    }






        
    length() {
        return super.length() + 3;
    }

    parse() {
        return `${super.parse()}, ${this.pos.parse()}, ${this.radius}, ${new Vector(this.nextLevel, (this.ground ? 1 : 0)).parse()}`;
    }
}