import React, { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, insertTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import { nord } from "cm6-theme-nord";
import { useAppSelector } from "@/lib/hooks";

const indentWithTab = {
  key: "Tab",
  run: insertTab,
};

const theme = {
  "&": {
    backgroundColor: "black",
  },
};

const extensions = [
  basicSetup,
  keymap.of([...defaultKeymap, indentWithTab]),
  json(),
  EditorState.tabSize.of(3),
  nord,
];

export default function JsonEditor({ panelValue, setPanelValue, editable = true }: any) {
  const editorRef = useRef(null);
  const { Requestdata } = useAppSelector(state => state.initialRequest);

  useEffect(() => {
    if (!editorRef.current) return; // Check if ref is not null or undefined
    const state = EditorState.create({
      doc: panelValue,
      extensions: [
        ...extensions,
        EditorView.updateListener.of((view) => {
          if (view.docChanged) {
            setPanelValue(view.state.doc);
          }
        }),
        EditorView.editable.of(editable),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [editorRef, panelValue, setPanelValue, editable, Requestdata]);

  return <section ref={editorRef} className="rounded-lg border border-black/5 overflow-hidden w-full h-fit"></section>;
}
