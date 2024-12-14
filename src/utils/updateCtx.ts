const scriptMatcher = /<Script>.*<\/Script>/;

const runScript = (scriptString: string) => {
    return eval(scriptString.slice(8, -9));
};

export const updateCtx = (ctx: any) => {
    switch (typeof ctx) {
        case "object":
            if (ctx instanceof Array) {
                for (const [index, value] of ctx.entries()) {
                    if (
                        typeof value === "string" &&
                        scriptMatcher.test(value)
                    ) {
                        ctx[index] = runScript(value);
                    } else {
                        updateCtx(value);
                    }
                }
            }
            for (const key in ctx) {
                const value = ctx.key;
                if (typeof value === "string" && scriptMatcher.test(value)) {
                    ctx[key] = runScript(value);
                } else {
                    updateCtx(value);
                }
            }
            break;
        default:
            break;
    }
};
