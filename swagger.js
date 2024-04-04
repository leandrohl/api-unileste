import swaggerAutogen from "swagger-autogen";
import CursoModel from "./models/cursoModel.js";
import MatriculaModel from "./models/matriculaModel.js";
import LoginModel from "./models/loginModel.js";
import MensalidadeModel from "./models/mensalidadeModel.js";

const doc = {
    info: {
        title: "API - Unileste",
        description: "API utilizada para o serviços digitais da universidade"
    },
    host: 'localhost:5000',
    components: {
        securitySchemes:{
        },
        schemas: {
            loginModel: new LoginModel("teste@teste.com", "123").toJSON(),
            cursoModel: new CursoModel(1, "Análise e Desenvolvimento de Sistemas", 500).toJSON(),
            matriculaModel: new MatriculaModel(1, "teste", new Date(), "teste@teste.com", "19485698", "rua tal", "Jardim Maracana", "Presidente Prudente", "SP", "S", new CursoModel(1, "Análise e Desenvolvimento de Sistemas", 500) ).toJSON(),
            mensalidadeModel: new MensalidadeModel(1, 7, new Date(), 800, new MatriculaModel(1)).toJSON()
        },
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})