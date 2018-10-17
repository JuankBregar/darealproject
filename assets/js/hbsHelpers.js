var register = function(Handlebars) {
        var helpers = {

                navbar: (labels) =>
                    `<ul class="breadcrumb">
                ${labels.map((val) => `<li class="breadcrumb-item">
                ${val.url?`<a href="${val.url}">${val.name}</a>`:
                val.name}
                </li>`).join('')}
                </ul>`,
                //TODO: add helper to load scripts per module
                scripts: (assets=[])=>assets.map(val=>`<script src="../../${val}"></script>`).join('')
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);