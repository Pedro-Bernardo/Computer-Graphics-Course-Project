class Rubik {
    constructor(side, x, y, z) {
        this._obj = new THREE.Object3D();
        var textureLoader = new THREE.TextureLoader();
        var bmap = new textureLoader.load('textures/bumpmap2.png');
        this._geometry = new THREE.CubeGeometry(side, side, side);
        var faceMaterialsPhong = [ 
            new THREE.MeshPhongMaterial({color:0xffffff, specular: 0x303030, shininess: 5, map: new textureLoader.load('textures/Blue.png'), bumpMap: bmap  }),
            new THREE.MeshPhongMaterial({color:0xffffff, specular: 0x303030, shininess: 5, map: new textureLoader.load('textures/White.png'), bumpMap: bmap}),
            new THREE.MeshPhongMaterial({color:0xffffff, specular: 0x303030, shininess: 5, map: new textureLoader.load('textures/Green.png'), bumpMap: bmap}), 
            new THREE.MeshPhongMaterial({color:0xffffff, specular: 0x303030, shininess: 5, map: new textureLoader.load('textures/Yellow.png'), bumpMap: bmap}), 
            new THREE.MeshPhongMaterial({color:0xffffff, specular: 0x303030, shininess: 5, map: new textureLoader.load('textures/Red.png'), bumpMap: bmap}), 
            new THREE.MeshPhongMaterial({color:0xffffff, specular: 0x303030, shininess: 5, map: new textureLoader.load('textures/Orange.png'), bumpMap: bmap}), 
        ]; 
        var faceMaterialsBasic = [ 
            new THREE.MeshBasicMaterial({color:0xffffff, map: new textureLoader.load('textures/Blue.png')  }),
            new THREE.MeshBasicMaterial({color:0xffffff, map: new textureLoader.load('textures/White.png')}),
            new THREE.MeshBasicMaterial({color:0xffffff, map: new textureLoader.load('textures/Green.png')}), 
            new THREE.MeshBasicMaterial({color:0xffffff, map: new textureLoader.load('textures/Yellow.png')}), 
            new THREE.MeshBasicMaterial({color:0xffffff, map: new textureLoader.load('textures/Red.png')}), 
            new THREE.MeshBasicMaterial({color:0xffffff, map: new textureLoader.load('textures/Orange.png')}),
        ]; 
 
        this._mesh = new CubeMesh(faceMaterialsPhong, faceMaterialsBasic, this._geometry);
        this._mesh.position.set(x, y + side/2, z);
        this._obj.add( this._mesh );
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