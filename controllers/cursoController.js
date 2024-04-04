import CursoModel from '../models/cursoModel.js'


export default class CursoController {
    async listar(req, res) {
        try{
            let curso = new CursoModel();
            let listaCursos = await curso.listar()

            if (listaCursos.length > 0) {
                res.status(200).json(listaCursos);
            } else {
                res.status(404).json({ msg: "Não existe curso cadastrado!"});
            }
        }
        catch(ex) {
            res.status(500).json(
                {msg: "Erro inesperado! Entre em contato com o nosso suporte técnico.",
                detalhes: ex.message})
        }
        
    }
}