import * as utils from "../Toolkit/utils.js";
import * as perlin from "https://cdn.skypack.dev/simplex-noise@4.0.0";

let noise = perlin.createNoise2D();

let scaleVal = 2;

// Original
let svgOriginal = '';
let lineLength = 5;
let lineWidth = 0;
for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
        let xRand = (Math.random() * 0.5 - 0.5) * 0;
        let yRand = (Math.random() * 0.5 - 0.5) * 0;
        let lengthRand = (Math.random() * 1) * 0;
        //lengthRand = noise(i/scaleVal, j/scaleVal);

        let vals = { x: (i*2) + xRand, y: (j*2) + yRand, l: lineLength + lengthRand, w: 0.15 };

        let currAngle = (noise(i / scaleVal, j / scaleVal) + 1) / 2 * (360);
        let line = utils.line({ x1: vals.x, y1: vals.y + vals.l / 2, x2: vals.x, y2: vals.y - vals.l / 2, stroke: "black", fill: "black" }, vals.w);
        line = utils.rotateP(line, vals.x, vals.y, currAngle);
        svgOriginal += line;
    }
}

// Wrap SVGS
svgOriginal = utils.wrapSvg({ x: -5, y: -5, w: 105, h: 105 }, 500, 500, svgOriginal);

scaleVal = 150;

let cInt = 0;
let color = "";

// Lines
let svgLines = '';
lineLength = 5;
lineWidth = 0;
for (let i = 0; i < 300; i++) {
    for (let j = 0; j < 300; j++) {
        let xRand = Math.random() * 0.5 - 0.5;
        let yRand = Math.random() * 0.5 - 0.5;
        let lengthRand = Math.random() * 1;
        lengthRand = noise(i/scaleVal, j/scaleVal);

        switch (cInt) {
            case 0:
                color = "#6E0D25";
                break;
            case 1:
                color = "#000000";
                break;
            case 2:
                color = "#2D4654";
                break;
        }
        cInt = (cInt + 1) % 3;

        let vals = { x: i + xRand, y: j + yRand, l: lineLength + lengthRand, w: lineWidth + (noise(i / scaleVal, j / scaleVal) / 2 + 0.5) * 0.15 };

        let currAngle = (noise(i / scaleVal, j / scaleVal) + 1) / 2 * (360);
        let line = utils.line({ x1: vals.x, y1: vals.y + vals.l / 2, x2: vals.x, y2: vals.y - vals.l / 2, stroke: color, fill: color }, vals.w);
        line = utils.rotateP(line, vals.x, vals.y, currAngle);
        svgLines += line;
    }
}

// Wrap SVGS
svgLines = utils.wrapSvg({ x: -5, y: -5, w: 305, h: 305 }, 500, 500, svgLines);

// Lines
let svgDense = '';
lineLength = 5;
lineWidth = 0;
for (let i = 0; i < 400; i++) {
    for (let j = 0; j < 400; j++) {
        let xRand = Math.random() * 0.5 - 0.5;
        let yRand = Math.random() * 0.5 - 0.5;
        let lengthRand = Math.random() * 1;
        lengthRand = noise(i/scaleVal, j/scaleVal) * 8;

        let vals = { x: i + xRand, y: j + yRand, l: lineLength + lengthRand, w: lineWidth + (noise(i / scaleVal, j / scaleVal) / 2 + 0.5) * 0.25 };

        let currAngle = (noise(i / scaleVal, j / scaleVal) + 1) / 2 * (360);
        let line = utils.line({ x1: vals.x, y1: vals.y + vals.l / 2, x2: vals.x, y2: vals.y - vals.l / 2, stroke: "black", fill: "black" }, vals.w);
        line = utils.rotateP(line, vals.x, vals.y, currAngle);
        svgDense += line;
    }
}

// Wrap SVGS
svgDense = utils.wrapSvg({ x: -5, y: -5, w: 405, h: 405 }, 500, 500, svgDense);

// Array of all SVGS
const allSvgs = [
    svgOriginal,
    svgLines,
    svgDense
]

// Set SVGs in scene
const output = document.querySelector("svg");
utils.svgToElement(allSvgs, output);