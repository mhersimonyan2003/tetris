const tetris = document.getElementById('tetris');
const h1 = document.querySelector('h1');
const cubes = document.getElementsByClassName('span');
const rows = document.getElementsByClassName('row');
const score = document.getElementById("score");
let gameStarted = false;
let coordinates = [];
let figureAlreadyExists = false;
let figuresLengths = [4, 3, 3, 2, 3, 3, 3];
let figureCenters = [2, 2, 2, 1, 3, 2, 2]
let startGame;
let figureCode;

// setInterval(() => {
//   h1.textContent = figureCode;
// }, 500)

// [...cubes].forEach((item, index) => {
//   item.textContent = index;
// })

window.onkeydown = keyDown;
window.onkeyup = keyUp;

if (confirm("Would you like to start?")) startGame = setInterval(start, 300);

function keyUp(event) {
  if (event.code === "ArrowUp") {
    figureRotate(figureCode, coordinates);
  }
}

function keyDown(event) {
  // if (event.code === 'Escape') {
  //   this.clearInterval(startGame)
  // } 
  if (event.code === "ArrowDown") {
    figureMove(coordinates, 10);
  } else if (event.code === "ArrowLeft") {
    figureMove(coordinates, -1);
  } else if (event.code === "ArrowRight") {
    figureMove(coordinates, 1);
  } else if (event.code === "Enter") {
    if (!gameStarted) startGame = setInterval(start, 300);
  }
}

function start() {
  if (!figureAlreadyExists) {
    gameStarted = true;
    coordinates = printFigure();
    window.onkeydown = keyDown;
  } else {
    coordinates = figureMove(coordinates, 10)
    window.onkeydown = keyDown;
  }
}

function figureRotate(figureCode, coordinates) {
  let isWrong = false;
  let center = figureCenters[figureCode];
  if (figureCode != 3) {
    coordinates.forEach(item => {
      cubes[item].classList.remove("figure");
    })
    let coordinatesClone = [...coordinates];
    for (let i = 0; i < coordinates.length; i++) {
      // debugger;
      if (coordinatesClone[center] - coordinatesClone[i] === 9) {
        if (coordinatesClone[center] % 10 === 9) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] + 11;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === 11) {
        if (coordinatesClone[center] % 10 === 9) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] - 9;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === -11) {
        if (coordinatesClone[center] % 10 === 0) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] + 9;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === -9) {
        if (coordinatesClone[center] % 10 === 0) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] - 11;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === 2) {
        if (coordinatesClone[center] >= 179) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] + 20;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === 1) {
        if (coordinatesClone[center] <= 10) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] - 10;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === -1) {
        if (coordinatesClone[center] >= 189) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] + 10;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === 20) {
        if (coordinatesClone[center] % 10 === 8) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] + 2;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === 10) {
        if (coordinatesClone[center] % 10 === 9) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] + 1;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === -10) {
        if (coordinatesClone[center] % 10 === 0) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] - 1;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      } else if (coordinatesClone[center] - coordinatesClone[i] === -20) {
        if (coordinatesClone[center] % 10 === 1) {
          isWrong = true;
        }
        coordinatesClone[i] = coordinatesClone[center] - 2;
        if (coordinatesClone[i] >= 0 && coordinatesClone[i] <= 199 && cubes[coordinatesClone[i]].classList.contains("figure") && !coordinatesClone.includes(i)) isWrong = true;
      }
    }
    if (!isWrong) {
      coordinates.forEach((item, index) => {
        coordinates[index] = coordinatesClone[index];
      });
    }
    coordinates.forEach(item => {
      cubes[item].classList.add("figure");
    })
  }
}

// let startGame = setInterval(start, 300)

function printFigure() {
  coordinates = [];
  figureAlreadyExists = true;
  figureCode = Math.floor(Math.random() * 7);
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
  if (figureCode === 0) {
    for (let i = 1; i <= 3; i++) {
      coordinates.push(coordinates[0] + i);
    }
  } else if (figureCode === 1) {
    for (let i = 0; i < 3; i++) {
      coordinates.push(coordinates[0] + 10 + i);
    }
  } else if (figureCode === 2) {
    for (let i = 2; i >= 0; i--) {
      coordinates.push(coordinates[0] + 10 - i);
    }
  } else if (figureCode === 3) {
    coordinates.push(coordinates[0] + 1);
    coordinates.push(coordinates[0] + 10);
    coordinates.push(coordinates[0] + 10 + 1);
  } else if (figureCode === 4) {
    coordinates.push(coordinates[0] + 10 - 2);
    coordinates.push(coordinates[0] + 10 - 1);
    coordinates.unshift(coordinates[0] - 1);
  } else if (figureCode === 5) {
    coordinates.push(coordinates[0] + 10 - 1);
    coordinates.push(coordinates[0] + 10);
    coordinates.push(coordinates[0] + 10 + 1);
  } else if (figureCode === 6) {
    coordinates.push(coordinates[0] + 1);
    coordinates.push(coordinates[0] + 10 + 1);
    coordinates.push(coordinates[0] + 10 + 2);
  }

  for (let i = 0; i < coordinates.length; i++) {
    if (cubes[coordinates[i]].classList.contains("figure")) {
      alert("Game Over");
      clearInterval(startGame);
      coordinates = [];
      return;
    }
  }

  coordinates.forEach(item => {
    cubes[item].classList.add("figure");
  })

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

  for (let i = 0; i < coordinates.length; i++) {
    if (step === 10) {
      window.onkeydown = null;
      window.onkeyup = null;
      if (coordinates[i] >= 190 && coordinates[i] <= 199) {
        score.textContent = +score.textContent + 5;
        figureAlreadyExists = false;
        window.onkeydown = null;
        coordinatesClone.forEach(index => {
          cubes[index].classList.add("figure")
        })
        for (let i = 0; i < rows.length; i++) {
          if ((Array.from(rows[i].children).filter(item => {
            return item.classList.contains("figure")
          })).length === rows[i].children.length) {
            console.log(rows[i]);
            Array.from(rows[i].children).forEach(item => item.classList.remove("figure"))
            tetris.prepend(rows[i]);
            score.textContent = +score.textContent + 30
          }
        }
        coordinates = [];
        return coordinates;
      }
      if (coordinates.indexOf(coordinates[i] + 10) === -1 && cubes[coordinates[i] + 10].classList.contains("figure")) {
        score.textContent = +score.textContent + 5;
        figureAlreadyExists = false;
        window.onkeydown = null;
        coordinatesClone.forEach(index => {
          cubes[index].classList.add("figure")
        })
        for (let i = 0; i < rows.length; i++) {
          if ((Array.from(rows[i].children).filter(item => {
            return item.classList.contains("figure")
          })).length === rows[i].children.length) {
            console.log(rows[i]);
            Array.from(rows[i].children).forEach(item => item.classList.remove("figure"))
            tetris.prepend(rows[i]);
            score.textContent = +score.textContent + 30
          }
        }
        coordinates = [];
        return coordinates;
      }
    } else if (step === 1) {
      if (lastFigureCubeIndex === 9) {
        return coordinates;
      }
      if (cubes[coordinates[i] + 1].classList.contains("figure") && coordinates.indexOf(coordinates[i] + 1) == -1) {
        return coordinates;
      }
    } else if (step === -1) {
      if (firstFigureCubeIndex === 0) {
        return coordinates;
      }
      if (cubes[coordinates[i] - 1].classList.contains("figure") && coordinates.indexOf(coordinates[i] - 1) == -1) {
        return coordinates;
      }
    }
  }

  for (let i = 0; i < coordinates.length; i++) {
    let coordinate = coordinates[i];
    cubes[coordinate].classList.remove('figure')
    coordinates[i] = coordinates[i] + step;
  }

  coordinates.forEach((coordinate) => {
    cubes[coordinate].classList.add('figure');
  })

  window.onkeydown = keyDown;
  window.onkeyup = keyUp;

  return coordinates;
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