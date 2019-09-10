class minigame6 extends Phaser.Scene{
	
	constructor() {

        super("minigame6");
    }
	
	preload(){
		//load asset
		this.load.image('bg6', 'asset/minigame5/minigame5bg.png');
		this.load.image('ground', 'asset/minigame5/platform.png');
		this.load.image('rocks', 'asset/minigame5/bigstone.png');
		this.load.image('arrow6', 'asset/minigame5/arrow.png');
		this.load.image('door', 'asset/minigame5/door.png');
		this.load.image('gameIntro', 'asset/minigame5/gameIntro2.png');
		this.load.image('gameFinish_lose', 'asset/minigame5/gameover.png');
		this.load.image('gameStart', 'asset/minigame5/gamestart.png');
		this.load.image('gameFinish_win', 'asset/minigame5/gamefinish.png');
		this.load.spritesheet('player6', 'asset/minigame5/falao5.png', { frameWidth: 32, frameHeight: 49 });
	}
	
	create(){		
		this.cameras.main.setBounds(0, 0, 12000, 1080);
		this.physics.world.setBounds(0, 0, 12000, 1080);
	
		//environment and background settings
		var bg = this.add.image(960, 540, 'bg6');
		for( let i = 0; i < 12000; i += 1920 ){				
			this.add.image(2880 + i, 540, 'bg6').setScale(1).depth = 0;
		}
		platforms6 = this.physics.add.staticGroup();		
		for( let i = 800; i < 12000; i += (Math.random()*500+400) ){
	    	platforms6.create(1800 + i, 875, 'ground').setScale(1,2).refreshBody().depth=3;
		}
		platforms6.create(12000, 875, 'ground').setScale(1,2).refreshBody().depth=3;
		door6 = this.add.sprite(11960, 750, 'door').setScale(3).depth=0;
		
		// The player6 and its settings
		player6 = this.physics.add.sprite(100, 300, 'player6').setVisible(false).setScale(1.75);
		player6.setCollideWorldBounds(true);	
		player6.setGravity(0,300);	
		this.cameras.main.startFollow(player6, true, 1, 0.2);
		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('player6', { start:5 }),
			frameRate: 20,
			repeat: -1
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('player6', { start: 4, end: 5 }),
			frameRate: 10,
			repeat: -1
		});
		
		rocks6 = this.physics.add.sprite(0,540,'rocks');
		rocks6.setVisible(false);
		
		this.input.on('pointerdown', function (pointer) {
			if (player6.body.touching.down){
				player6.setVelocityY(-300);
				doubleJump6 = 1;
			}else if(doubleJump6 == 1){
				player6.setVelocityY(-300);
				doubleJump6 =0;
			}
		}, this);
		
		
		//Game Start Intro
		gameIntro6 = this.add.image(this.game.renderer.width*.51, this.game.renderer.height*.50, 'gameIntro').setScale(2.8);
		gameIntro6.setVisible(true);
		gameStart6 = this.add.image(this.game.renderer.width*.51, this.game.renderer.height*.82, 'gameStart').setScale(1.5);
		gameStart6.setVisible(true);
		gameStart6.setInteractive();
		gameStart6.on('pointerdown', function (pointer) {
			platforms6.create(1000, 875, 'ground').setScale(5,2).refreshBody().depth=3;
			gameStart6.setVisible(false);
			gameIntro6.setVisible(false);
			player6.y=100;
			start6 = true;
		})
		var scene = this.scene;
		var Arrow = new Phaser.Class({
			Extends: Phaser.GameObjects.Image,
			initialize:
			function Arrow(scene){
				Phaser.GameObjects.Image.call(this, scene, 0, 0, 'arrow6');
				this.speed = Phaser.Math.GetSpeed(600,1);
				//this.physics.add.overlap(player6, this.arrows6, this.hit, null, this);
			},
			
			fire: function(x,y){
				this.setPosition(x,y);
				this.setActive(true);
				this.setVisible(true);
			},
			
			update: function(time, delta){
				this.x -= this.speed*delta;
				if (this.x<-100){
					this.destroy();
				}
				if ((player6.x-this.x>-10&&player6.x-this.x<20)&&(player6.y>780)){
					player6.setVisible(false);
					rocks6.setVisible(false);
					scene.restart();
				}
			}
		})
		
		arrows6 = this.add.group({
			classType: Arrow,
			maxSize: 10000,
			runChildUpdate: true
		})
		
		//Collide
		this.physics.add.collider(player6, platforms6);
		this.physics.add.overlap(door6, player6);
		this.physics.add.overlap(player6, arrows6, this.hit, null, this);
		
		
	}
	
	hit(player6, arrows6){
			Console.Log("hit");
			gameFinish_win6 = this.add.image(11000, game.renderer.height*.50, 'gameFinish_win');
			player6.destroy();
			gameOver6 = true;
		}
	
	update ()
	{
		rocks6.y=540;
		if (start6){
			count6++;
			player6.setVisible(true);
			rocks6.setVisible(true);
			rocks6.x=player6.x-500;
			rocks6.setAngle(rocks6.x);
			
			if (gameOver6){
			//----------------------------return to main map----------------------------
				success6=true;
				this.cameras.main.fade(500, 0, 0, 0);
				this.cameras.main.on('camerafadeoutcomplete', function() {
					this.scene.start('mainMap');
				}, this)
				return;
			}else{
			//set motion of player6
				player6.setVelocityX(200);
				player6.anims.play('right', true);
			}
			
			if (player6.y >900){
				start6= false;
				this.scene.restart();
			}
			
			if(player6.body.touching.none!=true&&player6.x>11900){
			//--------------------------------what to do if finish----------------------------------
				gameFinish_win6 = this.add.image(11000, game.renderer.height*.50, 'gameFinish_win');
				player6.destroy();
				gameOver6 = true;
			}	
			var arrow = arrows6.get();
			
			if (count6%300==0&&arrow){				
				console.log("called");
				arrow.fire(player6.x+2000, 800);			
			}
			
		}	
	}		
}