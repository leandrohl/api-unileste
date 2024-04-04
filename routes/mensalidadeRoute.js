import express from 'express'
import MensalidadeController from '../controllers/mensalidadeController.js'
import Autenticacao from '../middlewares/autenticacao.js';

let ctrl = new MensalidadeController()
const router = express.Router();
let auth = new Autenticacao();
router.get('/', auth.validar, (req, res) => {
    // #swagger.tags = ['Mensalidades']
    // #swagger.summary = 'Listar as mensalidades de um usuário'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    ctrl.listar(req, res);
});

export default router;