class sdv6 extends Phaser.Scene {
    constructor() {
        super("sdv6")
    }

    preload() {
		this.load.image('gameIntro3', 'ass/game3_intro.png');
		this.load.image('gameStart3', 'ass/gameStart.png');
        this.load.image('bg', 'ass/bg3.png');
        this.load.image("target", "ass/target1.png")
        this.load.image("knife", "ass/key2.png")
        this.load.image('ff2', 'ass/wall.png');
    }

   create() {
        this.add.image(380, 260, 'bg').setDisplaySize(1380, 720);
        this.cameras.main.setZoom(1.4);
        this.cameras.main.centerOn(380, 260);
        this.add.image(0, 0, 'ff2').setOrigin(0).setDisplaySize(40, 600);
        this.add.image(760, 0, 'ff2').setOrigin(0).setDisplaySize(40, 600);
        this.target = this.add.image(370, 260, "target").setScale(0.75, 0.75);
        this.target.depth = 0.7;
        this.knife6 = this.add.image(370, 500, "knife").setScale(0.65, 0.65);
        this.knifeGroup = this.add.group();
        console.log(this);
        this.canThrow = true;
		
		scoreText = this.add.text(50, 36, "Key :0", {
				fontSize: "22px",
				fill: "#ffeeda"
			})

        graphics = this.add.graphics({
            fillStyle: {
                color: 0x00ff00
            }
        });

        circle = new Phaser.Geom.Circle(265, 245, 115);
        // point =this.add.image(game.config.width/2,game.config.height/5*4,"heart").setScale(1,1);
		
		gameIntro3 = this.add.image(this.game.renderer.width*.2, this.game.renderer.height*.25, 'gameIntro3').setScale(1.8);
		gameIntro3.setVisible(true);
		gameIntro3.depth = 1;
		gameStart3 = this.add.image(this.game.renderer.width*.2, this.game.renderer.height*.45, 'gameStart3').setScale(1);
		gameStart3.setVisible(true);
		gameStart3.setInteractive();
		gameStart3.depth = 1;
		gameStart3.on('pointerdown', function (pointer) {
			gameStart3.setVisible(false);
			gameIntro3.setVisible(false);
			start3 = true;
			
		})
    }


    update() {
		
		if (start3){
			this.input.on("pointerdown", this.throwKnife, this)

			
			hint = this.add.text(50, 12, 'Throw eight keys to locker  ', {
				fontSize: '16px',
				fill: '#ffeeda'
			});
			a += 0.04;

			if (a >= Phaser.Math.PI2) {
				a -= Phaser.Math.PI2;
			}

			Phaser.Geom.Circle.CircumferencePoint(circle, a, point);

			graphics.clear();
			// graphics.fillRect(point.x - 4, point.y - 4, point.width, point.height);



			this.target.angle += rotateSpeed;
			let children = this.knifeGroup.getChildren()
			for (var i = 0; i < children.length; i++) {
				let child = children[i]
				child.angle += rotateSpeed
				let ang = Phaser.Math.DegToRad(child.angle)
				child.x = this.target.x - Math.sin(ang) * this.target.width / 4
				child.y = this.target.y + Math.cos(ang) * this.target.width / 4
			}
		}
        
    }



    throwKnife() {
        if (!this.canThrow) {
            return
        }
        this.canThrow = false
        this.tweens.add({
            targets: [this.knife6],
            y: this.target.y + this.knife6.height / 8 * 3,
            duration: throwSpeed,
            callbackScope: this,
            onComplete: function(tween) {
                let isLegal = true
                let children = this.knifeGroup.getChildren()
                for (var i = 0; i < children.length; i++) {
                    let child = children[i]
                    if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, child.impactAngle)) < minAngle) {
                        isLegal = false
                        break
                    }
                }
                if (isLegal) {
                    this.canThrow = true
                    let newKnife = this.add.image(this.target.x, this.target.y + this.knife6.height / 8 * 3, "knife").setScale(0.5, 0.5)
                    newKnife.impactAngle = this.target.angle
                    this.knifeGroup.add(newKnife)
                    this.knife6.y = 500
                    score6 += 1
                    scoreText.setText("key :" + score6)
                    if (score6 >= 9) {
                        console.log('%c GameOver ', 'background: green; color: white; display: block;');
                        scoreText.setText("You win!")
                        gameOver = true;
                        success3=true;
                        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.start('mainMap');
        }, this);
                    }
                } else {
                    this.tweens.add({
                        targets: [this.knife6],
                        y: game.config.height + this.knife6.height,
                        rotation: 5,
                        duration: throwSpeed * 4,
                        callbackScope: this,
                        onComplete(tween) {
                            this.scene.start("sdv6")
                            score6 = 0
                        }
                    })
                }

            },
        })
    }
}