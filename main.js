import './style.css'
import 'aframe'
import 'aframe-physics-system'

document.querySelector('#app').innerHTML = `
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
    </a-scene>
`