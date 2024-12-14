export interface ITemplating {
    compile: (templateString: string) => any;
    render(templateString: string, context: object): string;
}

export type TemplateType = "handlebars" | "velocity";
