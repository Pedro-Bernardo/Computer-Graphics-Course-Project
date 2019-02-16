class PauseScreen {
    constructor(width, height) {
        'use strict'
        var loader = new THREE.TextureLoader();
        this._obj = new THREE.Object3D();
        this._texture = loader.load("textures/pause2.jpg");
        this._geometry = new THREE.PlaneGeometry(width, height);
        this._material = new THREE.MeshBasicMaterial(
            { color:0xffffff, map: this._texture}
        );

        this._mesh = new THREE.Mesh(this._geometry, this._material);
        this._obj.add(this._mesh);
    }

    get mesh() {
        return this._mesh;
    }
}