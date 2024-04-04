import Database from "../db/database.js";

let banco = new Database();

export default class MatriculaModel {
    #matId;
    #matNome;
    #matData;
    #matEmail;
    #matCep;
    #matEndereco;
    #matBairro;
    #matCidade;
    #matUF;
    #matCursando;
    #curso;

    constructor(matId, matNome, matData, matEmail, matCep, matEndereco, matBairro, matCidade, matUF, matCursando, curso) {
        this.#matId = matId;
        this.#matNome = matNome;
        this.#matData = matData;
        this.#matEmail = matEmail;
        this.#matCep = matCep;
        this.#matEndereco = matEndereco;
        this.#matBairro = matBairro;
        this.#matCidade = matCidade;
        this.#matUF = matUF;
        this.#matCursando = matCursando;
        this.#curso = curso;
    }

    get matId() {
        return this.#matId;
    }

    set matId(matId) {
        this.#matId = matId;
    }

    get matNome() {
        return this.#matNome;
    }

    set matNome(matNome) {
        this.#matNome = matNome;
    }

    get matData() {
        return this.#matData;
    }

    set matData(matData) {
        this.#matData = matData;
    }

    get matEmail() {
        return this.#matEmail;
    }

    set matEmail(matEmail) {
        this.#matEmail = matEmail;
    }

    get matCep() {
        return this.#matCep;
    }

    set matCep(matCep) {
        this.#matCep = matCep;
    }

    get matEndereco() {
        return this.#matEndereco;
    }

    set matEndereco(matEndereco) {
        this.#matEndereco = matEndereco;
    }

    get matBairro() {
        return this.#matBairro;
    }

    set matBairro(matBairro) {
        this.#matBairro = matBairro;
    }

    get matCidade() {
        return this.#matCidade;
    }

    set matCidade(matCidade) {
        this.#matCidade = matCidade;
    }

    get matUF() {
        return this.#matUF;
    }

    set matUF(matUF) {
        this.#matUF = matUF;
    }

    get matCursando() {
        return this.#matCursando;
    }

    set matCursando(matCursando) {
        this.#matCursando = matCursando;
    }

    get curso() {
        return this.#curso;
    }

    set curso(curso) {
        this.#curso = curso;
    }

    toJSON() {
        return {
            matId: this.#matId,
            matNome: this.#matNome,
            matData: this.#matData,
            matEmail: this.#matEmail,
            matCep: this.#matCep,
            matEndereco: this.#matEndereco,
            matBairro: this.#matBairro,
            matCidade: this.#matCidade,
            matUF: this.#matUF,
            matCursando: this.#matCursando,
            cursoId: this.#curso.cursoId
        };
    }

    async obter(id) {
        let sql = "select * from tb_matricula where mat_id = ?";
        let valores = [id]

        let row = await banco.ExecutaComando(sql, valores);

        if (row.length > 0) {
            return new MatriculaModel(row[0]["mat_id"], row[0]["mat_nome"], row[0]["mat_data"], row[0]["mat_email"], row[0]["mat_cep"], row[0]["mat_endereco"], row[0]["mat_bairro"], row[0]["mat_cidade"], row[0]["mat_uf"], row[0]["mat_cursando"], row[0]["cur_id"])
        }

        return null;
    }

    async gravar(bd) {
        if(bd != null)
            banco = bd;

        let sql = 'insert into tb_matricula (mat_nome, mat_data, mat_email, mat_cep, mat_endereco, mat_bairro, mat_cidade, mat_uf, mat_cursando, cur_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        let valores = [this.#matNome, this.#matData, this.#matEmail, this.#matCep, this.#matEndereco, this.#matBairro, this.#matCidade, this.#matUF, this.#matCursando, this.#curso.cursoId]
    
        let matriculaId = await bd.ExecutaComandoLastInserted(sql, valores);
        
        return matriculaId;
    }
}