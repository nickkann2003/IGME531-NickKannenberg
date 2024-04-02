import { render } from './render.js';

const { booleans, colors, primitives, transforms, hulls } = jscadModeling // modeling comes from the included MODELING library

const { intersect, subtract, union } = booleans
const { colorize, colorNameToRgb } = colors
const { cube, sphere } = primitives

const sierpinski_thingy = (parameters, vp, iterations = 0) => {
    const size = parameters.size * vp.sizeMod;

    if (iterations === 0) {
        return cube({ size: size });
    }

    return [
        transforms.translate([size/2, size/2, -size], cube({ size: size * vp.sizeMod })),
        transforms.translate([size/2, -size/2, -size], cube({ size: size * vp.sizeMod })),
        transforms.translate([-size/2, size/2, -size], cube({ size: size * vp.sizeMod })),
        transforms.translate([-size/2, -size/2, -size], cube({ size: size * vp.sizeMod })),
        sierpinski_thingy({ size: parameters.size * vp.paramMod }, vp, iterations - 1)
    ];
}

const potentialCone = (params) => {
    return {coneStart, coneMin, coneMax, direction, coneRadius}
}

const branchFromCone = (coneParams) => {
    positionVector = [coneParams.coneStart[0] + coneParams.direction[0]/2, coneParams.coneStart[1] + coneParams.direction[1]/2, coneParams.coneStart[2] + coneParams.direction[2]/2]
    radius = Math.sqrt(Math.random()) * coneParams.coneRadius;
    theta = Math.random() * Math.PI*2;
    length = (coneMax - coneMin) * Math.random + coneMin;
    targetVector = [];
    return transforms.translate(conePositionVector, )
}

// jscadModeling.hulls.hullChain(); - Give it a list of objects

export { sierpinski_thingy, potentialCone };