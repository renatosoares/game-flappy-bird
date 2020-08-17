import 'phaser';
import { GameScene } from './gameScene';

const config: Phaser.Types.Core.GameConfig = {
    width: 390,
    height: 600,
    parent: 'game',
    scene: [GameScene],
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
