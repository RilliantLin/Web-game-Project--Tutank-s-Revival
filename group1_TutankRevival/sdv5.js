class sdv5 extends Phaser.Scene {
    constructor() {

        super("sdv5");
    }

    preload() {
		this.load.image('gameIntro2', 'ass/game2_intro.png');
		this.load.image('gameStart2', 'ass/gameStart.png');
        this.load.image('ff2', 'ass/wall.png');
		this.load.image('ff3', 'ass/wall2.png');
        this.load.image('j1', 'ass/je1.png');
		this.load.image('j2', 'ass/je2.png');
		
		this.load.image('j3', 'ass/je3.png');
        this.load.image('mummy', 'ass/mummy.png');
        this.load.image('bg5', 'ass/bg2.png');
        this.load.image('frame3', 'ass/frame3.png');
        this.load.spritesheet('dude', 'assets/chara/falao.png', {
            frameWidth: 32,
            frameHeight: 50
        });

    }




    create() {

        this.add.image(380, 260, 'bg5').setDisplaySize(1380, 720);
        this.cameras.main.setZoom(1.4);
        this.cameras.main.centerOn(380, 260);
       
       
        wall1=this.add.image(0, 0, 'ff2').setOrigin(0).setDisplaySize(40, 600);
        wall2= this.physics.add.image(760, 0, 'ff2').setOrigin(0).setDisplaySize(40, 600).setImmovable();
		wall3= this.physics.add.image(0, 550, 'ff3').setOrigin(0).setDisplaySize(850, 60).setImmovable();
		textt = this.add.text(50, 0, 'Jewel left : 3', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#fff9e2'
        });
        /* var hhint = this.add.text(-100,-100, 'Avoid being touched by toxic bugs and collect the key ! Use cursor to move', {
             fontFamily: 'Arial',
             fontSize: 20,
             color: '#1c1b1b'
         });*/

        player51 = this.physics.add.sprite(60, 600, 'dude').setScale(1.25);
        player51.setCollideWorldBounds(true);
		player51.setVisible(false);

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

        var group = this.physics.add.group({
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true
        });
			j1 = this.physics.add.image(700, 60, 'j1');
			j1.setBounce(1);
			j1.setCollideWorldBounds(true);
			j1.setVelocity(250);
			j1.allowGravity = false;
			
			var block1 = group.create(100, 200, 'mummy').setVelocity(100, 200);
			var block2 = group.create(500, 200, 'mummy').setVelocity(-100, -100);
			var block3 = group.create(300, 400, 'mummy').setVelocity(60, 100);
			var block4 = group.create(600, 300, 'mummy').setVelocity(-30, -50);
			var block5 = group.create(200, 500, 'mummy').setVelocity(30, 150);
			
			this.physics.add.collider(player51, wall2);
			this.physics.add.collider(player51, wall3);
			this.physics.add.collider(player51, wall1);
			this.physics.add.collider(block1, wall2);
			this.physics.add.collider(block1,wall3);
			this.physics.add.collider(block1,wall1);
			this.physics.add.collider(j1,wall3);
			this.physics.add.collider(j1, wall2);
		    this.physics.add.collider(j1, wall1);
			this.physics.add.collider(block1, wall1);
			this.physics.add.collider(block1, wall2);
			this.physics.add.collider(block1, wall3);
			this.physics.add.collider(block2, wall1);
			this.physics.add.collider(block2, wall2);
			this.physics.add.collider(block2, wall3);
			this.physics.add.collider(block3, wall1);
			this.physics.add.collider(block3, wall2);
			this.physics.add.collider(block3, wall3);
			this.physics.add.collider(block4, wall1);
			this.physics.add.collider(block4, wall2);
			this.physics.add.collider(block4,wall3);
			this.physics.add.collider(block5, wall1);
			this.physics.add.collider(block5, wall2);
			this.physics.add.collider(block5,wall3);
			this.physics.add.overlap(player51, j1, this.collect, null, this);
			this.physics.add.collider(player51, group, this.die, null, this);
			
		//Game Start Intro
		gameIntro2 = this.add.image(this.game.renderer.width*.2, this.game.renderer.height*.25, 'gameIntro2').setScale(1.8);
		gameIntro2.setVisible(true);
		gameStart2 = this.add.image(this.game.renderer.width*.2, this.game.renderer.height*.45, 'gameStart2').setScale(1);
		gameStart2.setVisible(true);
		gameStart2.setInteractive();
		gameStart2.on('pointerdown', function (pointer) {
			gameStart2.setVisible(false);
			gameIntro2.setVisible(false);
			start2 = true;
			player51.setVisible(true);
			player51.y=500;
		})
			
		
    }

    collect() {
        j1.disableBody(true, true);
        find3 = true;
		textt.setText('Jewel left : 2');
    }


    collect2() {
        j2.disableBody(true, true);
        find4 = true;
		textt.setText('Jewel left : 1');

    }


    collect3() {
        j3.disableBody(true, true);
        success2 = true;
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.start('mainMap');
        }, this);
    }

    die() {
        this.physics.pause();
        this.cameras.main.shake(500);
        player51.setTint(0xff0000);
        player51.anims.play('turn');
        this.gameOver = true;
        this.cameras.main.fade(500, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', function() {
            this.scene.restart();
            currenttime = 300;
        }, this);

    }
    update() {
		if (start2){
			if (find3 == true) {
				j2 = this.physics.add.image(500, 150, 'j2');
				this.physics.add.overlap(player51, j2, this.collect2, null, this);
				j2.setBounce(1);
				j2.setCollideWorldBounds(true);
				j2.setVelocity(250);
				j2.allowGravity = false;
				this.physics.add.collider(j2,wall3);
				this.physics.add.collider(j2, wall2);
		
				find3 = false;
			}

			if (find4 == true) {
				j3 = this.physics.add.image(300, 280, 'j3');
				this.physics.add.overlap(player51, j3, this.collect3, null, this);
				j3.setBounce(1);
				j3.setCollideWorldBounds(true);
				j3.setVelocity(250);
				j3.allowGravity = false;
           
				this.physics.add.collider(j3,wall3);
				this.physics.add.collider(j3, wall2);
				find4 = false;
			}
			if (this.cursors.left.isDown) {
				player51.setVelocityX(-160);

				player51.anims.play('left', true);
			} else if (this.cursors.right.isDown) {
				player51.setVelocityX(160);

				player51.anims.play('right', true);
			} else if (this.cursors.up.isDown) {
				player51.setVelocityY(-160);
				player51.anims.play('up', true);
			} else if (this.cursors.down.isDown) {
				player51.setVelocityY(160);
				player51.anims.play('down', true);
			} else {
				player51.setVelocityX(0);

				player51.anims.play('turn');
			}
		}
        
    }

}