import { DynamicTexture, Mesh, MeshBuilder, StandardMaterial, Vector3, Vector4, VertexData } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";

import earcut from "earcut";
// import board from "../assets/board.png";

function sampleSuperEllipsoid(phi: number,
    beta: number, n1: number, n2: number, scaleX: number,
    scaleY: number, scaleZ: number): Vector3 {
    const cosPhi = Math.cos(phi);
    const cosBeta = Math.cos(beta);
    const sinPhi = Math.sin(phi);
    const sinBeta = Math.sin(beta);
    const vertex = new Vector3();
    vertex.x = scaleX * Math.sign(cosPhi) * Math.abs(cosPhi) ** n1 * Math.sign(cosBeta) * Math.abs(cosBeta) ** n2;
    vertex.z = scaleY * Math.sign(cosPhi) * Math.abs(cosPhi) ** n1 * Math.sign(sinBeta) * Math.abs(sinBeta) ** n2;
    vertex.y = scaleZ * Math.sign(sinPhi) * Math.abs(sinPhi) ** n1;
    return vertex;
}

function calculateNormal(phi: number,
    beta: number, n1: number, n2: number, scaleX: number,
    scaleY: number, scaleZ: number): Vector3 {
    const normal = new Vector3();
    const cosPhi = Math.cos(phi);
    const cosBeta = Math.cos(beta);
    const sinPhi = Math.sin(phi);
    const sinBeta = Math.sin(beta);
    normal.x = Math.sign(cosPhi) * Math.abs(cosPhi) ** (2 - n1) * Math.sign(cosBeta) * Math.abs(cosBeta) ** (2 - n2) / scaleX;
    normal.z = Math.sign(cosPhi) * Math.abs(cosPhi) ** (2 - n1) * Math.sign(sinBeta) * Math.abs(sinBeta) ** (2 - n2) / scaleY;
    normal.y = Math.sign(sinPhi) * Math.abs(sinPhi) ** (2 - n1) / scaleZ;
    normal.normalize();
    return normal;
}

export function createSuperEllipsoid(samples: number,
    n1: number, n2: number, scalex: number, scaley: number, scalez: number, scene: Scene): Mesh {
    const superello = new Mesh("superello", scene);
    let phi = 0.0; let
        beta = 0.0;
    const dB = Math.PI * 2.0 / samples;
    const dP = Math.PI * 2.0 / samples;
    phi = -Math.PI / 2;
    const vertices = [];
    const normals = [];
    for (let j = 0; j <= samples / 2; j++) {
        beta = -Math.PI;
        for (let i = 0; i <= samples; i++) {
            // Triangle #1
            vertices.push(sampleSuperEllipsoid(phi, beta, n1, n2, scalex, scaley, scalez));
            normals.push(calculateNormal(phi, beta, n1, n2, scalex, scaley, scalez));
            vertices.push(sampleSuperEllipsoid(phi + dP, beta, n1, n2, scalex, scaley, scalez));
            normals.push(calculateNormal(phi + dP, beta, n1, n2, scalex, scaley, scalez));
            vertices.push(sampleSuperEllipsoid(phi + dP, beta + dB, n1, n2, scalex, scaley, scalez));
            normals.push(calculateNormal(phi + dP, beta + dB, n1, n2, scalex, scaley, scalez));
            // Triangle #2
            vertices.push(sampleSuperEllipsoid(phi, beta, n1, n2, scalex, scaley, scalez));
            normals.push(calculateNormal(phi, beta, n1, n2, scalex, scaley, scalez));
            vertices.push(sampleSuperEllipsoid(phi + dP, beta + dB, n1, n2, scalex, scaley, scalez));
            normals.push(calculateNormal(phi + dP, beta + dB, n1, n2, scalex, scaley, scalez));
            vertices.push(sampleSuperEllipsoid(phi, beta + dB, n1, n2, scalex, scaley, scalez));
            normals.push(calculateNormal(phi, beta + dB, n1, n2, scalex, scaley, scalez));
            beta += dB;
        }
        phi += dP;
    }
    const shapeReturned = new VertexData();
    shapeReturned.positions = [];
    shapeReturned.normals = [];
    shapeReturned.indices = [];
    shapeReturned.uvs = [];
    let indice = 0;

    for (let i = 0; i < vertices.length; i++) {
        shapeReturned.indices.push(indice++);
        shapeReturned.positions.push(vertices[i].x);
        shapeReturned.positions.push(vertices[i].y);
        shapeReturned.positions.push(vertices[i].z);
        shapeReturned.normals.push(normals[i].x);
        shapeReturned.normals.push(normals[i].y);
        shapeReturned.normals.push(normals[i].z);
    }
    shapeReturned.applyToMesh(superello);
    return superello;
}

const scaleA = 1.5;
// const scaleT = 2.5;
const tapisScale = 6.5;
const tapisHeight = tapisScale;
const tapisWidth = tapisHeight * 906 / 855;

const ardoiseTHRatio = 23.5 / 77;
const ardoiseHeight = ardoiseTHRatio * tapisWidth * scaleA;
const ardoiseWidth = ardoiseHeight * 462 / 678;

export function createArdoise(scene: Scene): Mesh {
    // const ratioAr = 678 / 462;
    // const scaleAr = 2;

    const width = ardoiseWidth;
    const height = ardoiseHeight;
    const depth = 0.2;

    const radius = width / 10; // corner radius;

    const deltaAngle = Math.PI / 160;

    // Polygon shape in XoZ plane held in array
    const shape = [];

    // bottom edge
    shape.push(new Vector3(-width / 2 + radius, 0, -height / 2));
    shape.push(new Vector3(width / 2 - radius, 0, -height / 2));
    // bottom right corner
    for (let angle = -Math.PI / 2 + deltaAngle; angle < 0; angle += deltaAngle) {
        shape.push(new Vector3(width / 2 - radius + radius * Math.cos(angle), 0, -height / 2 + radius + radius * Math.sin(angle)));
    }
    // right edge;
    shape.push(new Vector3(width / 2, 0, -height / 2 + radius));
    shape.push(new Vector3(width / 2, 0, height / 2 - radius));
    // top right corner
    for (let angle = deltaAngle; angle < Math.PI; angle += deltaAngle) {
        shape.push(new Vector3(width / 2 - radius + radius * Math.cos(angle), 0, height / 2 - radius + radius * Math.sin(angle)));
    }
    // top edge
    shape.push(new Vector3(width / 2 - radius, 0, height / 2));
    shape.push(new Vector3(-width / 2 + radius, 0, height / 2));
    // top left corner
    for (let angle = Math.PI / 2 + deltaAngle; angle < Math.PI; angle += deltaAngle) {
        shape.push(new Vector3(-width / 2 + radius + radius * Math.cos(angle), 0, height / 2 - radius + radius * Math.sin(angle)));
    }
    // left edge;
    shape.push(new Vector3(-width / 2, 0, height / 2 - radius));
    shape.push(new Vector3(-width / 2, 0, -height / 2 + radius));
    // bottom left corner
    for (let angle = Math.PI + deltaAngle; angle < 3 * Math.PI / 2; angle += deltaAngle) {
        shape.push(new Vector3(-width / 2 + radius + radius * Math.cos(angle), 0, -height / 2 + radius + radius * Math.sin(angle)));
    }

    const textureArdoise = new DynamicTexture("dynamic texture", { width: 462, height: 678 }, scene);
    // const textureContext = textureArdoise.getContext();

    textureArdoise.update();

    // Add text to dynamic texture
    const font = "bold 44px monospace";
    textureArdoise.drawText("Board", 150, 135, font, "white", null, true, true);

    // const textureContext = textureArdoise.getContext();
    // const img = new Image();
    // img.src = board;
    // img.onload = function () {
    //     // Add image to dynamic texture
    //     textureContext.drawImage(this, 0, 0);
    //     textureArdoise.update();

    //     // Add text to dynamic texture
    //     const font = "bold 44px monospace";
    //     textureArdoise.drawText("cray", 75, 135, font, "white", null, true, true);
    // };

    const matArdoise = new StandardMaterial("ad", scene);
    matArdoise.diffuseTexture = textureArdoise;

    /* let ardoiseNormalsHeightTexture = new BABYLON.Texture("scoreN_normal.png", scene);

     matArdoise.bumpTexture = ardoiseNormalsHeightTexture;
    // matArdoise.useParallax = true;
   //  matArdoise.useParallaxOcclusion = true;
    // matArdoise.parallaxScaleBias = 0.1;
     matArdoise.specularPower = 1000.0;
     matArdoise.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
     */

    const faceUV = [];
    faceUV[0] = new Vector4(0, 0, 1, 1);
    faceUV[1] = new Vector4(460 / 469, 0, 1, 1);
    faceUV[2] = new Vector4(445 / 469, 0, 1, 1);

    const ardoise = MeshBuilder.CreatePolygon("polygon",
        { shape: shape, depth: depth, faceUV: faceUV, sideOrientation: Mesh.DOUBLESIDE },
        scene,
        earcut);

    ardoise.material = matArdoise;

    return ardoise;
}
