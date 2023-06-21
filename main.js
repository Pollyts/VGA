import './style.css'
import 'aframe'
import 'aframe-physics-system'

// const backgroundMusic = document.getElementById('backgroundMusic');
// const menuElement = document.querySelector('#menu');
const startButton = document.querySelector('#startButton');
const gameSceneElement = document.querySelector('#app');
// const playAgainButton = document.querySelector('#playAgainButton');
// const resumeButton = document.querySelector('#resumeButton');
// const menuIcon = document.querySelector('#menuIcon');
// const muteButton = document.querySelector('#muteButton');
// const application = document.querySelector('#app');
// menuIcon.style.display = 'none';
gameSceneElement.style.display = 'none';
// playAgainButton.style.display = 'none';
// resumeButton.style.display = 'none';
// muteButton.style.display = 'none';
// application.style.display = 'none';


startButton.addEventListener('click', () => {
    // menuElement.style.display = 'none';
    gameSceneElement.style.display = 'block';
    //backgroundMusic.play();
    // menuIcon.style.display = 'block';
});

// menuIcon.addEventListener('click', () => {
//     menuElement.style.display = 'block';
//     playAgainButton.style.display = 'none';
//     gameSceneElement.style.display = 'none';
//     startButton.style.display = 'none';
//     menuIcon.style.display = 'none';
//     resumeButton.style.display = 'block';
//     muteButton.style.display = 'block';
// });

// resumeButton.addEventListener('click', () => {
//     menuElement.style.display = 'none';
//     playAgainButton.style.display = 'none';
//     gameSceneElement.style.display = 'block';
//     startButton.style.display = 'none';
//     menuIcon.style.display = 'block';
//     muteButton.style.display = 'none';
// });

// muteButton.addEventListener('click', () => {
//     if (backgroundMusic.paused) {
//         backgroundMusic.play();
//         muteButton.textContent = 'Mute Music';
//     } else {
//         backgroundMusic.pause();
//         muteButton.textContent = 'Unmute Music';
//     }
// });

// playAgainButton.addEventListener('click', () => {
//     location.reload();
//     menuElement.style.display = 'none';
//     gameSceneElement.style.display = 'block';
// });

// document.addEventListener('gameFinished', () => {
//     menuIcon.style.display = 'none';
//     startButton.style.display = 'none';
//     playAgainButton.style.display = 'block';
//     menuElement.style.display = 'block';
//     gameSceneElement.style.display = 'none';
//     backgroundMusic.pause();
//     muteButton.style.display = 'none';
// });




document.querySelector('#app').innerHTML = `
<div id="menuIcon">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-house-gear" viewBox="0 0 16 16">
  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z"/>
  <path d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.044c-.613-.181-.613-1.049 0-1.23l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
</svg>
</div>

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
            <a-asset-item id="mine" src="/models/blender_mine.glb"></a-asset-item>
            <a-asset-item id="flag" src="/models/blender_flag.glb"></a-asset-item>
            <img id="sky" src="/models/sky.jpg">
        </a-assets>

        <a-sky src="#sky" theta-length="90" radius="30"></a-sky>        

        <div id="field">
        
        </div>

        

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
    </a-scene>
`