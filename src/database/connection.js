import mssql from 'mssql';

const connectionSettings={
    server: "localhost",
    database: "datafutbol",
    user: "kubo",
    password: "kubo1234",
    options:{
        encrypt: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 0,  // Número mínimo de conexiones en el pool
        idleTimeoutMillis: 300000 // Tiempo máximo que una conexión puede estar inactiva antes de cerrarse
    }

};

export async function getConnection(){
    try {
        const pool = await mssql.connect(connectionSettings)
        return pool;
    } catch (error) {
        console.error(error);
    }
}