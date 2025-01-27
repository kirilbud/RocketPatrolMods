/*
Name: Kiril Saltz
Mod Title: Rocket Patrol: New Special Edition U Remastered Deluxe
Hours: 6
Mods:
-4 Additional explostion sounds (3 Points)
-Music (1 point)
-parallax scrolling Background (3 Points)
-using particle emmitter for explosion (5 Points)
-Display time Remaining in seconds (3 points)
-Extra spaceship that is worth more and moves faster (5 Points)
Sources:
Music: made in Beepbox
sfx: made in sfxr.me
Sprites: Made in Aseprite
in game music and art is made by me
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
