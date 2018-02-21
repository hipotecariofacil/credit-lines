import {get as getKey, keys, each, set, isArray} from 'lodash';
import axios from 'axios';
import env from "../config/environment";
import services from "../config/services";
import {executeQuery} from "../utils/query";
import logger from '../core/logger';
import { creditLine as creditLineMapper} from './mappers/infoMapper';

const _createQueryUpdate = (data, customerId) => {

  if(customerId) {
    set(data, 'customer_id', customerId);
  }

  let fields = [];
  let values = [];
  let keysUpdate = [];
  each(keys(data), (value, key) => {
    if(!getKey(data, value)){return;}
    fields.push(value);
    values.push('"' + getKey(data, value)+'"');
    keysUpdate.push(value+'="'+getKey(data, value)+'"');
  });

  return 'INSERT INTO hipopo.credit_lines (' + fields.join(',') + ') VALUES(' + values.join(',') + ')   ON DUPLICATE KEY UPDATE ' + keysUpdate.join(',');

};

const update = (customerId, data) => {

  return new Promise(async(resolve, reject)=>{
      const sql = ` ${_createQueryUpdate(creditLineMapper(data), customerId)}`;
      try{                 
        const result = await executeQuery(sql) ;
        resolve({lastCreditLineId:result.insertId});
      }
      catch(e) {
        reject(e)
      } 
  });
};

const getResume = (customerId) => {
  return new Promise(async(resolve, reject)=>{
      const sql = `SELECT 
                    credit_line_id, bank, fit_credit_line , amount_used 
                   FROM
                    hipopo.credit_lines
                   WHERE 
                    customer_id = ? 
                   ORDER BY 
                   credit_line_id 
                  DESC`;

      try{                 
        let creditLines = await executeQuery(sql, [customerId]) ;
        addFilesToResponse(creditLines, []);
        resolve(creditLines)
      }
      catch(e) {
        reject(e)
      }          
  });
};

const deleteCreditLine = (customerId, creditLineId, names) => {
  return new Promise(async(resolve, reject)=>{
      const sql = `DELETE FROM hipopo.credit_lines WHERE customer_id=? and credit_line_id =?`;
      try{     
        await executeQuery(sql, [customerId, creditLineId])
        resolve();
      }
      catch(e) {
        reject(e)
      }
  });
};

const addFilesToResponse = (creditLines, files) => {
  each(creditLines, (creditLine)=> {
    each(keys(creditLine), (key) => {
      let value = getKey(creditLine, key);     
      set(creditLine, key+'.value', value)
      let filesItem = [];
      each(files, (file)=>{
        if(file.item === key && file.componentId === creditLine.credit_line_id.value.toString()){
          filesItem.push({url:file.url})
        }
      })
      set(creditLine, key+'.metadata', {files:filesItem})
    })
  })
  
}

const getStatement = (customerId) => {

  return new Promise(async(resolve, reject)=>{
      const sql = `SELECT 
                credit_line_id, bank, fit_credit_line , amount_used 
              FROM
                hipopo.credit_lines
              WHERE 
                customer_id = ? 
              ORDER BY 
              credit_line_id 
              DESC`;
      Promise.all([
        executeQuery(sql, [customerId])
      ])
      .then((results) => {
        resolve({data:results[0], files:[]})
      })
      .catch((e)=> {
        console.log(e)
        reject(e)
      })

  });
};
export default { update, getResume, deleteCreditLine, getStatement };
