class Ball {
    constructor(radius, angle, x, z) {
        'use strict';
        var geometry = new THREE.SphereGeometry(radius, 50, 50);
    
        this._radius = radius;
        this._obj = new THREE.Object3D();
        if(color_flag) {
            this._material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
            color_flag = !color_flag;
        } else {
            this._material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        }
            
        this._mesh = new THREE.Mesh(geometry, this._material);
        this._mesh.position.set(x, radius, z);
        this._mesh.rotation.y = angle;
        this._speed_val = Utils.rand_between(50, 70);
        this._prev_x = x;
        this._prev_z = z;
        let axis = new THREE.AxisHelper(11);
        axis.name = "axis";
        this._mesh.add(axis);
        this._obj.add(this.mesh);
        this._speedx = Math.cos(angle) * this._speed_val;
        this._speedz = -Math.sin(angle) * this._speed_val;
    }

    get radius() {
        'use strict';
        return this._radius;
    }

    get mesh() {
        'use strict';
        return this._mesh;
    }

    get rotation(){
        'use strict';
        return this._mesh.rotation.y;
    }

    set rotation(angle) {
        'use strict';
        this._mesh.rotation.y = angle;
    }

    get rotation_z(){
        'use strict';
        return this._mesh.rotation.z;
    }

    get vel() {
        return this._speed_val;
    }
    set vel(v) {
        'use strict';
        this._speed_val = v;
    }

    set rotation_z(angle) {
        'use strict';
        this._mesh.rotation.z = angle;
    }

    get speed_vector() {
        return new THREE.Vector3(this._speedx, 0, this._speedz);
    }

    get center() {
        return new THREE.Vector3(this._mesh.position.x, 0, this._mesh.position.z);
    }

    update_speed(vec) {
        // calcula novo angulo e _speedval;
        vec.z = - vec.z;

        var angle = Utils.calc_angle(vec);

        //alert("oi");
        this._speed_val = vec.length();
        this.rotation = angle;
        this.update_speed_vector();
    }

    level_up(factor) {
        this._speed_val *= factor;
    }

    translate(distance) {
        // callculate the correct vector
        this._mesh.translateOnAxis(new THREE.Vector3(Math.cos(this.rotation_z), -Math.sin(this.rotation_z), 0), distance);
    }

    translate_correction(vector){
        b1.mesh.translateOnAxis(vector, -extra/2);
    }

    animate() {
        'use strict';
        delta_t;
        delta_x;
        var roll;
        this._prev_x = this._mesh.position.x;
        this._prev_z = this._mesh.position.z;
        
        delta_t = current_temp - temp;
        
        delta_x = this._speed_val * delta_t;
        // calculate ball roll through it's radius
        roll = delta_x / this.radius;
        this.translate(delta_x);
        this.rotation_z = this.rotation_z - roll;
    
    }

    update_speed_vector() {
        this._speedx = Math.cos(this.rotation) * this._speed_val;
        this._speedz = -Math.sin(this.rotation) * this._speed_val;
    }

    collision_walls(base_x, base_z) {
        'use strict';
        var pos = this._mesh.position;
        var top = new THREE.Vector3(pos.x, this._radius, -base_z/2)
        var bot = new THREE.Vector3(pos.x, this._radius, base_z/2)
        var l = new THREE.Vector3(-base_x/2, this._radius, pos.z) 
        var r = new THREE.Vector3(base_x/2, this._radius, pos.z) 
        var sign = Math.sign(this.rotation);
        //var delta_x = this._speed_val * (delta_t);
        var extra = 0, factor = 1;

        // colidi com em cima
        if(Utils.colliding(pos, top, this._radius) || pos.z < top.z){
            factor = Math.abs(Math.sin(this.rotation));

            // se a velocidade e tao grande que o centro da esfera passou a parede, o calculo e diferente
            // isto nao funciona mt bem, mas e quase impossivel por isto bem para velocidades tao altas

            if(pos.z < top.z) { 
                extra = Utils.distance(pos, top) + this.radius;
            } else {
                extra = this._radius - Utils.distance(pos, top)
            }
            // volta atras o que andou a mais, troca o angulo, e anda para a frente o que andou a mais
            this.translate(-Math.abs(extra / factor));
            this.rotation = -this.rotation;
            this.translate(Math.abs(extra / factor));
            this.update_speed_vector();
            

            // colidi com em baixo
        } else if(Utils.colliding(pos, bot, this._radius) || pos.z > bot.z) {
            factor = Math.abs(Math.sin(this.rotation));
            //this.rotation = -this.rotation;
            if(pos.z > bot.z) {
                extra = Utils.distance(pos, bot) + this.radius;
            } else {
                extra = this._radius - Utils.distance(pos, bot)
            }
            this.translate(-Math.abs(extra / factor));
            this.rotation = -this.rotation;
            this.translate(Math.abs(extra / factor));
            this.update_speed_vector();
            
            // colidi com a esquerda
        } else if(Utils.colliding(pos, l, this._radius) || pos.x < l.x){
            factor = Math.abs(Math.cos(this.rotation));
            if(pos.x < l.x) {
                extra = Utils.distance(pos, l) + this.radius;
            } else {
                extra = this._radius - Utils.distance(pos, l)
            }
            this.translate(-Math.abs(extra / factor));
            this.rotation = sign * Math.PI/2 + ((sign * Math.PI/2) - this.rotation);
            this.translate(Math.abs(extra / factor));
            this.update_speed_vector();
            
            // colidi com a direita
        } else if (Utils.colliding(pos, r, this._radius) || pos.x > r.x) {
            factor = Math.abs(Math.cos(this.rotation));
            
            if(pos.x > r.x) {
                extra = Utils.distance(pos, r) + this.radius;
            } else {
                extra = this._radius - Utils.distance(pos, r)
            }
            this.translate(-Math.abs(extra / factor));
            this.rotation = sign * Math.PI/2 + ((sign * Math.PI/2) - this.rotation);
            this.translate(Math.abs(extra / factor));
            this.update_speed_vector();
        }

        return extra > 0;
    }

    static colliding(b1, b2) {
        'use strict';
        return Utils.colliding(b1.mesh.position, b2.mesh.position, b1.radius + b2.radius);
    }   

    static swap_speeds(b1, b2) {
        var aux;
        aux = b1.vel;
        b1.vel = b2.vel;
        b2.vel = aux;
    }
}

