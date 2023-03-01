const cellsHorizontaly = 30;
const cellsVerticaly = 10;

const dotsHorizontaly = 5;
const dotsVerticaly = 7;
const dotsField = dotsHorizontaly * dotsVerticaly;
const backgroundOn = "background:yellow";
const backgrundOff = "background:#1e1e1e";

const alphabet = []; // 5 x 7
alphabet["A"] = "01110100011000111111100011000110001";
alphabet["a"] = alphabet["A"];
alphabet["B"] = "11110010010100101110010010100111110";
alphabet["b"] = alphabet["B"];
alphabet["C"] = "01110100011000010000100001000101110";
alphabet["c"] = alphabet["C"];
alphabet["D"] = "11110010010100101001010010100111110";
alphabet["d"] = alphabet["D"];
alphabet["E"] = "11111100001000011110100001000011111";
alphabet["e"] = alphabet["E"];
alphabet["F"] = "11111100001000011110100001000010000";
alphabet["f"] = alphabet["F"];




function createCells(element) {
    let Row = [];
    for (let i = 0; i < cellsVerticaly; i++) {
        Row.push(document.createElement("div"))
        for (let j = 0; j < cellsHorizontaly; j++) {
            createCell(Row[i], i * cellsHorizontaly + j);
        }
        element.appendChild(Row[i]);
    }

}
function createCell(element, n) {
    let Table = document.createElement('table');
    let Tbody = document.createElement('tbody');
    for (let i = 0; i < dotsVerticaly; i++) {
        let row = Tbody.insertRow();
        for (let j = 0; j < dotsHorizontaly; j++) {
            let dot = row.insertCell();
            dot.setAttribute("id", n * (dotsVerticaly * dotsHorizontaly) + i * (dotsHorizontaly) + j);
        }
    }
    Table.appendChild(Tbody);
    element.appendChild(Table);
}

function setDotColorById(id, color = 'yellow') {
    document.getElementById(id).style.background = color;
    return;
}

function getDotId(x, y) {
    return (y - (y % dotsVerticaly)) * dotsHorizontaly * cellsHorizontaly + (y % dotsVerticaly) * dotsHorizontaly + (x - (x % dotsHorizontaly)) * dotsVerticaly + x % dotsHorizontaly;
}
function getDotCord(id) {

    const cords = [];
    let cellpos = getCellNr(id)
    let inCellXmove = id % dotsHorizontaly;
    let inCellYmove = (id % dotsField - inCellXmove) / dotsHorizontaly;
    cords.push(cellpos % cellsHorizontaly * dotsHorizontaly + inCellXmove);
    cords.push((cellpos - cellpos % cellsHorizontaly) / cellsHorizontaly * dotsVerticaly + inCellYmove);
    return cords;

}
function getCellNr(id) {
    return (id - id % dotsField) / dotsField;
}
function applyBools(bools) {
    let i;
    let move = 0;
    move = dotsField * ((bools.charCodeAt(0) - 48) * 100 + (bools.charCodeAt(1) - 48) * 10 + (bools.charCodeAt(2) - 48));
    console.log(move);
    let cells = document.getElementsByTagName('td');
    bools = bools.substring(3);
    console.log(bools);

    for (i = 0; i < bools.length; i++) {
        console.log(bools[i]);

        if (bools[i] == '1')
            cells[move + i].setAttribute("style", backgroundOn);
        else
            cells[move + i].setAttribute("style", backgrundOff);
    }
}
