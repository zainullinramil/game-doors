import "phaser";
import { GameObjects } from "phaser";
export class GameScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFallen: number;
    ghostId: number;
    score: number

    door4: Phaser.Physics.Arcade.StaticGroup;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "GameScene"
        });
    }
    init(/*params: any*/): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
        this.score = 0;
    }
    preload(): void {
        this.load.image("star", "https://raw.githubusercontent.com/mariyadavydova/starfall-phaser3-typescript/master/assets/star.png");
        this.load.image("sand", "https://raw.githubusercontent.com/mariyadavydova/starfall-phaser3-typescript/master/assets/sand.jpg");
        this.load.image("door01", "/resources/img/door_01.png");
        this.load.image("door02", "/resources/img/door_02.png");
        this.load.image("door03", "/resources/img/door_03.png");
        this.load.image("door04", "/resources/img/door_04.png");
    }

    create(): void {
        this.ghostId = Phaser.Math.RND.between(1, 3);
        this.createDoor(this.ghostId, 200, 400);

        this.input.on('gameobjectup', this.clickHandler, this);

        console.log(this.ghostId)

        // Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
        //     new Phaser.Geom.Line(20, 580, 820, 580));
        // this.sand.refresh();
        this.info = this.add.text(10, 10, '',
            { font: '24px Arial Bold', fill: '#FBFBAC' });
    }
    update(time: number): void {
        // var diff: number = time - this.lastStarTime;
        // if (diff > this.delta) {
        //     this.lastStarTime = time;
        //     if (this.delta > 500) {
        //         this.delta -= 20;
        //     }
        //     // this.emitStar();
        // }
        this.info.text = this.score + '';
    }

    private onFall(star: Phaser.Physics.Arcade.Image): () => void {
        return function () {
            star.setTint(0xff0000);
            this.starsFallen += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
            }, [star], this);
        }
    }

    private createDoor(key: number, x: number, y: number): void {

        // this.info.text = String(ghostId);
        let xc = x, open;
        for (let i = 1; i <= 3; i++) {
            if (i === key) {
                open = this.add.image(xc, y, 'door04');
            } else {
                open = this.add.image(xc, y, 'door02');
            }
            let close = this.add.image(xc, y, 'door01');
            close.setData('key', i)
            open.setData('open', true)

            open.setInteractive();
            close.setInteractive();
            xc += 200;
        }
    }

    private clickHandler(pointer, door): void {
        const isOpen = door.getData('open');
        const key = door.getData('key');
        console.log("TCL: GameScene -> key", key)
        door.input.enabled = false;
        if (!isOpen) door.setVisible(false);
        if (key !== this.ghostId) this.score++;
    }
};