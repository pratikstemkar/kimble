const createError = error => {
    return {
        status: "error",
        error,
    };
};

const createSuccess = data => {
    return {
        status: "success",
        data,
    };
};

const createResult = (error, data) => {
    return error ? createError(error) : createSuccess(data);
};

module.exports = {
    createError,
    createSuccess,
    createResult,
};
