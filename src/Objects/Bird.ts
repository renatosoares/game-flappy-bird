import * as Phaser from 'phaser';

export class Bird extends Phaser.GameObjects.Sprite {
    private jumpKey: Phaser.Input.Keyboard.Key;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.jumpKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.scene.add.existing(this);
    }

    update(): void {
        if (this.angle < 30) {
            this.angle += 2;
        }
    }
}
