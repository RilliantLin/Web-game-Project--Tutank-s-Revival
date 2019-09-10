
    class game4 extends Phaser.Scene{
      constructor(){
		 
        super("game4");
      }
	  


preload ()
{
    this.load.image('cat', 'ass/pl.png');
    this.load.image('health', 'ass/heart.png');
	this.load.image('key', 'ass/obj1.png');
	this.load.image('key2', 'ass/obj2.png');
	this.load.image('ff2', 'ass/wall.png');
	
}

create ()
{

    this.add.image(0,0, 'ff2').setOrigin(0).setDisplaySize(40, 600);
	this.add.image(760,0, 'ff2').setOrigin(0).setDisplaySize(40, 600);
    key =this.physics.add.image(590, 80, 'key');
	key2 =this.physics.add.image(100, 300, 'key2').setScale(0.2);
	
    sprite = this.physics.add.image(400, 300, 'cat');

    sprite.setCollideWorldBounds(true);

    //  Create 10 random health pick-ups
    healthGroup = this.physics.add.staticGroup({
        key: 'health',
        frameQuantity: 10,
        immovable: true
    });

    var children = healthGroup.getChildren();

    for (var i = 0; i < children.length; i++)
    {
        var x = Phaser.Math.Between(50, 750);
        var y = Phaser.Math.Between(50, 550);

        children[i].setPosition(x, y);
    }

    healthGroup.refresh();

    //  So we can see how much health we have left
    text = this.add.text(50, 40, 'Health: 100', { font: '25px Courier', fill: '#FFE4C4' });
	win = this.add.text(500, 40, '', { font: '18px Courier', fill: '#FFE4C4' });
    hint2= this.add.text(50, 12, 'Continuously collect heart to maintain health! Find all scepters', { fontSize: '16px', fill: '#ffeeda' });

    //  Cursors to move
    cursors = this.input.keyboard.createCursorKeys();

    //  When the player sprite his the health packs, call this function ...
    this.physics.add.overlap(sprite, healthGroup, this.spriteHitHealth);
    this.physics.add.overlap(sprite, key, this.find);
	this.physics.add.overlap(sprite, key2, this.findd);
    //  Decrease the health by calling reduceHealth every 50ms
    timedEvent = this.time.addEvent({ delay: 50, callback: this.reduceHealth, callbackScope: this, loop: true });
}
find(){

  key.disableBody(true, true);
  count++;
  if(count>=2){
  this.scene.start('Main');
  
  }
  //text.setText('You find key1!');
  //timedEvent.remove();
}
 findd(){

  key2.disableBody(true, true);
  count++;
  if(count>=2){
  this.scene.start('Main');
  
  }
  //timedEvent.remove();
}

 reduceHealth ()
{
    currentHealth--;

    if (currentHealth === 0)
    {
        //  Uh oh, we're dead
        sprite.body.reset(400, 300);

        text.setText('Health: RIP');

        //  Stop the timer
        timedEvent.remove();
    }
}
spriteHitHealth (sprite, health)
{
    //  Hide the sprite
    healthGroup.killAndHide(health);

    //  And disable the body
    health.body.enable = false;

    //  Add 10 health, it'll never go over maxHealth
    currentHealth = Phaser.Math.MaxAdd(currentHealth, 10, maxHealth);
}
update ()
{
    if (currentHealth === 0)
    {
        return;
    }

    text.setText('Health: ' + currentHealth);

    sprite.setVelocity(0);

    if (cursors.left.isDown)
    {
        sprite.setVelocityX(-180);
    }
    else if (cursors.right.isDown)
    {
        sprite.setVelocityX(180);
    }

    if (cursors.up.isDown)
    {
        sprite.setVelocityY(-180);
    }
    else if (cursors.down.isDown)
    {
        sprite.setVelocityY(180);
    }
}
	}