import Autenticacao from "../middlewares/autenticacao.js";
import LoginModel from "../models/loginModel.js";
import UsuarioAlunoModel from "../models/usuarioAlunoModel.js";

export default class LoginController {

    async autenticar(req, res) {
        try{
            if(req.body) {
                let { ra, senha } = req.body;
                let loginModel = new LoginModel(ra, senha)
                if(await loginModel.autenticar()) {
                    //gerar jwt
                    let usuario = new UsuarioAlunoModel();
                    usuario = await usuario.obterPorRASenha(ra, senha);
                    usuario.usaSenha = "";
                    let auth = new Autenticacao();
                    let token = auth.gerarToken(usuario.toJSON())
                    
                    res.cookie("jwt", token, {
                        httpOnly: true
                    })

                    res.status(200).json({tokenAcesso: token});
                }
                else {
                    res.status(404).json({msg: "Ra/senha inválidos"});
                }
            }
            else {
                res.status(400).json({msg: "RA e senha não informados"});
            } 
        }
        catch(ex) {
            res.status(500).json({msg: "Erro interno de servidor"});
        }
        
    }

}