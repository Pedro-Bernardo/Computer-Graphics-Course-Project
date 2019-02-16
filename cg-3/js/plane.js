class Plane {
    constructor() {
        this._obj = new THREE.Object3D();
        this._angle_x = 0
        this._angle_y = 0
        this._angular_velocity = Math.PI/2;

        this._fuselage = new Fuselage();
        this._fuselage.mesh.add(new THREE.AxisHelper(20));
        this._fuselage.mesh.rotation.y = Math.PI/2;

        this._wingl = new Wing(20, 70, new THREE.Vector3(0, 0, -10));
        this._wingr = new Wing(20, 70, new THREE.Vector3(0, 0, -10));
        this._hstabl = new Stabilizer(10, 20, new THREE.Vector3(0, 0, 0), 0xffffff);
        this._hstabr = new Stabilizer(10, 20, new THREE.Vector3(0, 0, 0), 0xffffff);
        this._vstab = new Stabilizer(10, 25, new THREE.Vector3(0, 0, 0), 0x5b0a0a);

        this._vstab.mesh.rotation.x = Math.PI/2
        this._vstab.mesh.position.x = -80
        this._vstab.mesh.position.y = 10
        
        
        this._hstabl.mesh.rotation.y = Math.PI/2 - Math.atan(7);
        this._hstabr.mesh.rotation.y = -(Math.PI/2 - Math.atan(7)); 
        
        // set it in position
        this._hstabl.mesh.position.x = -80
        this._hstabl.mesh.position.y = 8
        this._hstabl.mesh.position.z = -2.1

        this._hstabr.mesh.rotation.y += Math.PI
        this._hstabr.mesh.rotation.z = Math.PI
 
        // set it in position
        this._hstabr.mesh.position.x = -80
        this._hstabr.mesh.position.y = 8
        this._hstabr.mesh.position.z = 2.1
        //this._vstabl.mesh.position.z = -12.75;
        // rodar a asa
        this._wingr.mesh.rotation.y = Math.PI
        this._wingr.mesh.rotation.z = Math.PI


        // criar cockpit
        this._cockpit = new Cockpit();


        this._parts = [this._cockpit, this._wingl, this._wingr, this._hstabl, this._hstabr, this._vstab, this._fuselage]

        this._obj.add(this._cockpit.mesh);
        this._obj.add(this._wingl.mesh);
        this._obj.add(this._wingr.mesh);
        this._obj.add(this._hstabl.mesh);
        this._obj.add(this._hstabr.mesh);
        this._obj.add(this._vstab.mesh);
        this._obj.add(this._fuselage.mesh);
        this._obj.add(new THREE.AxisHelper(20));
    }

    get obj(){
        return this._obj;
    }

    rotate() {
        var delta_t = current_time - time;
        var to_rotate = delta_t * this._angular_velocity;

        if(left_arrow && right_arrow) {
            // do nothing
        } else if(left_arrow){
            this._obj.rotation.y  = this._obj.rotation.y + to_rotate
        } else if(right_arrow) {
            this._obj.rotation.y  = this._obj.rotation.y - to_rotate
        }

        if(up_arrow && down_arrow) {
            // do nothing
        } else if(up_arrow){
            this._obj.rotation.z  = this._obj.rotation.z - to_rotate
        } else if(down_arrow) {

           this._obj.rotation.z  = this._obj.rotation.z + to_rotate
        }
    }

    update_material() {
        for(let i = 0; i < this._parts.length; i++){
            if(basic_material) {
                this._parts[i].material("basic");
            } else {
                this._parts[i].material(materials[current_material]);
                //this._parts[i].material = materials[current_material];
            }
        }
    }
}

