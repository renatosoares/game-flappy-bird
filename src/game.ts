import * as Phaser from 'phaser';
import { WelcomeScene } from './welcomeScene';
import { GameScene } from './gameScene';
import { ScoreScene } from './scoreScene';

const config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    parent: 'game',
    scene: [
        WelcomeScene, //
        GameScene,
        ScoreScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    backgroundColor: '#29217E',
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener('load', () => {
    let game = new Game(config);
});
