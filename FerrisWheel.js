function round(value, decimal_places) {
    return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places) {
    return round(min + getRandom() * (max - min), decimal_places);

} function randomItem(list) {
    var selection = randomValue(0, list.length - 1, 0);
    return list[selection];
}

function getA() {
    return randomItem([50,55,60,65,70,75]);
}

function getP() {
    return randomItem([10,20,30,40]);
}

function getD() {
    return randomItem([3,5,6,10]);
}

setColumns(["a", "p", "d"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
    const a = getA();
    const p = getP();
    const d = getD();

    addRow([a,p,d]);
}
