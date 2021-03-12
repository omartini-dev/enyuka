var gross_price_1 = null;
var gross_price_2 = null;
var net_price_1 = null;
var net_price_2 = null;
var priceFrom = 'POA';
var gla_1 = null;
var gla_2 = null;

//Price range
function priceRange(property) {
  if (Math.min.apply(Math, property.map(function (o) { return o.gross_price; })) !== Math.max.apply(Math, property.map(function (o) { return o.gross_price; }))) {
    gross_price_1 = Math.min.apply(Math, property.map(function (o) { return o.gross_price; }))
    gross_price_2 = Math.max.apply(Math, property.map(function (o) { return o.gross_price; }))
  } else {
    gross_price_1 = Math.min.apply(Math, property.map(function (o) { return o.gross_price; }))
    gross_price_2 = null;
  }

  if (Math.min.apply(Math, property.map(function (o) { return o.net_price; })) !== Math.max.apply(Math, property.map(function (o) { return o.net_price; }))) {
    net_price_1 = Math.min.apply(Math, property.map(function (o) { return o.net_price; }))
    net_price_2 = Math.max.apply(Math, property.map(function (o) { return o.net_price; }))
  } else {
    net_price_1 = Math.min.apply(Math, property.map(function (o) { return o.net_price; }))
    net_price_2 = null;
  }

  //Price from
  priceFrom = Math.min.apply(Math, property.map(function (o) { return o.min_gla * o.gross_price; }))

  return { gross_price_1, gross_price_2, net_price_1, net_price_2, priceFrom }
}

function glaRange(property) {
  if (Math.min.apply(Math, property.map(function (o) { return o.min_gla; })) !== Math.max.apply(Math, property.map(function (o) { return o.max_gla; }))) {
    gla_1 = Math.min.apply(Math, property.map(function (o) { return o.min_gla; }))
    gla_2 = Math.max.apply(Math, property.map(function (o) { return o.max_gla; }))
  } else {
    gla_1 = Math.min.apply(Math, property.map(function (o) { return o.min_gla; }))
    gla_2 = null;
  }

  return { gla_1, gla_2 }
}

exports.priceRange = priceRange;
exports.glaRange = glaRange;