import * as Phaser from 'phaser';

import { Bird } from '../Objects/Bird';

export class GameScene extends Phaser.Scene {
    private bird: Bird;
    private background: Phaser.GameObjects.TileSprite;

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

        this.bird = new Bird({
            scene: this,
            x: 50,
            y: 100,
            key: 'bird',
        });
    }

    update(): void {
        this.bird.update();
    }
}
