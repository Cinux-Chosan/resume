var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<svg class=\"icon "
    + alias4(((helper = (helper = helpers.svgClass || (depth0 != null ? depth0.svgClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"svgClass","hash":{},"data":data}) : helper)))
    + "\" aria-hidden=\"true\">\n  <use xlink:href=\"#"
    + alias4(((helper = (helper = helpers.iconClass || (depth0 != null ? depth0.iconClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconClass","hash":{},"data":data}) : helper)))
    + "\"></use>\n</svg>";
},"useData":true});