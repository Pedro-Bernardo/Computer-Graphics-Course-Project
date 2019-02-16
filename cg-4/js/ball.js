class Ball{
    constructor(radius, x, y, z) {
        this._radius = radius;
        this._obj = new THREE.Object3D();
        var textureLoader = new THREE.TextureLoader();
        this._texture = new textureLoader.load("textures/poolballs4.png");

        this._geometry = new THREE.SphereGeometry(this._radius, 35, 35);
        var pMat = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x303030, shininess: 25, map: this._texture});
        var bMat = new THREE.MeshBasicMaterial({ color: 0xffffff, map: this._texture}); 

        this._mesh = new SceneMesh(pMat, bMat, this._geometry);
        this._mesh.position.set(x, y + this._radius, z);
        
        this._obj.add(this._mesh);

        this._angle = 0;
        this._accel_val = Math.PI/8;
        this._accel = Math.PI/8;
        this._speedlimit = 2*Math.PI;
        this._speed = 0;
        this._speedtolerance = Math.PI/512;
        this.moving = false;
        this._sign = 1;
        this._animate = false;
        this._mesh.rotation.y=Math.PI/2;
        
    }

    get mesh() {
        return this._mesh;
    }


    move(center) {
        var delta_t = current_time - time;
        var old_angle = this._angle;
        var vector = new THREE.Vector3(this._mesh.position.x - center.x, this._mesh.position.y - (center.y + this._radius), this._mesh.position.z - center.z);
        //calculate new speed
        this._accel = 0;
        if(this._speed < this._speedlimit - this._speedtolerance || !this.moving) {
            if(this.moving) {
                this._accel = this._accel_val;
            } else {
                this._accel = -5*this._accel_val;
            }
        }

        this._speed = this._speed + this._accel * delta_t

        if(!this.moving && this._speed < this._speedtolerance) {
            this._speed = 0;
            this._animate = false;
            return;
        }

        this._angle += this._speed * delta_t;
    
        this._mesh.rotation.y = Math.PI/2-this._angle;
        this._mesh.rotation.z += (this._angle - old_angle) * vector.length() / this._radius;

        this._mesh.position.x = center.x + Math.cos(this._angle) * vector.length();
        this._mesh.position.z = center.z + Math.sin(this._angle) * vector.length();

    }

    animate(center) {
        if(this._animate) {
            this.move(center)
        }
    }

    swap() {
        this._mesh.swap();
    }

    toggle() {
        if(this._animate == false)
            this._animate = true;

        this.moving = !this.moving;
        this._sign = (this._sign == 1) ? -1 : 1;
    }

    toggle_wireframe() {
        this._mesh.toggle_wireframe();
    }
}