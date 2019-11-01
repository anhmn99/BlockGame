import StandardGameLoop from "./engine/standard-engine.js"

// Game engine
let gameLoop = new StandardGameLoop("hey", "hey")

// Borders
let matrixBorderColor = "black"
let blockBorderColor = "grey"
let borderWidth = 2

// Setting up matrix dimensions
let blocksPerRow = gameLoop.gameState.width
let blocksPerCol = gameLoop.gameState.height
let lengthOfBlock = 30

let width = blocksPerRow * lengthOfBlock + (2 * blocksPerRow - borderWidth)
let height = blocksPerCol * lengthOfBlock + (2 * blocksPerCol - borderWidth)

// Root div that will contain all of the elements rendered
const $root = $("#root")

$(function() {
  setupGameView()
})

function setupGameView() {
  console.log("Setting up game view...")
  console.log("Width: " + width)
  console.log("Height: " + height)

  $root.append(renderMatrix())
  // $root.append(renderGameStats())
}

function renderMatrix() {
  console.log("Rendering matrix...")

  let matrixDiv = `
  <div id="matrix"
    style="
      width: ${width}px;
      height: ${height}px;
      border: ${borderWidth}px solid ${matrixBorderColor};
    ">
  `

  for (let i = 0; i < blocksPerCol; i++) {
    if (i != blocksPerCol - 1) {
    matrixDiv += `
      <div class="matrix-row"
        style="
          height: ${lengthOfBlock}px;
          border-bottom: ${borderWidth}px solid ${blockBorderColor};
        ">
      `
    } else {
      matrixDiv += `
      <div class="matrix-row last-row"
        style="
          height: ${lengthOfBlock}px;
        ">
      `
    }

    for (let j = 0; j < blocksPerRow; j++) {
      if (j != blocksPerRow - 1) {
        matrixDiv += `<div class="matrix-block"
          id="block${i * blocksPerRow + j}"
          style="
            height: ${lengthOfBlock}px;
            width: ${lengthOfBlock}px;
            border-right: ${borderWidth}px solid ${blockBorderColor};
          "></div>`
      } else {
        matrixDiv += `<div class="matrix-block row-last-block"
          id="block${i * blocksPerRow + j}"
          style="
            height: ${lengthOfBlock}px;
            width: ${lengthOfBlock}px;
          "></div>`
      }
    }

    matrixDiv += `</div>`
  }

  matrixDiv += `</div>`
  // console.log(matrixDiv)
  return matrixDiv
}

function renderGameStats() {
  console.log("Rendering game stats...")

  let gameStats = `
  <div id="game-stats"
    style="
      width: ${width}px;
      height: ${height}px;
      border: ${borderWidth}px solid ${matrixBorderColor};
    "
  >
    <div
      style="
        height: 100%;
      "
    >
      <p>Hello</p>
    </div>
  </div>
  `

  return gameStats
}