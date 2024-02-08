import * as utils from "../Toolkit/utils.js";
import * as perlin from "https://cdn.skypack.dev/simplex-noise@4.0.0";

let noise = perlin.createNoise2D();

let scaleVal = 150;

// Lines
let svgLines = '';
let lineLength = 5;
let lineWidth = 0;
for(let i = 0; i < 300; i ++){
    for(let j = 0; j < 300; j ++){
        let xRand = Math.random()*0.5-0.5;
        let yRand = Math.random()*0.5-0.5;
        let lengthRand = Math.random()*1;

        let vals = {x: i+xRand, y: j + yRand, l: lineLength+lengthRand, w:lineWidth+(noise(i/scaleVal, j/scaleVal)/2+0.5)*0.15};

        let currAngle = (noise(i/scaleVal,j/scaleVal)+1)/2 * (360);
        let line = utils.line({x1: vals.x, y1:vals.y+vals.l/2, x2:vals.x, y2:vals.y-vals.l/2, stroke:"black", fill:"black"}, vals.w);
        line = utils.rotateP(line, vals.x, vals.y, currAngle);
        svgLines += line;
    }
}

// Wrap SVGS
svgLines = utils.wrapSvg({x: -5, y:-5, w: 305, h: 305}, 500, 500, svgLines);

// Array of all SVGS
const allSvgs = [
    svgLines
]

// Set SVGs in scene
const output = document.querySelector("svg");
utils.svgToElement(allSvgs, output);