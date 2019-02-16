 var chair;
var delta_t;
var maxspeed = 100;
var speed_tolerance = 10;
var wheels = [];

function addChairBack(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 20, 15);
    mesh = new THREE.Mesh(geometry, material_map["chair_main"]);
    mesh.position.set(x, y + 10, z);
    obj.add(mesh);
}

function createChairWheel(obj, x, y, z, id) {
    'use strict';
    var geometry = new THREE.TorusGeometry( 1, 0.7, 12, 20);
    mesh = new THREE.Mesh(geometry, material_map["chair_wheels"]);
    mesh.position.set(x, y, z);
    mesh.userData.base_rotation = 0;
    mesh.userData.angle_tolerance = Math.PI / 32;
    mesh.userData.angular_vel = 2 * Math.PI;
    mesh.name = "wheel" + id;
    //mesh.rotation.set(new THREE.Vector3(0, 0, Math.PI / 2));
    obj.add(mesh);
}

function addChairLeg(obj, x, y, z, rotx, roty, rotz) {
    'use strict';
    geometry = new THREE.CubeGeometry(16, 1, 1);
    mesh = new THREE.Mesh(geometry, material_map["chair_props"]);
    mesh.position.set(x + 8, y, z);
    mesh.rotation.x = rotx;
    mesh.rotation.y = roty;
    mesh.rotation.z = rotz;
    //mesh.add(new THREE.AxisHelper(10));
    obj.add(mesh);
}

function addChairSeat(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(18, 2, 15);
    mesh = new THREE.Mesh(geometry, material_map["chair_main"]);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairBase(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.TorusGeometry( 2, 1, 10, 5);
    mesh = new THREE.Mesh(geometry, material_map["chair_props"]);
    mesh.position.set(x, y, z);
    //mesh.rotation.set(new THREE.Vector3(0, 0, Math.PI / 2));
    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;
    obj.add(mesh);
}


function addChairArms(obj, x, y, z) {
    'use strict';
    // create support
    geometry = new THREE.CubeGeometry(2, 1, 19.5);
    var support = new THREE.Mesh(geometry, material_map["chair_props"]);
    support.position.set(x, y, z);

    // left
    geometry = new THREE.CubeGeometry(1, 6, 1);
    var arm = new THREE.Mesh(geometry, material_map["chair_props"]);
    arm.position.set(0, 3, 9);

    support.add(arm)
    // right
    geometry = new THREE.CubeGeometry(1, 6, 1);
    var arm = new THREE.Mesh(geometry, material_map["chair_props"]);
    arm.position.set(0, 3, -9);

    support.add(arm);


    geometry = new THREE.CubeGeometry(10, 1, 2);
    var armrest = new THREE.Mesh(geometry, material_map["chair_main"]);
    armrest.position.set(0, 6, 9);

    support.add(armrest);


    geometry = new THREE.CubeGeometry(10, 1, 2);
    var armrest = new THREE.Mesh(geometry, material_map["chair_main"]);
    armrest.position.set(0, 6, -9);

    support.add(armrest);


    obj.add(support);
}

function addChairAxis(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 12, 2);
    mesh = new THREE.Mesh(geometry, material_map["chair_props"]);
    mesh.position.set(x, y + 6, z);
    obj.add(mesh);
}

function addChairBottom(chair, x, y, z) {
    base = new THREE.Object3D();

    base.add(new THREE.AxisHelper(10));
    addChairBase(base, x + 0, y + 3, z + 0);
    addChairAxis(base, x + 0, y + 3, z + 0);
    addChairLeg(base, x - 10.5,  y + 1 , z + 8,   0,    (Math.PI * 2 / 5),  Math.PI / 16);
    addChairLeg(base, x - 1   ,  y + 1 , z + 5,   0,  2*(Math.PI * 2 / 5),  Math.PI / 16);
    addChairLeg(base, x - 1   ,  y + 1 , z - 5,   0,  3*(Math.PI * 2 / 5),  Math.PI / 16);
    addChairLeg(base, x - 10.5,  y + 1 , z - 8,   0,  4*(Math.PI * 2 / 5),  Math.PI / 16);
    addChairLeg(base, x - 16  ,  y + 1 , z    ,   0,  5*(Math.PI * 2 / 5),  Math.PI / 16);
    createChairWheel(base, 12, 0, -9,  1);
    createChairWheel(base, 12, 0, 9,   2);
    createChairWheel(base, -5, 0, 14,  3);
    createChairWheel(base, -5, 0, -14, 4);
    createChairWheel(base, -14, 0, 0,  5);

    for(let i = 1; i <= 5; i++) {
        wheels.push(base.getObjectByName("wheel" + i));
    }

    base.name = "chairBase";
    chair.add(base);
}

function createChair(x, y, z) {
    'use strict';

    chair = new THREE.Object3D();
    chair.userData = {acel:0, vel:0, movement:0, moveforwards:false, movebackwards: false,
            rotatioleft:false, rotationright:false, acel_value:60,
            resistance:80, tolerance:5, angular_vel:Math.PI};

    material_map["chair_main"] = new THREE.MeshBasicMaterial({ color: 0x9e9e9e, wireframe: true });
    material_map["chair_props"] = new THREE.MeshBasicMaterial({ color: 0x252525, wireframe: true });
    material_map["chair_wheels"] = new THREE.MeshBasicMaterial({ color: 0x777777, wireframe: true });

    addChairBack(chair, -8, 17, 0);
    addChairSeat(chair, 0, 17, 0);
    addChairBottom(chair, 0, 2, 0);
    addChairArms(chair, 0, 16, 0);


    scene.add(chair);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
    chair.add(new THREE.AxisHelper(10));


}

function animateChair(){
    'use strict';
    rotateChair();
    chair.userData.acel = 0;
    /* se passou o limite de velocidade : */
    /*
    if(Math.abs(chair.userData.vel) >= maxspeed || (chair.userData.movebackwards && chair.userData.moveforwards)){
        chair.userData.acel = 0;
    }   */
    /* se esta a andar para a frente e a nao acima da o limite da velocidade */

    if(Math.abs(chair.userData.vel) < maxspeed && (chair.userData.movebackwards || chair.userData.moveforwards)) {
        if(chair.userData.moveforwards) {
            chair.userData.acel += chair.userData.acel_value;
        } else {
            chair.userData.acel -= chair.userData.acel_value;
        }
    }


    /* se não há movimento */
    if((!chair.userData.movebackwards && !chair.userData.moveforwards) || (chair.userData.moveforwards && chair.userData.movebackwards )){
        var absvel = Math.abs(chair.userData.vel);
        /* se nao estiver quase parado */
        if( absvel > chair.userData.tolerance) {
            // acceleration equals the resistance, to the oposite side of the velocity
            if(chair.userData.vel > 0){
                chair.userData.acel = -chair.userData.resistance;
            } else {
                chair.userData.acel = chair.userData.resistance;
            }

        } else { /* se estiver quase parado, para */
            chair.userData.acel = 0;
            chair.userData.vel = 0;
        }

    }  /* calcula adiciona o atrito a aceleracao da travagem */
    else if (Math.abs(chair.userData.vel) > 0){
        if(chair.userData.vel > 0 && chair.userData.movebackwards) {
            chair.userData.acel = -(chair.userData.acel_value + chair.userData.resistance);
        } else if (chair.userData.vel < 0 && chair.userData.moveforwards) {
            chair.userData.acel = (chair.userData.acel_value + chair.userData.resistance);
        }
    }

    var delta = getChairMovement(chair);
    var angle_translated = delta / 1.35;
    rotateWheels(-angle_translated);
    chair.translateX(delta);
}

function getChairMovement(obj){
    'use strict';
    /* v = v0 + a * delta(t) */
    obj.userData.vel = obj.userData.vel + obj.userData.acel * delta_t;

    /* x = x0 + v0t + 1/2a(t^2) */
    var position_x = obj.position.x + obj.userData.vel * delta_t + (obj.userData.acel/2)*delta_t*delta_t;
    //var position_z = obj.position.z + obj.userData.vel * delta_t + (obj.userData.acel/2)*delta_t*delta_t;

    var delta = position_x - obj.position.x;
    return(delta);
}

function rotateWheels(roll) {
    'use strict';
    /* get difference between angles */
    if(chair.userData.vel == 0){
        return;
    }

    var angle_diff;
    var to_rotate;
    var wheel = wheels[0];

    to_rotate = wheel.userData.angular_vel * (delta_t);
    /* calculate initial difference */
    angle_diff = chair.rotation.y - wheel.userData.base_rotation;

    /* if it doesnt need to rotate, just return */
    if(Math.abs(angle_diff) <= wheel.userData.angle_tolerance){
        to_rotate = 0;

    } else {
        if(angle_diff < 0) {
            to_rotate *= -1;
        }

        /* if the difference is bigger than pi, add pi and recalculate */
        if(Math.abs(angle_diff) > Math.PI){
            // add or subtract pi, according to the sign of the rotation */
            wheel.userData.base_rotation += Math.PI * Math.sign(angle_diff);
            angle_diff = chair.rotation.y - wheel.userData.base_rotation;
        /* if less than pi but bigger than pi / 2, invert the angle and invert the sign of the rotation */
        } else if(Math.abs(angle_diff) > (Math.PI) / 2) {
            angle_diff = Math.PI - angle_diff;
            to_rotate *= -1;
        }
    }


    for(let idx = 0; idx < 5; idx++) {
        /* make the wheel roll */
        wheel = wheels[idx];
        wheel.rotation.z = wheel.rotation.z + roll;
        if( to_rotate != 0)  {
            wheel.rotation.y = wheel.rotation.y + to_rotate;
            wheel.userData.base_rotation += to_rotate;
        }
    }
}


function rotateChair(){
    'use strict';
    var base = chair.getObjectByName("chairBase");
    delta_t = current_temp - temp;
    var rot_amount = chair.userData.angular_vel * delta_t;
    if(chair.userData.rotationleft && chair.userData.rotationright) {
    }
    else if(chair.userData.rotationleft) {
        chair.rotation.y = (chair.rotation.y + rot_amount) % (Math.PI * 2);
        base.rotation.y = base.rotation.y - rot_amount;
    } else if(chair.userData.rotationright) {
        chair.rotation.y = (chair.rotation.y - rot_amount) % (Math.PI * 2);
        base.rotation.y = base.rotation.y + rot_amount;
    }

}
