import {createLogger, format, transports} from 'winston';
import {createLogger as createLoggerLogz} from 'logzio-nodejs';

import { each, set, isEmpty } from 'lodash';
import {LOGZ_KEY} from '../config/environment'

const logger = createLogger({
    format: format.json(),
    transports: [
        new transports.Console({
            format: format.simple(),
            level: 'debug',
          })
    ]
  });

const loggerLogz = createLoggerLogz({
    token: LOGZ_KEY,
    type:'services-credit-lines'
});

const log = (level, message, meta = {}) => {
    const timestamp = Date.now()
    let env = 'dev'
    if(process.env.NODE_ENV === 'production'){
        env = 'production';
        //logz solo en produccion para ahorrar plata
        loggerLogz.log({level, message, meta, environment:env, timestamp});
    } 
       
    const msg = message + ' environment="'+env + '" timestamp="'+ timestamp+'"';
    let obj = {level,message:msg}
    if(!isEmpty(meta)) {
        set(obj, 'meta', meta)
    }
    logger.log(obj);

    
};

export default {log};