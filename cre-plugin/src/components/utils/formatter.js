//Currency
function formatCurrency(number) {
  if (number === 0 || !number) {
    return "POA";
  }
  var formatter = new Intl.NumberFormat(process.env.GATSBY_LOCALE, {
    style: 'currency',
    currency: process.env.GATSBY_CURRENCY_CODE,
    minimumFractionDigits: 0
  })
  return formatter.format(number);
}

//Currency with space
function formatCurrencyGLA(number1, number2) {
  if (number1 === 0 || !number1) {
    return "POA";
  }
  var formatter = new Intl.NumberFormat(process.env.GATSBY_LOCALE, {
    style: 'currency',
    currency: process.env.GATSBY_CURRENCY_CODE
  })
  if (number2) {
    return formatter.format(number1) + " /" + process.env.GATSBY_SPACE_SQUARED + " - " + formatter.format(number2) + " /" + process.env.GATSBY_SPACE_SQUARED;
  } else {
    return formatter.format(number1) + " /" + process.env.GATSBY_SPACE_SQUARED;
  }
}

//Space
function formatGLA(number1, number2) {
  if (number1 === 0 || !number1) {
    return "Not stated";
  }
  var formatter = new Intl.NumberFormat(process.env.GATSBY_LOCALE, {
    style: 'decimal',
  })
  if (number2) {
    return formatter.format(number1) + " " + process.env.GATSBY_SPACE_SQUARED + " - " + formatter.format(number2) + " " + process.env.GATSBY_SPACE_SQUARED;
  } else {
    return formatter.format(number1) + " " + process.env.GATSBY_SPACE_SQUARED;
  }
}

//Parking ratio
function formatParking(number) {
  if (number === 0 || !number) {
    return "Not stated";
  }
  var formatter = new Intl.NumberFormat(process.env.GATSBY_LOCALE, {
    style: 'decimal',
  })
  return formatter.format(number) + " bays / 100" + process.env.GATSBY_SPACE_SQUARED;
}

function formatBoolean(data, title) {
  if (data === 0 || data === "0" || data === "No" || data === "no" || data === "Not stated" || !data || data === false) {
    return false
  } else {
    return title + ": " + data
  }
}

function formatCluster(data) {
  if (data === 0 || data === "0" || !data || data === false) {
    return "No cluster";
  } else {
    return data;
  }
}

exports.formatCurrency = formatCurrency;
exports.formatCurrencyGLA = formatCurrencyGLA;
exports.formatGLA = formatGLA;
exports.formatParking = formatParking;
exports.formatBoolean = formatBoolean;
exports.formatCluster = formatCluster;