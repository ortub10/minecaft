const opening = document.getElementById("opening");
const gameScreen = document.getElementById("game_screen");
const startGameBtn = document.getElementById("start_game");
const gameBoard = document.getElementById("game_board");
const resetGameBtn = document.getElementById("reset");
const pickaxe = document.getElementById("pickaxe");
const shovel = document.getElementById("shovel");
const axe = document.getElementById("axe");
const bank = document.getElementById("bank");
let back = false;
let bankIsEmpty = true;
let currentTool = "none";
let oldTool = "none";
let oldColorBtn = "";
resetGameBtn.addEventListener("click", () => {
  playGame();
});
startGameBtn.addEventListener("click", () => {
  opening.style.display = "none";
  gameScreen.style.display = "flex";
});
playGame();
addEventTool(pickaxe, shovel, axe);
addEventTool(shovel, pickaxe, axe);
addEventTool(axe, shovel, pickaxe);
function eventBank() {
  currentTool = "none";
  back = true;
  bankIsEmpty = true;
  oldColorBtn.style.backgroundColor = "";
  oldColorBtn = "";
}

function addEventTool(first, second, third) {
  first.addEventListener("click", function () {
    currentTool = this.getAttribute("tool");
    oldColorBtn = this;
    this.style.backgroundColor = "blue";
    second.style.backgroundColor = "";
    third.style.backgroundColor = "";
  });
}
function addEventGame(event) {
  if (event.target.getAttribute("tool") === currentTool) {
    if (back) {
      const cls = bank.getAttribute("class");
      event.target.setAttribute("class", cls);
      event.target.setAttribute("tool", oldTool);
      bank.setAttribute("class", "");
      back = false;
      bankIsEmpty = true;
      bank.removeEventListener("click", eventBank);
    } else {
      if (currentTool !== "none") {
        oldTool = event.target.getAttribute("tool");
        const cls = event.target.getAttribute("class");
        event.target.setAttribute("class", "sky");
        event.target.setAttribute("tool", "none");
        bank.setAttribute("class", cls);
        bankIsEmpty = false;
      }
    }
    if (!bankIsEmpty) {
      bank.addEventListener("click", eventBank);
    }
  } else {
    oldColorBtn.style.backgroundColor = "red";
    setTimeout(() => {
      oldColorBtn.style.backgroundColor = "blue";
    }, 1000);
  }
}

function bulidGame(start, end, cls, tool) {
  for (let i = start; i > end; i -= 1) {
    for (let j = 1; j <= 16; j += 1) {
      const part = document.createElement("div");
      part.setAttribute("class", cls);
      part.setAttribute("tool", tool);
      part.style.gridRowStart = i;
      part.style.gridColumnStart = j;
      part.addEventListener("click", addEventGame);
      gameBoard.appendChild(part);
    }
  }
}
function playGame() {
  back = false;
  bankIsEmpty = true;
  if (oldColorBtn !== "") currentTool = oldColorBtn.getAttribute("tool");
  oldTool = "none";
  bank.setAttribute("class", "");
  bank.removeEventListener("click", eventBank);
  const sky = {
    class: "sky",
    tool: "none",
  };
  const wood = {
    class: "wood",
    tool: "axe",
  };
  const rock = {
    class: "rock",
    tool: "pickaxe",
  };
  const leaves = {
    class: "leaves",
    tool: "axe",
  };
  const dirt = {
    class: "dirt",
    tool: "shovel",
  };
  const dirtGrass = {
    class: "dirt-grass",
    tool: "shovel",
  };

  const shapes = {
    tree: [
      [sky, wood, sky],
      [leaves, leaves, leaves],
      [leaves, leaves, leaves],
    ],
    skyCol: [[sky], [sky], [sky]],
    rock2Col: [[rock], [rock], [sky]],
    rock2Row: [
      [rock, rock, sky],
      [sky, sky, sky],
      [sky, sky, sky],
    ],
    leaves2Wood: [[wood], [wood], [leaves]],
    plus: [
      [leaves, leaves, leaves],
      [sky, leaves, sky],
      [sky, sky, sky],
    ],
  };
  const shapesArr = [
    "tree",
    "skyCol",
    "rock2Col",
    "rock2Row",
    "leaves2Wood",
    "plus",
  ];

  bulidGame(12, 10, "dirt", "shovel");
  bulidGame(10, 9, "dirt_grass", "shovel");
  bulidGame(9, 0, "sky", "none");
  let row = 9;
  let col = 1;
  while (col < 15) {
    const placeArrRandom = Math.floor(Math.random() * shapesArr.length);
    const shape = shapes[shapesArr[placeArrRandom]];
    for (let i = 0; i < shape.length; i += 1) {
      for (let j = 0; j < shape[0].length; j += 1) {
        const part = document.createElement("div");
        part.setAttribute("class", shape[i][j].class);
        part.setAttribute("tool", shape[i][j].tool);
        part.style.gridRowStart = row;
        part.style.gridColumnStart = col + j;
        part.addEventListener("click", addEventGame);
        gameBoard.appendChild(part);
      }
      row -= 1;
    }
    col += shape[0].length;
    row += 3;
  }
}
