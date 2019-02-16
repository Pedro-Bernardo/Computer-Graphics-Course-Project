class SceneMesh extends THREE.Mesh {
    constructor(pM, bM, geom) {
        super(geom, pM); 
        this._idx = 0;
        this._mats = [pM, bM];
        this._wireframe = false;
    }

    swap() {
        this._idx = (this._idx == 0) ? 1 : 0;
        this.material = this._mats[this._idx];
    }

    toggle_wireframe() {
        this._wireframe = !this._wireframe;
        for(let i = 0; i < this._mats.length; i++) {
            this._mats[i].wireframe = this._wireframe;
        } 
        this.material.wireframe = this._wireframe;
    }
}