import {get} from 'lodash'
import creditLines from "../domain/creditLines";
import logger from "../core/logger";
import converHrTime from 'convert-hrtime';

import 'babel-polyfill';

const update = async(req, res, next) => {

  if (!req.headers['x-customer-id']) {
    return res.status(422).send();
    next();
  }
  const customerId = req.headers['x-customer-id'];
  const data = req.body;
  logger.log("info", "UPDATE CREDIT-LINES", {customerId});
  let start = process.hrtime();
  try {
    const result =  await creditLines.update(customerId, data);

    let end = converHrTime(process.hrtime(start));
    logger.log("info", "UPDATE CREDIT-LINES", {processTime:end.milliseconds});
    return res.status(200).send(result);
    next();
  } catch (error) {
    logger.log("error", `Error actualizando las lineas de credito del usuario ${customerId}`, {errorMessage:error.toString()} );
    return res.status(500).send();
    next();
  }
};

const getResume = async(req, res, next) => {

  if (!req.headers['x-customer-id']) {
    return res.status(422).send();
    next();
  }
  const customerId = req.headers['x-customer-id'];
  logger.log("info", 'GET CREDIT-LINES', {customerId});
  let start = process.hrtime();

  try {
    const resume = await creditLines.getResume(customerId);
    let end = converHrTime(process.hrtime(start));
    logger.log("info", 'GET CREDIT-LINES', {processTime:end.milliseconds});
    return res.status(200).send(resume);
    next();
  } catch (error) {
    logger.log("error", `Error obteniendo las lineas de credito del usuario ${customerId}`, {errorMessage:error.toString()});
    return res.status(500).send();
    next();
  }
};

const deleteCreditLine = async(req, res, next) => {
  if (!req.headers['x-customer-id'] || !req.body.credit_line_id) {
    return res.status(422).send();
    next();
  }
  const customerId  = req.headers['x-customer-id'];
  const creditLineId  = get(req,'body.credit_line_id');
  logger.log("info", 'DELETE CREDIT-LINES', {customerId});
  let start = process.hrtime();

  try {
    await creditLines.deleteCreditLine(customerId, creditLineId);
    let end = converHrTime(process.hrtime(start));
    logger.log("info", 'DELETE CREDIT-LINES', {processTime:end.milliseconds});
    return res.status(200).send();
    next();
  } catch (error) {
    logger.log("error", `Error eliminando una linea de credito ${creditLineId} del usuario ${customerId}`, {errorMessage:error.toString()} );
    return res.status(500).send();
    next();
  }

};

const getStatement = async(req, res, next) => {

  if (!req.headers['x-customer-id']) {
    return res.status(422).send();
    next();
  }
  const customerId = req.headers['x-customer-id'];
  logger.log("info", 'GET-STATEMENT-CREDIT-LINES', {customerId});
  let start = process.hrtime();

  try {
    const statement = await creditLines.getStatement(customerId);
    let end = converHrTime(process.hrtime(start));
    logger.log("info", 'GET-STATEMENT-CREDIT-CARDS-LINES', {processTime:end.milliseconds});
    return res.status(200).send(statement);
    next();
  } catch (error) {
    logger.log("error", `Error obteniendo la informacion de las lineas de credito del usuario ${customerId} para balance`, {errorMessage:error.toString()} );
    return res.status(500).send();
    next();
  }

};

export default { update, getResume, deleteCreditLine, getStatement };
