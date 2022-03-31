const { ValidationError } = require('sequelize')
const boom = require('@hapi/boom');
function handleSQLError (err, req, res, next) {
  if (err instanceof ValidationError) {
    throw boom.conflict(err.errors[0].message)
  }
  next(err)
}
function queryErrorHandler(err, req, res, next) {
  if (err.parent) {
    const { fields, parent } = err;
    res.status(500).json({
      field: fields,
      message: parent.detail,
    });
  }
  next(err);
}
module.exports = {
  handleSQLError,
  queryErrorHandler
};
