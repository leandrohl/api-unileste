import express from 'express'
import MatriculaController from '../controllers/matriculaController.js'

let ctrl = new MatriculaController()
const router = express.Router();

router.post('/', (req, res) => {
   // #swagger.tags = ['Matricula']
    // #swagger.summary = "Realizar matricula do aluno"
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/matriculaModel"
                }
            }
            
        }
    }*/
    ctrl.gravar(req, res);
});

export default router;