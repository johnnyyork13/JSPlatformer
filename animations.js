function animations(game) {
    game.anims.create({
        key: 'hyundaiMove',
        frames: game.anims.generateFrameNumbers('hyundai', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    })
    
    game.anims.create({
        key: 'coppersOne',
        frames: game.anims.generateFrameNumbers('copOne', {start: 0, end: 5}),
        frameRate: 5,
        repeat: -1
    })
    game.anims.create({
        key: 'coppersTwo',
        frames: game.anims.generateFrameNumbers('copTwo', {start: 0, end: 5}),
        frameRate: 5,
        repeat: -1
    })
    
    game.anims.create({
        key: 'go',
        frames: game.anims.generateFrameNumbers('player', {start: 0, end: 2}),
        frameRate: 20,
        repeat: -1
    })
    
    game.anims.create({
        key: 'redCar',
        frames: game.anims.generateFrameNumbers('redCar', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    })
}

function playAnimations(obj, animName) {
    obj.anims.play(animName, true);
}
