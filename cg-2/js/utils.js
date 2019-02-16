class Utils {
    static rand_between(n1, n2) {
        return Math.random() * (n1 - n2) + n2;
    }

    static distance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.z - pos2.z, 2))
    }


    static colliding(pos1, pos2, d) {
        return Utils.distance(pos1, pos2) <= d;
    }

    static calc_angle(vec) {
        var angle;
        var sign = Math.sign(vec.z);
        var aux;
        if(vec.x < 0) {
            aux = vec.x;
            vec.x = Math.abs(vec.z);
            vec.z = -sign * aux;

            angle = Math.atan(vec.z/vec.x);
            angle += sign*Math.PI/2;
        } else {
            angle = Math.atan(vec.z/vec.x);
        }

        return angle;
    }
}