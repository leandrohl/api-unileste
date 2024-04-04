import Database from "../db/database.js";
import MatriculaModel from "./matriculaModel.js";

let banco = new Database();

export default class UsuarioAlunoModel {
    #usaId;
    #usaRA;
    #usaSenha;
    #matricula;

    constructor(usaId, usaRA, usaSenha, matricula) {
        this.#usaId = usaId;
        this.#usaRA = usaRA;
        this.#usaSenha = usaSenha;
        this.#matricula = matricula;
    }

    // Métodos getters e setters
    get usaId() {
        return this.#usaId;
    }

    set usaId(usaId) {
        this.#usaId = usaId;
    }

    get usaRA() {
        return this.#usaRA;
    }

    set usaRA(usaRA) {
        this.#usaRA = usaRA;
    }

    get usaSenha() {
        return this.#usaSenha;
    }

    set usaSenha(usaSenha) {
        this.#usaSenha = usaSenha;
    }

    get matricula() {
        return this.#matricula;
    }

    set matricula(matricula) {
        this.#matricula = matricula;
    }

    // Método toJson para retornar um objeto com os dados do usuário em formato JSON
    toJSON() {
        return {
            usaId: this.#usaId,
            usaRA: this.#usaRA,
            usaSenha: this.#usaSenha,
            matriculaId: this.#matricula.matId
        };
    }

    async obter(id) {
        let sql = "select * from tb_usuarioaluno where usa_id = ?";
        let valores = [id]

        let row = await banco.ExecutaComando(sql, valores);

        if (row.length > 0) {
            return new UsuarioAlunoModel(row[0]["usa_id"], row[0]["usa_ra"], row[0]["usa_senha"], new MatriculaModel( row[0]["mat_id"]))
        }

        return null;
    }

    async obterPorRASenha(ra, senha) {

        let sql = "select * from tb_usuarioaluno where usa_ra = ? and usa_senha = ?";

        let valores = [ra, senha];

        let row = await banco.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new UsuarioAlunoModel(row[0]["usa_id"], row[0]["usa_ra"], row[0]["usa_senha"], new MatriculaModel( row[0]["mat_id"]))
        }

        return null;
    }

    async gravar(bd) {
        if(bd != null)
            banco = bd;

        let sql = 'insert into tb_usuarioaluno ( usa_ra, usa_senha, mat_id) values ( ?, ?, ?)'
        let valores = [this.#usaRA, this.#usaSenha, this.#matricula.matId]

        let result = await bd.ExecutaComandoNonQuery(sql, valores);
        
        return result;
    }
}