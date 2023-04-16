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
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//main
var game = new Phaser.Game(config);
let FPS;
let FPS_INCREMENT;

//music
let themeSong;
let musicPaused = false;

//player
let player;
let playerSpeed;
let cursors;

//backgrounds
let buildingsBegin;
let buildingsEnd;
let roadBegin;
let roadEnd;
let railsBegin;
let railsEnd;
let scrollSpeed;

//npc variables
let redCar;
let hyundai;
let copOne;
let copTwo;


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
    this.load.spritesheet('hyundai', 'assets/veloc-sheet.png', {frameWidth: 184, frameHeight: 71});
    
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
        pauseMusic(themeSong, musicPaused);
    })

    //spawn player
    player = this.physics.add.sprite(500, 630, 'player');
    hyundai = this.physics.add.sprite(600, 730, 'hyundai');

    //spawn npcs
    redCar = this.physics.add.sprite(700, 550, 'redCar');
    copOne = this.physics.add.sprite(120, 650, 'copOne');
    copTwo = this.physics.add.sprite(170, 730, 'copTwo');
    
    //basic collision
    player.setCollideWorldBounds(true);
    copOne.setCollideWorldBounds(true);
    copTwo.setCollideWorldBounds(true);
    this.physics.add.collider(player, redCar);
    this.physics.add.collider(player, copOne);
    this.physics.add.collider(player, copTwo);


    //get inputs
    cursors = this.input.keyboard.createCursorKeys();

    //animations
    let thisVar = this;
    animations(thisVar);
}

function update (time, delta) {
    FPS = (FPS_INCREMENT / delta);
    //variables that need updating
    playerSpeed = 0;
    scrollSpeed = FPS;
    let speedArr = playerMove(player, playerSpeed, scrollSpeed, FPS_INCREMENT);
    playerSpeed = speedArr[0];
    scrollSpeed = speedArr[1];

    //animation updates
    player.anims.play('go', true);
    redCar.anims.play('redCar', true);
    hyundai.anims.play('hyundaiMove', true);
    copOne.anims.play('coppersOne', true);
    copTwo.anims.play('coppersTwo', true);

    //background object updates
    moveBackgroundObjects(roadBegin, roadEnd, scrollSpeed);
    moveBackgroundObjects(railsBegin, railsEnd, scrollSpeed);
    moveBackgroundObjects(buildingsBegin, buildingsEnd, scrollSpeed / 20);
}


