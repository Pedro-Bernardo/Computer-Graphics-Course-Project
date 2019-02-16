function addTableLeg(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry( 1.2, 1.5, 25, 10 );
    mesh = new THREE.Mesh(geometry, material_map["table_main"]);
    mesh.position.set(x, y + 12.5, z);
    obj.add(mesh);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(80, 2, 40);
    mesh = new THREE.Mesh(geometry, material_map["table_main"]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';
    
    var table = new THREE.Object3D();
    
    material_map["table_main"] = new THREE.MeshBasicMaterial({ color: 0x563d27, wireframe: true });
   
    addTableLeg(table, 36, 0, 17);
    addTableLeg(table, 36, 0, -17);
    addTableLeg(table, -36, 0, 17);
    addTableLeg(table, -36, 0, -17);
    addTableTop(table, 0, 25, 0);
    
    scene.add(table);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
    table.add(new THREE.AxisHelper(10));
}

