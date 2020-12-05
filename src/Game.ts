import * as Phaser from 'phaser';
import { GameScene } from './Scenes/GameScene';
import { ScoreScene } from './Scenes/ScoreScene';
import { WelcomeScene } from './Scenes/WelcomeScene';

const config: Phaser.Types.Core.GameConfig = {
    width: 390,
    height: 600,
    parent: 'game',
    scene: [
        WelcomeScene, //
        GameScene,
        ScoreScene,
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

export class Game extends Phaser.Game {}

window.addEventListener('load', () => {
    const game = new Game(config);
});
