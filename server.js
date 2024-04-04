import express from 'express'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import cursoRouter from './routes/cursoRoute.js';
import matriculaRouter from './routes/matriculaRoute.js';
import loginRouter from './routes/loginRoute.js'
import mensalidadeRouter from './routes/mensalidadeRoute.js'

const app = express();

//configura as ferramentas de parser
app.use(cookieParser());
app.use(express.json());

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));

app.use('/cursos', cursoRouter);
app.use('/matricula', matriculaRouter);
app.use('/login', loginRouter);
app.use('/mensalidades', mensalidadeRouter);

app.listen(5000, function() {
    console.log("backend em execução");
})