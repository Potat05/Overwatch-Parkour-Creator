



class Parkour_Map {
    constructor() {
        this.creator = "";
        this.map = OVERWATCH_MAPS[0];
        this.levels = [];

        this.id = globalID();
    }

    queryID(id) {
        if(id == this.id) return this;
        for(let i = 0; i < this.levels.length; i++) {
            let query = this.levels[i].queryID(id);
            if(query) return query;
        }
        return null;
    }

    getLevelIndex(id) {
        for(let i = 0; i < this.levels.length; i++) {
            if(this.levels[i].id == id) {
                return i;
            }
        }
        return -1;
    }

    newLevel() {
        const level = new Parkour_Level();
        this.levels.push(level);
        level.createNode();
        this.node.querySelector(".parkour-levelArray").appendChild(level.node);

        this.update();
    }

    removeLevel(id) {
        const level = this.queryID(id);
        if(level) {
            level.node.remove();
            this.levels.splice(this.levels.indexOf(level), 1);
            this.update();
        }
    }

    moveLevelDown(id) {
        const index = this.getLevelIndex(id);
        if(index == -1) return;
        if(index == this.levels.length - 1) return;
        this.levels.swapItems(index, index + 1);
        this.update();
    }

    moveLevelUp(id) {
        const index = this.getLevelIndex(id);
        if(index == -1) return;
        if(index == 0) return;
        this.levels.swapItems(index, index - 1);
        this.update();
    }

    set() {
        this.creator = this.node.querySelector(".parkour-creator").value;
        this.map = this.node.querySelector(".mapSelect").value;
    }

    update() {
        this.updateNode();

        for(let i = 0; i < this.levels.length; i++) {
            this.levels[i].update();
        }
    }

    updateNode() {

        this.node.innerHTML = `
            <div class="node node-header">
                <label>Overwatch Parkour Map</label>
            </div>

            <div class="node node-body">

                <div class="node node-header">
                    <label>Creator</label>
                    <input class="parkour-creator" placeholder="Battletag" size="20" onChange="parkour.set()" value="${this.creator}"></input>
                    <div class="hover info" data-hover="The creator(s) of this map">
                        <i class="bi bi-info-circle"></i>
                    </div>
                </div>

                <div class="node node-header">
                    <label>Map</label>
                    <select class="mapSelect" onChange="parkour.set()">${SELECT_OPTIONS.maps}</select>
                </div>

                <div class="node node-header">
                    <label>Levels</label>
                    <button class="array" onClick="parkour.newLevel()">
                        <i class="bi bi-plus-circle"></i>
                        New Level
                    </button>
                </div>

                <div class="node node-body parkour-levelArray"></div>


            </div>
        `;

        this.node.querySelector(".mapSelect").value = this.map;

        for(let i = 0; i < this.levels.length; i++) {
            this.levels[i].createNode();
            this.node.querySelector(".parkour-levelArray").appendChild(this.levels[i].node);
        }

    }

    createNode() {
        this.node = document.createElement("div");
        this.node.classList.add("tree");
        this.updateNode();
    }






    parse() {
        // ?!?!?!??!? why is blizzard censored
        const MAPNAME = this.map.replace("Blizzard", "Bl!zzard");
        let ruleName = `_Map for ${MAPNAME}`;
        if(this.creator.length > 0) ruleName += ` by ${this.creator}`;

        const WORKSHOP_MAP = this.map.replace(/[\(\)]/g, "");

        return `
variables
{
    global:
        0: _Map
}

rule("${ruleName}")
{
    event
    {
        Ongoing - Global;
    }

    conditions
    {
        Current Map == Map(${WORKSHOP_MAP});
    }

    actions
    {
        Global._Map = Array();
    }
}
        `;

    }


}