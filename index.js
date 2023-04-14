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
let cursors;
let buildingsBegin;
let buildingsEnd;
let roadBegin;
let roadEnd;
let railsBegin;
let railsEnd;
let buildingSpeed;
let roadSpeed;
let railSpeed;

function preload () {
    this.load.image('background', 'assets/background.png');
    this.load.image('buildingsBegin', 'assets/buildings.png', {frameWidth: 1000, frameHeight: 200});
    this.load.image('buildingsEnd', 'assets/buildings.png', {frameWidth: 1000, frameHeight: 200});
    this.load.image('railsBegin', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('railsEnd', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('roadBegin', 'assets/road.png', {frameWidth: 1000, frameHeight: 180});
    this.load.image('roadEnd', 'assets/road.png', {frameWidth: 1000, frameHeight: 180});
    this.load.spritesheet('player', 'assets/bikePersonSheet.png', {frameWidth: 100, frameHeight: 80});
}

function create() {
    this.add.image(500, 400, 'background');
    buildingsBegin = this.physics.add.sprite(500, 510, 'buildingsBegin');
    buildingsEnd = this.physics.add.sprite(1500, 510, 'buildingsEnd');
    railsBegin = this.physics.add.sprite(500, 510, 'railsBegin');
    railsEnd = this.physics.add.sprite(1500, 510, 'railsEnd');
    roadBegin = this.physics.add.sprite(500, 710, 'roadBegin');
    roadEnd = this.physics.add.sprite(1500, 710, 'roadEnd');
    player = this.physics.add.sprite(100, 630, 'player');
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'go',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2}),
        frameRate: 20,
        repeat: -1
    })

    cursors = this.input.keyboard.createCursorKeys();
}

function update () {
    buildingSpeed = .5;
    roadSpeed = 10;
    railSpeed = 10;
    player.anims.play('go', true);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        roadSpeed = 5;
        railSpeed = 5;
        buildingSpeed = .1;
    } else if (cursors.right.isDown) {
        player.setVelocityX(260);
        roadSpeed = 20;
        railSpeed = 20;
        buildingSpeed = 1;
    } else if (cursors.up.isDown) {
        player.y = 630;
    } else if (cursors.down.isDown) {
        player.y = 720;
    } else {
        player.setVelocityX(0);
    }

    moveBackgroundObjects(roadBegin, roadEnd, roadSpeed);
    moveBackgroundObjects(railsBegin, railsEnd, railSpeed);
    moveBackgroundObjects(buildingsBegin, buildingsEnd, buildingSpeed);
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