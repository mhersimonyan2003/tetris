const tetris = document.getElementById('tetris');
const cubes = document.querySelectorAll('.span');
let coordinates = [];
let figureAlreadyExists = false;
let figuresLengths = [4, 3, 3, 2, 3, 3, 3];

window.onkeydown = keyDown;

function keyDown(event) {
  if (event.code === 'Escape') {
    this.clearInterval(startGame)
  } else if (event.code === "ArrowDown") {
    figureMove(coordinates, 10);
  } else if (event.code === "ArrowLeft") {
    figureMove(coordinates, -1);
  } else if (event.code === "ArrowRight") {
    figureMove(coordinates, 1);
  }
}

function start() {
  if (!figureAlreadyExists) {
    coordinates = printFigure();
    window.onkeydown = keyDown;
  } else {
    coordinates = figureMove(coordinates, 10)
    window.onkeydown = keyDown;
  }
}

let startGame = setInterval(start, 300)

function printFigure() {
  coordinates = [];
  figureAlreadyExists = true;
  let figureCode = Math.floor(Math.random() * 7);
  let firstPossibleIndex;
  let lastPossibleIndex;
  if (figureCode == 2 || figureCode == 4) {
    firstPossibleIndex = 0 + figuresLengths[figureCode] - 1;
    lastPossibleIndex = 9;
  } else if (figureCode == 5) {
    firstPossibleIndex = 1;
    lastPossibleIndex = 8;
  } else {
    firstPossibleIndex = 0;
    lastPossibleIndex = 9 - figuresLengths[figureCode];
  }

  coordinates.push(randomRangeNumber(firstPossibleIndex, lastPossibleIndex + 1));
  makeFigure(figureCode, coordinates)
  return coordinates;
}

function makeFigure(figureCode, coordinates) {
  cubes[coordinates[0]].classList.add("figure");
  if (figureCode === 0) {
    for (let i = 1; i <= 3; i++) {
      cubes[coordinates[0] + i].classList.add("figure");
      coordinates.push(coordinates[0] + i);
    }
  } else if (figureCode === 1) {
    for (let i = 0; i < 3; i++) {
      cubes[coordinates[0] + 10 + i].classList.add("figure");
      coordinates.push(coordinates[0] + 10 + i);
    }
  } else if (figureCode === 2) {
    for (let i = 0; i < 3; i++) {
      cubes[coordinates[0] + 10 - i].classList.add("figure");
      coordinates.push(coordinates[0] + 10 - i);
    }
  } else if (figureCode === 3) {
    cubes[coordinates[0] + 10].classList.add("figure");
    coordinates.push(coordinates[0] + 10);
    cubes[coordinates[0] + 1].classList.add("figure");
    coordinates.push(coordinates[0] + 1);
    cubes[coordinates[0] + 10 + 1].classList.add("figure");
    coordinates.push(coordinates[0] + 10 + 1);
  } else if (figureCode === 4) {
    cubes[coordinates[0] + 10 - 1].classList.add("figure");
    coordinates.push(coordinates[0] + 10 - 1);
    cubes[coordinates[0] - 1].classList.add("figure");
    coordinates.push(coordinates[0] - 1);
    cubes[coordinates[0] + 10 - 2].classList.add("figure");
    coordinates.push(coordinates[0] + 10 - 2);
  } else if (figureCode === 5) {
    cubes[coordinates[0] + 10 - 1].classList.add("figure");
    coordinates.push(coordinates[0] + 10 - 1);
    cubes[coordinates[0] + 10].classList.add("figure");
    coordinates.push(coordinates[0] + 10);
    cubes[coordinates[0] + 10 + 1].classList.add("figure");
    coordinates.push(coordinates[0] + 10 + 1);
  } else if (figureCode === 6) {
    cubes[coordinates[0] + 10 + 1].classList.add("figure");
    coordinates.push(coordinates[0] + 10 + 1);
    cubes[coordinates[0] + 1].classList.add("figure");
    coordinates.push(coordinates[0] + 1);
    cubes[coordinates[0] + 10 + 2].classList.add("figure");
    coordinates.push(coordinates[0] + 10 + 2);
  }

  return coordinates;
}

function figureMove(coordinates, step) {
  let coordinatesClone = [...coordinates];
  let lastFigureCubeIndex = 0;
  let firstFigureCubeIndex = 9;

  for (let index of coordinates) {
    if (index % 10 > lastFigureCubeIndex) {
      lastFigureCubeIndex = index % 10;
    }
    if (index % 10 < firstFigureCubeIndex) {
      firstFigureCubeIndex = index % 10;
    }
  }

  console.log(lastFigureCubeIndex)

  for (let i = 0; i < coordinates.length; i++) {
    let coordinate = coordinates[i];
    if (step === 10) {
      if (coordinates[i] >= 190 && coordinates[i] <= 199) {
        // coordinates = [];
        figureAlreadyExists = false;
        window.onkeydown = null;
        coordinatesClone.forEach(index => {
          cubes[index].classList.add("figure")
        })
        return coordinates;
      }
      if (coordinates.indexOf(coordinates[i] + 10) === -1 && cubes[coordinates[i] + 10].classList.contains("figure")) {
        console.log("pxk");
        // coordinates = [];
        figureAlreadyExists = false;
        window.onkeydown = null;
        coordinatesClone.forEach(index => {
          cubes[index].classList.add("figure")
        })
        return coordinates;
      }
    } else if (step === 1 && lastFigureCubeIndex === 9) {
      return;
    } else if (step === -1 && firstFigureCubeIndex === 0) {
      return;
    }
    cubes[coordinate].classList.remove('figure')
    coordinates[i] = coordinates[i] + step;
  }

  coordinates.forEach((coordinate) => {
    cubes[coordinate].classList.add('figure');
  })

  return coordinates
}

function randomRangeNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min))
}

// function printFigureWithCoordinates(coordinates) {
//   for (let elem of coordinates) {
//     cubes[elem].classList.add("figure");
//   }
// }

// function setCoordinates(newCoordinates, coordinates) {
//   coordinates.forEach(index => {
//     cubes[index].classList.remove("figure");
//   })
//   coordinates = newCoordinates;
// }