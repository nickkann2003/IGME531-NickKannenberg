import { render } from './render.js';
import * as utils from '../Toolkit/utils.js';

const { booleans, colors, primitives, transforms, hulls } = jscadModeling // modeling comes from the included MODELING library

const { intersect, subtract, union } = booleans
const { colorize, colorNameToRgb } = colors
const { cube, sphere, cylinderElliptic } = primitives

const sierpinski_thingy = (parameters, vp, iterations = 0) => {
    const size = parameters.size * vp.sizeMod;

    if (iterations === 0) {
        return cube({ size: size });
    }

    return [
        transforms.translate([size / 2, size / 2, -size], cube({ size: size * vp.sizeMod })),
        transforms.translate([size / 2, -size / 2, -size], cube({ size: size * vp.sizeMod })),
        transforms.translate([-size / 2, size / 2, -size], cube({ size: size * vp.sizeMod })),
        transforms.translate([-size / 2, -size / 2, -size], cube({ size: size * vp.sizeMod })),
        sierpinski_thingy({ size: parameters.size * vp.paramMod }, vp, iterations - 1)
    ];
}

const potentialCone = (params) => {
    return { coneStart, coneMin, coneMax, direction, coneRadius }
}

const branchFromCone = (coneParams) => {
    positionVector = [coneParams.coneStart[0] + coneParams.direction[0] / 2, coneParams.coneStart[1] + coneParams.direction[1] / 2, coneParams.coneStart[2] + coneParams.direction[2] / 2]
    radius = Math.sqrt(Math.random()) * coneParams.coneRadius;
    theta = Math.random() * Math.PI * 2;
    length = (coneMax - coneMin) * Math.random + coneMin;
    targetVector = [];
    return transforms.translate(conePositionVector,)
}

let alphabet = ['X', 'F', '+', '-', '[', ']', 'A', 'B', 'C'];
const axiom = 'X';
const rules = {
    //'X': 'F+[[X]-X]-[X]',
    'X': 'F+[[X]-X]-F[-FX]+X',
    'F': 'FFA',
    'A': 'B',
    'B': 'C',
    'C': '-F',
    '-': '-',
    '+': '+',
    '[': '[',
    ']': ']'
};

const iterate_once = (lindenmayerString) => {
    let newString = '';
    for (let i = 0; i < lindenmayerString.length; i++) {
        const result = rules[lindenmayerString[i]];
        newString += result || lindenmayerString[i];
    }
    return newString;
}

const iterateNTimes = (n, lindenmayerString = axiom) => {
    let newString = lindenmayerString;
    for (let i = 0; i < n; i++) {
        newString = iterate_once(newString);
    }
    return newString;
};

const makeVisual = (options, lindenmayerString) => {
    let theSvgString = '';
    let allShapes = [];
    let stack = [];

    // Basically constants
    let angle = (-options.angle) * (Math.PI / 180);
    let angleZ = (-options.angleZ) * (Math.PI/180);
    let startingPoint = options.startingPoint || [0, 0, 0];
    let lineLength = options.lineLength || 10;
    let cubeSize = options.startingSize || 1;
    let sizeMod = options.sizeMod || 0.1;

    // State
    let rotation = options.startingAngle || -75 * Math.PI / 180;
    let rotationZ = options.startingAngleZ || 0 * Math.PI/180;
    let points = [[startingPoint]];

    const moveForward = () => {
        const lastPoint = points[points.length - 1][points[points.length - 1].length - 1];

        const dx = Math.cos(rotation) * lineLength;
        const dy = Math.sin(rotation) * lineLength;
        const dz = Math.sin(rotationZ) * lineLength;

        points[points.length - 1].push([lastPoint[0] + dx, lastPoint[1] + dy, lastPoint[2] + dz]);
    };

    const pushToList = (point) => {
        stack.push(point);
    }

    const popFromList = () => {
        let item = stack.pop();
        rotation = item.rotation;
        rotationZ = item.rotationZ;
        
        // 3D Code
        let cubeLine = [];
        for(let i = 0; i < points[points.length-1].length; i ++){
            cubeLine.push(cube({center: [points[points.length-1][i][0], points[points.length-1][i][1], points[points.length-1][i][2]], size: cubeSize}));
        }
        
        if(cubeLine.length > 1){
            allShapes.push(jscadModeling.hulls.hullChain(cubeLine));
        }
        //allShapes.push(cylinderElliptic({height: 0.2, startRadius: [0.5, 0.25], endRadius: [0.8, 0.6]}));
        points.push([item.position]);
    }

    const whatToDo = {
        'F': () => {
            return moveForward();
        },
        'X': () => {
            return;
        },
        'A': () => {
            return;
        },
        'B': () => {
            return;
        },
        'C': () => {
            return;
        },
        'D': () => {
            return;
        },
        '+': () => {
            //rotation = rotation - angle;
            if(rotation <= 0){
                rotation = rotation - angle;
            }else{
                rotation = rotation * -1;
                rotation = rotation - angle;
            }
            if(rotationZ <= 0){
                rotationZ = rotationZ - angleZ;
            }else{
                rotationZ = rotationZ * -1;
                rotationZ = rotationZ + angleZ;
            }
        },
        '-': () => {
            //rotation = rotation + angle;
            if(rotation >= 0){
                rotation = rotation + angle;
            }else{
                rotation = rotation * -1;
                rotation = rotation + angle;
            }
            if(rotationZ >= 0){
                rotationZ = rotationZ + angleZ;
            }else{
                rotationZ = rotationZ * -1;
                rotationZ = rotationZ - angleZ;
            }
        },
        '[': () => {
            cubeSize += sizeMod;
            pushToList({ position: points[points.length - 1][points[points.length - 1].length - 1], rotation, rotationZ });
        },
        ']': () => {
            cubeSize -= sizeMod;
            popFromList();
        }
    };

    for (let i = 0; i < lindenmayerString.length; i++) {
        const toDo = whatToDo[lindenmayerString[i]];
        toDo();
    }

    return allShapes;
};

// jscadModeling.hulls.hullChain(); - Give it a list of objects

export { sierpinski_thingy, makeVisual, iterateNTimes };