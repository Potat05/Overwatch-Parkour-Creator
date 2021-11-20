


class Vector {
    constructor(x=0, y=0, z=0) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    }

    parse() {
        return `Vector(${this.x}, ${this.y}, ${this.z})`;
    }
}