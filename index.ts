import GUI from "lil-gui";

// =============================================================================
// types
// =============================================================================

enum EArcCommand {
  topLeft = "top-left-arc",
  topRight = "top-right-arc",
  bottomLeft = "bottom-left-arc",
  bottomRight = "bottom-right-arc",
}

type TArcCommand = `${EArcCommand}`;

function isArcCommand(value: any): value is EArcCommand {
  return Object.values(EArcCommand).includes(value);
}

enum ELineCommand {
  vertical = "vertical-line",
  horizontal = "horizontal-line",
  topLeft = "top-left-line",
  topRight = "top-right-line",
  bottomLeft = "bottom-left-line",
  bottomRight = "bottom-right-line",
}

type TLineCommand = `${ELineCommand}`;

function isLineCommand(value: any): value is ELineCommand {
  return Object.values(ELineCommand).includes(value);
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

  mainDiagonalLine = "main-diagonal-line",
  mainDiagonalLineXLine = "main-diagonal-line-x-line",
  mainDiagonalLineYLine = "main-diagonal-line-y-line",
  mainDiagonalLineXYLines = "main-diagonal-line-x-y-lines",

  antiDiagonalLine = "anti-diagonal-line",
  antiDiagonalLineXLine = "anti-diagonal-line-x-line",
  antiDiagonalLineYLine = "anti-diagonal-line-y-line",
  antiDiagonalLineXYLines = "anti-diagonal-line-x-y-lines",

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

type TCommand = TArcCommand | TLineCommand;

type TShape = { name: TShapeName; commands: TCommand[] };

// =============================================================================
// elements
// =============================================================================

const svgElement = document.querySelector("svg") as SVGSVGElement;
const rectElement = document.querySelector("rect") as SVGRectElement;
const pathElement = svgElement.querySelector("path") as SVGPathElement;

// =============================================================================
// constants
// =============================================================================

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
  
  { name: 'main-diagonal-line',           commands: ["top-left-line", "bottom-right-line"] },
  { name: 'main-diagonal-line-x-line',    commands: ["top-left-line", "bottom-right-line", "horizontal-line"] },
  { name: 'main-diagonal-line-y-line',    commands: ["top-left-line", "bottom-right-line", "vertical-line"] },
  { name: 'main-diagonal-line-x-y-lines', commands: ["top-left-line", "bottom-right-line", "vertical-line", "horizontal-line"] },

  { name: 'anti-diagonal-line',           commands: ["top-right-line", "bottom-left-line"] },
  { name: 'anti-diagonal-line-x-line',    commands: ["top-right-line", "bottom-left-line", "horizontal-line"] },
  { name: 'anti-diagonal-line-y-line',    commands: ["top-right-line", "bottom-left-line", "vertical-line"] },
  { name: 'anti-diagonal-line-x-y-lines', commands: ["top-right-line", "bottom-left-line", "vertical-line", "horizontal-line"] },

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

function render(shapesMap: Record<TShapeName, boolean>, tileSize: number) {
  const shapes = Object.entries(shapesMap)
    .filter(([shapeName, isChecked]) => isShapeName(shapeName) && isChecked)
    .map(([shapeName, _]) => SHAPES.find((shape) => shape.name === shapeName));

  const width = window.innerWidth;
  const height = window.innerHeight;

  const columns = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);

  svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svgElement.setAttribute("width", `${width}`);
  svgElement.setAttribute("height", `${height}`);

  let d = "";

  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const top = row * tileSize;
      const left = column * tileSize;

      const shape = getRandom(shapes);
      if (!shape) continue;

      shape.commands.forEach((command) => {
        d += getShape({ top, left, tileSize, command });
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
  tileSize,
  command,
}: {
  top: number;
  left: number;
  tileSize: number;
  command: TArcCommand | TLineCommand;
}) {
  if (isArcCommand(command)) return getArc({ top, left, tileSize, command });
  if (isLineCommand(command)) return getLine({ top, left, tileSize, command });
}

function getLine({
  top,
  left,
  tileSize,
  command,
}: {
  top: number;
  left: number;
  tileSize: number;
  command: ELineCommand;
}) {
  let fromX: number | undefined;
  let fromY: number | undefined;

  let toX: number | undefined;
  let toY: number | undefined;

  // from
  if (command.includes("top")) {
    fromX = left + tileSize * (1 / 2);
    fromY = top;
  }
  if (command.includes("bottom")) {
    fromX = left + tileSize * (1 / 2);
    fromY = top + tileSize;
  }

  // to
  if (command.includes("right")) {
    toX = left + tileSize;
    toY = top + tileSize * (1 / 2);
  }
  if (command.includes("left")) {
    toX = left;
    toY = top + tileSize * (1 / 2);
  }

  if (command === ELineCommand.vertical) {
    fromX = left + tileSize * (1 / 2);
    fromY = top;

    toX = left + tileSize * (1 / 2);
    toY = top + tileSize;
  }

  if (command === ELineCommand.horizontal) {
    fromX = left;
    fromY = top + tileSize * (1 / 2);

    toX = left + tileSize;
    toY = top + tileSize * (1 / 2);
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
  tileSize,
  command,
}: {
  top: number;
  left: number;
  tileSize: number;
  command: EArcCommand;
}) {
  const radius = tileSize / 2;

  let fromX: number | undefined;
  let fromY: number | undefined;

  let toX: number | undefined;
  let toY: number | undefined;

  let sweepFlag: number | undefined; // 0 = anticlockwise, 1 = clockwise

  // from
  if (command.includes("top")) {
    fromX = left + tileSize * (1 / 2);
    fromY = top;
  }
  if (command.includes("bottom")) {
    fromX = left + tileSize * (1 / 2);
    fromY = top + tileSize;
  }

  // to
  if (command.includes("right")) {
    toX = left + tileSize;
    toY = top + tileSize * (1 / 2);
  }
  if (command.includes("left")) {
    toX = left;
    toY = top + tileSize * (1 / 2);
  }

  // rotation
  if (command === EArcCommand.topRight || command === EArcCommand.bottomLeft)
    sweepFlag = 0;
  if (command === EArcCommand.topLeft || command === EArcCommand.bottomRight)
    sweepFlag = 1;

  // prettier-ignore
  return (
    `M ` +
    `${fromX}, ${fromY} ` +

    `A ` +
    `${radius}, ${radius} ` +
    `0 ` +
    `0 ` +
    `${sweepFlag} ` +
    `${toX}, ${toY} `
  );
}

function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 200
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// =============================================================================
// configuration interface
// =============================================================================

const gui = new GUI({ title: "Truchet " });

const guiConfig = {
  shapes: {} as Record<TShapeName, boolean>,
  foregroundColor: "#66666b",
  backgroundColor: "#111116",
  strokeWidth: 3,
  tileSize: 50,
  reverseColors() {
    // prettier-ignore
    [
      guiConfig.foregroundColor, 
      guiConfig.backgroundColor
    ] = [
      guiConfig.backgroundColor, 
      guiConfig.foregroundColor
    ];

    document.body.style.backgroundColor = guiConfig.backgroundColor;

    rectElement.setAttribute("fill", guiConfig.backgroundColor);

    pathElement.setAttribute("stroke", guiConfig.foregroundColor);
  },
  quarterCircles() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.mainDiagonalArc:
        case EShapeName.antiDiagonalArc:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  labyrinth() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.mainDiagonalLine:
        case EShapeName.antiDiagonalLine:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  allArcs() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.mainDiagonalArc:
        case EShapeName.antiDiagonalArc:
        case EShapeName.star:
        case EShapeName.starNoTopRight:
        case EShapeName.starNoBottomRight:
        case EShapeName.starNoBottomLeft:
        case EShapeName.starNoTopLeft:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  arcsAndLines() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.xYLines:
        case EShapeName.mainDiagonalArc:
        case EShapeName.antiDiagonalArc:
        case EShapeName.arrowTop:
        case EShapeName.arrowRight:
        case EShapeName.arrowBottom:
        case EShapeName.arrowLeft:
        case EShapeName.star:
        case EShapeName.starNoTopRight:
        case EShapeName.starNoBottomRight:
        case EShapeName.starNoBottomLeft:
        case EShapeName.starNoTopLeft:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  squaresAndArcs() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.xYLines:
        case EShapeName.mainDiagonalArcXYLines:
        case EShapeName.antiDiagonalArcXYLines:
        case EShapeName.starXYLines:
        case EShapeName.starNoTopRightXYLines:
        case EShapeName.starNoBottomRightXYLines:
        case EShapeName.starNoBottomLeftXYLines:
        case EShapeName.starNoTopLeftXYLines:
        case EShapeName.four:
        case EShapeName.fourXRotated:
        case EShapeName.fourYRotated:
        case EShapeName.fourXYRotated:
        case EShapeName.umbrellaTop:
        case EShapeName.umbrellaRight:
        case EShapeName.umbrellaBottom:
        case EShapeName.umbrellaLeft:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  circlesAndLines() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.star:
        case EShapeName.starXLine:
        case EShapeName.starYLine:
        case EShapeName.starXYLines:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  straightLines() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.xYLines:
        case EShapeName.mainDiagonalLine:
        case EShapeName.antiDiagonalLine:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  rainLeft() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.starNoBottomLeftYLine:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  rainRight() {
    Object.values(EShapeName).forEach((shapeName) => {
      switch (shapeName) {
        case EShapeName.starNoBottomRightYLine:
          guiConfig.shapes[shapeName] = true;
          break;

        default:
          guiConfig.shapes[shapeName] = false;
          break;
      }

      guiConfig.update();
    });
  },
  selectAll() {
    Object.values(EShapeName).forEach((shapeName) => {
      guiConfig.shapes[shapeName] = true;
    });

    guiConfig.update();
  },
  selectNone() {
    Object.values(EShapeName).forEach((shapeName) => {
      guiConfig.shapes[shapeName] = false;
    });

    guiConfig.update();
  },
  toggleSelection() {
    Object.values(EShapeName).forEach((shapeName) => {
      guiConfig.shapes[shapeName] = !guiConfig.shapes[shapeName];
    });

    guiConfig.update();
  },
  randomSelection() {
    const threshold = Math.random();

    Object.values(EShapeName).forEach((shapeName) => {
      guiConfig.shapes[shapeName] = Math.random() >= threshold;
    });

    guiConfig.update();
  },
  update() {
    render(guiConfig.shapes, guiConfig.tileSize);
  },
  downloadAsSvg() {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "truchet.svg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
  },
};

const presetsFolder = gui.addFolder("Presets");
presetsFolder.add(guiConfig, "quarterCircles").name("Quarter circles");
presetsFolder.add(guiConfig, "labyrinth").name("Labyrinth");
presetsFolder.add(guiConfig, "allArcs").name("All arcs");
presetsFolder.add(guiConfig, "arcsAndLines").name("Arcs and lines");
presetsFolder.add(guiConfig, "squaresAndArcs").name("Squares and arcs");
presetsFolder.add(guiConfig, "circlesAndLines").name("Circles and lines");
presetsFolder.add(guiConfig, "straightLines").name("Straight lines");
presetsFolder.add(guiConfig, "rainLeft").name("Rain left");
presetsFolder.add(guiConfig, "rainRight").name("Rain right");

const appearanceFolder = gui.addFolder("Appearance");
appearanceFolder
  .addColor(guiConfig, "backgroundColor")
  .name("Background color")
  .onChange((color: string) => {
    rectElement.setAttribute("fill", color);
    document.body.style.backgroundColor = color;
  });
appearanceFolder
  .addColor(guiConfig, "foregroundColor")
  .name("Foreground color")
  .onChange((color: string) => {
    pathElement.setAttribute("stroke", color);
  });
appearanceFolder.add(guiConfig, "reverseColors").name("Reverse colors");
appearanceFolder
  .add(guiConfig, "strokeWidth")
  .min(0.5)
  .step(0.5)
  .name("Stroke width")
  .onChange((width: number) => {
    pathElement.setAttribute("stroke-width", String(width));
  });
appearanceFolder
  .add(guiConfig, "tileSize")
  .min(5)
  .step(5)
  .name("Tile size")
  .onChange((tileSize: number) => {
    render(guiConfig.shapes, tileSize);
  });

const selectionFolder = gui.addFolder("Selection");
selectionFolder.add(guiConfig, "selectAll").name("Select All");
selectionFolder.add(guiConfig, "selectNone").name("Select None");
selectionFolder.add(guiConfig, "toggleSelection").name("Toggle Selection");
selectionFolder.add(guiConfig, "randomSelection").name("Random Selection");

const exportFolder = gui.addFolder("Export");
exportFolder.add(guiConfig, "downloadAsSvg").name("Download as SVG");

const shapesFolder = gui.addFolder("Shapes");
Object.values(EShapeName).forEach((shapeName) => {
  guiConfig.shapes[shapeName] = true;
  shapesFolder
    .add(guiConfig.shapes, shapeName)
    .name(shapeName)
    .listen()
    .onChange(guiConfig.update);
});

// =============================================================================
// events
// =============================================================================

window.addEventListener("load", () => {
  document.body.style.backgroundColor = guiConfig.backgroundColor;

  rectElement.setAttribute("fill", guiConfig.backgroundColor);

  pathElement.setAttribute("stroke-width", String(guiConfig.strokeWidth));
  pathElement.setAttribute("stroke", guiConfig.foregroundColor);
  pathElement.setAttribute("fill", "none");
  pathElement.setAttribute("stroke-linecap", "round");

  guiConfig.quarterCircles();
});

window.addEventListener(
  "resize",
  debounce(() => render(guiConfig.shapes, guiConfig.tileSize))
);
