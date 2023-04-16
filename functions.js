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

function removeOtherPlayerFromScreen(player) {
    player.setVelocityX(200);
    if (player.x > 1200) {
        player.destroy();
    }
}

function collisionDetection(){
    player.setCollideWorldBounds(true);
    globalThis.physics.add.collider(player, redCar);
    globalThis.physics.add.collider(player, copOne);
    globalThis.physics.add.collider(player, copTwo);
    globalThis.physics.add.collider(player, railsCollisionBar);
    railsCollisionBar.body.immovable = true;
}
