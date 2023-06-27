AFRAME.registerComponent('raycaster-listen', {
	init: function () {
    // Use events to figure out what raycaster is listening so we don't have to
    // hardcode the raycaster.
    this.el.addEventListener('raycaster-intersected', evt => {
      this.raycaster = evt.detail.el;
      this.intersection = this.raycaster.components.raycaster.getIntersection(this.el)
    });
    this.el.addEventListener('raycaster-intersected-cleared', evt => {
      this.raycaster = null;
      this.intersection=null;
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Space') {
          // Change the color of the intersected entity
          if(!this.intersection){
            return
          }
          //console.log(this.intersection);

          const cameraPosition = this.intersection.object.el.object3D.position;
          this.intersection=null;
          this.raycaster = null;
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
              cube.setAttribute('static-body', '');
              cube.setAttribute("scale", "1 0.1 1");
              //currentObject.parentNode.removeChild(currentObject);
              scene.appendChild(cube);
              
            }

          }
        }
      }    
    }

        if (event.key === 'e') {
            if(!this.intersection){
              return
            }
            console.log(this.intersection);
  
            const cameraPosition = this.intersection.object.el.object3D.position;
            // this.intersection=null;
            // this.raycaster = null;
        const flagObjects = document.querySelectorAll('[position][flag]');
        //const cubeObjects = document.querySelectorAll('[position]');
        let wasFlag=false;

        for (let i = 0; i < flagObjects.length; i++) {
          const objectPosition = flagObjects[i].object3D.position;
          if (objectPosition.equals(cameraPosition)) {
            wasFlag = true;
            var currentObject = flagObjects[i];
            currentObject.parentNode.removeChild(currentObject);                     
            }
          }

          if(!wasFlag)
          {

            const objects = document.querySelectorAll('[position]');
      for (let i = 0; i < objects.length; i++) {
        const objectPosition = objects[i].object3D.position;
        if (objectPosition.equals(cameraPosition)) {
          var currentObject = objects[i];
          if (currentObject.hasAttribute('zero')) {            
              var scene = document.querySelector('#gameScene');
              var flag = document.createElement("a-entity");             

              flag.setAttribute("position", `${currentObject.object3D.position.x} ${currentObject.object3D.position.y} ${currentObject.object3D.position.z}`);
              flag.setAttribute('gltf-model', '#flag');
              flag.setAttribute('flag');
              flag.setAttribute('static-body', '');
              scene.appendChild(flag);           
              
            }

          }
        }
      }       
          }

      });
  },

//   tick: function () {
//     if (!this.raycaster) { return; }  // Not intersecting.

//     let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
//     if (!intersection) { return; }
//   }
});

// AFRAME.registerComponent('collider-check', {
//     dependencies: ['raycaster'],
  
//     init: function () {  
//         this.object = null;      
//       this.el.addEventListener('raycaster-intersection', function () {
//         this.object = 
//         console.log('Player hit something!');
//       });
//     }
//   });