class mainMap extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainMap'
        });
    }

    preload() {

            this.load.image("wall", "assets/tilesets/inca_front.png");
            this.load.image("back", "assets/tilesets/inca_back2.png");
            this.load.image("box", "assets/tilesets/misc_1.png");
            this.load.image("fire", "assets/tilesets/misc_2.png");
            this.load.tilemapTiledJSON("map", "assets/mazetry2.json");

            this.load.spritesheet('falao', 'assets/chara/falao.png', {
                frameWidth: 32,
                frameHeight: 50.4
            });

            this.load.image('jew', 'assets/jell.png');
            this.load.image('light', 'assets/light.png');
            this.load.image('bat', 'assets/bat.png');
            this.load.image('arrow', 'assets/arrow.png');
            this.load.image('door', 'assets/door.png');
            this.load.image('kaogu', 'assets/kaogu.png');
            this.load.image('gateKep', 'assets/gateKeeper.png');

            this.load.image('gateKep2', 'assets/gateKeeper2.png');
            this.load.image('gateKep3', 'assets/gateKeeper3.png');
            this.load.image('gateKep4', 'assets/gateKeeper4.png');
            this.load.image('gateKep5', 'assets/gateKeeper5.png');

            this.load.image('lastDoor', 'assets/lastDoor.png');
            this.load.image('popup', 'assets/popup.png');
            this.load.image('back', 'asset/button_back.png');

            this.load.audio('openDoor', 'assets/audio/openDoor.mp3');
            this.load.audio('pickup', 'assets/audio/pickup.mp3');
            this.load.audio('wound', 'assets/audio/wound.mp3');

            this.load.image('die', 'assets/Die.png');
           

        } //preload

    create() {

            openDoor = this.sound.add('openDoor');
            pickup = this.sound.add('pickup');
            wound = this.sound.add('wound');

            this.cameras.main.setBounds(0, 0, 1920, 1080);
            this.physics.world.setBounds(0, 0, 1920, 1080);

            map = this.make.tilemap({
                key: "map"
            });

            tileset2 = map.addTilesetImage("inca_front32", "wall");
            tileset3 = map.addTilesetImage("inca_front16x32", "wall");

            tileset4 = map.addTilesetImage("inca_back2", "back");
            tileset5 = map.addTilesetImage("misc_1", "box");
            tileset6 = map.addTilesetImage("misc_2", "fire");

            bgLayer = map.createStaticLayer("bg", tileset4, 0, 0);
            objectLayer = map.createStaticLayer("No collide", [tileset5, tileset6], 0, 0);
            topLayer = map.createStaticLayer("fromt", [tileset2, tileset3], 0, 0);
            //,tileset4,tileset5,tileset6

            topLayer.setCollisionByProperty({
                collides: true
            });

            /*
             var debugGraphics = this.add.graphics().setAlpha(0.75);
             topLayer.renderDebug(debugGraphics, {
                 tileColor: null, // Color of non-colliding tiles
                 collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                 faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
             });  */
			
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('falao', {
                    jellt: 0,
                    end: 2
                }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [{
                    key: 'falao',
                    frame: 3
                }],
                frameRate: 20
            });
            this.anims.create({
                key: 'back',
                frames: [{
                    key: 'falao',
                    frame: 8
                }],
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'front',
                frames: [{
                    key: 'falao',
                    frame: 7
                }],
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('falao', {
                    start: 4, end: 6
                }),
                frameRate: 10,
                repeat: -1
            });

            player = this.physics.add.sprite(playerX, playerY, 'falao', 1);

            this.physics.world.bounds.width = map.widthInPixels;
            this.physics.world.bounds.height = map.heightInPixels;
            player.setCollideWorldBounds(true);
            this.physics.add.collider(player, topLayer);
            cursors = this.input.keyboard.createCursorKeys();
            //---------------
            this.input.setDraggable(player.setInteractive());

            this.input.on('dragstart', function(pointer, obj) {
                obj.body.moves = false;
            });

            this.input.on('drag', function(pointer, obj, dragX, dragY) {
                obj.setPosition(dragX, dragY);
            });

            this.input.on('dragend', function(pointer, obj) {
                obj.body.moves = true;
            });

            //----------------------------
            path = new Phaser.Curves.Path(569, 925);
            path.ellipseTo(50, 50, 0, 20, true);
            var graphics = this.add.graphics();
            graphics.lineStyle(1, 0x000000, 0); 
            path.draw(graphics, 128);
            jell1 = this.add.follower(path, 569, 925, 'light');
            jell1.startFollow({
                duration: 10000,
                yoyo: true,
                repeat: -1,
                rotateToPath: true,
                verticalAdjust: true
            });
            jell11 = this.physics.add.image(515, 925, 'jew').setImmovable(true);

            //-----------------    
            path = new Phaser.Curves.Path(1110, 290);
            path.ellipseTo(50, 50, 0, 20, true);
            var graphics = this.add.graphics();
            graphics.lineStyle(1, 0x000000, 0); 
            path.draw(graphics, 128);
            jell2 = this.add.follower(path, 1110, 290, 'light');
            jell2.startFollow({
                duration: 10000,
                yoyo: true,
                repeat: -1,
                rotateToPath: true,
                verticalAdjust: true
            });
            jell22 = this.physics.add.image(1063, 287, 'jew').setImmovable(true);

            path = new Phaser.Curves.Path(1202, 621);
            path.ellipseTo(50, 50, 0, 20, true);
            var graphics = this.add.graphics();
            graphics.lineStyle(1, 0x000000, 0); 
            path.draw(graphics, 128);
            jell3 = this.add.follower(path, 1202, 621, 'light');
            jell3.startFollow({
                duration: 10000,
                yoyo: true,
                repeat: -1,
                rotateToPath: true,
                verticalAdjust: true
            });
            jell33 = this.physics.add.image(1147, 617, 'jew').setImmovable(true);

            this.physics.add.overlap(player, jell11, this.collectjell, null, this);
            this.physics.add.overlap(player, jell22, this.collectjell, null, this);
            this.physics.add.overlap(player, jell33, this.collectjell, null, this);

            //--------------------------------
            bat1 = this.physics.add.image(200, 430, 'bat').setImmovable(true).setVelocity(0, 0);
            bat1.body.setAllowGravity(false);
            this.tweens.timeline({
                targets: bat1.body.velocity,
                loop: -1,
                tweens: [{
                    x: 80,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }, {
                    x: 0,
                    y: 0,
                    duration: 1000,
                    ease: 'Stepped'
                }, {
                    x: -80,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }, {
                    x: 0,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }]

            });

            bat2 = this.physics.add.image(880, 1010, 'bat').setImmovable(true).setVelocity(0, 0);
            bat2.body.setAllowGravity(false);
            this.tweens.timeline({
                targets: bat2.body.velocity,
                loop: -1,
                tweens: [{
                    x: 80,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }, {
                    x: 0,
                    y: 0,
                    duration: 1000,
                    ease: 'Stepped'
                }, {
                    x: -80,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }, {
                    x: 0,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }]

            });

            bat3 = this.physics.add.image(1600, 805, 'bat').setImmovable(true).setVelocity(0, 0);
            bat3.body.setAllowGravity(false);
            this.tweens.timeline({
                targets: bat3.body.velocity,
                loop: -1,
                tweens: [{
                    x: 80,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }, {
                    x: 0,
                    y: 0,
                    duration: 1000,
                    ease: 'Stepped'
                }, {
                    x: -80,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }, {
                    x: 0,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }]

            });

            kaogu = this.physics.add.image(1473, 64, 'kaogu').setImmovable(true).setVelocity(0, 0);
            kaogu.body.setAllowGravity(false);
            this.tweens.timeline({
                targets: kaogu.body.velocity,
                loop: -1,
                tweens: [{
                    x: 80,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }, {
                    x: 0,
                    y: 0,
                    duration: 1000,
                    ease: 'Stepped'
                }, {
                    x: -80,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }, {
                    x: 0,
                    y: 0,
                    duration: 2000,
                    ease: 'Stepped'
                }]

            });
            this.physics.add.overlap(player, kaogu, this.hitBat, null, this);

            this.physics.add.overlap(player, bat1, this.hitBat, null, this);
            this.physics.add.overlap(player, bat2, this.hitBat, null, this);
            this.physics.add.overlap(player, bat3, this.hitBat, null, this);
            //-----------------------------------
            arrows = this.physics.add.group();

            let timedEvent = this.time.addEvent({
                delay: 2500,
                callback: this.bombEvent,
                callbackScope: this,
                loop: true
            });

            door1 = this.physics.add.image(230, 320, 'door').setImmovable(true);
            door2 = this.physics.add.image(487, 798, 'door').setImmovable(true);
            door3 = this.physics.add.image(1822, 95, 'door').setImmovable(true);
            door4 = this.physics.add.image(1155, 514, 'door').setImmovable(true);
            door5 = this.physics.add.image(1019, 896, 'door').setImmovable(true);
            door6 = this.physics.add.image(748, 288, 'door').setImmovable(true);
            //door7= this.physics.add.image(1257, 163, 'door').setImmovable(true);
            this.physics.add.collider(player, door1, this.doorMini1, null, this);
            this.physics.add.collider(player, door2, this.doorMini2, null, this);
            this.physics.add.collider(player, door3, this.doorMini3, null, this);
            this.physics.add.collider(player, door5, this.doorMini5, null, this);
            this.physics.add.collider(player, door6, this.doorMini6, null, this);
            this.physics.add.collider(player, door4, this.doorMini4, null, this);
            //this.physics.add.collider(player, door7, this.doorMini7, null, this);
            // gateKep1=this.physics.add.image(200,320,'gateKep').setImmovable(true); //for the final door!!!
            gateKep2 = this.physics.add.image(457, 798, 'gateKep4').setScale(0.25).setImmovable(true);
            gateKep3 = this.physics.add.image(1790, 95, 'gateKep3').setScale(0.2).setImmovable(true);
            gateKep4 = this.physics.add.image(1120, 514,'gateKep2').setScale(0.25).setImmovable(true);

            gateKep5 = this.physics.add.image(1069, 896, 'gateKep5').setScale(0.25).setImmovable(true).setFlipX(true);;
            gateKep6 = this.physics.add.image(717, 288, 'gateKep').setImmovable(true);
            this.physics.add.collider(player, gateKep1, this.Keeper, null, this);
            this.physics.add.collider(player, gateKep2, this.Keeper, null, this);
            this.physics.add.collider(player, gateKep3, this.Keeper, null, this);
            this.physics.add.collider(player, gateKep4, this.Keeper, null, this);
            this.physics.add.collider(player, gateKep5, this.Keeper, null, this);
            this.physics.add.collider(player, gateKep6, this.Keeper, null, this);

            lastDoor = this.physics.add.image(1395, 528, 'lastDoor').setScale(0.4).setImmovable(true);
            this.physics.add.collider(player, lastDoor, this.lastDoor, null, this);
            //------------
            text = this.add.text(playerX, playerY - 100, '', {

                fill: '#ffffff',
                fontSize: '14px',
            });
            

            this.cameras.main.startFollow(player, true, 0.08, 0.08);
            this.cameras.main.setZoom(2.3);

        } //create
     DieInfo(){
        text.destroy();
        retry=this.add.image(player.x+200, player.y-100, 'die').setScale(0.5);
        retry.setVisible(true);
    }       
    Keeper() {
        openDoor.play();
        var keyMessage = this.Poptxt.call(this, 'Have you got the key?\n -- GateKeeper',  player.x+100, player.y-100);
        var timer = this.time.delayedCall(3500, function() {
            keyMessage.destroy();
           
        });

    }

    Poptxt(name, x, y) {
        var btn = this.add.image(x, y, 'popup').setInteractive();
        btn.name = name;
        btn.setScale(2, 3);

        popTxt = this.add.text(x - 30, y - 8, name, {
            fill: '#000000',
            fontSize: '14px',
        });
        popTxt.x += (btn.width - popTxt.width) / 2;
        return btn;

    }

    doorMini1() {
        this.scene.start('sdv4'); //this is the constructor key!!
        if (playerX != null && playerY != null) {

            playerX = player.x;
            playerY = player.y;
        }

    }

    doorMini2() {
        this.scene.start('sdv5'); //this is the constructor key!!
        if (playerX != null && playerY != null) {

            playerX = player.x;
            playerY = player.y;
        }


    }

    doorMini3() {
        this.scene.start('sdv7'); //this is the constructor key!!
        if (playerX != null && playerY != null) {

            playerX = player.x;
            playerY = player.y;
        }

    }   

    doorMini4(){
    	this.scene.start('sdv6'); //this is the constructor key!!
        if (playerX != null && playerY != null) {

            playerX = player.x;
            playerY = player.y;
        }

    }
	
    doorMini5() {
		this.scene.start('minigame5');
		if (playerX != null && playerY != null) {

            playerX = player.x;
            playerY = player.y;
        }
    }

    doorMini6() {
       this.scene.start('minigame6');
		if (playerX != null && playerY != null) {

            playerX = player.x;
            playerY = player.y;
        }

    }
	
	lastDoor() {
		if(success6){
			this.scene.start('sdv3'); //this is the constructor key!!
			if (playerX != null && playerY != null) {

				playerX = player.x;
				playerY = player.y;
			}
		}
		
    }
	
    bombEvent() {
            let singleBomb = arrows.create(1488, 73, 'arrow');
            singleBomb.setVelocityY(200);
            singleBomb.allowGravity = true;
            this.destroyTimeEvent = this.time.addEvent({
                delay: 2000,
                repeat: 0,
                callbackScope: this,
                callback: function() {
                    singleBomb.destroy();

                }
            });

            let singleBomb2 = arrows.create(1518, 93, 'arrow');
            singleBomb2.setCollideWorldBounds(true);
            singleBomb2.setVelocityY(90);
            singleBomb2.allowGravity = true;
            this.destroyTimeEvent = this.time.addEvent({
                delay: 2000,
                repeat: 0,
                callbackScope: this,
                callback: function() {
                    singleBomb2.destroy();

                }
            });

            let singleBomb3 = arrows.create(1538, 103, 'arrow');
            singleBomb3.setCollideWorldBounds(true);
            singleBomb3.setVelocityY(130);
            singleBomb3.allowGravity = true;
            this.destroyTimeEvent = this.time.addEvent({
                delay: 2000,
                repeat: 0,
                callbackScope: this,
                callback: function() {
                    singleBomb3.destroy();
                }
            });

            this.physics.add.overlap(player, singleBomb, this.hitBat, null, this);
            this.physics.add.overlap(player, singleBomb2, this.hitBat, null, this);
            this.physics.add.overlap(player, singleBomb3, this.hitBat, null, this);
        } //BombEvent

    hitBat(player, bat) {
        wound.play();
        lifePoint -= 1;
    }

    collectjell(player, jell) {
        pickup.play();
        jell.disableBody(true, true);

        //  Add and update the score
        score += 10;

    }

    update(time, delta) {
			
            player.body.setVelocity(0);

            if (cursors.left.isDown) {
                player.body.setVelocityX(-100);

                player.anims.play('left', true);

            } else if (cursors.right.isDown) {
                player.body.setVelocityX(100);

                player.anims.play('right', true);
            } else if (cursors.up.isDown) {

                player.body.setVelocityY(-160);
                player.anims.play('back', true);
            } else if (cursors.down.isDown) {
                player.body.setVelocityY(160);
                player.anims.play('front', true);
            } else {
                player.body.setVelocityX(0);

                player.anims.play('turn');
            }
            player.body.velocity.normalize().scale(100);

            //------------------------
            if (success1 == true) {
                gateKep2.destroy();
				door1.destroy();
				//sdv4
            }

            if (success2 == true) {
                gateKep4.destroy();
				door2.destroy();
				//sdv5
            }
			if (success3 == true) {
                gateKep3.destroy();
				door4.destroy();
				//sdv6
            }
			if (success4 == true) {
                gateKep5.destroy();
				door3.destroy();
				//sdv7
            }
			if (success5 == true) {
                gateKep6.destroy();
				door5.destroy();
				//minigame5
            }
            if (success6 == true) {
				door6.destroy();
				//minigame6
            }

           

            
            //--------text
            text.setText(
               '\nTreasures collected: ' + score +
                '\nlife: ' + lifePoint
            );
            text.x=player.x;
            text.y=player.y-100;           

            if (score >= 30) {
                achFlag = true;
                score -= 30;
            } else {
                achFlag = false;
            }

            if (achFlag == true) {
                var achieve = this.Poptxt.call(this, 'Achievement Unlocked!\n The jewellery will \n compensate your life points! ', player.x+35, player.y-100);
                var timer = this.time.delayedCall(3500, function() {
                    achieve.destroy();
                });
                lifePoint+=30;
                achFlag = false;
            }
            if(lifePoint<=0){
                this.DieInfo();
            }
        } //update

}