import { Router } from 'express';

import { 
    getLogin,
    postNewUser
} from '../controllers/login.controller.js';

const loginRoutes = Router()

loginRoutes.post('/login', getLogin);
loginRoutes.post('/login', postNewUser);

export default loginRoutes