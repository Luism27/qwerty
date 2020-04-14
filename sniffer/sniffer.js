const { server } = require('../server');
const { conec } = require('../server');
const IP="192.168.0.11";
const PORT=51000;
var mensaje;
server.on("error", err => {
    console.log(`server error:\n${err.stack}`); //si hay un error me lo dice
    server.close(); // close sniffer
});
server.on("message", (msg, rinfo) => {
    //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    mensaje = msg.toString("utf8");
    var re = /,/gi;
    mensaje = mensaje.replace(re,'.');
    console.log(mensaje);
    let Fecha, Hora;
    let longitud, latitud, fech;

    // Deco
    var time1;
    fecha = mensaje.slice(4, 17)
    id = mensaje.slice(38, 42);
    latitud = mensaje.slice(17, 25);
    longitud = mensaje.slice(25, 34);

    fech = new Date(parseFloat(fecha));
    //fech = new Date(parseFloat(fecha) - 18000000); cuando estamos en la cloud es necesario.// buscar
    Fecha = `${fech.getFullYear()}-${fech.getMonth() + 1}-${fech.getDate()}`;
    Hora = `${fech.getHours()}:${fech.getMinutes()}:${fech.getSeconds()}`;
    console.log('El mensaje es: ', mensaje);


    if (conec) {

        console.log("Connected!");
        var sql =
            "INSERT INTO designsyrus (fecha, hora, latitud, longitud ) VALUES ?";
        var value = [
            [Fecha, Hora, latitud, longitud]
        ];
        conec.query(sql, [value], function(err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            //con.end();
        });
    } else {
        console.log("Error conection with db");
    }
    console.log( 'el mensaje es' , mensaje);
     console.log(latitud);
     console.log(longitud);
     console.log(fecha);
     console.log(Hora);


    // insertar aqui db
});
server.on("listening", () => {
    const address = server.address();

});
server.bind(PORT, IP); //172.31.36.95---JOSEEEEE