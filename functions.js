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

//rails collision helper
function railsCollision(rails) {
    rails.children.entries[0].body.checkCollision.down = false;
    rails.children.entries[1].body.checkCollision.down = false;
    rails.children.entries[0].body.checkCollision.left = false;
    rails.children.entries[1].body.checkCollision.left = false;
    rails.children.entries[0].body.checkCollision.right = false;
    rails.children.entries[1].body.checkCollision.right = false;
    rails.children.entries[0].body.immovable = true;
    rails.children.entries[1].body.immovable = true;
}
