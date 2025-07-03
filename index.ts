// import GUI from "lil-gui";

type TArcCorner =
  | "top-left-arc"
  | "top-right-arc"
  | "bottom-left-arc"
  | "bottom-right-arc";

type TLineAxis = "vertical-line" | "horizontal-line";

const svgElement = document.querySelector("svg") as SVGSVGElement;
const pathElement = svgElement.querySelector("path") as SVGPathElement;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const SIZE = 50;
const RADIUS = SIZE / 2;

const COLUMNS = Math.ceil(WIDTH / SIZE);
const ROWS = Math.ceil(HEIGHT / SIZE);

// prettier-ignore
const COMBINATIONS = [
  ["vertical-line", "horizontal-line"], // x-y-lines

  ["top-left-arc", "bottom-right-arc"],                                     // main-diagonal-arc
  ["top-left-arc", "bottom-right-arc", "horizontal-line"],                  // main-diagonal-arc-x-line
  ["top-left-arc", "bottom-right-arc", "vertical-line"],                    // main-diagonal-arc-y-line
  ["top-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"], // main-diagonal-arc-x-y-lines

  ["top-right-arc", "bottom-left-arc"],                                     // anti-diagonal-arc
  ["top-right-arc", "bottom-left-arc", "horizontal-line"],                  // anti-diagonal-arc-x-line
  ["top-right-arc", "bottom-left-arc", "vertical-line"],                    // anti-diagonal-arc-y-line
  ["top-right-arc", "bottom-left-arc", "vertical-line", "horizontal-line"], // anti-diagonal-arc-x-y-lines

  ["top-left-arc", "top-right-arc", "vertical-line"],       // arrow-top
  ["top-right-arc", "bottom-right-arc", "horizontal-line"], // arrow-right
  ["bottom-left-arc", "bottom-right-arc", "vertical-line"], // arrow-bottom
  ["top-left-arc", "bottom-left-arc", "horizontal-line"],   // arrow-left

  ["top-left-arc", "top-right-arc", "bottom-left-arc", "bottom-right-arc"],                                     // star
  ["top-left-arc", "top-right-arc", "bottom-left-arc", "bottom-right-arc", "horizontal-line"],                  // star-x-line
  ["top-left-arc", "top-right-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line"],                    // star-y-line
  ["top-left-arc", "top-right-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"], // star-x-y-lines

  ["top-left-arc", "bottom-left-arc", "bottom-right-arc"],                                     // star-no-top-right
  ["top-left-arc", "bottom-left-arc", "bottom-right-arc", "horizontal-line"],                  // star-no-top-right-x-line
  ["top-left-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line"],                    // star-no-top-right-y-line
  ["top-left-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"], // star-no-top-right-x-y-lines

  ["top-left-arc", "top-right-arc", "bottom-left-arc"],                                     // star-no-bottom-right
  ["top-left-arc", "top-right-arc", "bottom-left-arc", "horizontal-line"],                  // star-no-bottom-right-x-line
  ["top-left-arc", "top-right-arc", "bottom-left-arc", "vertical-line"],                    // star-no-bottom-right-y-line
  ["top-left-arc", "top-right-arc", "bottom-left-arc", "vertical-line", "horizontal-line"], // star-no-bottom-right-x-y-lines

  ["top-left-arc", "top-right-arc", "bottom-right-arc"],                                     // star-no-bottom-left
  ["top-left-arc", "top-right-arc", "bottom-right-arc", "horizontal-line"],                  // star-no-bottom-left-x-line
  ["top-left-arc", "top-right-arc", "bottom-right-arc", "vertical-line"],                    // star-no-bottom-left-y-line
  ["top-left-arc", "top-right-arc", "bottom-right-arc", "vertical-line", "horizontal-line"], // star-no-bottom-left-x-y-lines

  ["top-right-arc", "bottom-left-arc", "bottom-right-arc"],                                     // star-no-top-left
  ["top-right-arc", "bottom-left-arc", "bottom-right-arc", "horizontal-line"],                  // star-no-top-left-x-line
  ["top-right-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line"],                    // star-no-top-left-y-line
  ["top-right-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"], // star-no-top-left-x-y-lines

  ["top-left-arc", "vertical-line", "horizontal-line"],     // four
  ["bottom-left-arc", "vertical-line", "horizontal-line"],  // four-x-rotated
  ["top-right-arc", "vertical-line", "horizontal-line"],    // four-y-rotated
  ["bottom-right-arc", "vertical-line", "horizontal-line"], // four-x-y-rotated

  ["top-left-arc", "top-right-arc", "vertical-line", "horizontal-line"],       // umbrella-top
  ["top-right-arc", "bottom-right-arc", "vertical-line", "horizontal-line"],   // umbrella-right
  ["bottom-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"], // umbrella-bottom
  ["top-left-arc", "bottom-left-arc", "vertical-line", "horizontal-line"],     // umbrella-left
];

svgElement.setAttribute("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);
svgElement.setAttribute("width", `${WIDTH}`);
svgElement.setAttribute("height", `${HEIGHT}`);

let d = "";
for (let column = 0; column < COLUMNS; column++) {
  for (let row = 0; row < ROWS; row++) {
    const top = row * SIZE;
    const left = column * SIZE;

    const combination = getRandom(COMBINATIONS)!;

    combination.forEach((tile) => {
      d += getTile({ top, left, tile });
    });
  }
}

pathElement.setAttribute("fill", "none");
pathElement.setAttribute("stroke-width", "1");
pathElement.setAttribute("stroke", "#eee");
pathElement.setAttribute("d", d);

function getRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getTile({
  top,
  left,
  tile,
}: {
  top: number;
  left: number;
  tile: string;
}) {
  let d = "";

  if (tile === "top-left-arc") {
    d += getArc({ top, left, corner: "top-left" });
  }

  if (tile === "top-right-arc") {
    d += getArc({ top, left, corner: "top-right" });
  }

  if (tile === "bottom-left-arc") {
    d += getArc({ top, left, corner: "bottom-left" });
  }

  if (tile === "bottom-right-arc") {
    d += getArc({ top, left, corner: "bottom-right" });
  }

  if (tile === "vertical-line") {
    d += getLine({ top, left, axis: "vertical" });
  }

  if (tile === "horizontal-line") {
    d += getLine({ top, left, axis: "horizontal" });
  }

  return d;
}

function getLine({
  top,
  left,
  axis,
}: {
  top: number;
  left: number;
  axis: string;
}) {
  let fromX: number | undefined;
  let fromY: number | undefined;

  let toX: number | undefined;
  let toY: number | undefined;

  if (axis === "vertical") {
    fromX = left + SIZE * (1 / 2);
    fromY = top;

    toX = left + SIZE * (1 / 2);
    toY = top + SIZE;
  }

  if (axis === "horizontal") {
    fromX = left;
    fromY = top + SIZE * (1 / 2);

    toX = left + SIZE;
    toY = top + +SIZE * (1 / 2);
  }

  // prettier-ignore
  return (
    `M ` +
    `${fromX}, ${fromY} ` +

    `L ` +
    `${toX}, ${toY} `
  );
}

function getArc({
  top,
  left,
  corner,
}: {
  top: number;
  left: number;
  corner: string;
}) {
  let fromX: number | undefined;
  let fromY: number | undefined;

  let toX: number | undefined;
  let toY: number | undefined;

  let sweepFlag: number | undefined; // 0 = anticlockwise, 1 = clockwise

  // from
  if (corner.includes("top")) {
    fromX = left + SIZE * (1 / 2);
    fromY = top;
  }
  if (corner.includes("bottom")) {
    fromX = left + SIZE * (1 / 2);
    fromY = top + SIZE;
  }

  // to
  if (corner.includes("right")) {
    toX = left + SIZE;
    toY = top + SIZE * (1 / 2);
  }
  if (corner.includes("left")) {
    toX = left;
    toY = top + SIZE * (1 / 2);
  }

  // rotation
  if (corner === "top-right" || corner === "bottom-left") sweepFlag = 0;
  if (corner === "top-left" || corner === "bottom-right") sweepFlag = 1;

  // prettier-ignore
  return (
    `M ` +
    `${fromX}, ${fromY} ` +

    `A ` +
    `${RADIUS}, ${RADIUS} ` +
    `0 ` +
    `0 ` +
    `${sweepFlag} ` +
    `${toX}, ${toY} `
  );
}

// const gui = new GUI();

// const myObject = {
//   myBoolean: true,
//   myFunction: function () {},
//   myString: "lil-gui",
//   myNumber: 1,
// };

// gui.add(myObject, "myBoolean"); // Checkbox
// gui.add(myObject, "myFunction"); // Button
// gui.add(myObject, "myString"); // Text Field
// gui.add(myObject, "myNumber"); // Number Field

// // Add sliders to number fields by passing min and max
// gui.add(myObject, "myNumber", 0, 1);
// gui.add(myObject, "myNumber", 0, 100, 2); // snap to even numbers

// // Create dropdowns by passing an array or object of named values
// gui.add(myObject, "myNumber", [0, 1, 2]);
// gui.add(myObject, "myNumber", { Label1: 0, Label2: 1, Label3: 2 });

// // Chainable methods
// gui
//   .add(myObject, "myBoolean")
//   .name("Custom Name")
//   .onChange((value: any) => {
//     console.log(value);
//   });

// // Create color pickers for multiple color formats
// const colorFormats = {
//   string: "#ffffff",
//   int: 0xffffff,
//   object: { r: 1, g: 1, b: 1 },
//   array: [1, 1, 1],
// };

// gui.addColor(colorFormats, "string");
