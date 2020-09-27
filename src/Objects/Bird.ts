import * as Phaser from 'phaser';

export default class Bird extends Phaser.GameObjects.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    private jumpKey: Phaser.Input.Keyboard.Key;
    private isDead: boolean;
    private isFlapping: boolean;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.jumpKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.isDead = false;
        this.isFlapping = false;

        this.setScale(3);
        this.setOrigin(0, 0);

        this.scene.physics.world.enable(this);
        this.body.setGravityY(1000);
        this.body.setSize(17, 12);

        this.jumpKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.scene.add.existing(this);
    }

    public setDead(dead: boolean): void {
        this.isDead = dead;
    }

    public getDead(): boolean {
        return this.isDead;
    }

    update(): void {
        if (this.angle < 30) {
            this.angle += 2;
        }

        if (this.jumpKey.isDown && !this.isFlapping) {
            this.isFlapping = true;
            this.body.setVelocityY(-350);
            this.scene.tweens.add({
                targets: this,
                props: { angle: -20 },
                duration: 150,
                ease: 'Power0',
            });
        } else if (this.jumpKey.isUp && this.isFlapping) {
            this.isFlapping = false;
        }
    }
}
