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
        // let leaderBoard = [];
        // this.data.set('score', this.registry.values.score);
        // const text = this.add.text(10, 10, '', {
        //     font: '27px Courier',
        //     fill: '#00ff00',
        // });

        // this.registry.values.ranking = [
        //     ...this.registry.values.ranking,
        //     { name: 'Luke', score: this.registry.values.score },
        // ];

        // this.registry.values.ranking.sort(function (
        //     a: { score: number },
        //     b: { score: number }
        // ) {
        //     return b.score - a.score;
        // });

        // if (this.registry.values.ranking.length > 14) {
        //     let overrun = this.registry.values.ranking.length - 14;

        //     for (overrun > 0; overrun--; ) {
        //         this.registry.values.ranking.pop();
        //     }
        // }

        // localStorage.setItem(
        //     'ranking',
        //     JSON.stringify(this.registry.values.ranking)
        // );

        // this.registry.values.ranking.forEach(
        //     (item: { name: string; score: integer }) => {
        //         leaderBoard.push(`${item.name} : ${item.score}`);
        //     }
        // );

        // text.setText(leaderBoard);

        // const bg = this.add.image(0, 0, 'buttonBG');
        // const textBg = this.add.text(-30, -20, 'PLAY', {
        //     font: '27px Courier',
        //     fill: '#00ff00',
        // });

        // this.add.container(190, 530, [bg, textBg]);

        // bg.setInteractive();

        // bg.once(
        //     'pointerup',
        //     function () {
        //         this.scene.start('GameScene');
        //     },
        //     this
        // );
        this.text = this.add.text(10, 150, 'Move the mouse', {
            font: '16px Courier',
            fill: '#00ff00',
        });
        this.renderRanking();
    }

    update() {
        var pointer = this.input.activePointer;

        this.text.setText(['x: ' + pointer.x, 'y: ' + pointer.y]);
    }

    private renderRanking() {
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
            .bitmapText(80, 260, 'arcade', 'RANK  SCORE   NAME')
            .setTint(0xff00ff);

        this.add
            .bitmapText(80, 310, 'arcade', '1ST   50000    ')
            .setTint(0xff0000);
        this.add
            .bitmapText(80, 360, 'arcade', '2ND   40000    ICE')
            .setTint(0xff8200);
        this.add
            .bitmapText(80, 410, 'arcade', '3RD   30000    GOS')
            .setTint(0xffff00);
        this.add
            .bitmapText(80, 460, 'arcade', '4TH   20000    HRE')
            .setTint(0x00ff00);
        this.add
            .bitmapText(80, 510, 'arcade', '5TH   10000    ETE')
            .setTint(0x00bfff);

        const playerText = this.add
            .bitmapText(560, 310, 'arcade', name)
            .setTint(0xff0000);

        this.input.keyboard.on('keyup', function (event) {
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

        input.on(
            'pointermove',
            function (pointer, x, y) {
                const cx = Phaser.Math.Snap.Floor(x, 52 * scaleSize, 0, true);
                const cy = Phaser.Math.Snap.Floor(y, 64 * scaleSize, 0, true);
                const char = chars[cy][cx];

                cursor.x = cx;
                cursor.y = cy;

                block.x = input.x - 10 + cx * (52 * scaleSize);
                block.y = input.y - 2 + cy * (64 * scaleSize);
            },
            this
        );

        input.on(
            'pointerup',
            function (pointer, x, y) {
                const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
                const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
                const char = chars[cy][cx];

                cursor.x = cx;
                cursor.y = cy;

                block.x = input.x - 10 + cx * (52 * scaleSize);
                block.y = input.y - 2 + cy * (64 * scaleSize);

                if (char === '<' && name.length > 0) {
                    //  Rub
                    name = name.substr(0, name.length - 1);

                    playerText.text = name;
                } else if (char === '>' && name.length > 0) {
                    //  Submit
                } else if (name.length < 3) {
                    //  Add
                    name = name.concat(char);

                    playerText.text = name;
                }
            },
            this
        );
    }
}
