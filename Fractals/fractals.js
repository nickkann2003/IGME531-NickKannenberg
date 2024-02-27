
// VAR:    F G
// CONSTS: + -

let alpha = ['F', 'G', '+', '-'];
const axiom = 'F';
const rules =  {
    'F': 'F+G',
    'G': 'F-G',
    '+': '+',
    '-': '-'
};

const iterate_once = (lindemayerString) => {
    let newString = "";
    for(let i = 0; i < lindemayerString.length; i ++){
        const result = rules[lindemayerString[i]];
        newString += result || lindemayerString[i];
    }
}

const iterate_n_times = (lindemayerString, n) => {
    let string = lindemayerString;
    for(let i = 0; i < n; i ++){
        string = iterate_once(string);
    }
    return string;
}

const makeVisual = (lindemayerString) => {
    let svg = "";

    let angle = 90 * Math.PI/180;
    let startingPoint = [50,50];
    let lineLength = 10;

    let rotation = 0;
    let points = [startingPoint];

    const moveForward = () => {
        const lastPoint = points[points.length - 1];
        points += [lastPoint[0] + lineLength*Math.cos(rotation), lastPoint[1] + lineLength*Math.sin(rotation)];
    }

    for(let i = 0; i < lindemayerString.length; i ++){
        
    }
}

let oneStep = iterate_once(axiom);
let twoStep = iterate_once(oneStep);
let threeStep = iterate_once(twoStep);

const expanded = iterate_n_times(axiom, 6);
const svg = makeVisual(expanded);
document.querySelector("#svg").outerHTML = svg;

