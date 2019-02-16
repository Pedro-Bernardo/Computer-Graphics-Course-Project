class Stabilizer{
    constructor(base, length, pos, color) {
        var wing = new Wing(base, length, pos);
        this._geometry = wing.geometry;

        var mat1 = new THREE.MeshBasicMaterial( { color : color, wireframe: false} );
        var mat2 = new THREE.MeshLambertMaterial( { color : color, wireframe: false} );
        var mat3 = new THREE.MeshPhongMaterial( { color : color, wireframe: false} );
        this._materials = { "basic" :  mat1, "lambert": mat2, "phong": mat3 };

        this._mesh = new THREE.Mesh( this._geometry, this._materials["basic"]);
    }

    get mesh() {
        return this._mesh;
    }

    material(mat) {
        this._mesh.material = this._materials[mat];
    }
}