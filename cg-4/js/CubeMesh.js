class CubeMesh extends THREE.Mesh {
    constructor(pM, bM, geom) {
        super(geom, new THREE.MeshFaceMaterial(pM)); 
        this._idx = 0;
        this._pM = pM;
        this._bM = bM;
        // Different material on each face 
        this._mats = [new THREE.MeshFaceMaterial(pM), new THREE.MeshFaceMaterial(bM)];
        this._wireframe = false;
    }

    swap() {
        this._idx = (this._idx == 0) ? 1 : 0;
        this.material = this._mats[this._idx];
    }
    toggle_wireframe() {
        this._wireframe = !this._wireframe;

        for(let i = 0; i < this._pM.length; i++) {
            this._pM[i].wireframe = this._wireframe;
            this._bM[i].wireframe = this._wireframe;
        }

        this._mats = [new THREE.MeshFaceMaterial(this._pM), new THREE.MeshFaceMaterial(this._bM)];
        this.material = this._mats[this._idx];
    }
}