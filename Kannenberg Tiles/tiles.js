import * as utils from "../Toolkit/utils.js";

let tile1 = (w, h) => {
    let tile = ``;
    tile += utils.rect({x:0, y:0, w: w, h: h, stroke: "black", fill: "none"}, 0.25);
    return tile;
}

// Wrap SVGS
let svgTile1 = utils.wrapSvg({ x: 0, y: 0, w: 101, h: 100 }, 500, 500, utils.translate(tile1(10,10), 50, 50));

// Array of all SVGS
const allSvgs = [
    svgTile1
]

// Set SVGs in scene
const output = document.querySelector("svg");
utils.svgToElement(allSvgs, output);