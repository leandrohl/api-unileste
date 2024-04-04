import Database from "../db/database.js";

const banco = new Database();

export default class LoginModel {

    #ra;
    #senha;

    get ra() {
        return this.#ra;
    }
    set ra(ra) {
        this.#ra = ra;
    }
    get senha() {
        return this.#senha;
    }
    set senha(senha) {
        this.#senha = senha;
    }

    constructor(ra, senha) {
        this.#ra = ra;
        this.#senha = senha;
    }

    async autenticar() {

        let sql = "select usa_id from tb_usuarioaluno where usa_ra = ? and usa_senha = ?";
        let valores = [this.#ra, this.#senha];

        let rows = await banco.ExecutaComando(sql, valores);

        return rows.length > 0;
    }

    toJSON() {
        return {
            "ra": this.#ra,
            "senha": this.#senha
        }
    }
}