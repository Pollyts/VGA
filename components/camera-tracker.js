AFRAME.registerComponent('camera-tracker', {
    init: function() {
      this.previousPosition = this.el.object3D.position.clone();   
      console.log(this.el.object3D.rotation)         
      this.el.emit('camera-step', { position: new THREE.Vector3(Math.trunc(this.previousPosition.x),0, Math.trunc(this.previousPosition.z)) }, true);
    //   setTimeout(() => {
    //     this.el.object3D.rotation.set(0, 180, 0);
    //   }, "1000");
      
    },
    // tick: function() {
    //   const currentPosition = this.el.object3D.position.clone();
    //   if (!currentPosition.equals(this.previousPosition)) {
    //     this.el.emit('camera-step', { position: new THREE.Vector3(Math.trunc(currentPosition.x),0, Math.trunc(currentPosition.z)) }, true);
    //     this.previousPosition.copy(currentPosition);
    //   }
    // }

  });