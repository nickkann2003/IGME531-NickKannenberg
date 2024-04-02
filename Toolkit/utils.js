//------------------ Tools ------------------------

//#region ---------------------- Shape Creation Tools -------------------
//#region  Move Function - Moves to a given point
const moveTo = (x, y) => {
    return `M ${x} ${y}`;
}
//#endregion
//#region Line function - Crates a line from one global point to another
const line = ({ x1, y1, x2, y2, stroke, fill }, strokeWidth = 1) => {
    return `<path d="${moveTo(x1, y1)} L ${x2} ${y2}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}
//#endregion
//#region Rect function - Creates a rect at given (centered) point, with width and height
const rect = ({ x, y, w, h, stroke, fill }, strokeWidth = 1) => {
    return `<path d="${moveTo(x - (w / 2), y - (h / 2))} h ${w} v ${h} h ${-w} Z" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`;
}
//#endregion
//#region RectCorner function - Creates a rect at given (corner) point, with width and height
const rectCorner = ({ x, y, w, h, stroke, fill }, strokeWidth = 1) => {
    return `<path d="${moveTo(x, y)} h ${w} v ${h} h ${-w} Z" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`;
}
//#endregion
//#region Circle function - Creates a circle at given (center) point with radius
const circle = ({ x, y, radius, stroke, fill }) => {
    return `<path d="${moveTo(x, y)} a ${radius} ${radius} 0 1 0 ${-radius * 2} 0 ${moveTo(x, y)} a ${radius} ${radius} 0 1 1 ${-radius * 2} 0" stroke="${stroke}" fill="${fill}"/>`
}
//#region Arc function - Creates an arc from point 1 to point 2
const arc = ({ x1, y1, x2, y2, cx, cy, stroke, fill }, strokeWeight = 1) => {
    return `<path d="${moveTo(x1, y1)} Q ${cx} ${cy}, ${x2} ${y2}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWeight}"/>`
}
//#endregion
//#region Ellipse function - Creates an ellipse at given (centered) point with xRadius and yRadius
const ellipse = ({ x, y, rx, ry, stroke, fill }, strokeWidth = 1) => {
    return `<path d="${moveTo(x, y)} a ${rx} ${ry} 0 1 0 ${-rx * 2} 0 ${moveTo(x, y)} a ${rx} ${ry} 0 1 1 ${-rx * 2} 0" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"/>`
}
//#endregion
//#region Polygon function - Creates a polygon from an array of given points (Closed shape)
const polygon = (pointArr, stroke, fill, strokeWeight = 1) => {
    let pth = `M ${pointArr[0]} ${pointArr[1]}`;
    for (let i = 2; i < pointArr.length; i += 2) {
        if (i % 2 == 0) {
            pth += `L ${pointArr[i]} ${pointArr[i + 1]}`;
        }
    }
    return `<path d="${pth} Z" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWeight}"/>`
}
//#endregion
//#endregion
//#endregion

//#region ------------------ Group/Transform Transform Controls ----------------
//#region Group Function - Takes an array of elements and returns a group with each element
const group = (elems) => {
    return `<g>${elems.join('\n]')}</g>`
}
//#endregion
//#region Scale function - Scales a given shape by a given factor by placing it in a scaled group
const scale = (shape, factor) => {
    return `<g transform="scale(${factor}, ${factor})">
    ${shape}
    </g>`;
}
//#endregion
//#region Rotate function - Rotates a given shape about the origin by placing it in a rotated group
const rotate = (shape, rotation) => {
    return rotateP(shape, 0, 0, rotation);
}
//#endregion
//#region Rotate About Point function - Rotates a given shape about a given point by placing it in a rotated group
const rotateP = (shape, x, y, rotation) => {
    return `
    <g transform="rotate(${rotation}, ${x}, ${y})">
    ${shape}
    </g>`
    ;
}
//#endregion
//#region Translate function - Translates a given shape by a given amount by placing it in a translate group
const translate = (shape, x, y) => {
    return `
    <g transform="translate(${x}, ${y})">
    ${shape}
    </g>
    `;
}
//#endregion
//#endregion

//#region ------------------ Randonmness/Noise Functions ------------------
const generateFloatField = (w, h) => {
    let arr = [];
    for(let i = 0; i < w; i ++){
        arr[i] = [];
        for(let j = 0; j < h; j ++){
            arr[i].push(Math.random());
        }
    }
    return arr;
}
const accessFloatField = (arr, x, y) => {
    return arr[x][y];
}
//#endregion

//#region ----------------- Utility/Display Functions --------------------
//#region Svg To Element function - Sets inner HTML of a given element to a list of given SVGs from array
const svgToElement = (allSvgs, element) => {
    element.outerHTML = allSvgs.map((svg) => { return `${svg}` });
}
//#endregion
//#region Svg To Element (By ID) function - Sets inner HTML of a given element (By ID) to a list of given SVGs from array
const svgToElementById = (allSvgs, id) => {
    svgToElement(allSvgs, document.querySelector(`#${id}`));
}
//#endregion
//#region Wrap SVG - Wraps given text in an SVG with given viewbox and size vars
const wrapSvg = ({x, y, w, h}, pW, pH, svg) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${pW}px" height="${pH}px" viewbox="${x}, ${y}, ${w}, ${h}">
                        ${svg}
                    </svg>`
}
//#endregion
//#region Integer to Hex - Converts an integer to a hex string
const integerToHex = (int) => {
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        int = Math.floor(int);
        if (int <= 0){
            return "00";
        }
        let hex = "";
        while (int > 0) {
            let digit = int % 16;
            hex = digits[digit] + hex;
            int = Math.floor(int / 16);
        }
        return hex.toString().padStart(2, '0');
    }
//#endregion
//#region RGB to Hex - Converts an integer to a hex string
const rgbToHex = (r, g, b) => {
    return "#" + integerToHex(r) + integerToHex(g) + integerToHex(b);
}
//#endregion
//#region Degrees to Radians - Converts a degree value to a radian value
const degToRad = (deg) => {
    return deg * (Math.PI/180.0);
}
//#endregion
//#endregion

// Exports:
// Shape creation tools
export { moveTo, line, rect, circle, arc, ellipse, polygon, rectCorner}
// Group/Transform Controls
export { group, scale, rotate, rotateP, translate }
// Randomness/Noise Functions
export { generateFloatField, accessFloatField}
// Utility/Display Functions
export { svgToElement, svgToElementById, wrapSvg, integerToHex, rgbToHex, degToRad}