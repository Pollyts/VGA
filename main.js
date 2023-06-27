import './style.css'
import 'aframe'
import 'aframe-physics-system'
import './mineField'
import './components/character'
import './components/camera-tracker'
import './components/cursor-interaction'

// const backgroundMusic = document.getElementById('backgroundMusic');
const startMenu = document.querySelector('#startMenu');
const mainMenu = document.querySelector('#mainMenu');
const startButton = document.querySelector('#startButton');
// const openCellsCount = document.querySelector('#openCellsCount');
// const bombFoundCount = document.querySelector('#bombFoundCount');
// const timeSpent = document.querySelector('#timeSpent');

const application = document.querySelector('#app');
application.style.display = 'none';




startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    startMenu.classList.remove('d-flex');
    mainMenu.classList.remove('d-flex');
    
    application.style.display = 'block'; 

     document.querySelector('#app').innerHTML = `

     <div id="menuIcon">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-house-gear"
        viewBox="0 0 16 16">
        <path
          d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
        <path
          d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.044c-.613-.181-.613-1.049 0-1.23l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
      </svg>
    </div>

    <div style="display: none;" class="container" id="gameFinish">
    <div class="row">
      <h1 class="text-center mb-5 font-weight-bold text-uppercase" id="gameStatus">GAME OVER</h1>
    </div>
    <div class="row mb-3">
      <div class="col">
        Cells were opened
      </div>
      <div class="col">
        <span id="openCellsCount">0</span>
      </div>      
    </div>
    <div class="row mb-3">
      <div class="col">
        Bombs were found
      </div>
      <div class="col">
        <span id="bombFoundCount">0</span>
      </div>   
    </div>
    <div class="row mb-3">    
      <div class="col">
        Time
      </div>     
      <div class="col">
        <span id="timeSpent">0</span>
      </div>
    </div>
    <div class="row mb-3">    
      <button type="button" id="newGame" class="btn playbutton">New Game</button>
    </div>

    <div class="row mb-3">    
      <button type="button" id="showMap" class="btn playbutton">Show Map</button>
    </div>
  </div>

    <script type="module" src="/main.js"></script>

    <a-scene id="gameScene" z-index=10>

      <a-assets>
        <a-asset-item id="cubeZeroLight" src="/models/cubeZeroLight.glb"></a-asset-item>
        <a-asset-item id="cubeZero" src="/models/cubeZero.glb"></a-asset-item>
        <a-asset-item id="cube1" src="/models/cubeOne.glb"></a-asset-item>
        <a-asset-item id="cube2" src="/models/cubeTwo.glb"></a-asset-item>
        <a-asset-item id="cube3" src="/models/cubeThree.glb"></a-asset-item>
        <a-asset-item id="cube4" src="/models/cubeFour.glb"></a-asset-item>
        <a-asset-item id="cube5" src="/models/cubeFive.glb"></a-asset-item>
        <a-asset-item id="cube6" src="/models/cubeSix.glb"></a-asset-item>
        <a-asset-item id="cube7" src="/models/cubeSeven.glb"></a-asset-item>
        <a-asset-item id="cube8" src="/models/cubeEight.glb"></a-asset-item>
        <a-asset-item id="mine" src="/models/blender_mine.glb"></a-asset-item>
        <a-asset-item id="flag" src="/models/blanderflag.glb"></a-asset-item>
      </a-assets>
      

      <a-entity id="camera" camera position="0 6 0" look-controls wasd-controls camera-tracker rotation = "0 0 0">
            <a-entity cursor 
            geometry="primitive: ring; radiusInner: 0.03; radiusOuter: 0.04"
            material="color: black; shader: flat"
            position="0 0 -1">
            </a-entity>
                        
      </a-entity>     

    </a-scene>
 `   

  //const gameFinish = document.querySelector('#gameFinish');
  //gameFinish.classList.remove('d-flex');
   const mineField = document.createElement('a-entity');
   var width = document.getElementById('inputWidth').value;
   var height = document.getElementById('inputHeight').value;
   var mines = document.getElementById('inputMines').value;
   var parameters="width: " +width + "; height: " + height + "; mines: " + mines + ";"
   mineField.setAttribute("minefield", parameters);
   var scene = document.querySelector('#gameScene');
   scene.appendChild(mineField);

   const timerElement = document.getElementById('timer');

// Initialize variables
let startTime = null;
let elapsedTime = 0;
let timerInterval;

// Function to start the timer
function startTimer() {
  // Set the start time
  startTime = Date.now();
  // Start the timer interval
  timerInterval = setInterval(updateTimer, 1000); // Update every second
}

// Function to update the timer display
function updateTimer() {
  // Calculate the elapsed time in seconds
  const currentTime = Date.now();
  elapsedTime = Math.floor((currentTime - startTime) / 1000);
  // Update the timer element text
  timerElement.textContent = `${elapsedTime} seconds`;
}

function resetTimer() {
  clearInterval(timerInterval); // Stop the timer
}

startTimer();

const newGameButton = document.querySelector('#newGame');

newGameButton.addEventListener('click', () => {
  resetTimer();
  startMenu.style.display = 'none';
  startMenu.classList.add('d-flex');
  mainMenu.classList.remove('d-flex');
  const gameFinishMenu = document.querySelector('#gameFinish')
  gameFinishMenu.style.display = 'none';
  
  application.style.display = 'none'; 
  var scene = document.querySelector('#gameScene');
  scene.parentNode.removeChild(scene);
});

const returnHomeButton = document.querySelector('#menuIcon');

returnHomeButton.addEventListener('click', () => {
  resetTimer();
  startMenu.style.display = 'none';
  startMenu.classList.add('d-flex');
  mainMenu.classList.remove('d-flex');
  const gameFinishMenu = document.querySelector('#gameFinish')
  gameFinishMenu.style.display = 'none';
  
  application.style.display = 'none'; 
  var scene = document.querySelector('#gameScene');
  scene.parentNode.removeChild(scene);
});

const showMapButton = document.querySelector('#showMap');

showMapButton.addEventListener('click', () => {
  const camera = document.querySelector("#camera");
  camera.parentNode.removeChild(camera);
  const gameFinishMenu = document.querySelector('#gameFinish')
  gameFinishMenu.style.display = 'none'; 

  var staticCamera = document.createElement("a-entity");
  staticCamera.setAttribute('camera','');
  staticCamera.setAttribute("position", `${width/ 2} 20 ${height/ 2}`);
  //staticCamera.setAttribute("rotation", `0 180 0`);
  //staticCamera.setAttribute("position", `5  5`);
  staticCamera.setAttribute('look-controls', '');   
  var scene = document.querySelector('#gameScene');    
  scene.appendChild(staticCamera);
  
  
});
  
});




// gameFinish.addEventListener('click', () => {
//   startMenu.style.display = 'none';
//   startMenu.classList.remove('d-flex');
//   mainMenu.classList.remove('d-flex');
//   gameFinish.classList.remove('d-flex');
//   application.style.display = 'block';    
//  const mineField = document.createElement('a-entity');
//  var width = document.getElementById('inputWidth').value;
//  var height = document.getElementById('inputHeight').value;
//  var mines = document.getElementById('inputMines').value;
//  var parameters="width: " +width + "; height: " + height + "; mines: " + mines + ";"
//  mineField.setAttribute("minefield", parameters);
//  var scene = document.querySelector('#gameScene');
//  scene.appendChild(mineField);

// });