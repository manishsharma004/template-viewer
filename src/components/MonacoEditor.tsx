import React, { useCallback, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor'

interface EditorProps {
  className?: string;
  mode: string;
  onChange: (value: string, event: monaco.editor.IModelContentChangedEvent) => void;
  width: string;
  value: string;
}
const MonacoEditor: React.FC<EditorProps> = ({ className, mode, onChange, width, value }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const updateOnChange = useCallback(() => {
    editorRef.current?.getModel()?.onDidChangeContent((event) => {
      onChange(editorRef.current!.getValue(), event);
    });
  }, [onChange]);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        language: mode,
        theme: 'vs-dark',
        automaticLayout: true,
      });

      updateOnChange();

      return () => editorRef.current?.dispose();
    }
  }, [mode, updateOnChange]);

  useEffect(() => {
    updateOnChange();
  }, [updateOnChange]);

  return (
    <div className={`editor-container ${className}`} style={{ width }}>
      <div
        className={className}
        ref={containerRef}
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default MonacoEditor;
