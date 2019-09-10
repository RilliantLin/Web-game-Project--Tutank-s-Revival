class minigame5 extends Phaser.Scene{
	
	constructor() {

        super("minigame5");
    }
	
	preload(){
		//load asset
		this.load.image('bg5', 'asset/minigame5/minigame5bg.png');
		this.load.image('ground', 'asset/minigame5/platform.png');
		this.load.image('rocks', 'asset/minigame5/bigstone.png');
		this.load.image('arrow5', 'asset/minigame5/arrow.png');
		this.load.image('door', 'asset/minigame5/door.png');
		this.load.image('gameIntro', 'asset/minigame5/gameIntro.png');
		this.load.image('gameFinish_lose', 'asset/minigame5/gameover.png');
		this.load.image('gameStart', 'asset/minigame5/gamestart.png');
		this.load.image('gameFinish_win', 'asset/minigame5/gamefinish.png');
		this.load.spritesheet('player5', 'asset/minigame5/falao5.png', { frameWidth: 32, frameHeight: 49 });
	}
	
	create(){		
		this.cameras.main.setBounds(0, 0, 12000, 1080);
		this.physics.world.setBounds(0, 0, 12000, 1080);
	
		//environment and background settings
		var bg = this.add.image(960, 540, 'bg5');
		for( let i = 0; i < 12000; i += 1920 ){				
			this.add.image(2880 + i, 540, 'bg5').setScale(1).depth = 0;
		}
		platforms5 = this.physics.add.staticGroup();		
		for( let i = 800; i < 12000; i += (Math.random()*500+400) ){
	    	platforms5.create(1800 + i, 875, 'ground').setScale(1,2).refreshBody().depth=3;
		}
		platforms5.create(12000, 875, 'ground').setScale(1,2).refreshBody().depth=3;
		door5 = this.add.sprite(11960, 750, 'door').setScale(3).depth=0;
		
		// The player5 and its settings
		player5 = this.physics.add.sprite(100, 300, 'player5').setVisible(false).setScale(1.75);
		player5.setCollideWorldBounds(true);	
		player5.setGravity(0,300);	
		this.cameras.main.startFollow(player5, true, 1, 0.2);
		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('player5', { start:5 }),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player5', { start: 4, end: 5 }),
			frameRate: 10,
			repeat: -1
		});
		
		rocks5 = this.physics.add.sprite(0,540,'rocks');
		rocks5.setVisible(false);
		
		this.input.on('pointerdown', function (pointer) {
			console.log(doubleJump5);
			if (player5.body.touching.down){
				player5.setVelocityY(-300);
				doubleJump5 = 1;
				console.log(doubleJump5);
			}else if(doubleJump5 == 1){
				player5.setVelocityY(-300);
				doubleJump5 =0;
			}
		}, this);
		
		
		//Game Start Intro
		gameIntro5 = this.add.image(this.game.renderer.width*.51, this.game.renderer.height*.50, 'gameIntro').setScale(2.8);
		gameIntro5.setVisible(true);
		gameStart5 = this.add.image(this.game.renderer.width*.51, this.game.renderer.height*.82, 'gameStart').setScale(1.5);
		gameStart5.setVisible(true);
		gameStart5.setInteractive();
		gameStart5.on('pointerdown', function (pointer) {
			platforms5.create(1000, 875, 'ground').setScale(5,2).refreshBody().depth=3;
			gameStart5.setVisible(false);
			gameIntro5.setVisible(false);
			player5.y=100;
			start5 = true;
		})
		
				
		//Collide
		this.physics.add.collider(player5, platforms5);
		this.physics.add.overlap(door5, player5);
		this.physics.add.overlap(player5, arrows5, this.hit, null, this);
		
		
	}
	
	update ()
	{
		rocks5.y=540;
		if (start5){
			count5++;
			player5.setVisible(true);
			rocks5.setVisible(true);
			rocks5.x=player5.x-500;
			rocks5.setAngle(rocks5.x);
			
			if (gameOver5){
			//----------------------------return to main map----------------------------
				success5=true;
				this.cameras.main.fade(500, 0, 0, 0);
				this.cameras.main.on('camerafadeoutcomplete', function() {
					this.scene.start('mainMap');
				}, this)
				return;
			}else{
			//set motion of player5
				player5.setVelocityX(200);
				player5.anims.play('right', true);
			}
			
			if (player5.y >900){
				start5= false;
				this.scene.restart();
			}
			
			if(player5.body.touching.none!=true&&player5.x>11900){
			//--------------------------------what to do if finish----------------------------------
				gameFinish_win5 = this.add.image(11000, game.renderer.height*.50, 'gameFinish_win');
				player5.destroy();
				gameOver5 = true;
			}	
			
		}	
	}		
}