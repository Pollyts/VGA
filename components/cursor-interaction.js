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
      this.intersection = null;
    });

    document.addEventListener('keydown', event => {
      if (event.code === 'Space') {
        if (!this.intersection) {
          return
        }
        //console.log(this.intersection);

        const cameraPosition = this.intersection.object.el.object3D.position;
        this.intersection = null;
        this.raycaster = null;

        openCell(cameraPosition);
      }

      if (event.key === 'e') {
        if (!this.intersection) {
          return
        }
        console.log(this.intersection);

        const cameraPosition = this.intersection.object.el.object3D.position;
        // this.intersection=null;
        // this.raycaster = null;
        const flagObjects = document.querySelectorAll('[position][flag]');
        //const cubeObjects = document.querySelectorAll('[position]');
        let wasFlag = false;

        for (let i = 0; i < flagObjects.length; i++) {
          const objectPosition = flagObjects[i].object3D.position;
          if (objectPosition.equals(cameraPosition)) {
            wasFlag = true;
            var currentObject = flagObjects[i];
            currentObject.parentNode.removeChild(currentObject);
          }
        }

        if (!wasFlag) {

          const objects = document.querySelectorAll('[position]');
          for (let i = 0; i < objects.length; i++) {
            const objectPosition = objects[i].object3D.position;
            if (objectPosition.equals(cameraPosition)) {
              var currentObject = objects[i];
              if (currentObject.hasAttribute('zero')) {
                if (currentObject.getAttribute('count') == 0) {
                  const spanElement = document.getElementById('bombFoundCount');
                  const spanText = spanElement.textContent;
                  const currentValue = parseInt(spanText);
                  const newValue = currentValue + 1;
                  const mines = document.getElementById('inputMines').value;
                  spanElement.textContent = newValue.toString() + '/' + mines.toString();
                }
                var scene = document.querySelector('#gameScene');
                var flag = document.createElement("a-entity");

                flag.setAttribute("position", `${currentObject.object3D.position.x} ${currentObject.object3D.position.y} ${currentObject.object3D.position.z}`);
                flag.setAttribute('gltf-model', '#flag');
                flag.setAttribute('flag');
                flag.setAttribute('static-body', '');
                scene.appendChild(flag);

                currentObject.setAttribute('withFlag')

              }

            }
          }
        }
        else {
          const objects = document.querySelectorAll('[position]');
          for (let i = 0; i < objects.length; i++) {
            const objectPosition = objects[i].object3D.position;
            if (objectPosition.equals(cameraPosition)) {
              var currentObject = objects[i];
              if (currentObject.hasAttribute('withFlag')) {
                if (currentObject.getAttribute('count') == 0) {
                  const spanElement = document.getElementById('bombFoundCount');
                  const spanText = spanElement.textContent;
                  const currentValue = parseInt(spanText);
                  const newValue = currentValue - 1;
                  const mines = document.getElementById('inputMines').value;
                  spanElement.textContent = newValue.toString() + '/' + mines.toString();

                }
                currentObject.removeAttribute('withFlag')
              }
            }
          }
        }
      }

    });
  },
});

function openCell(selectedPosition) {

  var width = document.getElementById('inputWidth').value;
  var height = document.getElementById('inputHeight').value;
  var mines = document.getElementById('inputMines').value;

  const allCellsCount = width * height - mines;

  const objects = document.querySelectorAll('[position]');
  for (let i = 0; i < objects.length; i++) {
    const objectPosition = objects[i].object3D.position;
    if (objectPosition.equals(selectedPosition)) {
      var currentObject = objects[i];
      if (currentObject.hasAttribute('withFlag')) {
        return;
      }
      if (currentObject.hasAttribute('zero')) {
        currentObject.removeAttribute('zero');
        const spanElement = document.getElementById('openCellsCount');
        const spanText = spanElement.textContent;
        const currentValue = parseInt(spanText);
        const newValue = currentValue + 1;
        spanElement.textContent = newValue.toString() + '/' + allCellsCount.toString();
        var scene = document.querySelector('#gameScene');
        if (currentObject.getAttribute('count') === 'null') {
          var cube = document.createElement("a-entity");

          cube.setAttribute("position", `${currentObject.object3D.position.x} ${currentObject.object3D.position.y} ${currentObject.object3D.position.z}`);
          cube.setAttribute('gltf-model', '#cubeZeroLight');
          cube.setAttribute("scale", "1 0.1 1");
          cube.setAttribute('count', currentObject.getAttribute('count'));
          cube.setAttribute('static-body', '');
          openCell(new THREE.Vector3(currentObject.object3D.position.x + 2, 0, currentObject.object3D.position.z));
          openCell(new THREE.Vector3(currentObject.object3D.position.x - 2, 0, currentObject.object3D.position.z));
          openCell(new THREE.Vector3(currentObject.object3D.position.x, 0, currentObject.object3D.position.z + 2));
          openCell(new THREE.Vector3(currentObject.object3D.position.x, 0, currentObject.object3D.position.z - 2));
          openCell(new THREE.Vector3(currentObject.object3D.position.x + 2, 0, currentObject.object3D.position.z + 2));
          openCell(new THREE.Vector3(currentObject.object3D.position.x - 2, 0, currentObject.object3D.position.z - 2));
          openCell(new THREE.Vector3(currentObject.object3D.position.x - 2, 0, currentObject.object3D.position.z + 2));
          openCell(new THREE.Vector3(currentObject.object3D.position.x + 2, 0, currentObject.object3D.position.z - 2));
          currentObject.parentNode.removeChild(currentObject);
          scene.appendChild(cube);
        }
        else if (currentObject.getAttribute('count') == 0) {

          var cube = document.createElement("a-entity");

          cube.setAttribute("position", `${currentObject.object3D.position.x} ${currentObject.object3D.position.y} ${currentObject.object3D.position.z}`);
          cube.setAttribute('gltf-model', '#mine');
          cube.setAttribute('count', currentObject.getAttribute('count'));
          cube.setAttribute('static-body', '');
          currentObject.parentNode.removeChild(currentObject);
          scene.appendChild(cube);
          const gameFinish = document.querySelector('#gameFinish');
          gameFinish.removeAttribute('style');
          const camera = document.querySelector("#camera");
          camera.removeAttribute("wasd-controls");
          const timerView = document.getElementById('timeSpent');
          const timer = document.getElementById('timer');
          timerView.textContent = timer.textContent;
        }
        else {

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


  // var width = document.getElementById('inputWidth').value;
  // var height = document.getElementById('inputHeight').value;
  // var mines = document.getElementById('inputMines').value;

  // const allCellsCount = width * height - mines;
  console.log(allCellsCount)

  //win the game
  const spanElement = document.getElementById('openCellsCount');
  const spanText = spanElement.textContent;
  const currentValue = parseInt(spanText);

  if (currentValue == allCellsCount) {

    const gameFinish = document.querySelector('#gameFinish');
    const gameStatus = document.querySelector('#gameStatus');
    gameStatus.textContent = 'CONGRATS!'
    gameFinish.removeAttribute('style');
    const camera = document.querySelector("#camera");
    camera.removeAttribute("wasd-controls");
    const timerView = document.getElementById('timeSpent');
    const timer = document.getElementById('timer');
    timerView.textContent = timer.textContent;
  }


}