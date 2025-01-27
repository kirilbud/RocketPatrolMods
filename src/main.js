/*
Name: Kiril Saltz
Mod Title: Rocket Patrol: New Special Edition U Remastered Deluxe
Hours: 3.5
Mods:
-4 Additional explostion sounds (3 Points)
-Music (1 point)
-parallax scrolling Background (3 Points)
-using particle emmitter for explosion (5 Points)
-Display time Remaining in seconds (3 points)
Sources:
Music: made in Beepbox
sfx: made in sfxr.me
Sprites: Made in Aseprite
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
