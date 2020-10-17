import * as Phaser from 'phaser';

export class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'WelcomeScene',
        });
    }

    create(): void {
        const text = this.add.text(10, 10, 'start game', {
            font: '27px Courier',
            fill: '#22aa99',
        });

        text.setInteractive({ cursor: 'pointer' });

        text.on('pointerover', (pointer, justOver) => {
            text.setFill('#00ff00');
        });

        text.on('pointerout', (pointer, justOver) => {
            text.setFill('#22aa99');
        });

        text.once('pointerup', () => {
            this.scene.start('GameScene');
        });
    }
}
