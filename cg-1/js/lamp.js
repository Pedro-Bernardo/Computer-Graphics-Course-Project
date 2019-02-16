function addLampTop(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry( 4, 10, 10, 30, 1, true);
    mesh = new THREE.Mesh(geometry, material_map["lamp_top"]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLampStick(obj,x,y,z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry( 0.5, 0.5 , 42, 10 );
    mesh = new THREE.Mesh(geometry, material_map["lamp_body"]);
    mesh.position.set(x, y + 21, z);
    obj.add(mesh);
    
}
function addLampBulb(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.SphereGeometry( 2, 20, 20 );
    mesh = new THREE.Mesh(geometry, material_map["lamp_bulb"]);
    mesh.position.set(x, y + 1, z);
    obj.add(mesh);
}

function addLampBottom(obj,x,y,z) {
    'use strict';

    var geometry = new THREE.CylinderGeometry(6,6,0.6, 30);
    mesh = new THREE.Mesh(geometry, material_map["lamp_body"]);
    mesh.position.set(x, y + 0.3, z);
    obj.add(mesh);

    geometry = new THREE.ConeGeometry(6, 2, 30);
    mesh = new THREE.Mesh(geometry, material_map["lamp_body"]);
    mesh.position.set(x, y + 1.6, z);
    obj.add(mesh);

}

function createLamp(x,y,z){
    'use strict';

    var lamp = new THREE.Object3D();

    material_map["lamp_body"] = new THREE.MeshBasicMaterial({ color: 0xcebd3d, wireframe: true }); 
    material_map["lamp_top"] = new THREE.MeshBasicMaterial({ color: 0x2f4b8c, wireframe: true }); 
    material_map["lamp_bulb"] = new THREE.MeshBasicMaterial({ color: 0xfffce5, wireframe: true }); 

    addLampStick(lamp,0,0,0);
    addLampBottom(lamp,0,0,0);
    addLampBulb(lamp,0,42,0);
    addLampTop(lamp,0,44,0);

    scene.add(lamp);

    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
    lamp.add(new THREE.AxisHelper(10));
    
}