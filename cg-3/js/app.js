/*global THREE, requestAnimationFrame, console*/

var camera_global, scene, renderer;

var camera_aspect, start_width, start_height, window_start_width, window_start_height, window_ratio;

var geometry, mesh;

var materials = ["lambert", "phong"];
var spotlights;
var material_map = {};
var night = 0;
var directionalLight;
var time = 0, clock = new THREE.Clock;

var current_material = 0;
var basic_material = false;

var plane;
var left_arrow = right_arrow = up_arrow = down_arrow = false;


var current_time = 0;

function createScene() {
    'use strict';
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1.75 );
    directionalLight.position.set(-80, 200, -70);
    
    scene = new THREE.Scene();
    plane = new Plane();
    
    directionalLight.target = scene;
    scene.add(directionalLight);
    scene.add(plane.obj);
    var spotlight1 = new Spotlight(100, 30, 100, (3/4)*Math.PI, Math.PI/3)
    var spotlight2 = new Spotlight(-100,30, 100, Math.PI/4 , Math.PI/3)
    var spotlight3 = new Spotlight(-100,30, -100, -Math.PI/4, Math.PI/3)
    var spotlight4 = new Spotlight(100, 30, -100, -(3/4)*Math.PI, Math.PI/3)
    spotlights = [spotlight1 ,spotlight2, spotlight3, spotlight4];
    scene.add((spotlight1.obj));
    scene.add((spotlight2.obj));
    scene.add((spotlight3.obj));
    scene.add((spotlight4.obj));
    
    scene.add(new THREE.AxisHelper(10));
}

function createCameras() {
    'use strict';
    camera_aspect = 16/9;
    window_start_width = window.innerWidth;
    window_start_height = window.innerHeight;

    start_width = 450*1.3;
    start_height = 450/(16/9)*1.3;
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
    camera_global.position.z = -offset;
    
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
        spotlights[0].toggle();
        break;

    case 50: //2
        spotlights[1].toggle();
        break;

    case 51: //3
        spotlights[2].toggle();
        break;

    case 52: //4
        spotlights[3].toggle();
        break;

    case 76: //L
    case 108: //l
        basic_material = !basic_material;
        break;

    case 71: //G
    case 103: //g
        current_material = current_material == 0 ? 1 : 0;
        break;

    case 78: //N
    case 110: //n
        if (directionalLight.intensity != night)
            directionalLight.intensity = night;
        else 
            directionalLight.intensity = 1.75;
            
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
    console.log("running")
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

    plane.update_material();
    plane.rotate();
    
    time = current_time;

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

    render();
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",onKeyUp);
}