/*global THREE, requestAnimationFrame, console*/

var camera_global, scene, renderer, controls;

var camera_aspect, start_width, start_height, window_start_width, window_start_height, window_ratio;

var geometry, mesh;

var pointLight, directionalLight;
var time = 0, clock = new THREE.Clock;

var left_arrow = right_arrow = up_arrow = down_arrow = false;
var board, ball, cube;
var current_time = 0;

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    pointLight = new THREE.PointLight( 0xffffff, 1.5, 0, 0 );
    pointLight.position.set(40, 75, -20);
    pointLight.castShadow = true;

    directionalLight = new THREE.DirectionalLight( 0xffffff, 0.75, );
    directionalLight.position.set(-50, 50, 100);
    directionalLight.target = scene;
    directionalLight.castShadow = true;

    //Set up shadow properties for the light
    pointLight.shadow.mapSize.width = 1024;  // default
    pointLight.shadow.mapSize.height = 1024; // default
    pointLight.shadow.camera.near = 0.5;       // default
    pointLight.shadow.camera.far = 1000
    
    //Set up shadow properties for the light
    directionalLight.shadow.mapSize.width = 1024;  // default
    directionalLight.shadow.mapSize.height = 1024; // default
    directionalLight.shadow.camera.near = 0.5;       // default
    directionalLight.shadow.camera.far = 5000
    directionalLight.shadow.camera = new THREE.OrthographicCamera( -100, 100, 100, -100, 0.5, 1000 );


    board = new Board();
    ball = new Ball(10, 40, 0, 0);
    cube = new Rubik(20, 0, 0, 0);
    scene.add(board.mesh);
    scene.add(cube.mesh);
    scene.add(ball.mesh);
    scene.add(pointLight);
    scene.add(directionalLight);
    scene.add(new THREE.AxisHelper(10));
}

function createCameras() {
    'use strict';
    camera_aspect = 16/9;
    window_start_width = window.innerWidth;
    window_start_height = window.innerHeight;

    start_width = 450/1.3;
    start_height = 450/(16/9)/1.3;
    let local_width = start_width;
    let local_height = start_height;

    window_ratio = window_start_width / window_start_height;

    if(window_ratio < camera_aspect) {
        local_height = local_width / window_ratio;

    } else if( window_ratio > camera_aspect) {
        local_width = local_height * window_ratio;
    }
    
    camera_global = new THREE.PerspectiveCamera(70,
        local_width / local_height,
        1,
        2000);

    let dis = local_height/(2*Math.tan(camera_global.fov/2*Math.PI/180));
    let offset=Math.sqrt(Math.pow(dis,2)/3);                          
    camera_global.position.x = offset;
    camera_global.position.y = offset;
    camera_global.position.z = offset;
    
    camera_global.lookAt(scene.position);
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

        camera_global.aspect = local_width/local_height;
        let dis = local_height / (2*Math.tan(camera_global.fov/2*Math.PI/180));
        let offset = Math.sqrt(Math.pow(dis,2)/3);                         
        camera_global.position.x = offset;
        camera_global.position.y = offset;
        camera_global.position.z = -offset;
        camera_global.updateProjectionMatrix();

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

    case 76: //L
    case 108: //l
        break;

    case 71: //G
    case 103: //g
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
    if(change_wireframe) {
        Object.keys(material_map).forEach(function(key) {
            material_map[key].wireframe = !material_map[key].wireframe;
        });
        change_wireframe = false;
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera_global);
}


function animate() {
    'use strict';
    current_time = clock.getElapsedTime();
    render();
    ball.animate(scene.position)
    time = current_time;

    requestAnimationFrame(animate);
}


function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //renderer.setClearColor(cor, 1);
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCameras();

    render();
    
    controls = new THREE.OrbitControls( camera_global, renderer.domElement );

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",onKeyUp);
}