function playerMove(player, scrollSpeed) {
    if (cursors.left.isDown) {
        player.setVelocityX(playerXDecrease);
        player.setVelocityY(0);
        scrollSpeed = 5;
    } else if (cursors.right.isDown) {
        player.setVelocityX(playerXIncrease);
        player.setVelocityY(0);
        scrollSpeed = 25;
    } else if (cursors.up.isDown) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
    }
    return scrollSpeed;
}

function moveBackgroundObjects(obj, scrollSpeed) {
    let objStart = obj.children.entries[0];
    let objEnd = obj.children.entries[1];
    if (objStart.x <= -500) { //-500 is half of the width of the background obj
        objStart.x = objEnd.x + objStart.width;
    } 
    if (objEnd.x <= -500) {
        objEnd.x = objStart.x + objEnd.width;
    }
    objStart.setVelocityX(-scrollSpeed * 50);
    objEnd.setVelocityX(-scrollSpeed * 50);
    return obj
}

function updatePlayer(globalThis, selectedPlayer) {
    if (selectedPlayer === 'playerBike') {
        player = globalThis.physics.add.sprite(350, 630, 'bike');
        playerBike.destroy();
        removeOtherPlayerFromScreen(playerCar);
    } else if (selectedPlayer === 'playerCar') {
        player = globalThis.physics.add.sprite(600, 730, 'hyundai');
        playerCar.destroy();
        removeOtherPlayerFromScreen(playerBike);
    }

    return player;
}