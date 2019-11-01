// Borders
let matrixBorderColor = "black";
let blockBorderColor = "grey";
let borderWidth = 2;

// Setting up matrix dimensions
let blocksPerRow = 10;
let blocksPerCol = 20;
let lengthOfBlock = 30;

let width = blocksPerRow * lengthOfBlock + (2 * blocksPerRow - borderWidth);
let height = blocksPerCol * lengthOfBlock + (2 * blocksPerCol - borderWidth);

// Root div that will contain all of the elements rendered
const $root = $("#root");

$(function() {
  setupGameView();
});

function setupGameView() {
  console.log("Setting up game view");
  console.log("Width: " + width);
  console.log("Height: " + height);

  $root.append(renderMatrix());
}

function renderMatrix() {
  console.log("Rendering BlockGame matrix");

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
      `;
    } else {
      matrixDiv += `
      <div class="matrix-row last-row"
        style="
          height: ${lengthOfBlock}px;
        ">
      `;
    }

    for (let j = 0; j < blocksPerRow; j++) {
      if (j != blocksPerRow - 1) {
        matrixDiv += `<div class="matrix-block"
          style="
            height: ${lengthOfBlock}px;
            width: ${lengthOfBlock}px;
            border-right: ${borderWidth}px solid ${blockBorderColor};
          "></div>`
      } else {
        matrixDiv += `<div class="matrix-block last-block"
          style="
            height: ${lengthOfBlock}px;
            width: ${lengthOfBlock}px;;
          "></div>`
      }
    }

    matrixDiv += `</div>`;
  }


  matrixDiv += `</div>`;
  console.log(matrixDiv);

  return matrixDiv;
}
