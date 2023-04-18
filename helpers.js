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


