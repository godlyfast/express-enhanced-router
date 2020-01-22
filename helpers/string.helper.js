function toKebab(s) {
  var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
  var REVERSE_REGEX = /-[a-z\u00E0-\u00F6\u00F8-\u00FE]/g;

  const kebabbed = (function kebabCase(str) {
    return str.replace(KEBAB_REGEX, function(match) {
      return "-" + match.toLowerCase();
    });
  })(s);
  
  return s[0].toLowerCase() !== s[0] ? kebabbed.substring(1) : kebabbed;
}
function toPascal(s) {
  return s
    .match(/[a-z]+/gi)
    .map(function(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    })
    .join("");
}
const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

module.exports = {
  toKebab,
  toPascal,
  capitalize
};