const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


class Block {
    constructor(x, y, width, height, type){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.fillStyle = 'blue';
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.closePath();
    }
}


class Player{
    constructor(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 50;
        this.height = 50;
        this.dx = 10;
        this.dy = 10;
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;
    }

    drawPlayer(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    eventHandlerDown(key){
        if (key === 'KeyA') {
            this.leftPressed = true;
        } else if (key === 'KeyD'){
            this.rightPressed = true;
        } else if (key === 'KeyW') {
            this.upPressed = true;
        } else if (key === 'KeyS') {
            this.downPressed = true;
        }
    }

    eventHandlerUp(key) {
        if (key === 'KeyA') {
            this.leftPressed = false;
        } else if (key === 'KeyD'){
            this.rightPressed = false;
        } else if (key === 'KeyW') {
            this.upPressed = false;
        } else if (key === 'KeyS'){
            this.downPressed = false;
        }
    }

    move(){
        if (this.leftPressed) {
            this.x -= this.dx;
        }
        if (this.rightPressed) {
            this.x += this.dx;
        }
        if (this.upPressed) {
            this.y -= this.dy;
        }
        if (this.downPressed) {
            this.y += this.dy; 
        }
    }

    collisionDetectionBorder(blockList) {
        for (let r = 0; r < blockList.length; r++) {
            let rows = blockList[r];
            for (let c = 0; c < rows.length; c++) {
                let block = rows[c];
                if (block.type === 'border') {
                    if (this.x - this.dx < block.x + block.width && 
                        this.y >= block.y && 
                        this.y + this.dy < block.y + block.height){
                        block.fillStyle = 'green';
                        block.draw();
                    }
                }
            }
        }
    }
}

let blockList = buildBlockList(firstLevel);
function buildBlockList(level) {
    let blockList = [];
    for (let r = 0; r < level.length; r++) {
        let rows = level[r];
        let newRow = [];
        for (let c = 0; c < rows.length; c++) {
            if (rows[c] === 1) {
                let newBlock = new Block(c * 50, r * 50, 50, 50, 'border');
                newRow.push(newBlock);
            }
        }
        blockList.push(newRow);
    }
    return blockList;
}

function spawnBlocks(level) {
    for (let r = 0; r < level.length; r++) {
        let rows = level[r]
        for (let c = 0; c < rows.length; c++) {
            if (rows[c] === 1) {
                let newBlock = new Block(c * 50, r * 50, 50, 50);
                newBlock.draw();
            }
        }
    }
}

let playerOne = new Player();
document.addEventListener('keydown', function(e){
    playerOne.eventHandlerDown(e.code);
})
document.addEventListener('keyup', function(e) {
    playerOne.eventHandlerUp(e.code);
})

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerOne.drawPlayer();
    playerOne.collisionDetectionBorder(blockList)
    playerOne.move();
    spawnBlocks(firstLevel);
    requestAnimationFrame(draw);
}

draw();