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
            debug: true,
            gravity: {
                y: 300,
            },
        },
    },
    render: {
        pixelArt: true,
    },
};

export class Game extends Phaser.Game {}

window.addEventListener('load', () => {
    const game = new Game(config);
});
