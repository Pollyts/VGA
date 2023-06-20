import './style.css'
import 'aframe'
import 'aframe-physics-system'

document.querySelector('#app').innerHTML = `

<a-scene>
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