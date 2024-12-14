import React from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { handlebarsLanguage } from "@xiechao/codemirror-lang-handlebars";
import { jsonLanguage } from "@codemirror/lang-json";

const extensions = {
    handlebars: handlebarsLanguage,
    json: jsonLanguage,
};

interface EditorProps {
    className?: string;
    mode: string;
    onChange: (value: string, event: ViewUpdate) => void;
    width: string;
    height: string;
    value: string;
}
const CodeMirrorEditor: React.FC<EditorProps> = ({
    className,
    mode,
    onChange,
    width,
    height,
    value,
}) => {
    return (
        <div className={`editor-container ${className}`} style={{ width }}>
            <CodeMirror
                height={height}
                value={value}
                extensions={extensions[mode] ? [extensions[mode]] : []}
                onChange={onChange}
            />
        </div>
    );
};

export default CodeMirrorEditor;
