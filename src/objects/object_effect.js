

class Parkour_Object_Effect extends Parkour_Object {
    constructor(level) {
        super(level, OBJECT_TYPES[1], "Displays an effect at a location.");
        this.effectType = EFFECT_TYPES[0];
        this.pos = new Vector();
        this.radius = 3;
        this.color = "#FF0000";
    }

    set() {
        this.effectType = this.node.querySelector(".effectTypeSelect").value;

        this.pos.x = parseFloat(this.node.querySelector(".posX").value);
        this.pos.y = parseFloat(this.node.querySelector(".posY").value);
        this.pos.z = parseFloat(this.node.querySelector(".posZ").value);

        // The radius may not exist because of the orb effect
        if(this.node.querySelector(".radius")) {
            this.radius = parseFloat(this.node.querySelector(".radius").value);
        }

        this.color = this.node.querySelector(".color").value;

        this.updateNode();
    }

    updateNode() {
        this.nodeBase();

        const node = document.createElement("div");
        node.classList.add("node");
        node.classList.add("node-body");

        node.innerHTML = `
            <div class="node node-header">
                <label>Effect Type</label>
                <select class="effectTypeSelect" onChange="parkour.queryID(${this.id}).set()">${SELECT_OPTIONS.effectTypes}</select>
                <div class="hover info" data-hover="The effect display type (NOTE: Orb effect can only be displayed at radius 1)">
                    <i class="bi bi-info-circle"></i>
            </div>
            </div>

            <div class="node node-header vector">
                <label>Position</label>
                <input type="number" class="number x posX" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.x}">
                <input type="number" class="number y posY" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.y}">
                <input type="number" class="number z posZ" onChange="parkour.queryID(${this.id}).set()" value="${this.pos.z}">
            </div>

            <div class="node node-header effectRadius">
                <label>Radius</label>
                <input type="number" class="number radius" onChange="parkour.queryID(${this.id}).set()" value="${this.radius}">
            </div>

            <div class="node node-header">
                <label>Color</label>
                <input type="color" class="color" onChange="parkour.queryID(${this.id}).set()" value="${this.color}">
            </div>
        `;

        node.querySelector(".effectTypeSelect").value = this.effectType;

        // The orb effect can't have a radius so we just remove it to stop confusion if people are trying to tweak the radius
        if(this.effectType == EFFECT_TYPE_ORB) {
            node.querySelector(".effectRadius").remove();
        }

        this.node.appendChild(node);
    }





    length() {
        return super.length() + 4;
    }

    parse() {
        return `${super.parse()}, ${EFFECT_TYPES.indexOf(this.effectType)}, ${this.pos.parse()}, ${this.radius}, ${Vector.fromHex(this.color).parseColor()}`;
    }
}