class Cockpit {
    constructor() {
        this._geometry = new THREE.Geometry();
        this._mesh;
        
        var mat1 = new THREE.MeshBasicMaterial( { color : 0xc1d8ff, wireframe: false} );
        var mat2 = new THREE.MeshPhongMaterial( { color : 0xc1d8ff, wireframe: false} );
        var mat3 = new THREE.MeshLambertMaterial( { color : 0xc1d8ff, wireframe: false} );
        this._materials = { "basic" :  mat1, "lambert": mat2, "phong": mat3 };

        Utils.triangulated_plane_v(this._geometry, 10, 8, new THREE.Vector3(40, 0 + 8/2, 0), 1, 1, 2);
        Utils.triangulated_plane_h(this._geometry, 10, 12, new THREE.Vector3(40 - 12/2, 8, 0), 1, 2, 1);

        Utils.triangulated_right_triangle_v2(this._geometry, 8, 12, 1, new THREE.Vector3(40, 8, -5), -1, -1, 1, 2, 0);
        Utils.triangulated_right_triangle_v2(this._geometry, 8, 12, 1, new THREE.Vector3(40, 8, 5),  -1, -1, 2, 1, 0);

        
        this._geometry.computeFaceNormals();
        this._geometry.computeVertexNormals();

        this._mesh = new THREE.Mesh( this._geometry, this._materials["basic"]);
    }

    get mesh(){ 
        return this._mesh;ick
    }

    material(mat) {
        this._mesh.material = this._materials[mat];
    }
}