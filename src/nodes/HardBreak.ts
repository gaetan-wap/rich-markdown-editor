import Node from "./Node";
import breakRule from "../rules/breaks";

export default class HardBreak extends Node {
  get name() {
    return "br";
  }

  get schema() {
    return {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{ tag: "br" }],
      toDOM() {
        return ["br"];
      },
    };
  }

  get rulePlugins() {
    return [breakRule];
  }

  commands({ type }) {
    return () => (state, dispatch) => {
      dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
      return true;
    };
  }

  keys({ type }) {
    return {
      "Shift-Enter": (state, dispatch) => {
        return false
      },
    };
  }

  toMarkdown(state) {
    state.write(" \\n ");
  }

  parseMarkdown() {
    return { node: "br" };
  }
}
