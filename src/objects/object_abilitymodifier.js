

class Parkour_Object_AbilityModifier extends Parkour_Object {
    constructor(level) {
        super(level, OBJECT_TYPES[4], "Modify the amount of times the player can use an ability when entered. (NOTE: The player always starts with every ability at 9999 uses)");
        this.pos = new Vector();
        this.radius = 99999;
        this.ability = ABILITIES[0];
        this.abilityUses = 0;
    }

    set() {

        this.pos.x = parseFloat(this.node.querySelector(".posX").value);
        this.pos.y = parseFloat(this.node.querySelector(".posY").value);
        this.pos.z = parseFloat(this.node.querySelector(".posZ").value);

        this.radius = parseFloat(this.node.querySelector(".radius").value);

        this.ability = this.node.querySelector(".ability").value;
        this.abilityUses = parseInt(this.node.querySelector(".abilityUses").value);

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
                <label>Ability</label>
                <select class="ability" onChange="parkour.queryID(${this.id}).set()">${SELECT_OPTIONS.abilities}</select>
            </div>

            <div class="node node-header">
                <label>Ability Uses</label>
                <input type="number" class="number abilityUses" onChange="parkour.queryID(${this.id}).set()" value="${this.abilityUses}">
            </div>
        `;

        node.querySelector(".ability").value = this.ability;


        this.node.appendChild(node);
    }






        
    length() {
        return super.length() + 4;
    }

    parse() {
        return `${super.parse()}, ${this.pos.parse()}, ${this.radius}, Ability Button(${this.ability}), ${this.abilityUses}`;
    }
}