class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload(){
        //loading sprites and such
        this.load.image('rocket', './Assets/Rocket.png')
        this.load.image('spaceship', './Assets/Ship.png')
        this.load.image('starfield', './Assets/Background.png')
        

        //explosion
        this.load.spritesheet('explosion','./Assets/explosion.png',
            {
                frameWidth: 64,
                frameHeight: 32,
                startFrame:0,
                endFrame: 9
            }
        )

        //sfx
        this.load.audio('sfx-select', './Assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './Assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './Assets/sfx-shot.wav')
    }

    create(){
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                    start: 0, 
                    end: 9,
                    first: 0
                }),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            alighn: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:0
        }
        //this.add.text(20, 20, "Rocket Patrol Menu")
        //this.scene.start("playScene")

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Rocket Patrol', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 , 'Use ← → arrows to move & F to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00ff00'
        menuConfig.color = '#000000'
        this.add.text(game.config.width/2, game.config.height/2+ borderUISize + borderPadding, 'Press ← for novice or → for Expert', menuConfig).setOrigin(0.5)

        //keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy
            game.settings = {
                spaceshipSpeed:3,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //easy
            game.settings = {
                spaceshipSpeed:4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}