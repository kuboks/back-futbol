import path from 'path';
import winston from 'winston';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo actual y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verificar existencia de la carpeta de logs
const logDir = path.join(__dirname, '../..', 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Formato personalizado
const customFormat = winston.format.printf(({ timestamp, level, message, stack, route }) => {
    return `
===== LOG ENTRY =====
Timestamp: ${timestamp}
Level: ${level.toUpperCase()}
Message: ${message}
Route: ${route || 'N/A'}
Stack Trace: 
${stack || 'No stack trace available'}
=====================
    `;
});

// Configuración de transporte con rotación diaria
const dailyRotateTransport = new DailyRotateFile({
    filename: path.join(logDir, 'error-%DATE%.log'), // Formato para incluir la fecha
    datePattern: 'YYYY-MM-DD', // Patrón de fecha para los archivos
    maxFiles: '14d', // Mantener los logs por 14 días
    level: 'error', // Nivel de log
});

// Configuración de Winston
export const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint({ colorize: false }) // Formato JSON indentado
    ),
    transports: [
        dailyRotateTransport, // Transporte con rotación diaria
        new winston.transports.Console(), // Transporte para la consola
    ],
});
