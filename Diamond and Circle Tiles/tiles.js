import * as utils from "../Toolkit/utils.js";

let tile1 = (w, h) => {
    let tile = ``;
    tile += utils.rectCorner({ x: 0, y: 0, w: w, h: h, stroke: "black", fill: "none" }, 0.25);
    return tile;
}

let tileTL = (w, h) => {
    let tile = ``;
    //tile += utils.rectCorner({ x: 0, y: 0, w: w, h: h, stroke: "black", fill: "none" }, 0.25);
    //tile += utils.line({ x1: 2, y1: 10, x2: 2, y2: 8, stroke: "black", stroke: "black" }, 0.25);
    //tile += utils.line({ x1: 10, y1: 1.4, x2: 8, y2: 1.4, stroke: "black", stroke: "black" }, 0.25);
    tile += utils.line({ x1: 2, y1: 10, x2: 10, y2:1.4, stroke: "black", fill: "black"}, 0.25);
    return tile;
}

let tileTR = (w, h) => {
    let tile = ``;
    //tile += utils.rectCorner({ x: 0, y: 0, w: w, h: h, stroke: "black", fill: "none" }, 0.25);
    //tile += utils.line({ x1: 8, y1: 10, x2: 8, y2: 8, stroke: "black", stroke: "black" }, 0.25);
    //tile += utils.line({ x1: 0, y1: 1.4, x2: 2, y2: 1.4, stroke: "black", stroke: "black" }, 0.25);
    tile += utils.line({ x1: 8, y1: 10, x2: 0, y2:1.4, stroke: "black", fill: "black"}, 0.25);
    return tile;
}

let tileBL = (w, h) => {
    let tile = ``;
    //tile += utils.rectCorner({ x: 0, y: 0, w: w, h: h, stroke: "black", fill: "none" }, 0.25);
    //tile += utils.line({ x1: 2, y1: 0, x2: 2, y2: 2, stroke: "black", stroke: "black" }, 0.25);
    //tile += utils.line({ x1: 10, y1: 8, x2: 8, y2: 8, stroke: "black", stroke: "black" }, 0.25);
    tile += utils.line({ x1: 2, y1: 0, x2: 10, y2:8, stroke: "black", fill: "black"}, 0.25);
    return tile;
}

let tileBR = (w, h) => {
    let tile = ``;
    //tile += utils.rectCorner({ x: 0, y: 0, w: w, h: h, stroke: "black", fill: "none" }, 0.25);
    //tile += utils.line({ x1: 8, y1: 0, x2: 8, y2: 2, stroke: "black", stroke: "black" }, 0.25);
    //tile += utils.line({ x1: 0, y1: 8, x2: 2, y2: 8, stroke: "black", stroke: "black" }, 0.25);
    tile += utils.line({ x1: 8, y1: 0, x2: 0, y2:8, stroke: "black", fill: "black"}, 0.25);
    return tile;
}

// Diamonds

let diamondTopLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 10, x2: 10, y2: 2, cx: 8, cy: 8, stroke: "black", fill: "none"}, 0.25);
    tile += utils.arc({x1: 0, y1: 2, x2: 2, y2: 0, cx: 1.8, cy: 1.8, stroke: "black", fill: "none"}, 0.25);
    return tile;
}

let diamondTopRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 8, y1: 10, x2: 0, y2: 2, cx: 2, cy: 8, stroke: "black", fill: "none"}, 0.25);
    tile += utils.arc({x1: 10, y1: 2, x2: 8, y2: 0, cx: 8.2, cy: 1.8, stroke: "black", fill: "none"}, 0.25);
    return tile;
}

let diamondBottomLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 0, x2: 10, y2: 8, cx: 8, cy: 2, stroke: "black", fill: "none"}, 0.25);
    tile += utils.arc({x1: 0, y1: 8, x2: 2, y2: 10, cx: 1.8, cy: 8.2, stroke: "black", fill: "none"}, 0.25);
    return tile;
}

let diamondBottomRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 0, y1: 8, x2: 8, y2: 0, cx: 2, cy: 2, stroke: "black", fill: "none"}, 0.25);
    tile += utils.arc({x1: 10, y1: 8, x2: 8, y2: 10, cx: 8.2, cy: 8.2, stroke: "black", fill: "none"}, 0.25);
    return tile;
}

let allTiles = () => {
    let svg = ``;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let tI = (i%2) * 2;
            let tJ = j%2;
            let tt = tI + tJ;
            let random = Math.random();
            // Random
            if (random < 0.25) {
                svg += utils.translate(diamondTopLeft(), i*10, j*10);
            } else if (random < 0.5) {
                svg += utils.translate(diamondTopRight(), i*10, j*10);
            } else if (random < 0.75) {
                svg += utils.translate(diamondBottomLeft(), i*10, j*10);
            } else {
                svg += utils.translate(diamondBottomRight(), i*10, j*10);
            }

            // Set in quadrants
            //if (tt == 0) {
            //    svg += utils.translate(diamondTopLeft(), i*10, j*10);
            //} else if (tt == 2) {
            //    svg += utils.translate(diamondTopRight(), i*10, j*10);
            //} else if (tt == 1) {
            //    svg += utils.translate(diamondBottomLeft(), i*10, j*10);
            //} else {
            //    svg += utils.translate(diamondBottomRight(), i*10, j*10);
            //}
        }
    }


    return svg;
}

// Wrap SVGS
let svgTile1 = utils.wrapSvg({ x: 0, y: 0, w: 101, h: 100 }, 500, 500, utils.translate(tile1(10, 10), 50, 50));
let svgAllTiles = utils.wrapSvg({ x: 0, y: 0, w: 100, h: 100 }, 500, 500, allTiles());

// Array of all SVGS
const allSvgs = [
    svgAllTiles
]

// Set SVGs in scene
const output = document.querySelector("svg");
utils.svgToElement(allSvgs, output);