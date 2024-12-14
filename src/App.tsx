import React, { useCallback, useEffect, useState } from "react";

import "./App.scss";
import CodeMirrorEditor from "./components/CodeMirrorEditor";
import { getTemplating } from "./utils/templating";
import { TemplateType } from "./types";

const App: React.FC = () => {
    const [templateType, setTemplateType] =
        useState<TemplateType>("handlebars");
    const [template, setTemplate] = useState<string>("");
    const [context, setContext] = useState<Record<string, any>>({});
    const [src, setSrc] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [resolution, setResolution] = useState<{
        width: string;
        height: string;
    }>({ width: "100%", height: "100%" });

    const handleOnChange = useCallback((templateText: string) => {
        setTemplate(templateText);
    }, []);

    const handleContextChange = useCallback((ctxString: string) => {
        try {
            const ctx = JSON.parse(ctxString);
            setContext(ctx);
        } catch (err) {
            console.log("Error while parsing context", err);
        }
    }, []);

    useEffect(() => {
        const renderTemplate = async () => {
            const templating = await getTemplating(templateType);
            try {
                const res = templating.render(template, {
                    ...context,
                });
                setResult(res);
            } catch (err) {
                console.log("Error", err);
            }
        };
        renderTemplate();
    }, [templateType, template, context]);

    useEffect(() => {
        const objectUrl = URL.createObjectURL(
            new Blob([result], { type: "text/html" })
        );
        setSrc(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [result]);

    const handleResolutionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const [width, height] = event.target.value.split("X");
        setResolution({ width, height });
    };

    const isSelected = (value) => {
        const [width, height] = value.split("X");
        return resolution.width === width && resolution.height === height;
    };

    console.log("resolution", resolution);

    return (
        <div className="App">
            <div id="template-type-selection">
                Template Type:{" "}
                <span>
                    <label htmlFor="type">
                        Handlebars
                        <input
                            type="radio"
                            name="type"
                            value="handlebars"
                            onChange={(e) =>
                                setTemplateType(e.target.value as TemplateType)
                            }
                        />
                    </label>
                    <label htmlFor="type">
                        Velocity
                        <input
                            type="radio"
                            name="type"
                            value="velocity"
                            onChange={(e) =>
                                setTemplateType(e.target.value as TemplateType)
                            }
                        />
                    </label>
                </span>
            </div>
            <div id="content">
                <div id="editor">
                    Template:
                    <CodeMirrorEditor
                        className="editor"
                        mode="handlebars"
                        onChange={handleOnChange}
                        width="100%"
                        height="calc(50vh - 6rem)"
                        value={template}
                    />
                    <br></br>
                    <div className="controls">
                        <span>
                            <input
                                type="radio"
                                name="size"
                                value="100%Xcalc(100vh - 8rem)"
                                onChange={handleResolutionChange}
                                checked={isSelected("100%Xcalc(100vh - 8rem)")}
                            />
                            100% x (100vh - 8rem)
                        </span>
                        <span>
                            <input
                                type="radio"
                                name="size"
                                value="800pxX600px"
                                onChange={handleResolutionChange}
                                checked={isSelected("800pxX600px")}
                            />
                            800 x 600
                        </span>
                        <span>
                            <input
                                type="radio"
                                name="size"
                                value="1024pxX768px"
                                onChange={handleResolutionChange}
                                checked={isSelected("1024pxX768px")}
                            />
                            1024 x 768
                        </span>
                    </div>
                    <br></br>
                    Data:
                    <CodeMirrorEditor
                        className="editor"
                        mode="json"
                        onChange={handleContextChange}
                        width="100%"
                        height="calc(50vh - 6rem)"
                        value={JSON.stringify(context, null, 2)}
                    />
                </div>
                <div
                    id="window"
                    style={{
                        width: resolution.width,
                        height: resolution.height,
                    }}
                >
                    <iframe title="Preview" src={src} />
                </div>
            </div>
        </div>
    );
};

export default App;
