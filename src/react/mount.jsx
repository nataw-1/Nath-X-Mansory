import React from "react";
import { createRoot } from "react-dom/client";

const roots = new WeakMap();

export function mountReactIsland(container, Component, props = {}) {
  if (!(container instanceof HTMLElement) || typeof Component !== "function") {
    return () => {};
  }

  let root = roots.get(container);
  if (!root) {
    root = createRoot(container);
    roots.set(container, root);
  }

  root.render(React.createElement(Component, props));

  return () => {
    root.unmount();
    roots.delete(container);
  };
}
