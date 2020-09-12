import * as Phaser from 'phaser';

import Bird from '../Objects/Bird';
import Pipe from '../Objects/Pipe';

export class GameScene extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private bird: Bird;
    private pipes: Phaser.GameObjects.Group;

    constructor() {
        super({
            key: 'GameScene',
        });
    }

    init(): void {
        // TODO
    }

    preload(): void {
        this.load.pack('flappyBirdPack', 'assets/pack.json', 'flappyBirdPack');
    }

    create(): void {
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

        this.newPipes();

        this.time.addEvent({
            delay: 1300,
            callback: this.newPipes,
            callbackScope: this,
            loop: true,
        });
    }

    update(): void {
        this.background.tilePositionX += 4;
        this.bird.update();
        this.physics.overlap(
            this.bird,
            this.pipes,
            function () {
                this.bird.setDead(true);
            },
            null,
            this
        );
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
