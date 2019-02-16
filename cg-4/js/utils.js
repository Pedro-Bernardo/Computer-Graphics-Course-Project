class Utils {
    static rand_between(n1, n2) {
        return Math.random() * (n1 - n2) + n2;
    }

    static distance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.z - pos2.z, 2))
    }

    static triangulated_plane_h(geometry, width, height, pos, size, normal1, normal2) {
        var face_counter = geometry.vertices.length;

        for(let i = 0; i < height; i += size){
            for(let j = 0; j < width; j += size){
         
                geometry.vertices.push(new THREE.Vector3( i - height/2 + pos.x,  pos.y, j - width/2 + pos.z)); 
                geometry.vertices.push(new THREE.Vector3( i + size - height/2 + pos.x, pos.y, j - width/2 + pos.z)); 
                geometry.vertices.push(new THREE.Vector3( i - height/2 + pos.x, pos.y, j + size - width/2 + pos.z)); 
                geometry.vertices.push(new THREE.Vector3( i + size - height/2 + pos.x, pos.y, j + size - width/2 + pos.z)); 

                geometry.faces.push(new THREE.Face3(face_counter, face_counter + normal1, face_counter + normal2));
                geometry.faces.push(new THREE.Face3(face_counter + normal1, face_counter + 3, face_counter + normal2));
                face_counter += 4;
            }
        }
    }

    static triangulated_plane_v(geometry, width, height, pos, size, normal1, normal2) {
        var face_counter = geometry.vertices.length;

        for(let i = 0; i < height; i += size){
            for(let j = 0; j < width; j += size){
                
                geometry.vertices.push(new THREE.Vector3(pos.x, i - height/2 + pos.y, j - width/2 + pos.z)); 
                geometry.vertices.push(new THREE.Vector3(pos.x, i + size - height/2 + pos.y, j - width/2 + pos.z)); 
                geometry.vertices.push(new THREE.Vector3(pos.x, i - height/2 + pos.y,  j + size - width/2 + pos.z)); 
                geometry.vertices.push(new THREE.Vector3(pos.x, i + size - height/2 + pos.y,  j + size - width/2 + pos.z)); 
                
                geometry.faces.push(new THREE.Face3(face_counter, face_counter + normal1, face_counter + normal2));
                geometry.faces.push(new THREE.Face3(face_counter + normal1, face_counter + 3, face_counter + normal2));
                face_counter += 4;
            }
        }
    }

    static triangulated_right_triangle_h(geometry, base, height, size, pos, direction_z, direction_x, normal1, normal2, offset) {
        var face_height = size * (height / base)
        //var angle = Math.atan(height/base);
        var number_of_faces = height / face_height;
        var face_counter = geometry.vertices.length;
        var downstep = face_height * offset/height;
        
        for(let i = 0; i < base; i += size){
            for(let j = 0; j < face_height * number_of_faces - face_height; j += face_height){
                
                if(direction_x > 0){
                    /* down triangle */
                    geometry.vertices.push(new THREE.Vector3((i + size)*direction_x + pos.x, pos.y - ((j + face_height)/face_height)*downstep, (j + face_height)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3((i + size)*direction_x + pos.x, pos.y - (j/face_height)*downstep, (j)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3((i)*direction_x + pos.x, pos.y -((j + face_height)/face_height)*downstep, (j + face_height)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3((i)*direction_x + pos.x, pos.y - (j/face_height)*downstep, (j)*direction_z + pos.z));
                  
                } else {
                    /* down triangle */
                    geometry.vertices.push(new THREE.Vector3((i)*direction_x + pos.x, pos.y - ((j + face_height)/face_height)*downstep, (j + face_height)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3((i)*direction_x + pos.x, pos.y - (j/face_height)*downstep, (j)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3((i + size)*direction_x + pos.x, pos.y - ((j + face_height)/face_height)*downstep, (j + face_height)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3((i + size)*direction_x + pos.x, pos.y- (j/face_height)*downstep, (j)*direction_z + pos.z));
        
                }

                geometry.faces.push(new THREE.Face3(face_counter, face_counter + normal1, face_counter + normal2));
                geometry.faces.push(new THREE.Face3(face_counter + normal1, face_counter + 3, face_counter + normal2));

                face_counter += 4;
            }

            
            //last face isn't a square
            let j = face_height * number_of_faces - face_height;
            if(direction_x > 0){
                /* down triangle */
                geometry.vertices.push(new THREE.Vector3((i)*direction_x + pos.x, pos.y - (j/face_height)*downstep, (j)*direction_z + pos.z));
                geometry.vertices.push(new THREE.Vector3((i)*direction_x + pos.x, pos.y - ((j + face_height)/face_height)*downstep, (j + face_height)*direction_z + pos.z));
                geometry.vertices.push(new THREE.Vector3((i + size)*direction_x + pos.x, pos.y - (j/face_height)*downstep, (j)*direction_z + pos.z));
              
            } else {
                /* down triangle */
                geometry.vertices.push(new THREE.Vector3((i + size)*direction_x + pos.x, pos.y - (j/face_height)*downstep, (j)*direction_z + pos.z));
                geometry.vertices.push(new THREE.Vector3((i)*direction_x + pos.x, pos.y - ((j + face_height)/face_height)*downstep, (j + face_height)*direction_z + pos.z));
                geometry.vertices.push(new THREE.Vector3((i)*direction_x + pos.x, pos.y - (j/face_height)*downstep, (j)*direction_z + pos.z));
            }
            

            geometry.faces.push(new THREE.Face3(face_counter, face_counter + normal1, face_counter + normal2));
            face_counter += 3;

            number_of_faces--;

        }

    }


    static triangulated_right_triangle_v(geometry, base, height, size, pos, direction_z, direction_y, normal1, normal2, offset) {
        var face_height = size * (height / base)
        //var angle = Math.atan(height/base);
        var number_of_faces = height / face_height;
        var face_counter = geometry.vertices.length;
        var downstep = face_height * offset/height;
        
        for(let i = 0; i < base; i += size){
            for(let j = 0; j < face_height * number_of_faces - face_height; j += face_height){
                
                if(direction_y > 0){
                    /* down triangle */
                    geometry.vertices.push(new THREE.Vector3(pos.x - ((j + face_height)/face_height)*downstep, (i + size)*direction_y + pos.y, (j + face_height)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3(pos.x - (j/face_height)*downstep, (i + size)*direction_y + pos.y, (j)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3(pos.x -((j + face_height)/face_height)*downstep, (i)*direction_y + pos.y, (j + face_height)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3(pos.x - (j/face_height)*downstep, (i)*direction_y + pos.y, (j)*direction_z + pos.z));
                  
                } else {
                    /* down triangle */
                    geometry.vertices.push(new THREE.Vector3(pos.x - ((j + face_height)/face_height)*downstep, (i)*direction_y + pos.y, (j + face_height)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3(pos.x - (j/face_height)*downstep, (i)*direction_y + pos.y, (j)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3(pos.x - ((j + face_height)/face_height)*downstep, (i + size)*direction_y + pos.y, (j + face_height)*direction_z + pos.z));
                    geometry.vertices.push(new THREE.Vector3(pos.x - (j/face_height)*downstep, (i + size)*direction_y + pos.y, (j)*direction_z + pos.z));

                }

                geometry.faces.push(new THREE.Face3(face_counter, face_counter + normal1, face_counter + normal2));
                geometry.faces.push(new THREE.Face3(face_counter + normal1, face_counter + 3, face_counter + normal2));

                face_counter += 4;
            }

            
            //last face isn't a square
            let j = face_height * number_of_faces - face_height;
            if(direction_y > 0){
                /* down triangle */
                geometry.vertices.push(new THREE.Vector3(pos.x - (j/face_height)*downstep, (i)*direction_y + pos.y, (j)*direction_z + pos.z));
                geometry.vertices.push(new THREE.Vector3(pos.x - ((j + face_height)/face_height)*downstep, (i)*direction_y + pos.y, (j + face_height)*direction_z + pos.z));
                geometry.vertices.push(new THREE.Vector3(pos.x - (j/face_height)*downstep, (i + size)*direction_y + pos.y, (j)*direction_z + pos.z));
              
            } else {
                /* down triangle */
                geometry.vertices.push(new THREE.Vector3(pos.x - (j/face_height)*downstep, (i + size)*direction_y + pos.y, (j)*direction_z + pos.z));
                geometry.vertices.push(new THREE.Vector3(pos.x - ((j + face_height)/face_height)*downstep, (i)*direction_y + pos.y, (j + face_height)*direction_z + pos.z));
                geometry.vertices.push(new THREE.Vector3(pos.x - (j/face_height)*downstep, (i)*direction_y + pos.y, (j)*direction_z + pos.z));
            }
            

            geometry.faces.push(new THREE.Face3(face_counter, face_counter + normal1, face_counter + normal2));
            face_counter += 3;

            number_of_faces--;

        }
    }

    static triangulated_right_triangle_v2(geometry, base, height, size, pos, direction_z, direction_y, normal1, normal2, offset) {
        var face_height = size * (height / base)
        //var angle = Math.atan(height/base);
        var number_of_faces = height / face_height;
        var face_counter = geometry.vertices.length;
        var downstep = face_height * offset/height;
        
        for(let i = 0; i < base; i += size){
            for(let j = 0; j < face_height * number_of_faces - face_height; j += face_height){
                
                if(direction_y > 0){
                    /* down triangle */
                    geometry.vertices.push(new THREE.Vector3((j + face_height)*direction_z + pos.x, (i + size)*direction_y + pos.y, pos.z - ((j + face_height)/face_height)*downstep));
                    geometry.vertices.push(new THREE.Vector3((j)*direction_z + pos.x, (i + size)*direction_y + pos.y, pos.z - (j/face_height)*downstep));
                    geometry.vertices.push(new THREE.Vector3((j + face_height)*direction_z + pos.x, (i)*direction_y + pos.y, pos.z - ((j + face_height)/face_height)*downstep));
                    geometry.vertices.push(new THREE.Vector3((j)*direction_z + pos.x, (i)*direction_y + pos.y, pos.z - (j/face_height)*downstep));
                  
                } else {
                    /* down triangle */
                    geometry.vertices.push(new THREE.Vector3((j + face_height)*direction_z + pos.x, (i)*direction_y + pos.y, pos.z - ((j + face_height)/face_height)*downstep));
                    geometry.vertices.push(new THREE.Vector3((j)*direction_z + pos.x, (i)*direction_y + pos.y, pos.z - (j/face_height)*downstep));
                    geometry.vertices.push(new THREE.Vector3((j + face_height)*direction_z + pos.x, (i + size)*direction_y + pos.y, pos.z - ((j + face_height)/face_height)*downstep));
                    geometry.vertices.push(new THREE.Vector3((j)*direction_z + pos.x, (i + size)*direction_y + pos.y, pos.z - (j/face_height)*downstep));

                }

                geometry.faces.push(new THREE.Face3(face_counter, face_counter + normal1, face_counter + normal2));
                geometry.faces.push(new THREE.Face3(face_counter + normal1, face_counter + 3, face_counter + normal2));

                face_counter += 4;
            }

            
            //last face isn't a square
            let j = face_height * number_of_faces - face_height;
            if(direction_y > 0){
                /* down triangle */
                geometry.vertices.push(new THREE.Vector3((j)*direction_z + pos.x, (i)*direction_y + pos.y, pos.z - (j/face_height)*downstep));
                geometry.vertices.push(new THREE.Vector3((j + face_height)*direction_z + pos.x, (i)*direction_y + pos.y, pos.z - ((j + face_height)/face_height)*downstep));
                geometry.vertices.push(new THREE.Vector3((j)*direction_z + pos.x, (i + size)*direction_y + pos.y, pos.z - (j/face_height)*downstep));
              
            } else {
                /* down triangle */
                geometry.vertices.push(new THREE.Vector3((j)*direction_z + pos.x, (i + size)*direction_y + pos.y, pos.z - (j/face_height)*downstep));
                geometry.vertices.push(new THREE.Vector3((j + face_height)*direction_z + pos.x, (i)*direction_y + pos.y, pos.z - ((j + face_height)/face_height)*downstep));
                geometry.vertices.push(new THREE.Vector3((j)*direction_z + pos.x, (i)*direction_y + pos.y, pos.z - (j/face_height)*downstep));
            }
            

            geometry.faces.push(new THREE.Face3(face_counter, face_counter + normal1, face_counter + normal2));
            face_counter += 3;

            number_of_faces--;

        }

    }

}