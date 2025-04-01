import { Router } from 'express';
import {
    getJugadores,
    getJugador,
    postJugador,
    putJugador,
    deleteJugador
} from "../controllers/jugadores.controller.js";

const jugadoresRoutes = Router()

jugadoresRoutes.get('/', (req, res) => {
    res.send('Jugadores')
})

jugadoresRoutes.get('/jugadores', getJugadores)

jugadoresRoutes.get('/jugadores/:id', getJugador)

jugadoresRoutes.post('/jugadores', postJugador)

jugadoresRoutes.put('/jugadores/:id', putJugador)

jugadoresRoutes.delete('/jugadores/:id', deleteJugador)

export default jugadoresRoutes