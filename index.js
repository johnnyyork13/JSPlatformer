const arrowHeader = document.getElementById('arrowHeader');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

let spawnCarBool = false;
startBtn.addEventListener('click', function(){
    arrowHeader.style.visibility = 'hidden';
    startBtn.style.visibility = 'hidden';
    spawnCarBool = true;
})

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false,
            fps: 30
        },
        fps: {
            max: 30,
            min: 30,
            target: 30,
            forceSetTimeout: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let player;
let playerSpeed;
let cursors;
let buildingsBegin;
let buildingsEnd;
let roadBegin;
let roadEnd;
let railsBegin;
let railsEnd;
let scrollSpeed;
let redCar;
let veloc;
let copOne;
let copTwo;
let themeSong;
let paused = false;

function preload () {
    this.load.image('background', 'assets/background.png');
    this.load.image('buildingsBegin', 'assets/buildings.png', {frameWidth: 1000, frameHeight: 200});
    this.load.image('buildingsEnd', 'assets/buildings.png', {frameWidth: 1000, frameHeight: 200});
    this.load.image('railsBegin', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('railsEnd', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('roadBegin', 'assets/roadThree.png', {frameWidth: 1000, frameHeight: 270});
    this.load.image('roadEnd', 'assets/roadThree.png', {frameWidth: 1000, frameHeight: 270});
    this.load.spritesheet('player', 'assets/bikePersonSheet.png', {frameWidth: 100, frameHeight: 80});
    this.load.spritesheet('redCar', 'assets/car-sheet.png', {frameWidth: 201, frameHeight: 80});
    this.load.spritesheet('copOne', 'assets/cop-sheet.png', {frameWidth: 183.5, frameHeight: 91});
    this.load.spritesheet('copTwo', 'assets/cop-sheet.png', {frameWidth: 183.5, frameHeight: 91});
    this.load.spritesheet('veloc', 'assets/veloc-sheet.png', {frameWidth: 184, frameHeight: 71});
    
    this.load.audio('theme', 'assets/mainSong.mp3');
}

function create() {
    this.add.image(500, 400, 'background');
    buildingsBegin = this.physics.add.sprite(500, 420, 'buildingsBegin');
    buildingsEnd = this.physics.add.sprite(1500, 420, 'buildingsEnd');
    railsBegin = this.physics.add.sprite(500, 420, 'railsBegin');
    railsEnd = this.physics.add.sprite(1500, 420, 'railsEnd');
    roadBegin = this.physics.add.sprite(500, 670, 'roadBegin');
    roadEnd = this.physics.add.sprite(1500, 670, 'roadEnd');

    //audio
    themeSong = this.sound.add('theme', {loop: true});
    //themeSong.play();

    pauseBtn.addEventListener('click', function(){
        pauseMusic(themeSong, paused);
    })

    //spawn npcs
    //redCar = this.physics.add.sprite(600, 730, 'redCar');
    //redCar.setBounceX(0.2);
    copOne = this.physics.add.sprite(120, 650, 'copOne');
    copTwo = this.physics.add.sprite(170, 730, 'copTwo');
    copOne.setCollideWorldBounds(true);
    copTwo.setCollideWorldBounds(true);

    //josh car
    veloc = this.physics.add.sprite(600, 730, 'veloc');
    this.anims.create({
        key: 'velocMove',
        frames: this.anims.generateFrameNumbers('veloc', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    })

    this.anims.create({
        key: 'coppersOne',
        frames: this.anims.generateFrameNumbers('copOne', {start: 0, end: 5}),
        frameRate: 5,
        repeat: -1
    })
    this.anims.create({
        key: 'coppersTwo',
        frames: this.anims.generateFrameNumbers('copTwo', {start: 0, end: 5}),
        frameRate: 5,
        repeat: -1
    })

    //spawn player
    player = this.physics.add.sprite(500, 630, 'player');
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'go',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2}),
        frameRate: 20,
        repeat: -1
    })
    this.anims.create({
        key: 'redCar',
        frames: this.anims.generateFrameNumbers('redCar', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, redCar);
    this.physics.add.collider(player, copOne);
    this.physics.add.collider(player, copTwo);
}

function update () {
    playerSpeed = 0;
    scrollSpeed = 20;
    player.anims.play('go', true);
    //redCar.anims.play('redCar', true);
    veloc.anims.play('velocMove', true);
    copOne.anims.play('coppersOne', true);
    copTwo.anims.play('coppersTwo', true);
    if (cursors.left.isDown) {
        scrollSpeed = 5;
        playerSpeed = -300;
        player.setVelocityX(playerSpeed);
    } else if (cursors.right.isDown) {
        scrollSpeed = 30;
        playerSpeed = 100;
        player.setVelocityX(playerSpeed);
    } else if (cursors.up.isDown && player.y > 530) {
        player.y -= 10;
    } else if (cursors.down.isDown && player.y < 740) {
        player.y += 10;
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
    }

    if (spawnCarBool) {
        //spawnCar(redCar, playerSpeed);
    }

    moveBackgroundObjects(roadBegin, roadEnd, scrollSpeed);
    moveBackgroundObjects(railsBegin, railsEnd, scrollSpeed);
    moveBackgroundObjects(buildingsBegin, buildingsEnd, scrollSpeed / 20);
}

function moveBackgroundObjects(objStart, objEnd, speed) {
    if (objStart.x <= -500) { //-500 is half of the width of the background obj
        objStart.x = objEnd.x + objStart.width;
    } 
    if (objEnd.x <= -500) {
        objEnd.x = objStart.x + objEnd.width;
    }
    objStart.x -= speed;
    objEnd.x -= speed;
}

let carRunning = false;
function spawnCar(car, speed) {
    let ranY = Math.floor(Math.random() * 2);
    if (car.x < 600) {
        carRunning = true;
    }
    if (!carRunning) {
        car.setVelocityX(-300);
    } else {
        if (car.x > 3000) {
            carRunning = false;
            if (ranY === 0) {
                car.y = 650;
            } else {
                car.y = 730;
            }
        }
        car.setVelocityX(300 - speed);
    }
}  



function pauseMusic(audio, pause){
    if (!pause) {
        pauseBtn.textContent = 'Pause Music |>';
        audio.pause();
        paused = true;
    } else {
        audio.play();
        pauseBtn.textContent = 'Pause Music | |';
        paused = false;
    }
}

