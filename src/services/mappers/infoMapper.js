import {get} from 'lodash';

const creditLine = (data) => {
  let obj =  {
    bank:get(data, 'bank'),
    fit_credit_line:get(data, 'fit_credit_line'),
    amount_used:get(data, 'amount_used')
  };
  return obj;
};


export default {creditLine};
