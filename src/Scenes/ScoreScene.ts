import * as Phaser from 'phaser';

export class ScoreScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'ScoreScene',
        });
    }

    init(): void {
        this.registry.set('ranking', []);
    }

    preload(): void {
        this.load.image('buttonBG', 'assets/sprites/button-bg.png');

        // this.registry.values.ranking = [{ name: 'Peter', score: 100 }];
        this.registry.values.ranking = JSON.parse(
            localStorage.getItem('ranking')
        );

        if (this.registry.values.ranking === null) {
            this.registry.values.ranking = [];
        } else if (this.registry.values.ranking > 1) {
            // FIXME - parei aqui

            this.registry.values.ranking.sort(function (
                a: { score: number },
                b: { score: number }
            ) {
                return b.score - a.score;
            });
        }
    }

    create(): void {
        let leaderBoard = [];
        this.data.set('score', this.registry.values.score);
        const text = this.add.text(10, 10, '', {
            font: '27px Courier',
            fill: '#00ff00',
        });

        this.registry.values.ranking = [
            ...this.registry.values.ranking,
            { name: 'Luke', score: this.registry.values.score },
        ];

        localStorage.setItem(
            'ranking',
            JSON.stringify(this.registry.values.ranking)
        );

        // text.setText([
        //     `Score:  ${this.data.get('score')}`,
        //     `Score:  ${this.data.get('score')}`,
        // ]);

        this.registry.values.ranking.forEach(
            (item: { name: string; score: integer }) => {
                leaderBoard.push(`${item.name} : ${item.score}`);
            }
        );

        text.setText(leaderBoard);

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
