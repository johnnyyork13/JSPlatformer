const arrowHeader = document.getElementById('arrowHeader');
const startBtn = document.getElementById('startBtn');

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
            debug: false
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
let themeSong;

function preload () {
    this.load.image('background', 'assets/background.png');
    this.load.image('buildingsBegin', 'assets/buildings.png', {frameWidth: 1000, frameHeight: 200});
    this.load.image('buildingsEnd', 'assets/buildings.png', {frameWidth: 1000, frameHeight: 200});
    this.load.image('railsBegin', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('railsEnd', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('roadBegin', 'assets/road.png', {frameWidth: 1000, frameHeight: 180});
    this.load.image('roadEnd', 'assets/road.png', {frameWidth: 1000, frameHeight: 180});
    this.load.spritesheet('player', 'assets/bikePersonSheet.png', {frameWidth: 100, frameHeight: 80});
    this.load.spritesheet('redCar', 'assets/car-sheet.png', {frameWidth: 201, frameHeight: 80});
    this.load.audio('theme', 'assets/mainSong.mp3');
}

function create() {
    this.add.image(500, 400, 'background');
    buildingsBegin = this.physics.add.sprite(500, 510, 'buildingsBegin');
    buildingsEnd = this.physics.add.sprite(1500, 510, 'buildingsEnd');
    railsBegin = this.physics.add.sprite(500, 510, 'railsBegin');
    railsEnd = this.physics.add.sprite(1500, 510, 'railsEnd');
    roadBegin = this.physics.add.sprite(500, 710, 'roadBegin');
    roadEnd = this.physics.add.sprite(1500, 710, 'roadEnd');

    //audio
    themeSong = this.sound.add('theme', {loop: true});
    themeSong.play();

    //spawn npcs
    redCar = this.physics.add.sprite(500, 730, 'redCar');
    redCar.setBounceX(0.2);

    //spawn player
    player = this.physics.add.sprite(100, 630, 'player');
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
}

function update () {
    playerSpeed = 0;
    scrollSpeed = 10;
    player.anims.play('go', true);
    redCar.anims.play('redCar', true);

    if (cursors.left.isDown) {
        scrollSpeed = 5;
        playerSpeed = -150;
        player.setVelocityX(playerSpeed);
    } else if (cursors.right.isDown) {
        scrollSpeed = 20;
        playerSpeed = 250;
        player.setVelocityX(playerSpeed);
    } else if (cursors.up.isDown && player.y > 620) {
        player.y -= 10;
    } else if (cursors.down.isDown && player.y < 740) {
        player.y += 10;
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
    }
    if (spawnCarBool) {
        spawnCar(redCar, -playerSpeed);
    }

    moveBackgroundObjects(roadBegin, roadEnd, scrollSpeed);
    moveBackgroundObjects(railsBegin, railsEnd, scrollSpeed);
    moveBackgroundObjects(buildingsBegin, buildingsEnd, scrollSpeed / 20);
}

function moveBackgroundObjects(objStart, objEnd, speed) {
    if (objStart.x <= -500) {
        objStart.x = objEnd.x + 1000;
    } 
    if (objEnd.x <= -500) {
        objEnd.x = objStart.x + 1000;
    }
    objStart.x -= speed;
    objEnd.x -= speed;
}

function spawnCar(car, speed) {
    car.setVelocityX(speed - 200);
    let ranY = Math.floor(Math.random() * 2);
    if (car.x < -500) {
        car.x = 1200;
        if (ranY === 1) {
            car.y = 650;
        } else {
            car.y = 730;
        }
    }
}  