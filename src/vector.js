


class Vector {
    constructor(x=0, y=0, z=0) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    }

    static fromHex(hex="#ffffff") {
        return new Vector(
            parseInt(hex.slice(1, 3), 16),
            parseInt(hex.slice(3, 5), 16),
            parseInt(hex.slice(5, 7), 16)
        );
    }

    static fromWorkshopVector(str) {
        if(typeof str != "string") return null;
        if(str.startsWith("Vector(") && str.endsWith(")")) {
            return new Vector(...str.substr(7, str.length-1).replace(/ /g, '').split(','));
        } else {
            return null
        }
    }

    parse() {
        return `Vector(${this.x}, ${this.y}, ${this.z})`;
    }

    parseColor() {
        return `Custom Color(${Math.floor(this.x)}, ${Math.floor(this.y)}, ${Math.floor(this.z)}, 255)`;
    }
}