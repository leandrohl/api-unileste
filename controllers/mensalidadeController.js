import MatriculaModel from "../models/matriculaModel.js";
import MensalidadeModel from "../models/mensalidadeModel.js";

export default class MensalidadeController {

    async listar(req, res) {
        try{
            let matriculaId = req.usuarioLogado.matricula.matId;
            let mensalidade = new MensalidadeModel();

            let matricula = new MatriculaModel();
            matricula = await matricula.obter(matriculaId)

            if (matricula) {
                if (matricula.matCursando == 'S') {
                    let listaMensalidades = await mensalidade.listarPorMatricula(matriculaId)
    
                    if (listaMensalidades.length > 0) {
                        res.status(200).json(listaMensalidades);
                    } else {
                        res.status(404).json({ msg: "Não existe mensalidades para este usuário cadastrado!"});
                    }
                } else {
                    res.status(400).json({msg: "Usuário não está cursando!"})
                }
            } else {
                res.status(400).json({msg: "Matricula não encontrada!"})
            }

        }
        catch(ex) {
            res.status(500).json(
                {msg: "Erro inesperado! Entre em contato com o nosso suporte técnico.",
                detalhes: ex.message})
        }
        
    }
}