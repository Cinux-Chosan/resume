this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["header"] = Handlebars.template({
  compiler: [7, ">= 4.0.0"],
  main: function(container, depth0, helpers, partials, data) {
    var helper;

    return (
      '    <header class="resume__header">\n      <div class="col flex-center">\n        <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2431804042,2244417996&fm=58" alt="" class="photo">\n      </div>\n      <div class="col flex-center"></div>\n      <div class="col flex-center"></div>\n      <div class="col flex-center">\n        <dl>\n          <dt>联系方式：</dt>\n          <dd>\n            <svg class="icon icon_1_5" aria-hidden="true">\n              <use xlink:href="#icon-dianhua"></use>\n            </svg>\n            17782369765\n          </dd>\n          <dd>\n            <i class="icon-email"></i>\n          </dd>\n          <dd></dd>\n        </dl>\n      </div>\n\n      ' +
      container.escapeExpression(
        ((helper =
          (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) !=
          null
            ? helper
            : helpers.helperMissing),
        typeof helper === "function"
          ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
              name: "name",
              hash: {},
              data: data
            })
          : helper)
      ) +
      "\n    </header>"
    );
  },
  useData: true
});
