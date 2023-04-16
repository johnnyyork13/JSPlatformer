const gameTitle = document.getElementById('gameTitle');
const arrowHeader = document.getElementById('arrowHeader');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const selectBtn = document.getElementById('selectBtn');
const selectionContainer = document.getElementById('selectionContainer');
const playerBikeChoice = document.getElementById('playerBike');
const playerCarChoice = document.getElementById('playerCar');

selectBtn.addEventListener('click', function(){
    selectBtn.style.visibility = 'hidden';
    selectionContainer.style.visibility = 'visible';
});

playerBikeChoice.addEventListener('click', function(){
    selectedPlayer = 'playerBike'; //for animation purposes
    playerBikeChoice.style.backgroundColor = 'rgba(182, 112, 236, 0.5)';
    playerCarChoice.style.backgroundColor = 'rgba(238, 232, 232, 0.01)';
});

playerCarChoice.addEventListener('click', function(){
    selectedPlayer = 'playerCar'; //for animation purposes
    playerCarChoice.style.backgroundColor = 'rgba(182, 112, 236, 0.5)';
    playerBikeChoice.style.backgroundColor = 'rgba(238, 232, 232, 0.01)';
});

startBtn.addEventListener('click', function(){
    player = updatePlayer(globalThis, selectedPlayer);
    gameTitle.style.visibility = 'hidden';
    arrowHeader.style.visibility = 'hidden';
    selectionContainer.style.visibility = 'hidden';
    startGame = true;
});

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
let game = new Phaser.Game(config);
let globalThis;
let startGame = false;
let selectedPlayer;
let beginLevel = false;

//music
let themeSong;
let musicPaused = false;

//player
let player;
let cursors;
let bikePlayer;
let carPlayer;
let playerXIncrease = 70;
let playerXDecrease = -350;

//backgrounds
let buildings;
let roads;
let rails;
let scrollSpeed;
let railsCollisionBar;

//npc variables
let redCar;
let copOne;
let copTwo;


function preload () {
    this.load.image('background', 'assets/background.png');
    this.load.image('buildings', 'assets/buildings.png', {frameWidth: 1000, frameHeight: 200});
    this.load.image('rails', 'assets/rails.png', {frameWidth: 1000, frameHeight: 250});
    this.load.image('roads', 'assets/roadThree.png', {frameWidth: 1000, frameHeight: 270});
    this.load.spritesheet('bike', 'assets/bikePersonSheet.png', {frameWidth: 100, frameHeight: 80});
    this.load.spritesheet('redCar', 'assets/red-car-sheet.png', {frameWidth: 201, frameHeight: 80});
    this.load.spritesheet('copOne', 'assets/cop-sheet.png', {frameWidth: 183.5, frameHeight: 91});
    this.load.spritesheet('copTwo', 'assets/cop-sheet.png', {frameWidth: 183.5, frameHeight: 91});
    this.load.spritesheet('hyundai', 'assets/veloc-sheet.png', {frameWidth: 184, frameHeight: 71});

    this.load.audio('theme', 'assets/mainSong.mp3');
}

function create() {
    globalThis = this;
    this.add.image(500, 400, 'background');
    buildings = this.physics.add.group();
    buildings.create(500, 420, 'buildings');
    buildings.create(1500, 420, 'buildings');
    rails = this.physics.add.group();
    rails.create(500, 420, 'rails');
    rails.create(1500, 420, 'rails');
    roads = this.physics.add.group();
    roads.create(500, 670, 'roads');
    roads.create(1500, 670, 'roads');
    //collision box for rails
    railsCollisionBar = this.add.rectangle(500, 460, 1000, 50)
    this.physics.add.existing(railsCollisionBar);
    //audio
    themeSong = this.sound.add('theme', {loop: true});
    //themeSong.play();
    pauseBtn.addEventListener('click', function(){
        pauseMusic(themeSong, musicPaused);
    })

    //spawn player
    playerBike = this.physics.add.sprite(350, 630, 'bike');
    playerCar = this.physics.add.sprite(600, 730, 'hyundai');

    //spawn npcs
    redCar = this.physics.add.sprite(1200, 550, 'redCar');
    copOne = this.physics.add.sprite(20, 650, 'copOne');
    copTwo = this.physics.add.sprite(-570, 730, 'copTwo');
    copOne.body.immovable = true;
    copTwo.body.immovable = true;
    
    //get inputs
    cursors = this.input.keyboard.createCursorKeys();

    //animations
    let thisVar = this;
    animations(thisVar);
}

let npcCollision = false;
let beginRam = false;
let rammed = false;
function update () {
    scrollSpeed = 10; //set scrollSpeed initial value every update
    if (startGame) {
        if (!beginLevel) {
            collisionDetection();
            beginLevel = true;
            //set cops to randomly charge player
        }   
        scrollSpeed = playerMove(player, scrollSpeed);
        player.anims.play(`${selectedPlayer}`, true);
        copDefaultState(copOne, player);
        if (!carSpawned) {
            spawnTraffic(redCar);
        }

    }

    //animation updates
    if (playerBike.anims !== undefined) { //check if bike obj is removed
        playerBike.anims.play('go', true);
    } 
    if (playerCar.anims !== undefined) { //check if car obj is removed
        playerCar.anims.play('hyundaiMove', true);
    }
    
    redCar.anims.play('redCar', true);
    copOne.anims.play('coppersOne', true);
    copTwo.anims.play('coppersTwo', true);

    //background object updates
    moveBackgroundObjects(roads, scrollSpeed);
    moveBackgroundObjects(rails, scrollSpeed);
    moveBackgroundObjects(buildings, scrollSpeed / 20);
}


