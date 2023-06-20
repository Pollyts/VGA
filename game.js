import './style.css'
import 'aframe'
import 'aframe-physics-system'

document.querySelector('#app').innerHTML = `

<div id="menu" class="menu-container">
      <div class="button-container">
        <button id="startButton" class="start-button">Start Game</button>
        <button id="resumeButton" class="start-button">Resume Game</button>
        <button id="playAgainButton" class="play-again-button">Play Again</button>
        <button id="muteButton" class="start-button">Mute Music</button>
      
      </div>
    </div>
<i id="menuIcon" class="fas fa-bars"></i>

<a-scene id="gameScene">
      <div id="menu" class="menu-container">
        <div class="button-container">
          <button id="startButton" class="start-button">Start Game</button>
          <button id="resumeButton" class="start-button">Resume Game</button>
          <button id="playAgainButton" class="play-again-button">Play Again</button>
          <button id="muteButton" class="start-button">Mute Music</button>
      
        </div>
      </div>
      <i id="menuIcon" class="fas fa-bars"></i>
      <a-entity position="0 1.5 -3">
        <a-text value="Добро пожаловать в мою игру" color="white" width="6"></a-text>
      </a-entity>
      
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      
      <a-entity position="-1 0.5 -3">
        <a-image src="start_button.jpg" width="2" height="1"></a-image>
      </a-entity>
    </a-scene>
    <a-scene>
        <a-assets>
            <a-asset-item id="cube" src="/models/cubeOne.glb"></a-asset-item>
            <a-asset-item id="cube2" src="/models/cubeTwo.glb"></a-asset-item>
            <a-asset-item id="cube3" src="/models/cubeThree.glb"></a-asset-item>
            <a-asset-item id="cube4" src="/models/cubeFour.glb"></a-asset-item>
            <a-asset-item id="cube5" src="/models/cubeFive.glb"></a-asset-item>
            <a-asset-item id="cube6" src="/models/cubeSix.glb"></a-asset-item>
            <a-asset-item id="cube7" src="/models/cubeSeven.glb"></a-asset-item>
            <a-asset-item id="cube8" src="/models/cubeEight.glb"></a-asset-item>
            <img id="sky" src="/models/sky.jpg">
            <img id="land" src="/models/land.jpg">
        </a-assets>

        <a-sky src="#sky" theta-length="90" radius="30"></a-sky>

        <a-entity static-body gltf-model="#cube" position="0 0 0"></a-entity> 
        <a-entity static-body gltf-model="#cube2" position="3 0 2"></a-entity> 
        <a-entity static-body gltf-model="#cube3" position="5 0 2"></a-entity> 
        <a-entity static-body gltf-model="#cube4" position="1 0 2"></a-entity> 
        <a-entity static-body gltf-model="#cube5" position="3 0 6"></a-entity> 
        <a-entity static-body gltf-model="#cube6" position="2 0 4"></a-entity> 
        <a-entity static-body gltf-model="#cube7" position="7 0 10"></a-entity> 
        <a-entity static-body gltf-model="#cube8" position="10 0 5"></a-entity> 

        <!-- Camera -->
        <a-camera>
        
      <a-entity cursor="downEvents: triggerdown; upEvents: triggerUp" 
                geometry="primitive: ring; radiusInner: 0.03; radiusOuter: 0.05"
                material="color: blue; shader: flat"
                position="0 0 -1">
      </a-entity>
    </a-camera> 

    <a-entity id="ground" 
    src="#land"
    geometry="primitive: cylinder; radius: 30; height: 0.1" 
    position="0 0 0" 
    material="shader: flat; src: #land">
</a-entity>

<span class="game-info" id="gameInfo"></span>
      <span class="game-finish-info" id="gameFinishInfo"></span>
      <span class="points-text" id="pointsText">Points: 0</span>

      <a-light type="directional" position="0 20 20" intensity="1.5" castShadow="true"></a-light>
      <a-entity shadow="receive: true" static-body maze></a-entity>
      <a-entity falling-object></a-entity>
    </a-scene>
`;

const backgroundMusic = document.getElementById('backgroundMusic');
const menuElement = document.querySelector('#menu');
const startButton = document.querySelector('#startButton');
const gameSceneElement = document.querySelector('#gameScene');
const playAgainButton = document.querySelector('#playAgainButton');
const resumeButton = document.querySelector('#resumeButton');
const menuIcon = document.querySelector('#menuIcon');
const muteButton = document.querySelector('#muteButton');
const application = document.querySelector('#app');
menuIcon.style.display = 'none';
gameSceneElement.style.display = 'none';
playAgainButton.style.display = 'none';
resumeButton.style.display = 'none';
muteButton.style.display = 'none';
application.style.display = 'none';


startButton.addEventListener('click', () => {
    menuElement.style.display = 'none';
    gameSceneElement.style.display = 'block';
    backgroundMusic.play();
    menuIcon.style.display = 'block';
});

menuIcon.addEventListener('click', () => {
    menuElement.style.display = 'block';
    playAgainButton.style.display = 'none';
    gameSceneElement.style.display = 'none';
    startButton.style.display = 'none';
    menuIcon.style.display = 'none';
    resumeButton.style.display = 'block';
    muteButton.style.display = 'block';
});

resumeButton.addEventListener('click', () => {
    menuElement.style.display = 'none';
    playAgainButton.style.display = 'none';
    gameSceneElement.style.display = 'block';
    startButton.style.display = 'none';
    menuIcon.style.display = 'block';
    muteButton.style.display = 'none';
});

muteButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        muteButton.textContent = 'Mute Music';
    } else {
        backgroundMusic.pause();
        muteButton.textContent = 'Unmute Music';
    }
});

playAgainButton.addEventListener('click', () => {
    location.reload();
    menuElement.style.display = 'none';
    gameSceneElement.style.display = 'block';
});

document.addEventListener('gameFinished', () => {
    menuIcon.style.display = 'none';
    startButton.style.display = 'none';
    playAgainButton.style.display = 'block';
    menuElement.style.display = 'block';
    gameSceneElement.style.display = 'none';
    backgroundMusic.pause();
    muteButton.style.display = 'none';
});