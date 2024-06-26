import jwt from 'jsonwebtoken'
import UsuarioAlunoModel from '../models/usuarioAlunoModel.js';

const JWT_SEGREDO = "M3H4CK34R4M";

export default class Autenticacao {

    async validar(req, res, next) {
        if(req.cookies.jwt) {
            let token = "";
            try{
                token = req.cookies.jwt;
                let usuario = jwt.verify(token, JWT_SEGREDO);
                //se acontecer erro durante a validação, irá cair no catch
                //consigo acessar as propriedades do usuário que eu adicionei ao token
                let usuarioAlunoModel = new UsuarioAlunoModel();
                usuarioAlunoModel = await usuarioAlunoModel.obter(usuario.usaId);
                if(usuarioAlunoModel != null) {
                    req.usuarioLogado = usuarioAlunoModel;
                    next();
                }
                else{
                    res.status(401).json({msg: "Usuário inválido"});
                }
            }
            catch(ex) {
                if(ex.name == "TokenExpiredError") {
                    let usuarioRecuperado = jwt.verify(token, JWT_SEGREDO, { ignoreExpiration: true })

                    let auth = new Autenticacao();
                    let novoToken = auth.gerarToken({
                        usaId: usuarioRecuperado.usaId,
                        usaRA: usuarioRecuperado.usaRA,
                        usaSenha: usuarioRecuperado.usaSenha,
                        matricula: usuarioRecuperado.matricula
                    })
                    res.cookie("jwt", novoToken, {
                        httpOnly: true
                    });
                    req.usuarioLogado = usuarioRecuperado;
                    next();
                }
                else{
                    res.status(401).json({msg: "Usuário não autorizado"})
                }
                
            }

        }
        else{
            res.status(401).json({msg: "Usuário não autorizado"});
        }
    }

    gerarToken(usuario) {
        return jwt.sign(usuario, JWT_SEGREDO, { expiresIn: 60 })
    }
}