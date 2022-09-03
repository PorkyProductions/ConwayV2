class Cell {
    constructor() {
        this.pos = new Point(50, 50);
        this.orientation = new Orientation("right");
        
        this.size = 3;
        this.energy = 5;
        this.partsData = D2Array(this.size, this.size);
        this.partsData[Math.floor(this.size / 2)][Math.floor(this.size / 2)] = -1

        this.parts = JSON.parse(JSON.stringify(this.partsData));

        this.brain = [["always", "move"]];
        //this.parts[Math.floor(this.size / 2) - 1][Math.floor(this.size / 2)] = -2
        //this.parts[Math.floor(this.size / 2)][Math.floor(this.size / 2) - 1] = -2
        //this.parts[Math.floor(this.size / 2) + 1][Math.floor(this.size / 2)] = -2
        //this.parts[Math.floor(this.size / 2)][Math.floor(this.size / 2) + 1] = -2


        this.energy = 10;
    }
    Act() {

    }
    Think() {

    }
    DrawAndUpdateParts() {
        if (this.energy <= 0) {
            for (var i = 0; i < cells.length; i++) {
                if (cells[i] == this) {
                    cells.splice(i, 1);
                    i--;
                }
            }
            return;
        }
        var _this = this;
        var i = 0;
        this.parts.forEach(function (row) {
            var id = 0;
            row.forEach(function (part) {
                var drawPoint = Object.assign(Object.create(Object.getPrototypeOf(_this.pos)), _this.pos);
                drawPoint.x += i - Math.floor(_this.size / 2);
                drawPoint.y += id - Math.floor(_this.size / 2);
                if (drawPoint.x < 100 & drawPoint.y < 100 & drawPoint.x >= 0 & drawPoint.x >= 0) {
                    if (boardState[drawPoint.x][drawPoint.y] != undefined) {
                        boardState[drawPoint.x][drawPoint.y].push([part, _this]);
                    }
                }

                switch (part) {
                    case -1:
                        DrawUnit(drawPoint, "black"); // central
                        break;               
                    case 0:
                        break; // air
                    case 1:
                        DrawUnit(drawPoint, "gray"); // eating blocks
                        break;
                    case 2:
                        DrawUnit(drawPoint, "red"); //attack
                        break;
                    case 3:
                        DrawUnit(drawPoint, "yellow");// defense
                        break;
                    case 4:
                        DrawUnit(drawPoint, "blue"); //eye sensor
                        break;
                    case 5:
                        DrawUnit(drawPoint, "orange"); // touch sensor
                        break;
                    
                    


                }   
                id++;
            })
            i++;
        })
    }
    Mutate() {
        var i = 0;
        var _this = this;
        this.parts.forEach(function (row) {
            var id = 0;
            row.forEach(function (part) {
                if(Math.random() < 0.3 / _this.size)
                switch (part) {
                    case -1:
                        break;
                    case 0:
                        _this.parts[i][id] = _this.RandomCellType();
                        break; // air
                    case 1:
                        _this.parts[i][id] = _this.RandomCellType();
                        break;
                    case 2:
                        _this.parts[i][id] = _this.RandomCellType();
                        break;
                    case 3:
                        _this.parts[i][id] = _this.RandomCellType();
                        break;
                    case 4:
                        _this.parts[i][id] = _this.RandomCellType();
                        break;
                    case 5:
                        _this.parts[i][id] = _this.RandomCellType();
                        break;
                    case 6:
                        _this.parts[i][id] = _this.RandomCellType();
                        break;
                    case 7:
                        _this.parts[i][id] = _this.RandomCellType();
                        break;

                }
                id++;
            })
            i++;
        })
    }
    Move() {
        this.energy -= 0.05;
        this.pos.Add(this.orientation.AsVector());
        if (this.pos.x > gridSize - 1) {
            this.pos.x = gridSize - 1;
        }
        if (this.pos.y > gridSize - 1) {
            this.pos.y = gridSize - 1;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }
    }
    RotateRight() {
        this.orientation.Clockwise90();
        Transpose(this.parts);
        Transpose(this.parts);
        Transpose(this.parts);

    }
    RotateLeft() {
        this.orientation.CounterClockwise90();
        Transpose(this.parts);
        

    }
    Reproduce() {
        if (cells.length > 200) { return;}
        var newPosAdd = new Orientation("random").AsVector().Multiply(this.size);
        var newCell = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        newCell.pos = Object.assign(Object.create(Object.getPrototypeOf(this.pos)), this.pos);
        newCell.pos.Add(newPosAdd);
        newCell.orientation = new Orientation("random");
        newCell.partsData = Object.assign(Object.create(Object.getPrototypeOf(this.partsData)), this.partsData);
        newCell.parts = JSON.parse(JSON.stringify(this.parts));
        newCell.Mutate();
        newCell.energy = 10;
        cells.push(newCell);

    }
    RandomCellType() {
        return Math.floor(Math.random() * 8.9999);
    }
    Center() {
        for (var i = 0; i < this.size; i++) {
            for (var id = 0; id < this.size; id++) {
                if (this.parts == -1) {return new Point(i, id)}
            }
        }
    }
}
class Food{
    constructor(x, y) {
        this.pos = new Point(x, y);
        boardState(x, y)
    }
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    Add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    Multiply(number) {
        this.x *= number;
        this.y *= number;
        return this;
    }
}
class Orientation {
    constructor(orientation) {
        if (orientation != "left" & orientation != "right" & orientation != "up" & orientation != "down" & orientation != "random") {
            throw new Error("orientation not of valid type: left, right, up, down, random. Instead the invalid value " + orientation + " givin")
        }
        this.orientation = orientation;
        if (this.orientation == "random") {
            var rand = Math.random();
            if (rand < 0.25) {
                this.orientation = "left";
            } else if (rand < 0.5) {
                this.orientation = "right";
            } else if (rand < 0.75) {
                this.orientation = "up";
            } else {
                this.orientation = "down";
            } 
        }
    }
    CounterClockwise90() {
        switch (this.orientation) {
            case "left":
                this.orientation = "down";
                return "down";
            case "up":
                this.orientation = "left";
                return "left";
            case "right":
                this.orientation = "up";
                return "up";
            case "down":
                this.orientation = "right";
                return "right";
        }
    }
    Clockwise90() {
        switch (this.orientation) {
            case "left":
                this.orientation = "up";
                return "up";
            case "up":
                this.orientation = "right";
                return "right";
            case "right":
                this.orientation = "down";
                return "down";
            case "down":
                this.orientation = "left";
                return "left";
        }
    }
    AsVector() {
        switch (this.orientation) {
            case "left":
                return new Point(-1, 0);
            case "up":
                return new Point(0, -1);

            case "right":
                return new Point(1, 0);

            case "down":
                return new Point(0, 1);

        }
    }
}

const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const gridSize = 100;
const unitSize = canvas.width / 100;
const ctx = canvas.getContext("2d");
let iterations = 0;

var cells = [new Cell()];
var boardState = D2ArrayNest(gridSize, gridSize);

function Start() {
    
}
function Update() {
    iterations++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boardState = D2ArrayNest(gridSize, gridSize);

    cells.forEach(function (cell) {

        cell.Move();
        cell.DrawAndUpdateParts();
        if (Math.random() < 0.1) {
            if (Math.random() < 0.5) {
                cell.RotateRight();
            } else {
                cell.RotateLeft();
            }

        }
        if (Math.random() < 0.01) {
            cell.Reproduce();
        }
    })
    boardState.forEach(function (col) {
        col.forEach(function (unit) {
            var hasAttack = false;
            unit.forEach(function (part) {
                if (part[0] == 2) {
                    hasAttack = true;
                }
            })

            unit.forEach(function (part) {
                if (hasAttack & part[0] != 2) {
                    for (var i = 0; i < cells.length; i++) {
                        if (cells[i] == part[1]) {
                            cells.splice(i, 1);
                            i--;
                        }
                    }
                }
            })

        })
    })

    

}


















(function () {
    Start();
    setInterval(function () {
        Update();
    }, 50)
})();











function DrawUnit(pos, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(pos.x * unitSize, pos.y * unitSize, unitSize, unitSize);
    ctx.restore(); 
}












function D2Array(width, height){
    var arr = [];
    for (var i = 0; i < height; i++) {
        var row = [];
        for (var id = 0; id < width; id++) {
            row.push(0);
        }
        arr.push(row);
    }
    return arr;
}

function D2ArrayNest(width, height) {
    var arr = [];
    for (var i = 0; i < height; i++) {
        var row = [];
        for (var id = 0; id < width; id++) {
            row.push([]);
        }
        arr.push(row);
    }
    return arr;
}
function Transpose(matrix) {
    const n = matrix.length;
    const x = Math.floor(n / 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
        for (let j = i; j < y - i; j++) {
            k = matrix[i][j];
            matrix[i][j] = matrix[y - j][i];
            matrix[y - j][i] = matrix[y - i][y - j];
            matrix[y - i][y - j] = matrix[j][y - i]
            matrix[j][y - i] = k
        }
    }
}