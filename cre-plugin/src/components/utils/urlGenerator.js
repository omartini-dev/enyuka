var slugify = require('slugify');

exports.makePropertyPagePath = ({ property_gmaven_key, gmaven_mapped_key, property_category = "no category", unit_category = "no category", suburb = "no suburb", property_name = "no name", unit_id = "no id" }, deal = "ToLet", type = "property") => {

  var category = "no category";
  var prop_type = type.replace("_", "-");

  if (deal === "ToLet" && type === "property") {
    category = property_category || "no category";
  }

  if (deal === "ToLet" && type === "property_unit") {
    category = unit_category || "no category";
  }

  if (deal === "ForSale") {
    category = property_category || "no category";
  }

  var nice_deal = deal.replace("ToLet", "to-let").replace("ForSale", "for-sale");

  var nice_name = slugify(property_name, {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  var nice_category = slugify(category, {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  var nice_suburb = slugify(suburb, {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  var nice_id = slugify(unit_id, {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  if (type === "property") {
    return `/${prop_type}/${nice_deal}/${nice_category}/${nice_suburb}/${nice_name}/`
  }

  if (type === "property_unit") {
    return `/${prop_type}/${nice_deal}/${nice_category}/${nice_suburb}/${nice_name}/${nice_id}/`
  }


}

exports.makePropertyRedirectPath = ({ type = "property", deal = "ToLet", category = "no category", suburb = "" }, path = "category") => {

  var prop_type = type.replace("_", "-");

  var nice_deal = deal.replace("ToLet", "to-let").replace("ForSale", "for-sale");

  var nice_category = slugify(category, {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  var nice_suburb = slugify(suburb, {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  if (path === "category") {

    return `/${prop_type}/${nice_deal}/${nice_category}/`;

  }

  if (path === "suburb") {

    return `/${prop_type}/${nice_deal}/${nice_category}/${nice_suburb}/`;

  }

}

exports.makeSlug = (name) => {

  var nice_name = slugify(name, {
    replacement: '%20',
    remove: /[*+~.()'"!:@_,]/g,
    lower: false
  });

  return nice_name

}