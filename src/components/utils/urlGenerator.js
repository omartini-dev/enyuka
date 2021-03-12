var slugify = require('slugify');

exports.makeBlogPagePath = ({ slug, tags }) => {

  var nice_tag = slugify(tags ? tags[0] : "no category", {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  return `/blogs/${nice_tag}/${slug}/`

}

exports.makeBlogTagPagePath = ({ tag }) => {

  var nice_tag = slugify(tag, {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  return `/blogs/${nice_tag}/`
 
}

exports.makeBlogTagPath = ({ tag }) => {

  var nice_tag = slugify(tag, {
    replacement: '-',
    remove: /[*+~.()'"!:@_,]/g,
    lower: true
  });

  return nice_tag
 
}