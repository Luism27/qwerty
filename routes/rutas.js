// server
const { conec } = require('../server');
const bodyParser = require("body-parser"); // nejorar el envio de uinf

const path = require("path");
const port = process.env.PORT || 8080;
const { app } = require('../server');
const { express1 } = require('../server');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/static",express1.static('./static/'));
app.set("public", __dirname + "/public");

// static files
app.use("/public", express1.static('./public/'));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/inicio.html'))
   
});

app.get("/datos", (req, res) => {
    if (conec) {
        var sql = "SELECT * FROM designsyrus ORDER BY id DESC limit 1 ";
        conec.query(sql, function(err, result) {
            if (err) throw err;
            res.json(result[0]);
            //console.log('La base de datos: ',result[0]);
            //con.end();
        });
    } else {
        console.log("error conection with db");
    }
    //res.json(`${mensaje}`);
});

app.post("/h",(req,res) =>{
    if(conec){
        var sql =
              "SELECT * FROM designsyrus where fecha between ? and ? and hora between ? and ? ";
            var value = [
              req.body.fecha1,
              req.body.fecha2,
              req.body.hora1,
              req.body.hora2
            ];
            console.log(`La consulta es ${value}`)
            conec.query(sql, value, function(err, result) {
              if (err) throw err;
              res.json(result);
              
              //con.end();
            });
            
    }else{
        console.log("Error with Db")
    }
});
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});