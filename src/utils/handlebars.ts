import Handlebars, { HelperDelegate } from "handlebars";
import { ITemplating } from "../types";

class Templating implements ITemplating {
    partials = [];
    helpers = [];
    compile = Handlebars.compile;
    render(templateString: string, context: object) {
        const template = Handlebars.compile(templateString);

        return template(context);
    }
    addPartial(name: string, template: string | HandlebarsTemplateDelegate) {
        Handlebars.registerPartial(name, template);
        this.partials.push(name);
    }
    listPartials() {
        return Object.freeze(this.partials);
    }
    addHelper(name: string, helperFn: HelperDelegate) {
        Handlebars.registerHelper(name, helperFn);
        this.helpers.push(name);
    }
    listHelpers() {
        return Object.freeze(this.helpers);
    }
}

const templating = new Templating();

export default templating;
