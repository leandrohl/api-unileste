import Database from "../db/database.js";

const banco = new Database();

export default class CursoModel {     
    #cursoId;     
    #cursoNome;     
    #cursoValor; 

    constructor(cursoId, cursoNome, cursoValor) {
        this.#cursoId = cursoId;
        this.#cursoNome = cursoNome;
        this.#cursoValor = cursoValor;
    }

    get cursoId() {
        return this.#cursoId;
    }

    set cursoId(cursoId) {
        this.#cursoId = cursoId;
    }

    get cursoNome() {
        return this.#cursoNome;
    }

    set cursoNome(cursoNome) {
        this.#cursoNome = cursoNome;
    }

    get cursoValor() {
        return this.#cursoValor;
    }

    set cursoValor(cursoValor) {
        this.#cursoValor = cursoValor;
    }

    toJSON(){
        return {
            "cursoId": this.#cursoId,
            "cursoNome": this.#cursoNome,
            "cursoValor": this.#cursoValor
        }
    }

    async obter(id) {
        let sql = "select * from tb_curso where cur_id = ?";
        let valores = [id]

        let row = await banco.ExecutaComando(sql, valores);

        if (row.length > 0) {
            return new CursoModel(row[0]["cur_id"], row[0]["cur_nome"], row[0]["cur_valor"])
        }

        return null;
    }

    async listar() {
        let sql = "select * from tb_curso";

        let rows = await banco.ExecutaComando(sql);

        const lista = rows.map(row => new CursoModel(row["cur_id"], row["cur_nome"], row["cur_valor"]))

        return lista;
    }
}