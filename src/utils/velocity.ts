import velocity from "velocityjs";
import { ITemplating } from "../types";

class Templating implements ITemplating {
    partials = [];
    helpers = [];
    compile(templateString: string) {
        const asts = velocity.parse(templateString);
        return new velocity.Compile(asts);
    }
    render = velocity.render;
}

const templating = new Templating();

export default templating;
