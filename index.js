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
let roadBegin;
let roadEnd;
let railsBegin;
let railsEnd;

function preload () {
    this.load.image('background', 'assets/background.png');
    this.load.image('railsBegin', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('railsEnd', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('roadBegin', 'assets/road.png', {frameWidth: 1000, frameHeight: 180});
    this.load.image('roadEnd', 'assets/road.png', {frameWidth: 1000, frameHeight: 180});
    this.load.image('player', 'assets/bikePerson.png', {frameWidth: 100, frameHeight: 80});
}

function create() {
    this.add.image(500, 400, 'background');
    railsBegin = this.physics.add.sprite(500, 510, 'railsBegin');
    railsEnd = this.physics.add.sprite(1500, 510, 'railsEnd');
    roadBegin = this.physics.add.sprite(500, 710, 'roadBegin');
    roadEnd = this.physics.add.sprite(1500, 710, 'roadEnd');
    player = this.physics.add.sprite(100, 630, 'player');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
}

function update () {
    moveBackgroundObjects(roadBegin, roadEnd, 10);
    moveBackgroundObjects(railsBegin, railsEnd, 10);
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else if (cursors.up.isDown) {
        player.y = 630;
    } else if (cursors.down.isDown) {
        player.y = 720;
    } else {
        player.setVelocityX(0);
    }
}

function moveBackgroundObjects(objStart, objEnd, speed) {
    if (objStart.x <= -500) {
        objStart.x = 1500;
    } 
    if (objEnd.x <= -500) {
        objEnd.x = 1500;
    }
    objStart.x -= speed;
    objEnd.x -= speed;
}