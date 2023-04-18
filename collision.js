function collisionDetection(){
    player.setCollideWorldBounds(true);
    globalThis.physics.add.collider(player, redCar);
    globalThis.physics.add.collider(player, copOne, () => {
        playerBumped();
    });
    globalThis.physics.add.collider(player, copTwo);
    globalThis.physics.add.collider(player, railsCollisionBar);
    railsCollisionBar.body.immovable = true;
    
}

function playerBumped() {
    player.setVelocityX(400);
}