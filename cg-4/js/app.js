/*global THREE, requestAnimationFrame, console*/

var camera, scene;
var renderer, controls;

var camera_aspect, start_width, start_height, window_ratio, window_start_height, window_start_width;
var start_width;
var start_height;

var camera_start;
var wireframe_objs;

var pointLight, directionalLight;
var time, clock;

var left_arrow, right_arrow, up_arrow,down_arrow, change_wireframe, change_material;
var board, ball, cube;
var current_time, viewport_idx,reset = false;

var camera_distance, expected_ratio;

function createScene() {
    'use strict';
    // main scene
    scene[0] = new THREE.Scene(); 
    
    // pause scene
    scene[1] = new THREE.Scene(); 

    pointLight = new THREE.PointLight( 0xffffff, 1.5, 0, 0 );
    pointLight.position.set(75, 75, -20);
    pointLight.target = scene[0];
    directionalLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
    directionalLight.position.set(-50, 50, 100);
    directionalLight.target = scene[0];

    var pause_screen = new PauseScreen(start_width, start_height);
    board = new Board();
    ball = new Ball(10, 40, 0, 0);
    cube = new Rubik(20, 0, 0, 0);

    wireframe_objs.push(board);
    wireframe_objs.push(ball);
    wireframe_objs.push(cube);

    scene[0].add(board.mesh);
    scene[0].add(cube.mesh);
    scene[0].add(ball.mesh);
    scene[0].add(pointLight);
    scene[0].add(directionalLight);
    scene[0].add(new THREE.AxisHelper(10));

    scene[1].add(pause_screen.mesh);

    //pause_scene

    viewport_idx = 0;
}

function createCameras() {
    'use strict';

    
    let local_width = start_width;
    let local_height = start_height;


    if(window_ratio < camera_aspect) {
        local_height = local_width / window_ratio;

    } else if( window_ratio > camera_aspect) {
        local_width = local_height * window_ratio;
    }
    
    // main camera
    camera[0] = new THREE.PerspectiveCamera(70,
        local_width / local_height,
        1,
        2000);

    // pause camera
    camera[1] = new THREE.OrthographicCamera( -local_width/2, local_width/2, local_height/2, -local_height/2, 10, 400 );

    camera[1].position.x = 0;
    camera[1].position.y = 0;
    camera[1].position.z = 100;
    camera[1].lookAt(scene[1].position);

    let dis = local_height/(2*Math.tan(camera[0].fov/2*Math.PI/180));
    camera_distance = dis;
    // no inicio nao deve haver diferencas de ratio
    expected_ratio = 1;
    let offset = Math.sqrt(Math.pow(dis,2)/3);                          
    camera[0].position.x = offset;
    camera[0].position.y = offset;
    camera[0].position.z = offset;
    camera[0].isPerspectiveCamera = true;
    camera[0].lookAt(scene[0].position);
    viewport_idx = 0;
}

function onResize() {
    'use strict';
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        renderer.setSize(window.innerWidth, window.innerHeight);

        
        // deteta as mudancas feitas pelo zoom e altera o tamanho inicial da 
        // essas mudancas janela de visualizacao consoante essa 
        let current_dis = new THREE.Vector3(camera[0].position.x, camera[0].position.y, camera[0].position.z).length();
        let ratio = current_dis/camera_distance;

        if(ratio != expected_ratio){
            start_height = start_height * ratio/expected_ratio;
            start_width = start_width * ratio/expected_ratio;
        }
            

        let local_width = start_width;
        let local_height = start_height;
        window_ratio = window.innerWidth / window.innerHeight ;

        if(window_ratio < camera_aspect) {
            local_height = local_width / window_ratio;

        } else if( window_ratio > camera_aspect) {
            local_width = local_height * window_ratio;
        }


        camera[1].left = -local_width/2;
        camera[1].right = local_width/2;
        camera[1].top = local_height/2;
        camera[1].bottom = -local_height/2;
        camera[1].updateProjectionMatrix();


        let dis = local_height/(2*Math.tan(camera[0].fov/2*Math.PI/180));
        camera[0].aspect = local_width/local_height;
        //let dis = local_height/(2*Math.tan(45/2*Math.PI/180));
        let disY = new THREE.Vector3(camera[0].position.x, camera[0].position.y, camera[0].position.z).length();
        let angle = Math.asin(camera[0].position.y/disY);
        let disX = disY * Math.cos(angle);
        let angleX = Math.asin(camera[0].position.z/disX);
        
        if(camera[0].position.z == 0) {
            if(camera[0].position.x > 0){
                angleX = 0;
            } else {
                angleX = Math.PI;
            }
        } else if(camera[0].position.z > 0){
            if(camera[0].position.x < 0) {
                angleX = Math.PI - angleX;
            }
        } else{
            if(camera[0].position.x < 0) {
                angleX = -Math.PI - angleX;
            }
        }

        camera[0].position.x = dis * Math.cos(angle) * Math.cos(angleX)
        camera[0].position.z = dis * Math.cos(angle) * Math.sin(angleX) 
        camera[0].position.y = dis * Math.sin(angle)
        camera[0].updateProjectionMatrix();

        // atualiza o ratio esperado
        expected_ratio = dis/camera_distance;
    }
    
}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 49: //1s
        break;

    case 50: //2
        break;

    case 51: //3
        break;

    case 52: //4
        break;

    case 83: //S
    case 115: //s
        viewport_idx = viewport_idx == 0? 1 : 0;
        if(clock.running)
            clock.stop();
        else
            clock.start();

        controls.enabled = !controls.enabled;
        break;

    case 76: //L
    case 108: //l
        change_material = true;
        break;

    case 68: //D
    case 100: //d
        directionalLight.intensity = (directionalLight.intensity == 0.75? 0 : 0.75);
        break;

    case 80: //P
    case 112: //p
        pointLight.intensity = (pointLight.intensity == 1.5? 0 : 1.5);
        break;

    case 82: //R
    case 114: //r
        if(!clock.running){
            reset=true;
        }
          
        break;
        
    case 66: //B
    case 98: //b
        if(clock.running)
            ball.toggle();
        break;

    case 87: //W
    case 119: //w
        change_wireframe = true;
        break;

    case 78: //N
    case 110: //n
        break;
        
    case 38: // up arrow
        up_arrow = true;
        break;
    case 40: // down arrow  
        down_arrow = true;
        break;
    case 37: // left arrow
        left_arrow = true;
        break;
        
    case 39: // right arrow
        right_arrow = true;
        break; 
    }
}

function onKeyUp(e){
	'use strict';
	switch (e.keyCode) {
        case 38: // up arrow
            up_arrow = false;
            break;
        case 40: // down arrow  
            down_arrow = false;
            break;
        case 37: // left arrow
            left_arrow = false;
            break;
            
        case 39: // right arrow
            right_arrow = false;
            break;     
        
    }
}

function handle_wireframe() {
    'use strict';
    if(change_wireframe) {
        for(let i = 0; i < wireframe_objs.length; i++)
            wireframe_objs[i].toggle_wireframe();
        change_wireframe = false;
    }
}

function handle_material() {
    'use strict';
    if(change_material) {
        for(let i = 0; i < wireframe_objs.length; i++)
            wireframe_objs[i].swap();
        change_material = false;
    }
}

function render() {
    'use strict';
    renderer.render(scene[viewport_idx], camera[viewport_idx]);
}


function animate() {
    'use strict';
    current_time = clock.getElapsedTime();
    
    
    if(change_wireframe)
        handle_wireframe();
    if(change_material) 
        handle_material();
    if(reset){
        init();
    }

    ball.animate(scene[0].position);
       
    time = current_time;

    controls.update()
    render();
    
    requestAnimationFrame(animate);
}


function init() {
    'use strict';
    // always keep the same renderer
    if(!reset)
        renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor (0x000000, 1);
    document.body.appendChild(renderer.domElement);

    camera = [];
    scene = [];
    wireframe_objs = [];

    // init time control variables
    time = 0;
    clock= new THREE.Clock;
    clock.autoStart = false;
    clock.start();

    // init control flags
    left_arrow = right_arrow = up_arrow = down_arrow = false;
    change_wireframe = change_material = false;
    current_time = 0, viewport_idx = 0;

    // init window and camera data and constants
    start_width = 450/1.3;
    start_height = 450/(16/9)/1.3;
    camera_aspect = 16/9;
    window_start_width = window.innerWidth;
    window_start_height = window.innerHeight;
    window_ratio = window_start_width / window_start_height;

    createScene();
    createCameras();

    render();
    controls = new THREE.OrbitControls( camera[0], renderer.domElement );
    controls.autoRotate = true;
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",onKeyUp);
    reset = false;
}