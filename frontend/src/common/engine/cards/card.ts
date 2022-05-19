import { Mesh, MeshBuilder, Quaternion, Scene, StandardMaterial, Vector3, Vector4 } from "@babylonjs/core";
import { CardType, CardValue } from "./types";
import { TextureId } from "../../consts/types";

export class Card {
    public card: Mesh;
    public readonly type: CardType;
    public readonly value: CardValue;
    private scene: Scene;

    public constructor(scene: Scene, value: CardValue, type: CardType) {
        this.scene = scene;
        this.type = type;
        this.value = value;
        const plane = MeshBuilder.CreatePlane(`card${value}${type}`,
            {
                height: 1.2 * 1291 / 900,
                width: 1.2,
                sideOrientation: Mesh.DOUBLESIDE,
                frontUVs: new Vector4(1 / 2, 0, (1 + 1) / 2, 1 / 1),
                backUVs: new Vector4(0 / 2, 0, (0 + 1) / 2, 1 / 1),
            },
            this.scene);

        const mat = new StandardMaterial(`mat-card${value}${type}`, this.scene);
        mat.diffuseTexture = this.scene.getTextureByName(TextureId[`${type}${value}`]);
        plane.material = mat;
        if (mat.diffuseTexture) { mat.diffuseTexture.hasAlpha = true; }

        plane.rotationQuaternion = Quaternion.RotationAxis(new Vector3(1, 0, 0), -Math.PI / 2);
        plane.position = new Vector3(-4, 0.55, 2);

        this.card = plane;
    }

    public setPosition(vector: Vector3): void {
        this.card.position = vector;
    }
}
