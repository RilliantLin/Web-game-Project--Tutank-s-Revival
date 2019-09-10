class sdv7 extends Phaser.Scene {
    constructor() {
        super("sdv7")
    }

    preload() {
		this.load.image('gameIntro4', 'ass/game4_intro.png');
		this.load.image('gameStart4', 'ass/gameStart.png');
        this.load.image('bg7', 'ass/bg1n.png');
        this.load.image("target", "ass/pan.png")
        this.load.image("knife7", "ass/knife.png")
        this.load.image('ff2', 'ass/wall.png');
        this.load.image("apple", "ass/snake.png");
    }

    create() {

        chancetext = this.add.text(150, -50, "Hit the snake.", {
            fontSize: "26px",
            fill: "#0e1828"
        });
        this.add.image(380, 260, 'bg7').setDisplaySize(1380, 720);
        this.cameras.main.setZoom(1.4);
        this.cameras.main.centerOn(380, 260);
        this.add.image(0, 0, 'ff2').setOrigin(0).setDisplaySize(40, 600);
        this.add.image(760, 0, 'ff2').setOrigin(0).setDisplaySize(40, 600);
        // at the beginning of the game, both current rotation speed and new rotation speed are set to default rotation speed
        this.currentRotationSpeed = rotationSpeed7;
        this.newRotationSpeed = rotationSpeed7;

        // can the player throw a knife? Yes, at the beginning of the game
        this.canThrow = true;

        // group to store all rotating knives
        this.knifeGroup = this.add.group();

        // adding the knife
        this.knife7 = this.add.sprite(370, 500, "knife7").setScale(0.6, 0.6);

        // adding the target
        this.target = this.add.sprite(370, 200, "target");
        // moving the target to front
        this.target.depth = 1;

        // starting apple angle
        var appleAngle = Phaser.Math.Between(0, 360);

        // determing apple angle in radians
        var radians = Phaser.Math.DegToRad(appleAngle - 90);

        // adding the apple
        this.apple = this.add.sprite(this.target.x + (this.target.width / 2) * Math.cos(radians), this.target.y + (this.target.width / 2) * Math.sin(radians), "apple");

        // setting apple's anchor point to bottom center
        this.apple.setOrigin(0.5, 1);

        // setting apple sprite angle
        this.apple.angle = appleAngle;

        // saving apple start angle
        this.apple.startAngle = appleAngle;

        // apple depth is the same as target depth
        this.apple.depth = 1;

        // has the apple been hit?
        this.apple.hit = false;

        
		
		gameIntro4 = this.add.image(this.game.renderer.width*.2, this.game.renderer.height*.25, 'gameIntro4').setScale(1.8);
		gameIntro4.setVisible(true);
		gameIntro4.depth = 1;
		gameStart4 = this.add.image(this.game.renderer.width*.2, this.game.renderer.height*.45, 'gameStart4').setScale(1);
		gameStart4.setVisible(true);
		gameStart4.setInteractive();
		gameStart4.depth = 1;
		gameStart4.on('pointerdown', function (pointer) {
			gameStart4.setVisible(false);
			gameIntro4.setVisible(false);
			start4 = true;
			
		})

    }



    // method to throw a knife
    throwKnife() {

        // can the player throw?
        if (this.canThrow) {

            // player can't throw anymore
            this.canThrow = false;

            // tween to throw the knife
            this.tweens.add({

                // adding the knife to tween targets
                targets: [this.knife7],

                // y destination
                y: this.target.y + this.target.width / 2,

                // tween duration
                duration: throwSpeed7,

                // callback scope
                callbackScope: this,

                // function to be executed once the tween has been completed
                onComplete: function(tween) {

                    // at the moment, this is a legal hit
                    var legalHit = true;

                    // getting an array with all rotating knives
                    var children = this.knifeGroup.getChildren();

                    // looping through rotating knives
                    for (var i = 0; i < children.length; i++) {

                        // is the knife too close to the i-th knife?
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < minAngle7) {

                            // this is not a legal hit
                            legalHit = false;

                            // no need to continue with the loop
                            break;
                        }
                    }

                    // is this a legal hit?
                    if (legalHit) {

                        // is the knife close enough to the apple? And the appls is still to be hit?
                        if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 180 - this.apple.startAngle)) < minAngle7 && !this.apple.hit) {

                            // apple has been hit
                            this.apple.hit = true;

                            // change apple frame to show one slice
                            this.apple.setFrame(1);

                            // add the other apple slice in the same apple posiiton
                            var slice = this.add.sprite(this.apple.x, this.apple.y, "apple", 2);

                            // same angle too.
                            slice.angle = this.apple.angle;

                            // and same origin
                            slice.setOrigin(0.5, 1);

                            // tween to make apple slices fall down
                            this.tweens.add({

                                // adding the knife to tween targets
                                targets: [this.apple, slice],

                                // y destination
                                y: game.config.height + this.apple.height,

                                // x destination
                                x: {

                                    // running a function to get different x ends for each slice according to frame number
                                    getEnd: function(target, key, value) {
                                        return Phaser.Math.Between(0, game.config.width / 2) + (game.config.width / 2 * (target.frame.name - 1));
                                    }
                                },

                                // rotation destination, in radians
                                angle: 45,

                                // tween duration
                                duration: throwSpeed7 * 6,

                                // callback scope
                                callbackScope: this,

                                // function to be executed once the tween has been completed
                                onComplete: function(tween) {
									console.log('finish');
                                    success4=true;
                                    this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.start('mainMap');
        }, this);
                                }
                            });
                        }

                        // player can now throw again
                        this.canThrow = true;

                        // adding the rotating knife in the same place of the knife just landed on target
                        var knife7 = this.add.sprite(this.knife7.x, this.knife7.y, "knife7");

                        // impactAngle property saves the target angle when the knife hits the target
                        knife7.impactAngle = this.target.angle;

                        // adding the rotating knife to knifeGroup group
                        this.knifeGroup.add(knife7);

                        // bringing back the knife to its starting position
                        this.knife7.y = 500;
                    }

                    // in case this is not a legal hit
                    else {
                       console.log('fail');
                        this.scene.start("sdv7");

                    }
                }
            });
        }
    }

    // method to be executed at each frame. Please notice the arguments.
    update(time, delta) {
		if (start4){
			// waiting for player input to throw a knife
			this.input.on("pointerdown", this.throwKnife, this);
			
			// rotating the target
			this.target.angle += this.currentRotationSpeed;

			// getting an array with all rotating knives
			var children = this.knifeGroup.getChildren();

			// looping through rotating knives
			for (var i = 0; i < children.length; i++) {

				// rotating the knife
				children[i].angle += this.currentRotationSpeed;

				// turning knife angle in radians
				var radians = Phaser.Math.DegToRad(children[i].angle + 90);

				// trigonometry to make the knife rotate around target center
				children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
				children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
			}

			// if the apple has not been hit...
			if (!this.apple.hit) {

				// adjusting apple rotation
				this.apple.angle += this.currentRotationSpeed;

				// turning apple angle in radians
				var radians = Phaser.Math.DegToRad(this.apple.angle - 90);

				// adjusting apple position
				this.apple.x = this.target.x + (this.target.width / 2) * Math.cos(radians);
				this.apple.y = this.target.y + (this.target.width / 2) * Math.sin(radians);
			}

			// adjusting current rotation speed using linear interpolation
			this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, delta / 1000);
		}
        
    }
}