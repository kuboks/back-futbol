import {getConnection} from '../database/connection.js'
import mssql from 'mssql'
import { logger } from '../config/log.js'; // Importa el logger

export const getJugadores = async (req, res) => {
    try {
        const pool= await getConnection();
        const result = await pool.request().query('SELECT Nombre, Posicion, Edad, EquipoID FROM Jugadores');
        return res.json(result.recordset);
    } catch (error) {
        // Registrar el error con Winston
        logger.error({
            message: 'Error en getJugadores',
            error: error.message, // Mensaje del error
            stack: error.stack,  // Pila del error para depuración
            route: req.originalUrl // Ruta donde ocurrió el error
        });

        // Responder al cliente con un mensaje de error genérico
        return res.status(500).json({
            message: 'Ocurrió un error al intentar registrar al jugador.',
        });

    }

}

export const getJugador = async (req, res) => {
    try {
        const pool= await getConnection();
        const result = await pool.request()
        .input('Id', mssql.Int, req.params.id)
        .query('SELECT Nombre, Posicion, Edad, EquipoID FROM Jugadores WHERE JugadorID = @Id');
        if(result.rowsAffected[0]===0){
            return res.status(204).send({message: 'No se encontro al jugador'});
        }
        return res.json(result.recordset);
    } catch (error) {
        // Registrar el error con Winston
        logger.error({
            message: 'Error en getJugador',
            error: error.message, // Mensaje del error
            stack: error.stack,  // Pila del error para depuración
            route: req.originalUrl // Ruta donde ocurrió el error
        });

        // Responder al cliente con un mensaje de error genérico
        return res.status(500).json({
            message: 'Ocurrió un error al intentar registrar al jugador.',
        });

    }

}
export const postJugador = async (req, res) => {
    try {
        const pool= await getConnection();
        const result= await pool.request()
        .input('Nombre', mssql.VarChar, req.body.Nombre)
        .input('Posicion', mssql.VarChar, req.body.Posicion)
        .input('Edad', mssql.Int, req.body.Edad)
        .input('EquipoID', mssql.Int, req.body.EquipoID)
        .query('INSERT INTO Jugadores (Nombre, Posicion, Edad, EquipoID) VALUES (@Nombre, @Posicion, @Edad, @EquipoID); SELECT SCOPE_IDENTITY() as id');
        return res.json({
            id: result.recordset[0].id,
            Nombre: req.body.Nombre,
            Posicion: req.body.Posicion,
            Edad: req.body.Edad,
            EquipoID: req.body.EquipoID
        })
    } catch (error) {
        // Registrar el error con Winston
        logger.error({
            message: 'Error en postJugador',
            error: error.message, // Mensaje del error
            stack: error.stack,  // Pila del error para depuración
            route: req.originalUrl // Ruta donde ocurrió el error
        });

        // Responder al cliente con un mensaje de error genérico
        return res.status(500).json({
            message: 'Ocurrió un error al intentar registrar al jugador.',
        });

    }
}

export const putJugador = async (req, res) => {
    try {
        const pool= await getConnection();
        const result = await pool.request()
        .input('Id', mssql.Int, req.params.id)
        .input('Nombre', mssql.VarChar, req.body.Nombre)
        .input('Posicion', mssql.VarChar, req.body.Posicion)
        .input('Edad', mssql.Int, req.body.Edad)
        .input('EquipoID', mssql.Int, req.body.EquipoID)
        .query('UPDATE Jugadores SET Nombre = @Nombre, Posicion = @Posicion, Edad = @Edad, EquipoID = @EquipoID WHERE JugadorID = @Id');
        
        
        if(result.rowsAffected[0]===0){
            return res.status(204).send({message: 'No se encontro al jugador'});
        }
        return res.json({message: "Se actualizo el jugador"});
    } catch (error) {
        return res.status(400).json({message: "No se actualizo el jugador"});
    }

}
export const deleteJugador = async (req, res) => {
    try {
        const pool= await getConnection();
            const result = await pool.request()
            .input('Id', mssql.Int, req.params.id)
            .query('DELETE FROM Jugadores WHERE JugadorID = @Id');
            if(result.rowsAffected[0]===0){
                return res.status(204).json({message: 'No se encontro al jugador'});
            }
            return res.json({message: "Se ha eliminado el jugador"});
    } catch (error) {
        
    }
}