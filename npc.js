//550, 650, 730

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

