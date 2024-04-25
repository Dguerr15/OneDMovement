class OneDMovemnet extends Phaser.Scene {
    constructor(){
        super("OneDMovment");
        this.my = {sprite: {}};
        this.playerSpeed = 5;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.atlasXML("gameParts", "spritesheet_retina.png", "spritesheet_retina.xml");
    }
    create(){
        let my = this.my;
        my.sprite.player = this.add.sprite(400, 520, "gameParts", "character_roundGreen.png");
        this.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.emittedSprites = [];
        
    }
    update(){
        let my = this.my;
        if (this.AKey.isDown) {
            my.sprite.player.x -= this.playerSpeed;
        } else if (this.DKey.isDown) {
            this.my.sprite.player.x += this.playerSpeed;
        }
        my.sprite.player.x = Phaser.Math.Clamp(my.sprite.player.x, 0, this.game.config.width);
        if (Phaser.Input.Keyboard.JustDown(this.SPACEKey)) {
            let emittedSprite = this.add.sprite(this.my.sprite.player.x, this.my.sprite.player.y - 50, "gameParts", "effect_blast.png");
            this.emittedSprites.push(emittedSprite);
        }
        for (let i = 0; i < this.emittedSprites.length; i++) {
            let emittedSprite = this.emittedSprites[i];
            emittedSprite.y -= this.playerSpeed;
            if (emittedSprite.y < -100) { 
                emittedSprite.destroy();
                this.emittedSprites.splice(i, 1);
                i--;
            }
        }
    }
}