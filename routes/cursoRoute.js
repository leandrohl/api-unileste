import express from 'express'
import CursoController from '../controllers/cursoController.js'

let ctrl = new CursoController()
const router = express.Router();

router.get('/', (req, res) => {
    // #swagger.tags = ['Cursos']
    // #swagger.summary = 'Lista os cursos cadastrados'
    ctrl.listar(req, res);
});

export default router;