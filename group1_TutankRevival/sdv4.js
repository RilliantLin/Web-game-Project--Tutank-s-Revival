class sdv4 extends Phaser.Scene {
    constructor() {

        super("sdv4");
    }



    preload() {
		this.load.image('gameIntro1', 'ass/game1_intro.png');
		this.load.image('gameStart1', 'ass/gameStart.png');
        this.load.image('key', 'ass/obj1.png');
        this.load.image('key2', 'ass/obj2.png');
		this.load.image('bg4', 'ass/bg1n.png');
        this.load.image('ff2', 'ass/wall.png');
        this.load.image('keys', 'ass/obj3.png');
        this.load.image('block', 'ass/ins.png');
		this.load.image('ff3', 'ass/wall2.png');
        this.load.spritesheet('dude', 'assets/chara/falao.png', {
            frameWidth: 32,
            frameHeight: 50
        });

        this.load.image('bg', 'ass/bg6.png');
    }

    create() {
        
		this.add.image(380, 260, 'bg4').setDisplaySize(1380, 720);
        this.cameras.main.setZoom(1.4);
        this.cameras.main.centerOn(380, 260);
        var wall1= this.physics.add.image(0, 0, 'ff2').setOrigin(0).setDisplaySize(40, 610).setImmovable();;
        var wall2= this.physics.add.image(760, 0, 'ff2').setOrigin(0).setDisplaySize(40, 610).setImmovable();
		var wall3= this.physics.add.image(0, 550, 'ff3').setOrigin(0).setDisplaySize(850, 60).setImmovable();

        /* hint4 = this.add.text(50, 10, 'Avoid being touched by toxic bugs and collect the key ! Use cursor to move', {
             fontFamily: 'Arial',
             fontSize: 16,
             color: '#fff9e2'
         });*/

        keys = this.physics.add.image(700, 60, 'keys');

        platforms = this.physics.add.staticGroup();

        player4 = this.physics.add.sprite(100, 450, 'dude').setScale(1.25);
        player4.setCollideWorldBounds(true);

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
                start: 4, end: 6
            }),
            frameRate: 10,
            repeat: -1
        });



        this.cursors = this.input.keyboard.createCursorKeys();
        text = this.add.text(50, 40, 'Timeleft: 1000', {
            font: '25px Courier',
            fill: '#fff9e2'
        });

        var group = this.physics.add.group({
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true
        });

        
       
        this.physics.add.collider(group, group);
		this.physics.add.collider(wall1, group);
		this.physics.add.collider(wall2, group);
		this.physics.add.collider(wall3, group);
		this.physics.add.collider(wall1, player4);
		this.physics.add.collider(wall2, player4);
		this.physics.add.collider(wall3, player4);
        this.physics.add.overlap(player4, keys, this.collect, null, this);
        this.physics.add.collider(player4, group, this.die, null, this);
        
		
		//Game Start Intro
		gameIntro1 = this.add.image(this.game.renderer.width*.2, this.game.renderer.height*.25, 'gameIntro1').setScale(1.8);
		gameIntro1.setVisible(true);
		gameStart1 = this.add.image(this.game.renderer.width*.2, this.game.renderer.height*.45, 'gameStart1').setScale(1);
		gameStart1.setVisible(true);
		gameStart1.setInteractive();
		gameStart1.on('pointerdown', function (pointer) {
			gameStart1.setVisible(false);
			gameIntro1.setVisible(false);
			start1 = true;
			count1 = 0;
			var block1 = group.create(100, 200, 'block').setVelocity(100, 200);
			var block2 = group.create(500, 200, 'block').setVelocity(-100, -100);
			var block3 = group.create(300, 400, 'block').setVelocity(60, 100);
			var block4 = group.create(600, 300, 'block').setVelocity(-30, -50);
            
           // var block5 = group.create(150, 350, 'block').setVelocity(20, 180);
		})
    }

    find() {

        key.disableBody(true, true);
        find2 = true;
    }

    findd() {
        success1=true;
        key2.disableBody(true, true);
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.start('mainMap');
        }, this);

    }

    collect() {
        keys.disableBody(true, true);
        find1 = true;
    }

    reducetime() {
        currenttime--;

        if (currenttime === 0) {

            //sprite.body.reset(400, 300);

            //  this.physics.pause();
            this.cameras.main.shake(500);
            player4.setTint(0xff0000);
            player4.anims.play('turn');
            //this.gameOver = true;
            this.cameras.main.fade(500, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', function() {
                this.scene.restart();
                currenttime = 400;
				start1 = false;
            }, this);

        }
    }

    die() {

        this.cameras.main.shake(500);
        player4.setTint(0xff0000);
        player4.anims.play('turn');
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.restart();
            currenttime = 400;
			start1 = false;
        }, this);

    }

    update() {
		
		if(start1){
			count1++;
			if (count1==1){
				console.log("called");
				timedEvent = this.time.addEvent({
					delay: 50,
					callback: this.reducetime,
					callbackScope: this,
					loop: true
				});
			}
			
			if (currenttime === 0) {
				return;
			}
			text.setText('Time left: ' + currenttime);

			if (find1 == true) {
				key = this.physics.add.image(90, 480, 'key');
				this.physics.add.overlap(player4, key, this.find, null, this);
				find1 = false;
			}

			if (find2 == true) {
				key2 = this.physics.add.image(450, 200, 'key2').setScale(0.2);
				this.physics.add.overlap(player4, key2, this.findd, null, this);
				find2 = false;

			}
       
            if (this.cursors.left.isDown) {
				player4.setVelocityX(-160);

				player4.anims.play('left', true);
			} else if (this.cursors.right.isDown) {
				player4.setVelocityX(160);

				player4.anims.play('right', true);
			} else if (this.cursors.up.isDown) {
				player4.setVelocityY(-160);
				player4.anims.play('up', true);
			} else if (this.cursors.down.isDown) {
				player4.setVelocityY(160);
				player4.anims.play('down', true);
			} else {
				player4.setVelocityX(0);

				player4.anims.play('turn');
			}
		}
        
    }

}