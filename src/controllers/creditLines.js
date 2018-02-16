import {get} from 'lodash'
import creditLines from "../domain/creditLines";
import logger from "../core/logger";
import 'babel-polyfill';

const update = async(req, res, next) => {

  if (!req.headers['x-customer-id']) {
    return res.status(422).send();
    next();
  }
  const customerId = req.headers['x-customer-id'];
  const data = req.body;
  logger.log("info", "UPDATE CREDIT-LINES", `${customerId}`);
  let start = process.hrtime();
  try {
    const result =  await creditLines.update(customerId, data);

    let end = process.hrtime(start);
    logger.log("info", "UPDATE CREDIT-LINES", `${end[0]}.${end[1]}`);
    return res.status(200).send(result);
    next();
  } catch (e) {
    logger.log("error", `Error actualizando las lineas de credito del usuario ${customerId}`, e );
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
  logger.log("info", 'GET CREDIT-LINES', `${customerId}`);
  let start = process.hrtime();

  try {
    const resume = await creditLines.getResume(customerId);
    let end = process.hrtime(start);
    logger.log("info", 'GET CREDIT-LINES', `${end[0]}.${end[1]}`);
    return res.status(200).send(resume);
    next();
  } catch (e) {
    console.log("TUTO", e)
    logger.log("error", `Error obteniendo las lineas de credito del usuario ${customerId}`, e );
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
  logger.log("info", 'DELETE CREDIT-LINES', `${customerId}`);
  let start = process.hrtime();

  try {
    await creditLines.deleteCreditLine(customerId, creditLineId);
    let end = process.hrtime(start);
    logger.log("info", 'DELETE CREDIT-LINES', `${end[0]}.${end[1]}`);
    return res.status(200).send();
    next();
  } catch (e) {
    console.log(e)
    logger.log("error", `Error eliminando una linea de credito ${creditLineId} del usuario ${customerId}`, e );
    return res.status(500).send();
    next();
  }

};


export default { update, getResume, deleteCreditLine };
