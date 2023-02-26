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
    let inCellYmove = (id % dotsField - inCellXmove)/dotsHorizontaly;
    cords.push(cellpos % cellsHorizontaly * dotsHorizontaly +inCellXmove);
    cords.push((cellpos - cellpos % cellsHorizontaly)/cellsHorizontaly*dotsVerticaly+inCellYmove);
    return cords;

}
function getCellNr(id)
{
    return (id - id%dotsField) / dotsField;
}

function applyRawData(rawdata)
{
    let i;
    let b2 = rawdata[1];
    let move 
    for(i=0;i < cellsHorizontaly;i++)
    {
        if(rawdata[0] & i)
        {
            move = dotsField * i;
        }
    }
    for(i=0;i < cellsVerticaly;i++)
    {
        if(rawdata[0] & i)
        {
            move += cellsHorizontaly* dotsField * i;
        }
    }

    
    let end =((rawdata.length - 1) * 8) - ((rawdata.length - 1) * 8 % dotsField) / dotsField;


    let dataPointer = 2;
    let byte;
    let cells = document.getElementsByTagName('tr');
    
    for(i=0 ;i < end; i++)
    {
        if((i % 8) == 0)
        {
            dataPointer++;
            byte = rawdata[dataPointer];
        }
        
        if(byte & 128 == 128) cells[move +i].style.background = "yellow";
        else cells[move +i].style.background = "#1e1e1e";
        byte = byte << 1;        
    }

}

