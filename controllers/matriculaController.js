import Database from "../db/database.js";
import CursoModel from "../models/cursoModel.js";
import MatriculaModel from "../models/matriculaModel.js";
import MensalidadeModel from "../models/mensalidadeModel.js";
import UsuarioAlunoModel from "../models/usuarioAlunoModel.js";
import { getRandomInt } from '../utils/utils.js'

export default class MatriculaController{
    async gravar(req, res) {
        let banco = new Database();
        try {
            if (req.body) {
                let { matNome, matEmail, matCep, matEndereco, matBairro, matCidade, matUF, cursoId } = req.body;
                if (matNome && matEmail && matCep && matEndereco && matBairro && matCidade && matUF && cursoId) {
                    await banco.AbreTransacao();

                    let matricula = new MatriculaModel(0, matNome, new Date(), matEmail, matCep, matEndereco, matBairro, matCidade, matUF, 'S', new CursoModel(cursoId));
                    matricula.matId = await matricula.gravar(banco);

                    let curso = new CursoModel();
                    curso = await curso.obter(cursoId);

                    if (curso) {
                        // gerar mensalidades do semestre
                        for (let i = 0; i < 6; i++) {
                            let mensalidade = new MensalidadeModel();
                            mensalidade.menValor = curso.cursoValor; 
                            let dataVencimento = new Date()
                            dataVencimento.setMonth(6)
                            dataVencimento.setMonth(dataVencimento.getMonth() + i);
                            let mes = dataVencimento.getMonth() + 1;
                            mensalidade.menMes = mes;
                            mensalidade.menVencimento = dataVencimento;
                            mensalidade.matricula = matricula;

                            await mensalidade.gravar(banco);
                        }

                        let usuarioAluno = new UsuarioAlunoModel();
                        usuarioAluno.usaRA = `${matricula.matId}${new Date().getFullYear()}${getRandomInt(100, 999)}`
                        usuarioAluno.usaSenha = getRandomInt(100000, 999999);
                        usuarioAluno.matricula = matricula;

                        await usuarioAluno.gravar(banco);

                        await banco.Commit();
                        res.status(200).json({msg: "Matricula realizada com sucesso!"});

                    } else {
                        res.status(400).json({msg: "Não existe um curso com esse ID!"})
                    }
                } else{

                    res.status(400).json({msg: "O corpo da requisição não possui todos os dados exigidos para matricula"})
                }
            } else{
                res.status(400).json({msg: "Requisição inválida"})
            }
        } catch {
            await banco.Rollback();
            res.status(500).json({msg: "Erro interno de servidor!"});
        }
    }
}