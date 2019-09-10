class sdv3 extends Phaser.Scene {
    constructor() {

        super("sdv3");
    }


    preload() {
		this.load.image('gameIntroFinal', 'ass/finalBoss_intro.png');
		this.load.image('gameStartFinal', 'ass/gameStart.png');
        this.load.image('target2', 'ass/queen.png');
        this.load.image('portal', 'ass/portal.png');
        this.load.image('sky', 'ass/bgf3.png');
        this.load.image('ground', 'ass/jinzi2.png');
        this.load.image('ground2', 'ass/ground2.png');
        this.load.image('target', 'ass/boss2.png');
        this.load.image('bomb', 'ass/key.png');
        this.load.image('bluef', 'ass/bluef.png');
        this.load.spritesheet('dude', 'ass/falao.png', {
            frameWidth: 32,
            frameHeight: 50
        });
    }


    create() {


        //  A simple background for our game
        this.add.image(950, 520, 'sky').setScale(1.15);
        target2 = this.physics.add.image(30, 50, 'target2').setGravity(0, 600);
        target = this.physics.add.image(1850, 50, 'target').setScale(1.8).setGravity(0, 600);
		target.setVisible(false);
		target2.setVisible(false);
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms3 = this.physics.add.staticGroup();
        portal = this.physics.add.image(800, 50, 'portal').setScale(1.8).setImmovable();
        portal.setCollideWorldBounds(true);
        platforms3.create(400, 800, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(800, 170, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(1070, 368, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(1350, 900, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(1080, 700, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(350, 358, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(600, 560, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(100, 200, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(1850, 200, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(1550, 480, 'ground').setDisplaySize(300, 50).setImmovable();
        platforms3.create(930, 1050, 'ground2').setImmovable();

        player3 = this.physics.add.sprite(100, 450, 'dude').setScale(1.8);
		player3.setVisible(false);
        player3.setBounce(0.1);
        player3.setCollideWorldBounds(true);
        player3.setGravity(0, 200);
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                jellt: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'dude',
                frame: 3
            }],
            frameRate: 20
        });
        this.anims.create({
            key: 'back',
            frames: [{
                key: 'dude',
                frame: 8
            }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'front',
            frames: [{
                key: 'dude',
                frame: 7
            }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {
                jellt: 4,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });


        //  Input Events
        cursors3 = this.input.keyboard.createCursorKeys();

        
        bombs = this.physics.add.group();
        bluefs = this.physics.add.group();
        this.physics.add.collider(portal, platforms3);
        this.physics.add.collider(player3, platforms3);
        this.physics.add.collider(target2, platforms3);
        this.physics.add.collider(target, platforms3);
		
        this.physics.add.collider(bombs, platforms3);
        this.physics.add.collider(bluefs, platforms3);
        this.physics.add.collider(player3, bombs, this.hitBomb, null, this);
        this.physics.add.collider(player3, bluefs, this.hitfire, null, this);
        this.physics.add.collider(player3, portal, this.out, null, this);
		
		//Game Start Intro
		gameIntroFinal = this.add.image(this.game.renderer.width*.51, this.game.renderer.height*.50, 'gameIntroFinal').setScale(2.8);
		gameIntroFinal.setVisible(true);
		gameStartFinal = this.add.image(this.game.renderer.width*.51, this.game.renderer.height*.82, 'gameStartFinal').setScale(1.5);
		gameStartFinal.setVisible(true);
		gameStartFinal.setInteractive();
		gameStartFinal.on('pointerdown', function (pointer) {
			gameStartFinal.setVisible(false);
			gameIntroFinal.setVisible(false);			
			startFinal = true;
			target.setVisible(true);
			target2.setVisible(true);
			player3.setVisible(true);
		})
		/*
		this.input.keyboard.on('keydown-ArrowUp', function (event) {
			console.log("up");
			if (player3.body.touching.down) {
				doubleJumpFinal = 1;
				player3.setVelocityY(-280);
			}else if (doubleJumpFinal==1){
				player3.setVelocityY(-280);
				doubleJumpFinal = 0;
			}        
		});
		
		this.input.keyboard.on('keydown-ArrowLeft', function (event) {
			console.log("left");
			player3.setVelocityX(-160);
			player3.anims.play('left', true);     
		});
		
		this.input.keyboard.on('keydown-ArrowRight', function (event) {
			console.log("right");
			player3.setVelocityX(160);
			player3.anims.play('right', true);   
		});*/
    }

    update() {
		if(startFinal){			
				countFinal +=1;
				if (countFinal==100){
					ftimedEvent = this.time.addEvent({
						delay: 1500,
						callback: this.onEvent,
						callbackScope: this,
						loop: true
					});
				}	
			
			if (gameOver) {
				
				return;
			}
			
			if (cursors3.left.isDown) {
				player3.setVelocityX(-160);
				player3.anims.play('left', true);
			} else if (cursors3.right.isDown) {
				player3.setVelocityX(160);

				player3.anims.play('right', true);
			} else if (cursors3.up.isDown) {
				
				player3.setVelocityY(-280);
		
			} else {
				player3.setVelocityX(0);
				player3.anims.play('turn');
			}
		}
       




    }

    onEvent() {
        var bomb = bombs.create(80, 50, 'bomb');
        bomb.setBounce(0.8);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.setGravity(0, 600);

        this.destroyTimeEvent = this.time.addEvent({
            delay: 12000,
            repeat: 0,
            callbackScope: this,
            callback: function() {
                bomb.destroy();
            }
        });


        var bluef = bluefs.create(1780, 50, 'bluef');
        bluef.setBounce(0.6);
        bluef.setCollideWorldBounds(true);
        bluef.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bluef.setGravity(0, 600);

        this.destroyTimeEvent = this.time.addEvent({
            delay: 10000,
            repeat: 0,
            callbackScope: this,
            callback: function() {
                bluef.destroy();
            }
        });

    }


    hitfire(player3, bluef) {
        this.physics.pause();

        player3.setTint(0xff0000);

        player3.anims.play('turn');
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.restart();
            currenttime = 300;
			countFinal = 0;
			startFinal = false;
			target.setVisible(false);
			target2.setVisible(false);
			player3.setVisible(false);
        }, this);
    }


    out(player3, portal) {
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.start('ending');
        }, this);

    }

    hitBomb(player3, bomb) {
        this.physics.pause();

        player3.setTint(0xff0000);

        player3.anims.play('turn');

        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.restart();
            currenttime = 300;
			countFinal = 0;
			startFinal = false;
        }, this);
    }
}