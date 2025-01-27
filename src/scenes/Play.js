class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    create(){


        this.add.text(20, 20, "Rocket Patrol Menu")

        //space backgrount
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0)
        this.starfield2 = this.add.tileSprite(0,0,640,480,'starfield2').setOrigin(0,0)
        this.starfield3 = this.add.tileSprite(0,0,640,480,'starfield3').setOrigin(0,0)

        

        //game assets
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(.5,0)

        this.ship01 = new SpaceShip(this, game.config.width + borderUISize * 6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0)
        this.ship02 = new SpaceShip(this, game.config.width + borderUISize * 3, borderUISize*5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new SpaceShip(this, game.config.width, borderUISize*6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0)


        //green top
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0,0)//background
        

        //white boarders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xffffff).setOrigin(0,0)
        this.add.rectangle(0,game.config.height - borderUISize, game.config.width, borderUISize, 0xffffff).setOrigin(0,0)
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0,0)

        //inputs
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //score stuff
        this.p1Score = 0
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        this.timeRight = this.add.text(game.config.width - borderUISize*4.5, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        this.gameOver = false
        //end clock
        //let clockTime = 60
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'Game Over', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'R to Restart or ← for menu', scoreConfig).setOrigin(0.5)
            this.gameOver= true
            this.music.stop();
        }, null, this)


        //play music and loop
        //https://stackoverflow.com/questions/34210393/looping-audio-in-phaser
        this.music = this.sound.add('music', {volume: .0 })
        this.music.loop = true;
        if (!this.music.isPlaying) {
            this.music.play();
        }
        

        this.emitter = this.add.particles(0, 0, 'explode', {
            speed: 150,
            scale: {start: .5, end: .1},
            lifespan: 500
        });
        this.emitter.stop()
        
    }

    update(){

        this.timeRight.text = Math.floor(this.clock.getRemaining()/1000)

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= .1 
        this.starfield2.tilePositionX -= .2 
        this.starfield3.tilePositionX -= .7 

        if (!this.gameOver) {
            this.p1Rocket.update()

            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
        }


        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
    }

    checkCollision(rocket, ship){
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y
        ) {
            return true
        } else{
            return false
        }
    }

    shipExplode(ship){
        ship.alpha = 0

        let x = ship.x
        let y = ship.y

        /*
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })
        */
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        let sfxNum = Math.floor(Math.random()*5)

        switch (sfxNum) {
            case 0:
                this.sound.play('sfx-explosion')
                break;
            case 1:
                this.sound.play('sfx-explosion2')
                break;
            case 2:
                this.sound.play('sfx-explosion3', {volume:.2})
                break;
            case 3:
                this.sound.play('sfx-explosion4')
                break;
            case 4:
                this.sound.play('sfx-explosion5', {volume:.7})
                break;
            default:
                this.sound.play('sfx-explosion')
                break;
        }
        
        //explosion particles
        
        this.emitter.explode(50, x+32, y+16)
        //re enable ship after given time
        this.clock2 = this.time.delayedCall(900, () => {
            ship.reset()
            ship.alpha = 1
        }, null, this)
    }
}