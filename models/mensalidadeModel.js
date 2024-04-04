import Database from "../db/database.js";
import MatriculaModel from "./matriculaModel.js";

let banco = new Database();

export default class MensalidadeModel {     
    #menId;
    #menMes;     
    #menVencimento;     
    #menValor;     
    #matricula; 

    constructor(menId, menMes, menVencimento, menValor, matricula) {
        this.#menId = menId;
        this.#menMes = menMes;
        this.#menVencimento = menVencimento;
        this.#menValor = menValor;
        this.#matricula = matricula;
    }

    get menId() {
        return this.#menId;
    }

    set menId(menId) {
        this.#menId = menId;
    }

    get menMes() {
        return this.#menMes;
    }

    set menMes(menMes) {
        this.#menMes = menMes;
    }

    get menVencimento() {
        return this.#menVencimento;
    }

    set menVencimento(menVencimento) {
        this.#menVencimento = menVencimento;
    }

    get menValor() {
        return this.#menValor;
    }

    set menValor(menValor) {
        this.#menValor = menValor;
    }

    get matricula() {
        return this.#matricula;
    }

    set matricula(matricula) {
        this.#matricula = matricula;
    }

    toJSON() {
        return {
            menId: this.#menId,
            menMes: this.#menMes,
            menVencimento: this.#menVencimento,
            menValor: this.#menValor,
            matriculaId: this.#matricula.matId
        };
    }

    async gravar(bd) {
        if(bd != null)
            banco = bd;

        let sql = 'insert into tb_mensalidade (men_mes, men_vencimento, men_valor, mat_id) values (?, ?, ?, ?)'
        let valores = [this.#menMes, this.#menVencimento, this.#menValor, this.#matricula.matId]
    
        let result = await bd.ExecutaComandoNonQuery(sql, valores);
        
        return result;
    }

    async listarPorMatricula(matriculaId) {
        let sql = "select * from tb_mensalidade where mat_id = ?";
        let valores = [matriculaId]

        let rows = await banco.ExecutaComando(sql, valores);

        const lista = rows.map(row => new MensalidadeModel(row["men_id"], row["men_mes"], row["men_vencimento"], row["men_valor"], new MatriculaModel(row["mat_id"]) ))

        return lista;
    }
}