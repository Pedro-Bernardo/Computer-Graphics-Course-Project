class Spotlight {
    constructor(x, y, z, rot_y, rot_z) {
        this._spotLight = new THREE.SpotLight( 0xffffff );
        this._obj = new THREE.Object3D();
        this._obj.add(this._spotLight);

        this._cone_material = new THREE.MeshBasicMaterial( { color : 0x2f4b8c, wireframe: false} );
        this._bulb_materials = [new THREE.MeshBasicMaterial( {color: 0xa8a8a8, transparent: true, opacity: 0.5, wireframe: false }), new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: false })];

        // cria candeeiro
        var geometry = new THREE.ConeGeometry(10, 20, 30);
        var mesh = new THREE.Mesh(geometry, this._cone_material);
        this._obj.add(mesh);
        this._cone = mesh;

        // cria lampada
        geometry = new THREE.SphereGeometry(5, 25, 25)
        mesh = new THREE.Mesh(geometry, this._bulb_materials[this._spotLight.intensity]);
        mesh.position.y -= 10;
        this._obj.add(mesh);
        this._bulb = mesh;
        
        // set positions
        this._obj.rotation.y = rot_y;
        this._obj.rotation.z = rot_z;
        this._obj.position.set(x, y, z);

        this._spotLight.position.y -= 10;
        this._spotLight.target = scene;
    }

    get obj() {
        return this._obj;
    }

    toggle() {
        var index = (this._spotLight.intensity == 1) ? 0 : 1;
        
        this._bulb.material = this._bulb_materials[index];
        this._spotLight.intensity = index;
    }
}