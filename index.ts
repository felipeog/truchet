import GUI from "lil-gui";

// =============================================================================
// types
// =============================================================================

enum EArcCorner {
  topLeft = "top-left-arc",
  topRight = "top-right-arc",
  bottomLeft = "bottom-left-arc",
  bottomRight = "bottom-right-arc",
}

type TArcCorner = `${EArcCorner}`;

function isArcCorner(value: any): value is EArcCorner {
  return Object.values(EArcCorner).includes(value);
}

enum ELineAxis {
  vertical = "vertical-line",
  horizontal = "horizontal-line",
}

type TLineAxis = `${ELineAxis}`;

function isLineAxis(value: any): value is ELineAxis {
  return Object.values(ELineAxis).includes(value);
}

enum EShapeName {
  xYLines = "x-y-lines",
  mainDiagonalArc = "main-diagonal-arc",
  mainDiagonalArcXLine = "main-diagonal-arc-x-line",
  mainDiagonalArcYLine = "main-diagonal-arc-y-line",
  mainDiagonalArcXYLines = "main-diagonal-arc-x-y-lines",
  antiDiagonalArc = "anti-diagonal-arc",
  antiDiagonalArcXLine = "anti-diagonal-arc-x-line",
  antiDiagonalArcYLine = "anti-diagonal-arc-y-line",
  antiDiagonalArcXYLines = "anti-diagonal-arc-x-y-lines",
  arrowTop = "arrow-top",
  arrowRight = "arrow-right",
  arrowBottom = "arrow-bottom",
  arrowLeft = "arrow-left",
  star = "star",
  starXLine = "star-x-line",
  starYLine = "star-y-line",
  starXYLines = "star-x-y-lines",
  starNoTopRight = "star-no-top-right",
  starNoTopRightXLine = "star-no-top-right-x-line",
  starNoTopRightYLine = "star-no-top-right-y-line",
  starNoTopRightXYLines = "star-no-top-right-x-y-lines",
  starNoBottomRight = "star-no-bottom-right",
  starNoBottomRightXLine = "star-no-bottom-right-x-line",
  starNoBottomRightYLine = "star-no-bottom-right-y-line",
  starNoBottomRightXYLines = "star-no-bottom-right-x-y-lines",
  starNoBottomLeft = "star-no-bottom-left",
  starNoBottomLeftXLine = "star-no-bottom-left-x-line",
  starNoBottomLeftYLine = "star-no-bottom-left-y-line",
  starNoBottomLeftXYLines = "star-no-bottom-left-x-y-lines",
  starNoTopLeft = "star-no-top-left",
  starNoTopLeftXLine = "star-no-top-left-x-line",
  starNoTopLeftYLine = "star-no-top-left-y-line",
  starNoTopLeftXYLines = "star-no-top-left-x-y-lines",
  four = "four",
  fourXRotated = "four-x-rotated",
  fourYRotated = "four-y-rotated",
  fourXYRotated = "four-x-y-rotated",
  umbrellaTop = "umbrella-top",
  umbrellaRight = "umbrella-right",
  umbrellaBottom = "umbrella-bottom",
  umbrellaLeft = "umbrella-left",
}

type TShapeName = `${EShapeName}`;

function isShapeName(value: any): value is EShapeName {
  return Object.values(EShapeName).includes(value);
}

type TCommand = TArcCorner | TLineAxis;

type TShape = { name: TShapeName; commands: TCommand[] };

// =============================================================================
// elements
// =============================================================================

const svgElement = document.querySelector("svg") as SVGSVGElement;
const pathElement = svgElement.querySelector("path") as SVGPathElement;

// =============================================================================
// constants
// =============================================================================

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const SIZE = 50;

const COLUMNS = Math.ceil(WIDTH / SIZE);
const ROWS = Math.ceil(HEIGHT / SIZE);

// prettier-ignore
const SHAPES: TShape[] = [
  { name: 'x-y-lines', commands: ["vertical-line", "horizontal-line"] },

  { name: 'main-diagonal-arc',           commands: ["top-left-arc", "bottom-right-arc"] },
  { name: 'main-diagonal-arc-x-line',    commands: ["top-left-arc", "bottom-right-arc", "horizontal-line"] },
  { name: 'main-diagonal-arc-y-line',    commands: ["top-left-arc", "bottom-right-arc", "vertical-line"] },
  { name: 'main-diagonal-arc-x-y-lines', commands: ["top-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"] },

  { name: 'anti-diagonal-arc',           commands: ["top-right-arc", "bottom-left-arc"] },
  { name: 'anti-diagonal-arc-x-line',    commands: ["top-right-arc", "bottom-left-arc", "horizontal-line"] },
  { name: 'anti-diagonal-arc-y-line',    commands: ["top-right-arc", "bottom-left-arc", "vertical-line"] },
  { name: 'anti-diagonal-arc-x-y-lines', commands: ["top-right-arc", "bottom-left-arc", "vertical-line", "horizontal-line"] },

  { name: 'arrow-top',    commands: ["top-left-arc", "top-right-arc", "vertical-line"] },
  { name: 'arrow-right',  commands: ["top-right-arc", "bottom-right-arc", "horizontal-line"] },
  { name: 'arrow-bottom', commands: ["bottom-left-arc", "bottom-right-arc", "vertical-line"] },
  { name: 'arrow-left',   commands: ["top-left-arc", "bottom-left-arc", "horizontal-line"] },

  { name: 'star',           commands: ["top-left-arc", "top-right-arc", "bottom-left-arc", "bottom-right-arc"] },
  { name: 'star-x-line',    commands: ["top-left-arc", "top-right-arc", "bottom-left-arc", "bottom-right-arc", "horizontal-line"] },
  { name: 'star-y-line',    commands: ["top-left-arc", "top-right-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line"] },
  { name: 'star-x-y-lines', commands: ["top-left-arc", "top-right-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"] },

  { name: 'star-no-top-right',           commands: ["top-left-arc", "bottom-left-arc", "bottom-right-arc"] },
  { name: 'star-no-top-right-x-line',    commands: ["top-left-arc", "bottom-left-arc", "bottom-right-arc", "horizontal-line"] },
  { name: 'star-no-top-right-y-line',    commands: ["top-left-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line"] },
  { name: 'star-no-top-right-x-y-lines', commands: ["top-left-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"] },

  { name: 'star-no-bottom-right',           commands: ["top-left-arc", "top-right-arc", "bottom-left-arc"] },
  { name: 'star-no-bottom-right-x-line',    commands: ["top-left-arc", "top-right-arc", "bottom-left-arc", "horizontal-line"] },
  { name: 'star-no-bottom-right-y-line',    commands: ["top-left-arc", "top-right-arc", "bottom-left-arc", "vertical-line"] },
  { name: 'star-no-bottom-right-x-y-lines', commands: ["top-left-arc", "top-right-arc", "bottom-left-arc", "vertical-line", "horizontal-line"] },

  { name: 'star-no-bottom-left',           commands: ["top-left-arc", "top-right-arc", "bottom-right-arc"] },
  { name: 'star-no-bottom-left-x-line',    commands: ["top-left-arc", "top-right-arc", "bottom-right-arc", "horizontal-line"] },
  { name: 'star-no-bottom-left-y-line',    commands: ["top-left-arc", "top-right-arc", "bottom-right-arc", "vertical-line"] },
  { name: 'star-no-bottom-left-x-y-lines', commands: ["top-left-arc", "top-right-arc", "bottom-right-arc", "vertical-line", "horizontal-line"] },

  { name: 'star-no-top-left',           commands: ["top-right-arc", "bottom-left-arc", "bottom-right-arc"] },
  { name: 'star-no-top-left-x-line',    commands: ["top-right-arc", "bottom-left-arc", "bottom-right-arc", "horizontal-line"] },
  { name: 'star-no-top-left-y-line',    commands: ["top-right-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line"] },
  { name: 'star-no-top-left-x-y-lines', commands: ["top-right-arc", "bottom-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"] },

  { name: 'four',             commands: ["top-left-arc", "vertical-line", "horizontal-line"] },
  { name: 'four-x-rotated',   commands: ["bottom-left-arc", "vertical-line", "horizontal-line"] },
  { name: 'four-y-rotated',   commands: ["top-right-arc", "vertical-line", "horizontal-line"] },
  { name: 'four-x-y-rotated', commands: ["bottom-right-arc", "vertical-line", "horizontal-line"] },

  { name: 'umbrella-top',    commands: ["top-left-arc", "top-right-arc", "vertical-line", "horizontal-line"] },
  { name: 'umbrella-right',  commands: ["top-right-arc", "bottom-right-arc", "vertical-line", "horizontal-line"] },
  { name: 'umbrella-bottom', commands: ["bottom-left-arc", "bottom-right-arc", "vertical-line", "horizontal-line"] },
  { name: 'umbrella-left',   commands: ["top-left-arc", "bottom-left-arc", "vertical-line", "horizontal-line"] },
];

// =============================================================================
// functions
// =============================================================================

function render(shapes: TShape[]) {
  svgElement.setAttribute("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);
  svgElement.setAttribute("width", `${WIDTH}`);
  svgElement.setAttribute("height", `${HEIGHT}`);

  let d = "";
  for (let column = 0; column < COLUMNS; column++) {
    for (let row = 0; row < ROWS; row++) {
      const top = row * SIZE;
      const left = column * SIZE;

      const shape = getRandom(shapes);

      if (!shape) continue;

      shape.commands.forEach((command) => {
        d += getShape({ top, left, command });
      });
    }
  }

  pathElement.setAttribute("d", d);
}

function getRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getShape({
  top,
  left,
  command,
}: {
  top: number;
  left: number;
  command: TArcCorner | TLineAxis;
}) {
  let d = "";

  if (isArcCorner(command)) {
    d += getArc({ top, left, corner: command });
  }

  if (isLineAxis(command)) {
    d += getLine({ top, left, axis: command });
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
  axis: ELineAxis;
}) {
  let fromX: number | undefined;
  let fromY: number | undefined;

  let toX: number | undefined;
  let toY: number | undefined;

  if (axis === ELineAxis.vertical) {
    fromX = left + SIZE * (1 / 2);
    fromY = top;

    toX = left + SIZE * (1 / 2);
    toY = top + SIZE;
  }

  if (axis === ELineAxis.horizontal) {
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
  corner: EArcCorner;
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
  if (corner === EArcCorner.topRight || corner === EArcCorner.bottomLeft)
    sweepFlag = 0;
  if (corner === EArcCorner.topLeft || corner === EArcCorner.bottomRight)
    sweepFlag = 1;

  // prettier-ignore
  return (
    `M ` +
    `${fromX}, ${fromY} ` +

    `A ` +
    `${SIZE / 2}, ${SIZE / 2} ` +
    `0 ` +
    `0 ` +
    `${sweepFlag} ` +
    `${toX}, ${toY} `
  );
}

// =============================================================================
// configuration interface
// =============================================================================

const gui = new GUI();

const guiConfig: Record<any, any> = {
  update() {
    const shapes = Object.entries(guiConfig)
      .filter(([shapeName, isChecked]) => isShapeName(shapeName) && isChecked)
      .map(([shapeName]) => SHAPES.find((shape) => shape.name === shapeName))
      .filter((shape) => shape !== undefined);

    render(shapes);
  },
};

Object.values(EShapeName).forEach((shapeName) => {
  guiConfig[shapeName] = true;
  gui.add(guiConfig, shapeName).name(shapeName);
});

gui.add(guiConfig, "update").name("Update");

// =============================================================================
// events
// =============================================================================

window.addEventListener("load", () => {
  pathElement.setAttribute("fill", "none");
  pathElement.setAttribute("stroke-width", "1");
  pathElement.setAttribute("stroke", "#eee");

  render(SHAPES);
});

// TODO: resize svg
// TODO: debounce
// window.addEventListener("resize", () => {});
