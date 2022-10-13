//importacion de mariadb
const pool = require('../config/mariadb.js');

//importacion de helpers
const unixTimestamp = require('../helpers/unix.js');

const save_element = async (req, res) => {
    const {nombre} = req.body;
    console.log(nombre);
    
    await pool.getConnection().then( async (conn) => {
        const data = [nombre, unixTimestamp(), unixTimestamp() + 600];
        try{
            const query = await conn.query("INSERT INTO elemento(nombre, fecha_registro, fecha_vencimiento) VALUES(?, ?, ?)", data);
            console.log(query);
            
            
            res.status(201).json({
                'ok': true,
                'mensaje': 'el elemento fue registrado'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}

const save_materia = async(req, res) =>{
    console.log(req.body);
    const {nombre} = req.body;
    const {duracion} = req.body;

    console.log(nombre, duracion);
    
    await pool.getConnection().then( async (conn) => {
        const data = [nombre,
            duracion];
        try{
            const query = await conn.query("INSERT INTO materia( Nombre, Grado, ID_Carrera ) VALUES(?,?,?) ",data);
            console.log(query);
            
            res.status(201).json({
                'ok': true,
                'mensaje': 'La materia fue registrada con exito'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'La materia no pudo ser registrada'
            })
            conn.end();
        }
    });
}

const save_carrera = async(req, res) =>{
    const {nombre,duracion} = req.body;

    console.log(nombre, duracion);
    
    await pool.getConnection().then( async (conn) => {
        const data = [nombre,duracion];
        try{
            const query = await conn.query("INSERT INTO carrera(Nombre, Duracion) VALUES(?,?) ",data);
            console.log(query);
            
            res.status(201).json({
                'ok': true,
                'mensaje': 'La carrera fue registrada con exito'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'La carrera no pudo ser registrada'
            })
            conn.end();
        }
    });
}

const save_grupo = async(req, res) =>{
    console.log(req.body);
    const {nombre} = req.body;
    const {duracion} = req.body;

    console.log(nombre, duracion);
    
    await pool.getConnection().then( async (conn) => {
        const data = [nombre,
            duracion];
        try{
            const query = await conn.query("INSERT INTO grupo(ID_Grupo, Nombre, Grado) VALUES(?,?,?)",data);
            console.log(query);
            
            res.status(201).json({
                'ok': true,
                'mensaje': 'El grupo fue registrado con exito'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'El grupo no pudo ser registrado'
            })
            conn.end();
        }
    });
}

const get_grupo = async (req, res) => {
    await pool.getConnection().then( async (conn) => {
        try{
            const query = await conn.query("SELECT t2.Nombre,t2.Grado,t1.Hora,t1.Dia FROM horario AS t1 INNER JOIN materia AS t2 ON t1.ID_Materia= t2.ID_Materia INNER JOIN grupo AS t3 ON t1.ID_Grupo = t3.ID_Grupo WHERE t2.Grado = 2 AND t3.Nombre = 'Primero en sistemas'");
            res.status(200).json(query);
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}



const save_horario = async(req, res) =>{
    console.log(req.body);
    const {nombre} = req.body;
    const {duracion} = req.body;

    console.log(nombre, duracion);
    
    await pool.getConnection().then( async (conn) => {
        const data = [nombre,
            duracion];
        try{
            const query = await conn.query("INSERT INTO horario( Hora, Dia, ID_Grupo, ID_Materia) VALUES(?,?,?,?) ",data);
            console.log(query);
            
            res.status(201).json({
                'ok': true,
                'mensaje': 'El horario fue registrado con exito'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'El horario no pudo ser registrado'
            })
            conn.end();
        }
    });
}

const get_elements = async (req, res) => {
    await pool.getConnection().then( async (conn) => {
        try{
            const query = await conn.query("SELECT * FROM elemento WHERE fecha_vencimiento > ?", [unixTimestamp()]);
            res.status(200).json(query);
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}

const update_element = async (req, res) => {
    await pool.getConnection().then( async (conn) => {
        try{
            const data = [req.body.nombre, unixTimestamp() + 600, req.body.nombre_anterior];
            const query = await conn.query("UPDATE elemento SET nombre = ?, fecha_vencimiento = ? WHERE nombre = ?", data);
            res.status(201).json({
                'ok': true,
                'mensaje': 'el elemento fue actualizado'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}

const eliminar_elemento = async (req, res) => {
    await pool.getConnection().then( async (conn) => {
        try{
            const query = await conn.query("DELETE FROM elemento WHERE nombre = ?", [req.body.nombre]);
            res.status(200).json({
                'ok': true,
                'mensaje': 'el elemento fue eliminado'
            })
            conn.end();
        }catch(error){
            res.status(500).json({
                'ok': false,
                'mensaje': 'algo salio mal'
            })
            conn.end();
        }
    });
}

module.exports = {
    save_element,
    get_elements,
    update_element,
    eliminar_elemento,
    save_carrera,
    save_materia,
    save_grupo,
    save_horario,
    get_grupo
}