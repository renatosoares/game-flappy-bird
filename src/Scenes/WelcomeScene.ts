import * as Phaser from 'phaser';

export class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'WelcomeScene',
        });
    }

    preload(): void {
        this.load.bitmapFont(
            'arcade',
            'assets/fonts/bitmap/arcade.png',
            'assets/fonts/bitmap/arcade.xml'
        );
    }

    create(): void {
        const textStartGame = this.add
            .bitmapText(60, 260, 'arcade', 'START GAME', 29)
            .setTint(0x22aa99);

        textStartGame.setInteractive({
            cursor: 'pointer',
        });

        textStartGame.on('pointerover', (pointer, justOver) => {
            textStartGame.setTint(0x00ff00);
        });

        textStartGame.on('pointerout', (pointer, justOver) => {
            textStartGame.setTint(0x22aa99);
        });

        textStartGame.once(
            'pointerup',
            function () {
                this.scene.start('GameScene');
            },
            this
        );
    }
}
