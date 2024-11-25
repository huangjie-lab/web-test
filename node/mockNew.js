function Otaku(name,age) {
    this.name = name;
    this.age = age;   
    this.habit = 'Games'
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayName = function () {
    console.log("I am " + this.name);
};

function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, args); // ret有可能为null
    return typeof ret === "object" ? ret || obj : obj;
}