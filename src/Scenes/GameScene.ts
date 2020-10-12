import * as Phaser from 'phaser';

import Bird from '../Objects/Bird';
import Pipe from '../Objects/Pipe';

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private bird: Bird;
    private pipes: Phaser.GameObjects.Group;
    private scoreText: Phaser.GameObjects.BitmapText;

    constructor() {
        super({
            key: 'GameScene',
        });
    }

    init(): void {
        this.registry.set('score', -1);
    }

    preload(): void {
        this.load.pack('flappyBirdPack', 'assets/pack.json', 'flappyBirdPack');
    }

    create(): void {
        this.scoreText = this.add
            .bitmapText(
                this.sys.canvas.width / 2 - 14,
                30,
                'font',
                this.registry.values.score
            )
            .setDepth(2);

        this.background = this.add
            .tileSprite(0, 0, 390, 600, 'background')
            .setOrigin(0, 0);

        this.pipes = this.add.group({ classType: Pipe });

        this.bird = new Bird({
            scene: this,
            x: 50,
            y: 100,
            key: 'bird',
        });

        this.increasesScore();
        this.newPipes();

        this.time.addEvent({
            delay: 1500,
            callback: () => {
                this.increasesScore();
                this.newPipes();
            },
            callbackScope: this,
            loop: true,
        });
    }

    update(): void {
        if (!this.bird.getDead()) {
            this.background.tilePositionX += 4;
            this.bird.update();
            this.physics.overlap(
                this.bird,
                this.pipes,
                () => {
                    this.bird.setDead(true);
                },
                null,
                this
            );
        } else {
            Phaser.Actions.Call(
                this.pipes.getChildren(),
                (pipe: Pipe) => {
                    pipe.body.setVelocityX(0);
                },
                this
            );

            if (this.bird.y > this.sys.canvas.height) {
                this.scene.start('ScoreScene');
            }
        }
    }

    private newPipes(): void {
        const hole = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < 10; i++) {
            if (i !== hole && i !== hole + 1 && i !== hole + 2) {
                if (i === hole - 1) {
                    this.addPipe(400, i * 60, 0);
                } else if (i === hole + 3) {
                    this.addPipe(400, i * 60, 1);
                } else {
                    this.addPipe(400, i * 60, 2);
                }
            }
        }
    }

    private increasesScore(): void {
        this.registry.values.score++;
        this.scoreText.setText(this.registry.values.score);
    }

    private addPipe(x: number, y: number, frame: number): void {
        this.pipes.add(
            new Pipe({
                scene: this,
                x: x,
                y: y,
                frame: frame,
                key: 'pipe',
            })
        );
    }
}
