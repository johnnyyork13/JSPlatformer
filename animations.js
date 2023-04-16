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
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'coppersTwo',
        frames: game.anims.generateFrameNumbers('copTwo', {start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
    })
    
    game.anims.create({
        key: 'go',
        frames: game.anims.generateFrameNumbers('bike', {start: 0, end: 2}),
        frameRate: 20,
        repeat: -1
    })
    
    game.anims.create({
        key: 'redCar',
        frames: game.anims.generateFrameNumbers('redCar', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    })

    game.anims.create({
        key: 'playerBike',
        frames: game.anims.generateFrameNumbers('bike', {start: 0, end: 2}),
        frameRate: 20,
        repeat: -1
    })

    game.anims.create({
        key: 'playerCar',
        frames: game.anims.generateFrameNumbers('hyundai', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    })
}



