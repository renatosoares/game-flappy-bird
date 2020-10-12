import * as Phaser from 'phaser';

export class ScoreScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'ScoreScene',
        });
    }

    preload(): void {
        this.load.image('buttonBG', 'assets/sprites/button-bg.png');
    }

    create(): void {
        this.data.set('score', this.registry.values.score);
        const text = this.add.text(10, 10, '', {
            font: '27px Courier',
            fill: '#00ff00',
        });

        text.setText([`Score:  ${this.data.get('score')}`]);

        const bg = this.add.image(0, 0, 'buttonBG');
        const textBg = this.add.text(-30, -20, 'PLAY', {
            font: '27px Courier',
            fill: '#00ff00',
        });

        this.add.container(190, 300, [bg, textBg]);

        bg.setInteractive();

        bg.once(
            'pointerup',
            function () {
                this.scene.start('GameScene');
            },
            this
        );
    }
}
