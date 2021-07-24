const createRes = (res, httpCode = 500, status = "failure", error = '', data = {}) => {
    let responseData = {};
    responseData.status = status;
    responseData.error = error;
    responseData.data = data;
    res.status(httpCode).json(responseData);
}

exports.response = (res) => (error, data) => {
    if (data) createRes(res, 200, 'success', error, data)
    else createRes(res, 400, "failed", error, data)
}

