class Playground {
    constructor(width) {
        'use strict';
        this._thickness = 2;
        this._base_x = width;
        this._base_z = width / 2;
        this._balls = [];
        this._wall_y =  Math.sqrt((5/4) * Math.pow(width, 2)) / 10;
        this._field = new THREE.Object3D();
        this._base_material = new THREE.MeshBasicMaterial({ color: 0x3e3e3e, wireframe: true });
        this._wall_material = new THREE.MeshBasicMaterial({ color: 0x9e9e9e, wireframe: true });

        // creating base
        var geometry = new THREE.CubeGeometry(this._base_x + 2 * this._thickness, this._thickness, this._base_z + 2 * this._thickness);
        var mesh = new THREE.Mesh(geometry, this._base_material);
        mesh.position.set(0, -this._thickness/2, 0);
        this._field.add(mesh);

        // creating longer walls
        geometry = new THREE.CubeGeometry(this._base_x, this._wall_y, this._thickness);
        var mesh = new THREE.Mesh(geometry, this._wall_material);
        mesh.position.set(0, this._wall_y/2, this._base_z/2 + this._thickness/2);
        this._field.add(mesh);
        
        var mesh = new THREE.Mesh(geometry, this._wall_material);
        mesh.position.set(0, this._wall_y/2, -(this._base_z/2 + this._thickness/2));
        this._field.add(mesh);


        // creating smaller walls
        geometry = new THREE.CubeGeometry(this._thickness, this._wall_y, this._base_z + 2 * this._thickness);
        var mesh = new THREE.Mesh(geometry, this._wall_material);
        mesh.position.set(this._base_x/2 + this._thickness/2, this._wall_y/2, 0);
        this._field.add(mesh);
        
        var mesh = new THREE.Mesh(geometry, this._wall_material);
        mesh.position.set(-(this._base_x/2 + this._thickness/2), this._wall_y/2, 0);
        this._field.add(mesh);

    }

    get obj() {
        return this._field;
    }

    get height() {
        return this._wall_y;
    }

    level_up(factor) {
        for(let i = 0; i < this._balls.length; i++){
            this._balls[i].level_up(factor);
        }
    }

    addBall(radius) {
        var pos_x;
        var pos_z;
        var vec;
        var collision;
        var angle = Utils.rand_between(Math.PI, -Math.PI);
        var ball;

        do {
            pos_x = Utils.rand_between(this._base_x/2 - radius, - (this._base_x/2 - radius));
            pos_z = Utils.rand_between(this._base_z/2 - radius, - (this._base_z/2 - radius));
            vec = new THREE.Vector3(pos_x, radius, pos_z);

            collision = false;
            for(let i = 0; i < this._balls.length; i++) {
                if(Utils.colliding(vec, this._balls[i].mesh.position, 2*radius))
                    collision = true;
            }

        } while(collision);

        if(this._balls.length == 0) {
            ball = new BallCamera(radius, angle, pos_x, pos_z);
        } else {
            ball = new Ball(radius, angle, pos_x, pos_z);
        }
        this._balls.push(ball);

        this._field.add(ball.mesh);
    }

    handle_collision(b1, b2) {
        // calculate b1 new speed
        var vdiff = new THREE.Vector3(b1.speed_vector.x - b2.speed_vector.x, 0, b1.speed_vector.z - b2.speed_vector.z);
        var cdiff = new THREE.Vector3(b1.center.x - b2.center.x, 0, b1.center.z - b2.center.z);
        var cnorm = Math.pow(cdiff.length(), 2);
        var factor = vdiff.dot(cdiff) / cnorm;
        cdiff.multiplyScalar(factor);

        var b1_vec = new THREE.Vector3(b1.speed_vector.x - cdiff.x, 0, b1.speed_vector.z - cdiff.z);

        // calculate b2 new speed
        cdiff = new THREE.Vector3(b2.center.x - b1.center.x, 0, b2.center.z - b1.center.z);
        vdiff.negate();
        factor = vdiff.dot(cdiff) / cnorm;
        cdiff.multiplyScalar(factor);

        var b2_vec = new THREE.Vector3(b2.speed_vector.x - cdiff.x, 0, b2.speed_vector.z - cdiff.z);

        // trocar os speed_val
        if(b1_vec.length()!=b2.vel){
            b1_vec.multiplyScalar(b2.vel/b1_vec.length());
        }
        if(b2_vec.length()!=b1.vel){
            b2_vec.multiplyScalar(b1.vel/b2_vec.length());
        }
        

        var extra = 2 * b1.radius - Utils.distance(b1.center, b2.center);
        var correction_vector = new THREE.Vector3(b1.center.x - b2.center.x, 0, b1.center.z - b2.center.z);
        var angle = Utils.calc_angle(correction_vector);
        b1.mesh.position.x += Math.cos(angle)*extra + extra/10;
        b1.mesh.position.z += Math.sin(angle)*extra + extra/10;
        
        b1.update_speed(b1_vec);
        b2.update_speed(b2_vec);
    }

    animateBalls() {
        var i;
        for(i = 0; i < this._balls.length; i++){
            if(axis_control) {
                if(axis_flag) {
                    let axis = new THREE.AxisHelper(11);
                    axis.name = "axis"
                    this._balls[i].mesh.add(axis);
                } else {
                    this._balls[i].mesh.remove(this._balls[i].mesh.getObjectByName("axis"));
                }
            }
            this._balls[i].animate();
            this._balls[i].collision_walls(this._base_x, this._base_z)
            for(let j = i + 1; j < this._balls.length; j++) {
                if(Ball.colliding(this._balls[i], this._balls[j])) {
                    this.handle_collision(this._balls[i], this._balls[j]);
                }
            }
        }
        axis_control = false;
    }

    
}
