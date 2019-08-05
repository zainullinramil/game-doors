import "phaser";
export class GameScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFallen: number;
    door1: Phaser.Physics.Arcade.StaticGroup;
    door2: Phaser.Physics.Arcade.StaticGroup;
    door3: Phaser.Physics.Arcade.StaticGroup;
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
        // this.sand = this.physics.add.staticGroup({
        //     key: 'sand',
        //     frameQuantity: 20
        // });
        this.door1 = this.physics.add.staticGroup({
            key: 'door01',
            frameQuantity: 20,
            setXY: {
                x: 200,
                y: 400,
            }
        });
        this.door2 = this.physics.add.staticGroup({
            key: 'door02',
            frameQuantity: 20,
            setXY: {
                x: 400,
                y: 400,
            }
        });
        this.door3 = this.physics.add.staticGroup({
            key: 'door04',
            frameQuantity: 20,
            setXY: {
                x: 600,
                y: 400,
            }
        });
        // Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
        //     new Phaser.Geom.Line(20, 580, 820, 580));
        // this.sand.refresh();
        this.info = this.add.text(10, 10, '',
            { font: '24px Arial Bold', fill: '#FBFBAC' });
    }
    update(time: number): void {
        var diff: number = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            // this.emitStar();
        }
        this.info.text =
            this.starsCaught + " caught - " +
            this.starsFallen + " fallen (max 3)";
    }
    private onClick(star: Phaser.Physics.Arcade.Image): () => void {
        return function () {
            star.setTint(0x00ff00);
            star.setVelocity(0, 0);
            this.starsCaught += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
            }, [star], this);
        }
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
    private emitStar(): void {
        var star: Phaser.Physics.Arcade.Image;
        var x = Phaser.Math.Between(25, 775);
        var y = 26;
        star = this.physics.add.image(x, y, "star");
        star.setDisplaySize(50, 50);
        star.setVelocity(0, 100);
        star.setInteractive();
        star.on('pointerdown', this.onClick(star), this);
        this.physics.add.collider(star, this.sand,
            this.onFall(star), null, this);
    }
};