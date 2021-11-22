




// List of all overwatch maps
const OVERWATCH_MAPS = [
    "Hanamura",
    "Hanamura (Winter)",
    "Horizon Lunar Colony",
    "Paris",
    "Temple of Anubis",
    "Volskaya Industries",
    "Dorado",
    "Havana",
    "Junkertown",
    "Rialto",
    "Route 66",
    "Watchpoint: Gibraltar",
    "Blizzard World",
    "Blizzard World (Winter)",
    "Eichenwalde",
    "Eichenwalde (Holloween)",
    "Hollywood",
    "Hollywood (Holloween)",
    "King's Row",
    "King's Row (Winter)",
    "Numbani",
    "Busan",
    "Ilios",
    "Lijiang Tower",
    "Lijiang Tower (Lunar New Year)",
    "Nepal",
    "Oasis"
];

const OVERWATCH_HEROES = [
    "Ana",
    "Ashe",
    "Baptiste",
    "Bastion",
    "Brigitte",
    "Cassidy",
    "D.Va",
    "Doomfist",
    "Echo",
    "Genji",
    "Hanzo",
    "Junkrat",
    "Lúcio",
    "Mei",
    "Mercy",
    "Moira",
    "Orisa",
    "Pharah",
    "Reaper",
    "Reinhardt",
    "Roadhog",
    "Sigma",
    "Soldier: 76",
    "Sombra",
    "Symmetra",
    "Torbjörn",
    "Tracer",
    "Widowmaker",
    "Winston",
    "Wrecking Ball",
    "Zarya",
    "Zenyatta"
];





const ABILITIES = ["Primary Fire", "Secondary Fire", "Ability 1", "Ability 2", "Ultimate Ability", "Interact", "Jump", "Crouch"];

const GROUND_OPTIONS = ["Do nothing", "Kill on ground"];

const OBJECT_TYPES = ["None", "Effect", "Safe Sphere", "Level End", "Ability Modifier"];
const OBJECT_CLASSES = [Parkour_Object_None, Parkour_Object_Effect, Parkour_Object_SafeSphere, Parkour_Object_LevelEnd, Parkour_Object_AbilityModifier];

const EFFECT_TYPES = ["Sphere", "Ring", "Light Shaft", "Orb"];
const EFFECT_TYPE_ORB = EFFECT_TYPES[3];





// Each select option as options for the select

const SELECT_OPTIONS = {
    heroes: OVERWATCH_HEROES.map((hero) => {
        return `<option>${hero}</option>`;
    }).join(""),

    maps: OVERWATCH_MAPS.map((map) => {
        return `<option>${map}</option>`;
    }).join(""),

    abilities: ABILITIES.map((ability) => {
        return `<option>${ability}</option>`
    }).join(""),

    groundOptions: GROUND_OPTIONS.map((groundOption) => {
        return `<option>${groundOption}</option>`;
    }).join(""),

    objectTypes: OBJECT_TYPES.map((objectType) => {
        return `<option>${objectType}</option>`;
    }).join(""),

    effectTypes: EFFECT_TYPES.map((effectType) => {
        return `<option>${effectType}</option>`;
    }).join("")



}