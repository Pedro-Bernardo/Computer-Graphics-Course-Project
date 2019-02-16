class Wing{
    constructor(base, length, pos, size) {
        this._geometry = new THREE.Geometry();
        this._mesh;
        var mat1 = new THREE.MeshBasicMaterial( { color : 0xa50000, wireframe: false} );
        var mat2 = new THREE.MeshPhongMaterial( { color : 0xa50000, wireframe: false} );
        var mat3 = new THREE.MeshLambertMaterial( { color : 0xa50000, wireframe: false} );
        this._materials = { "basic" :  mat1, "lambert": mat2, "phong": mat3 };

        Utils.triangulated_plane_h(this._geometry, length, base/2, new THREE.Vector3(pos.x, pos.y, pos.z - length/2), 2.5, 1, 2);
        Utils.triangulated_right_triangle_h(this._geometry, base/2, length, 1, new THREE.Vector3(pos.x + base/4, pos.y, pos.z), -1, 1, 1, 2, 0);


        Utils.triangulated_plane_h(this._geometry, length, base/2, new THREE.Vector3(pos.x, pos.y, pos.z - length/2), 2.5, 2, 1);
        Utils.triangulated_right_triangle_h(this._geometry, base/2, length, 1, new THREE.Vector3(pos.x + base/4, pos.y, pos.z), -1, 1, 2, 1, 0);


        this._geometry.computeFaceNormals();
        this._geometry.computeVertexNormals();

        this._mesh = new THREE.Mesh( this._geometry, this._materials["basic"]);
    }

    get mesh() {
        return this._mesh;
    }

    get geometry() {
        return this._geometry;
    }

    material(mat) {
        this._mesh.material = this._materials[mat];
    }
}