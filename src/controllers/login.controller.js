import {getConnection} from '../database/connection.js'
import mssql from 'mssql'
import crypto from 'crypto'
import { logger } from '../config/log.js'; // Importa el logger

export const getLogin= async (req, res) => {
    try {
        const pool= await getConnection();
        const password= crypto.createHash('sha256').update(req.body.Password).digest('hex').toUpperCase();
        const result= await pool.request()
        .input('Nombre', mssql.VarChar, req.body.Nombre)
        .query('SELECT NombreUsuario, Contrasena FROM Usuarios WHERE NombreUsuario = @Nombre');

        if(result.rowsAffected[0]===0){
            return res.json({message: "La usuario no coincide"})
        }
        console.log(result.recordset[0].Contrasena)
        console.log(password)
        if(password === result.recordset[0].Contrasena){
            return res.json({message:"Bienvenido", usuario: req.body.Nombre})
        }
        return res.json({message: "La contraseña no coincide"})
    } catch (error) {
        logger.error({
            message: 'Error en getJugadores',
            error: error.message, // Mensaje del error
            stack: error.stack,  // Pila del error para depuración
            route: req.originalUrl // Ruta donde ocurrió el error
        });
    }

}

export const postNewUser= async (req, res) => {
    try {
            const pool= await getConnection();
            const password= crypto.createHash('sha256').update(req.body.Password).digest('hex')
            const result= await pool.request()
            .input('Nombre', mssql.VarChar, req.body.Nombre)
            .input('Password', mssql.VarChar, password)
            .input('Rol', mssql.VarChar, req.body.Rol)
            .input('Date', mssql.VarChar, req.body.Date)
            .input('RolId', mssql.VarChar, req.body.RolId)
            .query('INSERT INTO Usuarios (NombreUsuario, Contrasena, Rol, FechaCreacion, RolID) VALUES(@Usuario, @Password, @Rol, @Date, @RolId)');
            return res.json({})
        } catch (error) {
            return res.status(400).json({message: "No se ha creado el jugador"})
        }
    
}