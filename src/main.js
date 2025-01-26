/*
Name: Kiril Saltz
Mod Title: Rocket Patrol: New Special Edition U Remastered Deluxe
Hours: .5
Mods:
-4 Additional explostion sounds (3 Points)
*/


//game/phaser config
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}


let game = new Phaser.Game(config)

//ui stuff
let borderUISize = game.config.height/15
let borderPadding = borderUISize / 3

//keyboard
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
