//550, 650, 730

class Cop {
    constructor(x, y, globalThis) {
        this.cop = globalThis.physics.add.sprite(x, y, 'cop');
        this.cop.body.immovable = true;
        this.copReachedEnd = false;
        this.ramInitiated = false;
        this.currentlyRamming = false;
        this.randomY;
        this.carSpawned = false;
        this.x = x;
        this.y = y;
        this.gameThis = globalThis;
    }

    animate(){
        this.cop.anims.play('copAnim', true);
    }

    collision(player) {
        this.gameThis.physics.add.collider(player, this.cop);
    }

    copDefaultState(player) {
        const POS_ONE = 550;
        const POS_TWO = 650;
        const POS_THREE = 730;
        let copEndX = 150;
        let copVel = 50;
        console.log(this.x, copEndX);
        if (!this.ramInitiated) {
            if (!this.copReachedEnd && this.x < copEndX) {
                this.cop.setVelocityX(copVel);
            } else if (!this.copReachedEnd && this.x >= copEndX) {
                this.copReachedEnd = true;
            } else if (this.copReachedEnd && this.x > -copEndX) {
                this.cop.setVelocityX(-copVel*3);
            } else if (this.copReachedEnd && this.x <= -copEndX) {
                this.randomY = Math.floor(Math.random() * 3);
                if (this.randomY === 0) {
                    this.y = POS_ONE;
                } else if (randomY === 1) {
                    this.y = POS_TWO;
                } else if (randomY === 2) {
                    this.y = POS_THREE;
                }
                this.copReachedEnd = false;
                this.finishedRamming = false;
                
            }
        }
        /*
        if (!this.ramInitiated) {
            this.ramInitiated = true;
            setTimeout(() => {
                this.ramInitiated = false;
            }, 3000);
        }
        if (this.ramInitiated) {
            this.ram(player);
        }
        */
    }

    ram(player) {
        console.log('ramming');
        //if (cop.x <= (player.x - (player.width/2)) && !finishedRamming) {
        if (!this.cop.body.touching.right) { 
            this.cop.setVelocityX(300);
        } else if (this.cop.body.touching.right) {
            this.cop.setVelocityX(0);
            this.ramInitiated = false;
        } else if (this.x > player.x) {
            this.cop.setVelocityX(0);
            this.ramInitiated = false;
        }
    }

}
/*
let copReachedEnd = false;
let ramInitiated = false;
let currentlyRamming = false;
let randomY;
let carSpawnedY;
function copDefaultState(cop, player) {
    let copEndX = 150;
    let copVel = 50;
    if (!currentlyRamming) {
        if (!copReachedEnd && cop.x < copEndX) {
            cop.setVelocityX(copVel);
        } else if (!copReachedEnd && cop.x >= copEndX) {
            copReachedEnd = true;
        } else if (copReachedEnd && cop.x > -copEndX) {
            cop.setVelocityX(-copVel*3);
        } else if (copReachedEnd && cop.x <= -copEndX) {
            randomY = Math.floor(Math.random() * 3);
            if (randomY === 0 && randomY !== carSpawned) {
                cop.y = 550;
            } else if (randomY === 1 && randomY !== carSpawned) {
                cop.y = 650;
            } else if (randomY === 2 && randomY !== carSpawned) {
                cop.y = 730;
            }
            copReachedEnd = false;
            finishedRamming = false;
            
        }
    }
    if (!ramInitiated) {
        ramInitiated = true;
        currentlyRamming = true;
        currentlyRamming = setTimeout(initiateRam, 10000);
    }
    if (currentlyRamming) {
        ram(cop, player);
    }
}

function initiateRam() {
    ramInitiated = false;
    return false;
}

let finishedRamming = false;
function ram(cop, player) {
    //if (cop.x <= (player.x - (player.width/2)) && !finishedRamming) {
    if (!cop.body.touching.right) { 
        cop.setVelocityX(300);
    } else {
        player.x += 30; //bump player forward
        finishedRamming = true;
        currentlyRamming = false;
        cop.setVelocityX(0);
    }

    if (cop.x > player.x) {
        finishedRamming = true;
        currentlyRamming = false;
        cop.setVelocityX(0);
    }
}

let carSpawned = false;
function spawnTraffic(car) {
    console.log(car.x);
    carSpawnedY = Math.floor(Math.random() * 3);
    if (randomY !== carSpawnedY) {
        carSpawned = true;
        if (carSpawnedY === 0) {
            car.y = 550;
        } else if (carSpawnedY === 1) {
            car.y = 650;
        } else if (carSpawnedY === 2) {
            car.y = 730;
        }
    }
    if (carSpawned) {
        console.log(car.x);
        if (car.x >= 0 && cursors.right.isDown) {
            car.setVelocityX(-400);
        } else if (car.x >= 0 && cursors.left.isDown) {
            car.setVelocityX(-100);
        } else if (car.x >= 0) {
            car.setVelocityX(-200);
        } else {
            console.log('here');
            carSpawned = false;
            car.x = 1500;
            car.setVelocityX(0);
        }
    }
}

*/
