const cellsHorizontaly = 30;
const cellsVerticaly = 10;

const dotsHorizontaly = 5;
const dotsVerticaly = 7;
const dotsField = dotsHorizontaly * dotsVerticaly;


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

function applyRawData(rawdata) {
    let i;
    let move;
    move = dotsField * rawdata.charCodeAt(0);
    move += cellsHorizontaly * dotsField * rawdata.charCodeAt(1);

    let end = ((rawdata.length - 2) * 8) - ((rawdata.length - 2) * 8 % dotsField) / dotsField;

    let cells = document.getElementsByTagName('td');
    let byte;
    let pointer = 2;
    for (i = 0; i < end; i++) {
        if ((i % 8) == 0) {
            pointer++
            byte = rawdata[pointer].charCodeAt(0);

        }
        console.log((byte >>> 6));

        if ((byte >>> 6)) {

            cells[move + i].setAttribute("style", "background:yellow");
        }
        else cells[move + i].setAttribute("style", "background:#1e1e1e");
        byte = byte << 1;
    }

}
function applyBools(bools) {
    let i;
    let move = 0;
    move = dotsField * ((bools.charCodeAt(0)-48)*100 +(bools.charCodeAt(1)-48)*10 + (bools.charCodeAt(2)-48));
    console.log(move);
    let cells = document.getElementsByTagName('td');
    bools = bools.substring(3);
    console.log(bools);

    for (i = 0; i < bools.length ; i++) {
        console.log(bools[i]);

        if (bools[i] == '1')
            cells[move + i].setAttribute("style", "background:yellow");
        else
            cells[move + i].setAttribute("style", "background:#1e1e1e");
    }

}

