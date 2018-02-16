import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {update, getResume, deleteCreditLine} from "./controllers/creditLines";
import logger from './core/logger';
import {checkJwt} from './middlewares/restrictedService';

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:true,credentials: true}));
app.set("port", 3017);


//getters
app.get("/credit-lines/resume", checkJwt, getResume);

//updates
app.put("/credit-lines", checkJwt, update);

//delete
app.delete("/credit-lines", checkJwt, deleteCreditLine);

app.listen(app.get('port'), () => {
    logger.log('info', 'credit-lines service corriendo en '+ app.get('port'));
});
