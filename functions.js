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
