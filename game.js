var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var bullets;
var aliens;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('heart', 'assets/heart.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('alien', 'assets/alien.png');
}

function create() {
    player = this.physics.add.image(400, 550, 'heart');
    player.setCollideWorldBounds(true);
    
    bullets = this.physics.add.group({
        classType: Phaser.GameObjects.Image,
        runChildUpdate: true
    });

    aliens = this.physics.add.group({
        key: 'alien',
        repeat: 5,
        setXY: { x: 100, y: 100, stepX: 100 }
    });

    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
    if (cursors.left.isDown) {
        player.x -= 5;
    } else if (cursors.right.isDown) {
        player.x += 5;
    }

    if (cursors.up.isDown) {
        fireBullet();
    }

    Phaser.Actions.IncY(aliens.getChildren(), 1);
    this.physics.world.collide(bullets, aliens, hitAlien, null, this);
}

function fireBullet() {
    var bullet = bullets.get(player.x, player.y, 'bullet');
    if (bullet) {
        bullet.setActive(true).setVisible(true);
        bullet.body.velocity.y = -500;
    }
}

function hitAlien(bullet, alien) {
    bullet.setActive(false).setVisible(false);
    alien.setActive(false).setVisible(false);
    score += 1;
    scoreText.setText('Score: ' + score);
}
