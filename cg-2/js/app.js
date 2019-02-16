/*global THREE, requestAnimationFrame, console*/

var camera, ball_camera, camera_start, camera_global, scene, renderer;

var camera_aspect, start_width, start_height, window_start_width, window_start_height, window_ratio;

var geometry, mesh;

var material_map = {};

var temp = 0, clock = new THREE.Clock;

var current_temp = 0;

var playground, n_balls = 10;

var delta_t, delta_x, color_flag = true, axis_flag = true, axis_control = false;

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    scene.add(new THREE.AxisHelper(10));
    
    playground = new Playground(150);

    for(let i = 0; i < n_balls; i++) {
        playground.addBall(playground.height/2);    
    }

    scene.add(playground.obj)
    /*
    createTable(0, 0, 0);
    createChair(-100, 0, 45);
    createLamp(60, 0, 0);
    */
}

function createCameras() {
    'use strict';
    camera_aspect = 16/9;
    window_start_width = window.innerWidth;
    window_start_height = window.innerHeight;

    start_width = 450;
    start_height = 450/(16/9);
    let local_width = start_width;
    let local_height = start_height;

    window_ratio = window_start_width / window_start_height;

    if(window_ratio < camera_aspect) {
        local_height = local_width / window_ratio;

    } else if( window_ratio > camera_aspect) {
        local_width = local_height * window_ratio;
    }

    /* fazer contas */

    

    camera_start = new THREE.OrthographicCamera( -local_width/2, local_width/2, local_height/2, -local_height/2, 10, 400 );
    camera_global = new THREE.PerspectiveCamera(70,
        local_width / local_height,
        1,
        2000);

    camera_start.position.x = 0;
    camera_start.position.y = 100;
    camera_start.position.z = 0;

    let dis=Math.tan(70/2*Math.PI/180)*local_height;
    let offset=Math.sqrt(Math.pow(dis,2)/3);                          
    camera_global.position.x = offset;
    camera_global.position.y = offset;
    camera_global.position.z = offset;
    
    camera_start.lookAt(scene.position);
    camera_global.lookAt(scene.position);
    camera = camera_start;
}


function onResize() {
    'use strict';
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        renderer.setSize(window.innerWidth, window.innerHeight);

        let local_width = start_width;
        let local_height = start_height;
        window_ratio = window.innerWidth / window.innerHeight ;

        if(window_ratio < camera_aspect) {
            local_height = local_width / window_ratio;

        } else if( window_ratio > camera_aspect) {
            local_width = local_height * window_ratio;
        }
        camera_start.left = -local_width/2;
        camera_start.right = local_width/2;
        camera_start.top = local_height/2;
        camera_start.bottom = -local_height/2;
        camera_start.updateProjectionMatrix();

        camera_global.aspect=local_width/local_height;
        let dis = Math.tan(camera_global.fov/2*Math.PI/180)*local_height;
        let offset = Math.sqrt(Math.pow(dis,2)/3);                         
        camera_global.position.x = offset;
        camera_global.position.y = offset;
        camera_global.position.z = offset;
        camera_global.updateProjectionMatrix();

        playground._balls[0].resize();
    }
    
}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 49: //1
        camera = camera_start;
        break;
    case 50: //2
        camera = camera_global;
        break;
    case 51: //3
        camera = ball_camera;
        break;
    case 69:  //E
    case 101: //e
        axis_control = true;
        axis_flag = !axis_flag;
    }
}


function render() {
    'use strict';
    renderer.render(scene, camera);
}


function animate() {
    'use strict';

    current_temp =  clock.getElapsedTime();
    playground.animateBalls(); 

    render();

    temp = current_temp;

    requestAnimationFrame(animate);
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

    setInterval(function(){ playground.level_up(1.4); }, 30000);
    render();
    
    
    window.addEventListener("resize", onResize);

    window.addEventListener("keydown", onKeyDown);
}