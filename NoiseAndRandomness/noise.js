import * as utils from "../Toolkit/utils.js";

let floatField = utils.generateFloatField(10, 10);

let svg = '';
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        svg += utils.rect({ x: i*10 + 5, y: j*10 + 5, w: utils.accessFloatField(floatField, i, j), h: utils.accessFloatField(floatField, i, j), stroke: "black", fill: "none" });
    }
}

let svg2 = utils.wrapSvg({x: 0, y: 0, w: 100, h: 100}, 200, 200, svg);
svg = utils.wrapSvg({x: 0, y: 0, w: 100, h: 100}, 500, 500, svg);

const allSvgs = [
    svg,
    svg2
]

const output = document.querySelector("svg");
utils.svgToElement(allSvgs, output);