import { TemplateType } from "../types";

export const getTemplating = async (name: TemplateType) => {
    return import(`./${name}`).then((module) => module.default);
};
