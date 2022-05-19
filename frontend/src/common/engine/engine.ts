import {
    HemisphericLight,
    ArcRotateCamera,
    Engine,
    Scene,
    Vector3,
    DirectionalLight,
    AssetsManager,
} from "@babylonjs/core";

import { TextureId } from "../consts/types";

export abstract class EngineBase {
    protected readonly engine: Engine;
    protected readonly canvas: HTMLCanvasElement;
    protected readonly scene: Scene;

    public constructor() {
        this.canvas = this.createCanvas();
        this.engine = this.createEngine(this.canvas);
        this.scene = this.createScene(this.engine);
        this.createCamera(this.scene);
        this.createLight(this.scene);
        this.addContent();
        window.addEventListener("resize", this.onResize);
        this.engine.runRenderLoop(this.onRender);
    }

    protected abstract addContent(): void;

    public start(): void {
        this.onResize();
    }

    protected createCanvas(): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        return canvas;
    }

    protected createEngine(canvas: HTMLCanvasElement): Engine {
        return new Engine(canvas, true, {}, true);
    }

    protected createScene(engine: Engine): Scene {
        return new Scene(engine, {});
    }

    protected createCamera(scene: Scene): void {
        const camera = new ArcRotateCamera("camera", -Math.PI / 2, 0.49, 12, Vector3.Zero(), scene);
        camera.attachControl();
    }

    protected createLight(scene: Scene): void {
        const lights = new HemisphericLight("light", Vector3.Down(), scene);
        lights.intensity = 0.7;
        const lights2 = new DirectionalLight("light2", new Vector3(1, -12, 1), scene);
        lights2.intensity = 0.8;
    }

    protected boot(): Promise<void> {
        const assetsManager = new AssetsManager(this.scene);

        assetsManager.addTextureTask("2Heart", TextureId.Heart2);
        assetsManager.addTextureTask("3Heart", TextureId.Heart3);
        assetsManager.addTextureTask("4Heart", TextureId.Heart4);
        assetsManager.addTextureTask("5Heart", TextureId.Heart5);
        assetsManager.addTextureTask("6Heart", TextureId.Heart6);
        assetsManager.addTextureTask("7Heart", TextureId.Heart7);
        assetsManager.addTextureTask("8Heart", TextureId.Heart8);
        assetsManager.addTextureTask("9Heart", TextureId.Heart9);
        assetsManager.addTextureTask("10Heart", TextureId.Heart10);
        assetsManager.addTextureTask("JackHeart", TextureId.HeartJack);
        assetsManager.addTextureTask("QueenHeart", TextureId.HeartQueen);
        assetsManager.addTextureTask("KingHeart", TextureId.HeartKing);
        assetsManager.addTextureTask("AceHeart", TextureId.HeartAce);

        assetsManager.addTextureTask("2Spade", TextureId.Spade2);
        assetsManager.addTextureTask("3Spade", TextureId.Spade3);
        assetsManager.addTextureTask("4Spade", TextureId.Spade4);
        assetsManager.addTextureTask("5Spade", TextureId.Spade5);
        assetsManager.addTextureTask("6Spade", TextureId.Spade6);
        assetsManager.addTextureTask("7Spade", TextureId.Spade7);
        assetsManager.addTextureTask("8Spade", TextureId.Spade8);
        assetsManager.addTextureTask("9Spade", TextureId.Spade9);
        assetsManager.addTextureTask("10Spade", TextureId.Spade10);
        assetsManager.addTextureTask("JackSpade", TextureId.SpadeJack);
        assetsManager.addTextureTask("QueenSpade", TextureId.SpadeQueen);
        assetsManager.addTextureTask("KingSpade", TextureId.SpadeKing);
        assetsManager.addTextureTask("AceSpade", TextureId.SpadeAce);

        assetsManager.addTextureTask("2Club", TextureId.Club2);
        assetsManager.addTextureTask("3Club", TextureId.Club3);
        assetsManager.addTextureTask("4Club", TextureId.Club4);
        assetsManager.addTextureTask("5Club", TextureId.Club5);
        assetsManager.addTextureTask("6Club", TextureId.Club6);
        assetsManager.addTextureTask("7Club", TextureId.Club7);
        assetsManager.addTextureTask("8Club", TextureId.Club8);
        assetsManager.addTextureTask("9Club", TextureId.Club9);
        assetsManager.addTextureTask("10Club", TextureId.Club10);
        assetsManager.addTextureTask("JackClub", TextureId.ClubJack);
        assetsManager.addTextureTask("QueenClub", TextureId.ClubQueen);
        assetsManager.addTextureTask("KingClub", TextureId.ClubKing);
        assetsManager.addTextureTask("AceClub", TextureId.ClubAce);

        assetsManager.addTextureTask("2Diamond", TextureId.Diamond2);
        assetsManager.addTextureTask("3Diamond", TextureId.Diamond3);
        assetsManager.addTextureTask("4Diamond", TextureId.Diamond4);
        assetsManager.addTextureTask("5Diamond", TextureId.Diamond5);
        assetsManager.addTextureTask("6Diamond", TextureId.Diamond6);
        assetsManager.addTextureTask("7Diamond", TextureId.Diamond7);
        assetsManager.addTextureTask("8Diamond", TextureId.Diamond8);
        assetsManager.addTextureTask("9Diamond", TextureId.Diamond9);
        assetsManager.addTextureTask("10Diamond", TextureId.Diamond10);
        assetsManager.addTextureTask("JackDiamond", TextureId.DiamondJack);
        assetsManager.addTextureTask("QueenDiamond", TextureId.DiamondQueen);
        assetsManager.addTextureTask("KingDiamond", TextureId.DiamondKing);
        assetsManager.addTextureTask("AceDiamond", TextureId.DiamondAce);

        return assetsManager.loadAsync();
    }

    private onRender = () => {
        this.scene.render();
    };

    private onResize = () => {
        this.engine.resize();
    };
}
