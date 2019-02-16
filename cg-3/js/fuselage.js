class Fuselage {
    constructor() {
        this._geometry = new THREE.Geometry();
        this._mesh;
        var mat1 = new THREE.MeshBasicMaterial( { color : 0xfff4c1, wireframe: false} );
        var mat2 = new THREE.MeshLambertMaterial( { color : 0xfff4c1, wireframe: false} );
        var mat3 = new THREE.MeshPhongMaterial( { color : 0xfff4c1, wireframe: false} );
        this._materials = { "basic" :  mat1, "lambert": mat2, "phong": mat3 };

        Utils.triangulated_plane_v(this._geometry, 50, 20, new THREE.Vector3(-10, 0, 0), 5, 2, 1);
        Utils.triangulated_plane_v(this._geometry, 50, 20, new THREE.Vector3(10, 0, 0), 5, 1, 2);
        Utils.triangulated_plane_h(this._geometry, 50, 20, new THREE.Vector3(0, -10, 0), 5, 1, 2);
        Utils.triangulated_plane_h(this._geometry, 50, 20, new THREE.Vector3(0, 10, 0), 5, 2, 1);

        Utils.triangulated_right_triangle_h(this._geometry, 10, 30, 2.5, new THREE.Vector3(0, -10, 25), 1, 1, 2, 1, 0);
        Utils.triangulated_right_triangle_h(this._geometry, 10, 30, 2.5, new THREE.Vector3(0, -10, 25),  1, -1, 2, 1, 0);
        Utils.triangulated_right_triangle_h(this._geometry, 10, 30, 2.5, new THREE.Vector3(0, 10, 25), 1, 1, 1, 2, 20);
        Utils.triangulated_right_triangle_h(this._geometry, 10, 30, 2.5, new THREE.Vector3(0, 10, 25),  1, -1, 1, 2, 20);

        Utils.triangulated_right_triangle_v(this._geometry, 20, 30, 2.5, new THREE.Vector3(10, -10, 25), 1, 1, 2, 1, 10);
        Utils.triangulated_right_triangle_v(this._geometry, 20, 30, 2.5, new THREE.Vector3(-10, -10, 25),  1, 1, 1, 2, -10);

        
        Utils.triangulated_right_triangle_h(this._geometry, 10, 70, 2, new THREE.Vector3(0, 10, -25), -1, 1, 2, 1, 0);
        Utils.triangulated_right_triangle_h(this._geometry, 10, 70, 2, new THREE.Vector3(0, 10, -25),  -1, -1, 2, 1, 0);
        Utils.triangulated_right_triangle_h(this._geometry, 10, 70, 2, new THREE.Vector3(0, -10, -25), -1, 1, 1, 2, -20);
        Utils.triangulated_right_triangle_h(this._geometry, 10, 70, 2, new THREE.Vector3(0, -10, -25),  -1, -1, 1, 2, -20);

        Utils.triangulated_right_triangle_v(this._geometry, 20, 70, 2.5, new THREE.Vector3(10, 10, -25), -1, -1, 1, 2, 10);
        Utils.triangulated_right_triangle_v(this._geometry, 20, 70, 2.5, new THREE.Vector3(-10, 10, -25),  -1, -1, 2, 1, -10);

        //the face normals and vertex normals can be calculated automatically if not supplied above
        this._geometry.computeFaceNormals();
        this._geometry.computeVertexNormals();

        this._mesh = new THREE.Mesh( this._geometry, this._materials["basic"]);
    }

    get mesh() {
        return this._mesh;
    }

    material(mat) {
        this._mesh.material = this._materials[mat];
    }
}