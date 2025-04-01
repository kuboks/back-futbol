import express from 'express'
import jugadoresRoutes from './routes/jugadores.routes.js'
import login from './routes/login.routes.js'

const app= express()

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Welcome to my api');
});

app.use('/api', jugadoresRoutes);
app.use('/api', login);



export default app