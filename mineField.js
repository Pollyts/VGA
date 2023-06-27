import './components/cursor-interaction'

AFRAME.registerComponent('minefield', {
  schema: {
    width: { type: 'number', default: 9 },
    height: { type: 'number', default: 9 },
    mines: { type: 'number', default: 10 },
    minesweeperField: { type: 'array', default: [], }
  },

  init() {
    const { width, height, mines } = this.data;
    this.minesweeperField = this.generateMinesweeperField(width, height, mines);
    var scene = document.querySelector('#gameScene');

    for (var row = 0; row < height; row++) {
      for (var column = 0; column < width; column++) {
        var cube = document.createElement("a-entity");
        //https://aframe.io/docs/1.4.0/components/raycaster.html
        cube.setAttribute('raycaster-listen','');
        cube.setAttribute("position", `${row * 2} 0 ${column * 2}`);
        cube.setAttribute("scale", "1 0.1 1");
        cube.setAttribute('gltf-model', '#cubeZero');
        cube.setAttribute('class', 'clickable');
        cube.setAttribute('zero');        
        cube.setAttribute('count', this.minesweeperField[row][column]);
        cube.setAttribute('static-body', '');
        scene.appendChild(cube);
      }
    }

    document.querySelector('a-scene').addEventListener('camera-step', function (event) {
      openCell(event.detail.position);
    });    

  },
  

  generateMinesweeperField(width, height, numMines) {
    // Create an empty field with all values set to 0
    var field = [];
    for (var row = 0; row < height; row++) {
      field[row] = [];
      for (var col = 0; col < width; col++) {
        field[row][col] = null;
      }
    }

    // Place the mines randomly in the field
    var minesPlaced = 0;
    while (minesPlaced < numMines) {
      var randomRow = Math.floor(Math.random() * height);
      var randomCol = Math.floor(Math.random() * width);

      if(randomRow<=1&&randomCol<=1)
      {
        continue;
      }

      // If the cell doesn't already have a mine, place one
      if (field[randomRow][randomCol] !== 0) {
        field[randomRow][randomCol] = 0;
        minesPlaced++;
      }
    }

    // Calculate the number of adjacent mines for each cell
    for (var row = 0; row < height; row++) {
      for (var col = 0; col < width; col++) {
        if (field[row][col] === 0) {
          continue; // Skip if the cell is already a mine
        }

        // Check the surrounding cells
        var adjacentMines = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            if (
              row + i >= 0 &&
              row + i < height &&
              col + j >= 0 &&
              col + j < width &&
              field[row + i][col + j] === 0
            ) {
              adjacentMines++;
            }
          }
        }
        if (adjacentMines > 0) {
          field[row][col] = adjacentMines;
        }


      }
    }

    return field;
  },

  
});


function openCell(selectedPosition) {
  const objects = document.querySelectorAll('[position]');
    for (let i = 0; i < objects.length; i++) {
      const objectPosition = objects[i].object3D.position;
      if (objectPosition.equals(selectedPosition)) {
        var currentObject = objects[i];
        if (currentObject.hasAttribute('zero')) {
          currentObject.removeAttribute('zero');
          const spanElement = document.getElementById('openCellsCount');
          const spanText = spanElement.textContent;
          const currentValue = parseInt(spanText);
          const newValue = currentValue + 1;
          spanElement.textContent = newValue.toString();
          var scene = document.querySelector('#gameScene');
          if(currentObject.getAttribute('count')==='null')
          {
            var cube = document.createElement("a-entity");             

            cube.setAttribute("position", `${currentObject.object3D.position.x} ${currentObject.object3D.position.y} ${currentObject.object3D.position.z}`);
            cube.setAttribute('gltf-model', '#cubeZeroLight');
            cube.setAttribute("scale", "1 0.1 1");
            cube.setAttribute('count', currentObject.getAttribute('count'));
            cube.setAttribute('static-body', '');
            openCell(new THREE.Vector3(currentObject.object3D.position.x+2,0, currentObject.object3D.position.z));
            openCell(new THREE.Vector3(currentObject.object3D.position.x-2,0, currentObject.object3D.position.z));
            openCell(new THREE.Vector3(currentObject.object3D.position.x,0, currentObject.object3D.position.z+2));
            openCell(new THREE.Vector3(currentObject.object3D.position.x,0, currentObject.object3D.position.z-2));
            openCell(new THREE.Vector3(currentObject.object3D.position.x+2,0, currentObject.object3D.position.z+2));
            openCell(new THREE.Vector3(currentObject.object3D.position.x-2,0, currentObject.object3D.position.z-2));
            openCell(new THREE.Vector3(currentObject.object3D.position.x-2,0, currentObject.object3D.position.z+2));
            openCell(new THREE.Vector3(currentObject.object3D.position.x+2,0, currentObject.object3D.position.z-2));
            currentObject.parentNode.removeChild(currentObject);
            scene.appendChild(cube);
          }
          else if(currentObject.getAttribute('count')==0)
          {
            
            var cube = document.createElement("a-entity");             

            cube.setAttribute("position", `${currentObject.object3D.position.x} ${currentObject.object3D.position.y} ${currentObject.object3D.position.z}`);
            cube.setAttribute('gltf-model', '#mine');
            cube.setAttribute('count', currentObject.getAttribute('count'));
            cube.setAttribute('static-body', '');
            currentObject.parentNode.removeChild(currentObject);
            scene.appendChild(cube);
          }
          else{

            var cube = document.createElement("a-entity");             

            cube.setAttribute("position", `${currentObject.object3D.position.x} ${currentObject.object3D.position.y} ${currentObject.object3D.position.z}`);
            cube.setAttribute('gltf-model', `#cube${currentObject.getAttribute('count')}`);
            cube.setAttribute('count', currentObject.getAttribute('count'));
            cube.setAttribute("scale", "1 0.1 1");
            cube.setAttribute('static-body', '');
            //currentObject.parentNode.removeChild(currentObject);
            scene.appendChild(cube);
            
          }

        }
      }
    }
}
