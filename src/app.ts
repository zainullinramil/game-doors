import "phaser";
import { GameScene } from "./gameScene";
const config: Config = {
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    scene: [GameScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    backgroundColor: "#000033"
};

export class StarfallGame extends Phaser.Game {
    constructor(config: Config) {
        super(config);
    }
}
window.onload = () => {
    var game = new StarfallGame(config);
};