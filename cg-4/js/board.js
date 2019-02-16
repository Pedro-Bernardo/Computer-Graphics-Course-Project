class Board {
    constructor() {
        this._obj = new THREE.Object3D();
        var textureLoader = new THREE.TextureLoader();
        this._texture = new textureLoader.load('textures/chess_big_2.jpg');

        this._geometry = new THREE.BoxGeometry(150, 1, 150, 10, 10, 10);
        var lmat = new THREE.MeshLambertMaterial(
            { 
                color: 0xffffff, 
                map: this._texture,
            }
        );
        var bmat = new THREE.MeshBasicMaterial({ color: 0xffffff, map: this._texture});

        this._mesh = new SceneMesh(lmat, bmat, this._geometry);
        this._mesh.position.set(0, -0.5, 0);
        this._obj.add(this._mesh);
    }   

    get mesh() {
        return this._mesh;
    }

    swap() {
        this._mesh.swap();
    }

    toggle_wireframe() {
        this._mesh.toggle_wireframe();
    }
}