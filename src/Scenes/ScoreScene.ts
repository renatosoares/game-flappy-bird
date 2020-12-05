import * as Phaser from 'phaser';

export class ScoreScene extends Phaser.Scene {
    private text: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: 'ScoreScene',
        });
    }

    init(): void {
        this.registry.set('ranking', []);
    }

    preload(): void {
        this.load.image('block', 'assets/input/block.png');
        this.load.image('rub', 'assets/input/rub.png');
        this.load.image('end', 'assets/input/end.png');
        this.load.bitmapFont(
            'arcade',
            'assets/fonts/bitmap/arcade.png',
            'assets/fonts/bitmap/arcade.xml'
        );

        this.load.image('buttonBG', 'assets/sprites/button-bg.png');

        this.registry.values.ranking = JSON.parse(
            localStorage.getItem('ranking')
        );

        if (this.registry.values.ranking === null) {
            this.registry.values.ranking = [];
        } else if (this.registry.values.ranking.length > 1) {
            this.registry.values.ranking.sort(function (
                a: { score: number },
                b: { score: number }
            ) {
                return b.score - a.score;
            });
        }
    }

    create(): void {
        const textTryAgain = this.add
            .bitmapText(70, 560, 'arcade', 'TRY AGAIN', 29)
            .setTint(0xff00ff);

        textTryAgain.setInteractive({
            cursor: 'pointer',
        });

        textTryAgain.on('pointerover', (pointer, justOver) => {
            textTryAgain.setTint(0xffff00);
        });

        textTryAgain.on('pointerout', (pointer, justOver) => {
            textTryAgain.setTint(0xff00ff);
        });

        textTryAgain.once(
            'pointerup',
            function () {
                this.scene.start('GameScene');
            },
            this
        );

        this.renderRanking();
    }

    update() {}

    private leaderBoard(
        name: string,
        self: ScoreScene
    ): Array<{ name: string; score: integer }> {
        self.data.set('score', self.registry.values.score);

        self.registry.values.ranking = [
            ...self.registry.values.ranking,
            { name: name, score: self.registry.values.score },
        ];

        self.registry.values.ranking.sort(function (
            a: { score: number },
            b: { score: number }
        ) {
            return b.score - a.score;
        });

        if (self.registry.values.ranking.length > 7) {
            let overrun = self.registry.values.ranking.length - 7;

            for (overrun > 0; overrun--; ) {
                self.registry.values.ranking.pop();
            }
        }

        localStorage.setItem(
            'ranking',
            JSON.stringify(self.registry.values.ranking)
        );

        return self.registry.values.ranking;
    }

    private renderRanking(): void {
        const self = this;
        const scaleSize = 0.7;
        const chars = [
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
            ['U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>'],
        ];
        const cursor = { x: 0, y: 0 };
        let name = '';

        const input = this.add
            .bitmapText(
                10,
                10,
                'arcade',
                'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-'
            )
            .setLetterSpacing(20)
            .setScale(scaleSize);

        input.setInteractive();

        const rub = this.add
            .image(input.x + 430 * scaleSize, input.y + 148 * scaleSize, 'rub')
            .setScale(scaleSize);
        const end = this.add
            .image(input.x + 482 * scaleSize, input.y + 148 * scaleSize, 'end')
            .setScale(scaleSize);

        const block = this.add
            .image(input.x - 10 * scaleSize, input.y - 2 * scaleSize, 'block')
            .setOrigin(0)
            .setScale(scaleSize);

        const legend = this.add
            .bitmapText(10, 160, 'arcade', 'RANK  SCORE   NAME', 29)
            .setTint(0xff00ff)
            .setScale(scaleSize);

        const playerText = this.add
            .bitmapText(150, 130, 'arcade', name, 29)
            .setTint(0xffff00)
            .setScale(scaleSize);

        this.input.keyboard.on('keyup', function (event: { keyCode: number }) {
            if (event.keyCode === 37) {
                //  left
                if (cursor.x > 0) {
                    cursor.x--;
                    block.x -= 52 * scaleSize;
                }
            } else if (event.keyCode === 39) {
                //  right
                if (cursor.x < 9) {
                    cursor.x++;
                    block.x += 52 * scaleSize;
                }
            } else if (event.keyCode === 38) {
                //  up
                if (cursor.y > 0) {
                    cursor.y--;
                    block.y -= 64 * scaleSize;
                }
            } else if (event.keyCode === 40) {
                //  down
                if (cursor.y < 2) {
                    cursor.y++;
                    block.y += 64 * scaleSize;
                }
            } else if (event.keyCode === 13 || event.keyCode === 32) {
                //  Enter or Space
                if (cursor.x === 9 && cursor.y === 2 && name.length > 0) {
                    //  Submit
                    const ranking = self.leaderBoard(name, self);

                    ranking.forEach((item, index) => {
                        const color = [
                            0xff0000,
                            0xff8200,
                            0xffff00,
                            0x00ff00,
                            0x00bfff,
                            0x0027ff,
                            0xff00ff,
                        ];

                        const placement = [
                            'ST',
                            'ND',
                            'RD',
                            'TH',
                            'TH',
                            'TH',
                            'TH',
                        ];

                        self.add
                            .bitmapText(
                                10,
                                210 + 50 * index,
                                'arcade',
                                `${index + 1}${placement[index]}   ${(
                                    '0000' + item.score
                                ).slice(-5)}    ${item.name}`,
                                29
                            )
                            .setTint(color[index])
                            .setScale(scaleSize);
                    });
                } else if (
                    cursor.x === 8 &&
                    cursor.y === 2 &&
                    name.length > 0
                ) {
                    //  Rub
                    name = name.substr(0, name.length - 1);

                    playerText.text = name;
                } else if (name.length < 3) {
                    //  Add
                    name = name.concat(chars[cursor.y][cursor.x]);

                    playerText.text = name;
                }
            }
        });
    }
}
