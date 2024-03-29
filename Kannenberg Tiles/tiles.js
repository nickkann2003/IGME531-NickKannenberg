import * as utils from "../Toolkit/utils.js";
import * as perlin from "https://cdn.skypack.dev/simplex-noise@4.0.0";

let noise = perlin.createNoise2D();

// Control Center
let redColor = "#CCCCCC";
let blackColor = "#CCCCCC";

let backgroundColor = "#000000";

let r1 = 255;
let g1 = 255;
let b1 = 255;

let r2 = 255;
let g2 = 255;
let b2 = 255;

let scaleVal = 32;
let size = 400;
let strokeWidth = (0.25/100) * size;
strokeWidth = 0.75;

let noiseCutoffs = [-0.5, 0.0, 0.5];

let usingNoise = false;

let rDif = r2 - r1;
let gDif = g2 - g1;
let bDif = b2-b1;

let diamondColor = utils.rgbToHex(r1 + rDif * (0/3) , g1 + gDif * (0/3), b1 + bDif * (0/3));
let spadeColor = utils.rgbToHex(r1 + rDif * (3.0/3.0) , g1 + gDif * (3.0/3.0), b1 + bDif * (1.0/3.0));
let clubColor = utils.rgbToHex(r1 + rDif * (2.0/3.0) , g1 + gDif * (2.0/3.0), b1 + bDif * (2.0/3.0));
let heartColor = utils.rgbToHex(r1 + rDif * (1.0/3.0) , g1 + gDif * (1.0/3.0), b1 + bDif * (3.0/3.0));

// Diamonds
let diamondTopLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 10, x2: 10, y2: 2, cx: 8, cy: 8, stroke: diamondColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 0, y1: 2, x2: 2, y2: 0, cx: 0.2, cy: 0.2, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile; 
}

let diamondTopRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 8, y1: 10, x2: 0, y2: 2, cx: 2, cy: 8, stroke: diamondColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 10, y1: 2, x2: 8, y2: 0, cx: 9.82, cy: 0.18, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let diamondBottomLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 0, x2: 10, y2: 8, cx: 8, cy: 2, stroke: diamondColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 0, y1: 8, x2: 2, y2: 10, cx: 0.18, cy: 9.82, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let diamondBottomRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 0, y1: 8, x2: 8, y2: 0, cx: 2, cy: 2, stroke: diamondColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 10, y1: 8, x2: 8, y2: 10, cx: 9.82, cy: 9.82, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

// Spades
let spadeTopLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 10, x2: 6, y2: 6, cx: 3, cy: 6.5, stroke: spadeColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 6, y1: 6, x2: 10, y2: 2, cx: 9, cy: 6, stroke: spadeColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 0, y1: 2, x2: 1.2, y2: 1.2, cx: 0.6, cy: 1.3, stroke: blackColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 1.2, y1: 1.2, x2: 2, y2: 0, cx: 1.8, cy: 1.2, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let spadeTopRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 8, y1: 10, x2: 4, y2: 6, cx: 7, cy: 6.5, stroke: spadeColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 4, y1: 6, x2: 0, y2: 2, cx: 1, cy: 6, stroke: spadeColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 10, y1: 2, x2: 8.8, y2: 1.2, cx: 9.4, cy: 1.3, stroke: blackColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 8.8, y1: 1.2, x2: 8, y2: 0, cx: 8.2, cy: 1.2, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let spadeBottomLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 0, x2: 4, y2: 4, cx: 2, cy: 3, stroke: spadeColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 4, y1: 4, x2: 9, y2: 2, cx: 8, cy: 5, stroke: spadeColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 9, y1: 2, x2: 3, y2: 8, cx: 9, cy: 8, stroke: spadeColor, fill: "none"}, strokeWidth);
    tile += utils.line({x1: 3, y1: 8, x2: 10, y2: 8, stroke: spadeColor, fill: "none"}, strokeWidth);
    
    tile += utils.arc({x1: 0, y1: 8, x2: 1.2, y2: 8.8, cx: 0.6, cy: 8.7, stroke: blackColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 1.2, y1: 8.8, x2: 2, y2: 10, cx: 1.8, cy: 8.8, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let spadeBottomRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 8, y1: 0, x2: 6, y2: 4, cx: 8, cy: 3, stroke: spadeColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 6, y1: 4, x2: 1, y2: 2, cx: 2, cy: 5, stroke: spadeColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 1, y1: 2, x2: 7, y2: 8, cx: 1, cy: 8, stroke: spadeColor, fill: "none"}, strokeWidth);
    tile += utils.line({x1: 7, y1: 8, x2: 0, y2: 8, stroke: spadeColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 10, y1: 8, x2: 8.8, y2: 8.8, cx: 9.4, cy: 8.7, stroke: blackColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 8.8, y1: 8.8, x2: 8, y2: 10, cx: 8.2, cy: 8.8, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

// Clubs
let clubTopLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 10, x2: 5, y2: 7, cx: 2.5, cy: 7.5, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 5, y1: 7, x2: 9, y2: 9, cx: 8, cy: 7, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 8.5, y1: 8.25, x2: 6.5, y2: 4.75, cx: 6.5, cy: 7, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 6.5, y1: 4.75, x2: 10, y2: 2, cx: 7, cy: 2, stroke: clubColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 0, y1: 2, x2: 1.6, y2: 1.6, cx: 1, cy: 3, stroke: blackColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 1.6, y1: 1.6, x2: 2, y2: 0, cx: 3, cy: 1, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let clubTopRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 8, y1: 10, x2: 5, y2: 7, cx: 7.5, cy: 7.5, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 5, y1: 7, x2: 1, y2: 9, cx: 2, cy: 7, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 1.5, y1: 8.25, x2: 3.5, y2: 4.75, cx: 3.5, cy: 7, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 3.5, y1: 4.75, x2: 0, y2: 2, cx: 3, cy: 2, stroke: clubColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 10, y1: 2, x2: 8.4, y2: 1.6, cx: 9, cy: 3, stroke: blackColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 8.4, y1: 1.6, x2: 8, y2: 0, cx: 7, cy: 1, stroke: blackColor, fill: "none"}, strokeWidth);    
    return tile;
}

let clubBottomLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 0, x2: 4, y2: 4, cx: 2, cy: 3, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 4, y1: 4, x2: 9, y2: 2, cx: 8, cy: 5, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.line({x1: 9, y1: 2, x2: 8, y2: 8, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.line({x1: 8, y1: 8, x2: 10, y2: 8, stroke: clubColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 0, y1: 8, x2: 1.6, y2: 8.4, cx: 1, cy: 7, stroke: blackColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 1.6, y1: 8.4, x2: 2, y2: 10, cx: 3, cy: 9, stroke: blackColor, fill: "none"}, strokeWidth);    
    return tile;
}

let clubBottomRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 8, y1: 0, x2: 6, y2: 4, cx: 8, cy: 3, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 6, y1: 4, x2: 1, y2: 2, cx: 2, cy: 5, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.line({x1: 1, y1: 2, x2: 2, y2: 8, stroke: clubColor, fill: "none"}, strokeWidth);
    tile += utils.line({x1: 2, y1: 8, x2: 0, y2: 8, stroke: clubColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 10, y1: 8, x2: 8.4, y2: 8.4, cx: 9, cy: 7, stroke: blackColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 8.4, y1: 8.4, x2: 8, y2: 10, cx: 7, cy: 9, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

// Hearts
let heartTopLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 1.9, y1: 10, x2: 3, y2: 9, cx: 3, cy: 10, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 3.05, y1: 9.1, x2: 1.5, y2: 5, cx: 1.5, cy: 7, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 1.5, y1: 5, x2: 5, y2: 2.25, cx: 1.5, cy: 2, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 5, y1: 2.25, x2: 7, y2: 3, cx: 6, cy: 2.25, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 7, y1: 3, x2: 10, y2: 2, cx: 9, cy: 4.5, stroke: heartColor, fill: "none"}, strokeWidth);
    
    tile += utils.arc({x1: 0, y1: 2, x2: 2, y2: 0, cx: 2.5, cy: 2.5, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let heartTopRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 8.1, y1: 10, x2: 7, y2: 9, cx: 7, cy: 10, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 6.95, y1: 9.1, x2: 8.5, y2: 5, cx: 8.5, cy: 7, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 8.5, y1: 5, x2: 5, y2: 2.25, cx: 8.5, cy: 2, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 5, y1: 2.25, x2: 3, y2: 3, cx: 4, cy: 2.25, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 3, y1: 3, x2: 0, y2: 2, cx: 1, cy: 4.5, stroke: heartColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 10, y1: 2, x2: 8, y2: 0, cx: 7.5, cy: 2.5, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let heartBottomLeft = () => {
    let tile = ``;
    tile += utils.arc({x1: 2, y1: 0, x2: 10, y2: 8, cx: 6.5, cy: 2, stroke: heartColor, fill: "none"}, strokeWidth);
    tile += utils.arc({x1: 0, y1: 8, x2: 2, y2: 10, cx: 2.5, cy: 7.5, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let heartBottomRight = () => {
    let tile = ``;
    tile += utils.arc({x1: 8, y1: 0, x2: 0, y2: 8, cx: 3.5, cy: 2, stroke: heartColor, fill: "none"}, strokeWidth);

    tile += utils.arc({x1: 10, y1: 8, x2: 8, y2: 10, cx: 7.5, cy: 7.5, stroke: blackColor, fill: "none"}, strokeWidth);
    return tile;
}

let allTiles = () => {
    let svg = ``;
    svg += utils.rect({x: 0, y: 0, w: size*2, h: size*2, stroke: "#FFFFFF", fill: backgroundColor})
    for (let i = 0; i < size/10; i++) {
        for (let j = 0; j < size/10; j++) {
            let tI = (i%2) * 2;
            let tJ = j%2;
            let tt = tI + tJ;
            let random = Math.random();
            let random2 = Math.random();
            
            // Random
            //if(random2 < 0.25){
            //    if (random < 0.25) {
            //        svg += utils.translate(diamondTopLeft(), i*10, j*10);
            //    } else if (random < 0.5) {
            //        svg += utils.translate(diamondTopRight(), i*10, j*10);
            //    } else if (random < 0.75) {
            //        svg += utils.translate(diamondBottomLeft(), i*10, j*10);
            //    } else {
            //        svg += utils.translate(diamondBottomRight(), i*10, j*10);
            //    }
            //}else if(random2 < 0.5){
            //    if (random < 0.25) {
            //        svg += utils.translate(spadeTopLeft(), i*10, j*10);
            //    } else if (random < 0.5) {
            //        svg += utils.translate(spadeTopRight(), i*10, j*10);
            //    } else if (random < 0.75) {
            //        svg += utils.translate(spadeBottomLeft(), i*10, j*10);
            //    } else {
            //        svg += utils.translate(spadeBottomRight(), i*10, j*10);
            //    }
            //}else if(random2 < 0.75){
            //    if (random < 0.25) {
            //        svg += utils.translate(clubTopLeft(), i*10, j*10);
            //    } else if (random < 0.5) {
            //        svg += utils.translate(clubTopRight(), i*10, j*10);
            //    } else if (random < 0.75) {
            //        svg += utils.translate(clubBottomLeft(), i*10, j*10);
            //    } else {
            //        svg += utils.translate(clubBottomRight(), i*10, j*10);
            //    }
            //}else{
            //    if (random < 0.25) {
            //        svg += utils.translate(heartTopLeft(), i*10, j*10);
            //    } else if (random < 0.5) {
            //        svg += utils.translate(heartTopRight(), i*10, j*10);
            //    } else if (random < 0.75) {
            //        svg += utils.translate(heartBottomLeft(), i*10, j*10);
            //    } else {
            //        svg += utils.translate(heartBottomRight(), i*10, j*10);
            //    }
            //}
            

            // Set in quadrants
            if(usingNoise){
                random = noise(i / scaleVal, j / scaleVal);
            }
            //console.log(noise(i / scaleVal, j / scaleVal));
            if(tt == 0){
                if (random < noiseCutoffs[0]) {
                    svg += utils.translate(diamondTopLeft(), i*10, j*10);
                } else if (random < noiseCutoffs[1]) {
                    svg += utils.translate(spadeTopLeft(), i*10, j*10);
                } else if (random < noiseCutoffs[2]) {
                    svg += utils.translate(clubTopLeft(), i*10, j*10);
                } else {
                    svg += utils.translate(heartTopLeft(), i*10, j*10);
                }
            }else if(tt == 2){
                if (random < noiseCutoffs[0]) {
                    svg += utils.translate(diamondTopRight(), i*10, j*10);
                } else if (random < noiseCutoffs[1]) {
                    svg += utils.translate(spadeTopRight(), i*10, j*10);
                } else if (random < noiseCutoffs[2]) {
                    svg += utils.translate(clubTopRight(), i*10, j*10);
                } else {
                    svg += utils.translate(heartTopRight(), i*10, j*10);
                }
            }else if(tt == 1){
                if (random < noiseCutoffs[0]) {
                    svg += utils.translate(diamondBottomLeft(), i*10, j*10);
                } else if (random < noiseCutoffs[1]) {
                    svg += utils.translate(spadeBottomLeft(), i*10, j*10);
                } else if (random < noiseCutoffs[2]) {
                    svg += utils.translate(clubBottomLeft(), i*10, j*10);
                } else {
                    svg += utils.translate(heartBottomLeft(), i*10, j*10);
                }
            }else{
                if (random < noiseCutoffs[0]) {
                    svg += utils.translate(diamondBottomRight(), i*10, j*10);
                } else if (random < noiseCutoffs[1]) {
                    svg += utils.translate(spadeBottomRight(), i*10, j*10);
                } else if (random < noiseCutoffs[2]) {
                    svg += utils.translate(clubBottomRight(), i*10, j*10);
                } else {
                    svg += utils.translate(heartBottomRight(), i*10, j*10);
                }
            }
        }
    }


    return svg;
}

// Wrap SVGS
let svgAllTiles = utils.wrapSvg({ x: 0, y: 0, w: size, h: size }, 500, 500, allTiles());

// Array of all SVGS
const allSvgs = [
    svgAllTiles
]

// Set SVGs in scene
const output = document.querySelector("svg");
utils.svgToElement(allSvgs, output);