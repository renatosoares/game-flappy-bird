import * as Phaser from 'phaser';
import { GameScene } from './Scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
    width: 390,
    height: 600,
    parent: 'game',
    scene: [
        GameScene, //
    ],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300,
            },
        },
    },
    render: {
        pixelArt: true,
    },
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    let game = new Game(config);
});
