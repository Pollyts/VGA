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
        cube.setAttribute('raycaster-listen','');
        cube.setAttribute("position", `${row * 2} 0 ${column * 2}`);
        cube.setAttribute("scale", "1 0.1 1");
        cube.setAttribute('gltf-model', '#cubeZero');
        cube.setAttribute('class', 'clickable');
        cube.setAttribute('zero');        
        //https://aframe.io/docs/1.4.0/components/raycaster.html
        cube.setAttribute('count', this.minesweeperField[row][column]);
        cube.setAttribute('static-body', '');
        scene.appendChild(cube);
      }
    }



    document.querySelector('a-scene').addEventListener('camera-step', function (event) {
      const cameraPosition = event.detail.position;
      const objects = document.querySelectorAll('[position]');
      const foundObjects = [];

      for (let i = 0; i < objects.length; i++) {
        const objectPosition = objects[i].object3D.position;
        if (objectPosition.equals(cameraPosition)) {
          var currentObject = objects[i];
          if (currentObject.hasAttribute('zero')) {
            currentObject.removeAttribute('zero');
            if(currentObject.getAttribute('count')==null)
            {
              //открыть соседние ячейки
            }
            else if(currentObject.getAttribute('count')==0)
            {
              var scene = document.querySelector('#gameScene');
              var cube = document.createElement("a-entity");             

              cube.setAttribute("position", `${currentObject.object3D.position.x} ${currentObject.object3D.position.y} ${currentObject.object3D.position.z}`);
              cube.setAttribute('gltf-model', '#mine');
              cube.setAttribute('count', currentObject.getAttribute('count'));
              cube.setAttribute('static-body', '');
              currentObject.parentNode.removeChild(currentObject);
              scene.appendChild(cube);
            }
            else{
              //currentObject.removeAttribute('gltf-model')              
              //currentObject.components.gltf-model.attrValue='#cube2';
              //currentObject.components.gltf-model.attrValue.setAttribute('gltf-model', "/models/cubeTwo.glb");
              var scene = document.querySelector('#gameScene');

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
      // Update the fields based on the camera position
      // if (cameraPosition.x == -5) {
      //   // Change field1
      //   document.getElementById('field1').setAttribute('material', 'color', 'red');
      //   document.getElementById('field2').setAttribute('material', 'color', 'white');
      // } else {
      //   // Change field2
      //   document.getElementById('field1').setAttribute('material', 'color', 'white');
      //   document.getElementById('field2').setAttribute('material', 'color', 'green');
      // }
    });
    //this.mazeSize = this.data.size;
    //this.maze = [];
    //this.scene = this.el.sceneEl;
    //this.start = { x: 0, y: 0, walls: { top: false, right: true, bottom: true, left: false } }; // Start position with open top and left walls
    //this.finish = { x: size - 1, y: size - 1, walls: { top: true, right: false, bottom: false, left: true } }; // Finish position with open bottom and right walls
    //this.initializeMaze(size);
    //this.generateMaze(0, 0);
    //this.drawMaze();
    //this.placeRedCubes(redCubes);
    //this.character = document.querySelector('#character'); // Assuming the character is represented by an entity with the id 'character'
    //this.characterPos = { x: 0, y: 0 }; // Initial character position

  },
  tick() {
    // ... existing code ...
    //this.checkCollision();
  },



  openCell(x, z) {
    var cube = document.createElement("a-entity");
    cube.setAttribute("position", `${row * 2} 0 ${column * 2}`);
    cube.setAttribute('count', this.minesweeperField[row][column]);
    if (this.minesweeperField[row][column] == null) {
      cube.setAttribute('gltf-model', '#cubeZero');
      cube.setAttribute('zero',);
    }
    else if (this.minesweeperField[row][column] == 0) {
      cube.setAttribute('gltf-model', '#mine');
      cube.setAttribute('mine',);
    }
    else {
      cube.setAttribute('gltf-model', `#cube${this.minesweeperField[row][column]}`);
    }
    cube.setAttribute('static-body', '');
    scene.appendChild(cube);
  },


  checkCollision() {
    const characterPosition = this.character.object3D.position;
    const characterX = Math.round(characterPosition.x);
    const characterY = Math.round(characterPosition.z); // Assuming the maze is positioned on the XZ plane

    // Check if the character's current position is within the valid range of the maze
    if (
      characterX >= 0 &&
      characterX < this.maze.length &&
      characterY >= 0 &&
      characterY < this.maze[characterX].length
    ) {
      // Check if the current cell is a wall cell in the maze
      if (this.maze[characterX][characterY].walls) {
        // If the character is colliding with a wall, prevent movement in that direction

        // Get the character's previous position
        const prevCharacterX = this.characterPos.x;
        const prevCharacterY = this.characterPos.y;

        // Reset the character's position to the previous position
        characterPosition.x = prevCharacterX;
        characterPosition.z = prevCharacterY;
      } else {
        // If the character is not colliding with a wall, update the character's position
        this.characterPos.x = characterX;
        this.characterPos.y = characterY;

      }
    }
  },
  placeRedCubes() {
    const { size, redCubes } = this.data;

    for (let i = 0; i < redCubes; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      this.redCubePositions.push({ x, y });

      const cube = document.createElement('a-entity');
      cube.setAttribute('position', `${x} 0.1 ${y}`);
      cube.setAttribute('gltf-model', '/models/rasp.glb');
      cube.setAttribute('scale', '0.1 0.1 0.1'); // Adjust the scale values as desired
      cube.setAttribute('obstacle', '');
      const cubeId = 'cube-' + Math.random().toString(36).substr(2, 9);
      cube.setAttribute('id', cubeId);
      cube.setAttribute('static-body', 'type: static; shape: box');
      cube.setAttribute('collider', 'type: static');
      this.scene.appendChild(cube);
    }
  },

  initializeMaze(size) {
    for (let i = 0; i < size; i++) {
      this.maze[i] = [];
      for (let j = 0; j < size; j++) {
        this.maze[i][j] = {
          visited: false,
          walls: {
            top: true,
            right: true,
            bottom: true,
            left: true
          }
        };
      }
    }
  },

  generateMaze(x, y) {
    const { size } = this.data;
    this.maze[x][y].visited = true;
    const directions = this.shuffleDirections();

    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const nx = x + direction.dx;
      const ny = y + direction.dy;

      if (this.isInBounds(nx, ny) && !this.maze[nx][ny].visited) {
        this.maze[x][y].walls[direction.wall] = false;
        this.maze[nx][ny].walls[direction.oppositeWall] = false;
        this.generateMaze(nx, ny);
      }
    }
  },

  shuffleDirections() {
    const directions = [
      { dx: 0, dy: -1, wall: 'top', oppositeWall: 'bottom' },
      { dx: 1, dy: 0, wall: 'right', oppositeWall: 'left' },
      { dx: 0, dy: 1, wall: 'bottom', oppositeWall: 'top' },
      { dx: -1, dy: 0, wall: 'left', oppositeWall: 'right' }
    ];

    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    return directions;
  },

  isInBounds(x, y) {
    const { size } = this.data;
    return x >= 0 && x < size && y >= 0 && y < size;
  },
  drawMaze() {

    //     var cubeContainer = document.getElementById("cubeContainer");

    //   for (var row = 0; row < height; row++) {
    //     for (var column = 0; column < width; column++) {
    //       var cube = document.createElement("a-box");
    //       cube.setAttribute("position", `${column - width / 2} ${row - height / 2} 0`);
    //       cubeContainer.appendChild(cube);
    //     }
    //   }



    const { size } = this.data;
    const texturePath = '/models/walls.jpg';
    const texturePath2 = '/models/walls.jpg';
    const texturePath3 = '/models/walls.jpg';

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = this.maze[i][j];

        if (cell.walls.top && !(i === this.start.x && j === this.start.y)) {
          const wall = document.createElement('a-box');
          wall.setAttribute('position', `${i} 0.5 ${j - 0.5}`);
          wall.setAttribute('width', 1);
          wall.setAttribute('height', 2);
          wall.setAttribute('depth', 0.1);
          wall.setAttribute('material', `src: url(${texturePath}); repeat: 3 3;`);
          wall.setAttribute('static-body', 'type: static; shape: box');
          wall.setAttribute('collider', 'type: static');
          this.scene.appendChild(wall);
        }

        if (cell.walls.right && !(i === this.finish.x && j === this.finish.y)) {
          const wall = document.createElement('a-box');
          wall.setAttribute('position', `${i + 0.5} 0.5 ${j}`);
          wall.setAttribute('width', 0.1);
          wall.setAttribute('height', 2);
          wall.setAttribute('depth', 1);
          wall.setAttribute('material', `src: url(${texturePath3}); repeat: 3 3;`);
          wall.setAttribute('static-body', 'type: static; shape: box');
          wall.setAttribute('collider', 'type: static');
          this.scene.appendChild(wall);
        }

        if (cell.walls.bottom) {
          const wall = document.createElement('a-box');
          wall.setAttribute('position', `${i} 0.5 ${j + 0.5}`);
          wall.setAttribute('width', 1);
          wall.setAttribute('height', 2);
          wall.setAttribute('depth', 0.1);
          wall.setAttribute('material', `src: url(${texturePath2}); repeat: 5 5;`);
          wall.setAttribute('static-body', 'type: static; shape: box');
          wall.setAttribute('collider', 'type: static');
          this.scene.appendChild(wall);
        }

        if (cell.walls.left) {
          const wall = document.createElement('a-box');
          wall.setAttribute('position', `${i - 0.5} 0.5 ${j}`);
          wall.setAttribute('width', 0.1);
          wall.setAttribute('height', 2);
          wall.setAttribute('depth', 1);
          wall.setAttribute('material', `src: url(${texturePath}); repeat: 5 5;`);
          wall.setAttribute('static-body', 'type: static; shape: box');
          wall.setAttribute('collider', 'type: static');
          this.scene.appendChild(wall);
        }

        // Check if the current cell is the start position and remove the top and left walls
        if (i === this.start.x && j === this.start.y) {
          cell.walls.top = this.start.walls.top;
          cell.walls.left = this.start.walls.left;

          if (!cell.walls.top) {
            const entranceHole = document.createElement('a-entity');
            entranceHole.setAttribute('position', `${i} 0 ${j - 0.2}`);
            entranceHole.setAttribute('start', '');
            entranceHole.setAttribute('static-body', 'type: static; shape: box');
            entranceHole.setAttribute('collider', 'type: static');
            entranceHole.innerHTML = '<a-cylinder color="green" height="0.01" radius="0.5" transparent="true" opacity="0.5"></a-cylinder>';
            this.scene.appendChild(entranceHole);
          }

          // Add entrance hole in the left wall
          /*
          if (!cell.walls.left) {
              const entranceHole = document.createElement('a-entity');
              entranceHole.setAttribute('position', `${i - 0.5} 0 ${j}`);
              entranceHole.setAttribute('start', '');
              entranceHole.setAttribute('static-body', 'type: static; shape: box');
              entranceHole.setAttribute('collider', 'type: static');
              entranceHole.innerHTML = '<a-cylinder color="green" height="0.1" radius="0.5" transparent="true" opacity="0.5"></a-cylinder>';
              this.scene.appendChild(entranceHole);
          }

*/

        }

        // Check if the current cell is the finish position and remove the bottom and right walls
        if (i === this.finish.x && j === this.finish.y) {
          cell.walls.bottom = this.finish.walls.bottom;
          cell.walls.right = this.finish.walls.right;

          // Add exit hole in the bottom wall
          if (!cell.walls.bottom) {
            const exitHole = document.createElement('a-entity');
            exitHole.setAttribute('position', `${i} 0 ${j - 0.2}`);
            exitHole.setAttribute('finish', '');
            exitHole.setAttribute('static-body', 'type: static; shape: box');
            exitHole.setAttribute('collider', 'type: static');

            exitHole.innerHTML = '<a-cylinder color="blue" height="0.01" radius="0.5"></a-cylinder>';
            this.scene.appendChild(exitHole);
          }

          /*
          // Add exit hole in the right wall
          if (!cell.walls.right) {
              const exitHole = document.createElement('a-entity');
              exitHole.setAttribute('position', `${i + 0.5} 0.5 ${j}`);
              exitHole.innerHTML = '<a-cylinder color="blue" height="0.1" radius="0.5"></a-cylinder>';
              this.scene.appendChild(exitHole);
          }*/
        }
      }
    }
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

      if(randomRow<=1&&randomRow<=1)
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
  }


});
