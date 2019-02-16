class BallCamera extends Ball {
    constructor(radius, angle, x, z) {
        'use strict';
        super(radius, angle, x, z);
        // create camera

        camera_aspect = 16/9;
        window_start_width = window.innerWidth;
        window_start_height = window.innerHeight;

        this.start_width = playground.height*4*(16/9);
        this.start_height = playground.height*4;
        let local_width = this.start_width;
        let local_height = this.start_height;

        window_ratio = window_start_width / window_start_height;

        if(window_ratio < camera_aspect) {
            local_height = local_width / window_ratio;

        } else if( window_ratio > camera_aspect) {
            local_width = local_height * window_ratio;
        }
        
        ball_camera = new THREE.PerspectiveCamera(45,
            local_width / local_height,
            1,
            1000);
            
        
        this.dis=Math.tan(45/2*Math.PI/180)*local_height;
        ball_camera.position.x = this._mesh.position.x - this.dis*Math.cos(30*Math.PI/180)*Math.cos(this.rotation);
        ball_camera.position.y = this._mesh.position.y+this.dis*Math.sin(30*Math.PI/180);
        ball_camera.position.z = this._mesh.position.z + this.dis*Math.cos(30*Math.PI/180)*Math.sin(this.rotation);
        ball_camera.lookAt(new THREE.Vector3( this._mesh.position.x, this._mesh.position.y + 0.5*this.radius, this._mesh.position.z));
    }

    translate(distance) {
        'use strict'
        // callculate the correct vector
        this._mesh.translateOnAxis(new THREE.Vector3(Math.cos(this.rotation_z), -Math.sin(this.rotation_z), 0), distance);
        ball_camera.position.x = this._mesh.position.x - this.dis*Math.cos(30*Math.PI/180)*Math.cos(this.rotation);
        ball_camera.position.y = this.radius+this.dis*Math.sin(30*Math.PI/180);
        ball_camera.position.z = this._mesh.position.z + this.dis*Math.cos(30*Math.PI/180)*Math.sin(this.rotation);
        ball_camera.lookAt(new THREE.Vector3( this._mesh.position.x, this._mesh.position.y + 0.5*this.radius, this._mesh.position.z ));
    }
    resize(){
        'use strict'
        let local_width = this.start_width;
        let local_height = this.start_height;

        window_ratio = window.innerWidth / window.innerHeight;

        if(window_ratio < camera_aspect) {
            local_height = local_width / window_ratio;

        } else if( window_ratio > camera_aspect) {
            local_width = local_height * window_ratio;
        }
        ball_camera.aspect=local_width/local_height;
        this.dis=Math.tan(45/2*Math.PI/180)*local_height;
        ball_camera.position.x = this._mesh.position.x - this.dis*Math.cos(30*Math.PI/180)*Math.cos(this.rotation);
        ball_camera.position.y = this.radius+this.dis*Math.sin(30*Math.PI/180);
        ball_camera.position.z = this._mesh.position.z + this.dis*Math.cos(30*Math.PI/180)*Math.sin(this.rotation);
        ball_camera.lookAt(new THREE.Vector3( this._mesh.position.x, this._mesh.position.y + 0.5*this.radius, this._mesh.position.z ));
        ball_camera.updateProjectionMatrix();
    }
}