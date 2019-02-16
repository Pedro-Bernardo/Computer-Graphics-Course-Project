/*global THREE, requestAnimationFrame, console*/

var camera, camera_top, camera_x, camera_z, scene, renderer;

var camera_aspect, start_width, start_height, window_start_width, window_start_height, window_ratio;

var geometry, mesh;

var material_map = {};

var temp = 0, clock = new THREE.Clock;

var current_temp = 0;


function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 0, 0);
    createChair(-100, 0, 45);
    createLamp(60, 0, 0);
}

function createCameras() {
    'use strict';
    camera_aspect = 16/9;
    window_start_width = window.innerWidth;
    window_start_height = window.innerHeight;

    start_width = 150;
    start_height = 84.375;
    let local_width = start_width;
    let local_height = start_height;

    window_ratio = window_start_width / window_start_height;

    if(window_ratio < camera_aspect) {
        local_height = local_width / window_ratio;

    } else if( window_ratio > camera_aspect) {
        local_width = local_height * window_ratio;
    }

    /* fazer contas */



    camera_top = new THREE.OrthographicCamera( -local_width, local_width, local_height, -local_height, 10, 400 );
    camera_x = new THREE.OrthographicCamera( -local_width, local_width, local_height, -local_height, 10, 400 );
    camera_z = new THREE.OrthographicCamera( -local_width, local_width, local_height, -local_height, 10, 400 );

    camera_top.position.x = 0;
    camera_top.position.y = 100;
    camera_top.position.z = 0;

    camera_x.position.x = 100;
    camera_x.position.y = 0;
    camera_x.position.z = 0;

    camera_z.position.x = 0;
    camera_z.position.y = 0;
    camera_z.position.z = 100;

    
    camera_top.lookAt(scene.position);
    camera_x.lookAt(scene.position);
    camera_z.lookAt(scene.position);
    camera = camera_top;
}


function onResize() {
    'use strict';
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        let local_width = start_width;
        let local_height = start_height;

        
        window_ratio = window.innerWidth / window.innerHeight ;

        if(window_ratio < camera_aspect) {
            local_height = local_width / window_ratio;

        } else if( window_ratio > camera_aspect) {
            local_width = local_height * window_ratio;
        }
      
        renderer.setSize(window.innerWidth, window.innerHeight);

        camera.left = -local_width;
        camera.right = local_width;
        camera.top = local_height;
        camera.bottom = -local_height;

        camera.updateProjectionMatrix();
    }
    

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        Object.keys(material_map).forEach(function(key) {
            material_map[key].wireframe = !material_map[key].wireframe;
        });
        /*
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        */
        break;

    case 49: //1
        camera = camera_top;
        break;
    case 50: //2
        camera = camera_x;
        break;
    case 51: //3
        camera = camera_z;
        break;


    case 38: // up arrow
        chair.userData.moveforwards = true;
        break;
    case 40: // down arrow  
        chair.userData.movebackwards = true;
        
        break;
    case 37: // left arrow
        chair.userData.rotationleft = true;
        break;

    case 39: // rigth arrow
        chair.userData.rotationright = true;
        break; 
    }
}

function onKeyUp(e){
	'use strict';
	switch (e.keyCode) {
        case 38: // up arrow
            chair.userData.moveforwards = false;
            break;

        case 40: // down arrow  
            chair.userData.movebackwards = false;
            break;
        
        case 37: // left arrow
            chair.userData.rotationleft = false;
            break;
        case 39: // rigth arrow
            chair.userData.rotationright = false;
            break;        
        
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor(cor, 1);
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCameras();
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup",onKeyUp);
}

function animate() {
    'use strict';

    current_temp =  clock.getElapsedTime();

    animateChair(); 

    render();

    temp = current_temp;

    requestAnimationFrame(animate);
}

