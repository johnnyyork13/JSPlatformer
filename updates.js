function playerMove(player, scrollSpeed, FPS_INCREMENT) {
    if (cursors.left.isDown) {
        scrollSpeed = 5;
        FPS_INCREMENT = 350;
        player.setVelocityX(-FPS_INCREMENT);
    } else if (cursors.right.isDown) {
        scrollSpeed = 30;
        FPS_INCREMENT = 100;
        player.setVelocityX(FPS_INCREMENT);
    } else if (cursors.up.isDown && player.y > 530) {
        player.y -= 10;
    } else if (cursors.down.isDown && player.y < 740) {
        player.y += 10;
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
    }
    return scrollSpeed;
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