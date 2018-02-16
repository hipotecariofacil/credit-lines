import creditLinesService from "../services/creditLines";

const update = (customerId, data) => {
    return creditLinesService.update(customerId, data);
};

const getResume = (customerId) => {
    return creditLinesService.getResume(customerId);
};

const deleteCreditLine = (customerId, creditLineId) => {
    return creditLinesService.deleteCreditLine(customerId, creditLineId);
};

export default { update, getResume, deleteCreditLine };
