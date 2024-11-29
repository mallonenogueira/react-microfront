/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";

const Button = lazy(() =>
  import("./components/button").then((C) => ({ default: C.Button }))
);

const Map = lazy(() =>
  import("./components/map").then((C) => ({ default: C.Map }))
);

const Components = {
  Button,
  Map,
};

type MicrofrontendComponent<T> = {
  component: keyof typeof Components;
  element: Element;
  props?: T;
};

export function create<T>(data: MicrofrontendComponent<T>) {
  const root = ReactDOM.createRoot(data.element);
  const Component = Components[data.component];

  const render = (props?: any) => {
    root.render(
      <React.StrictMode>
        <Component {...(props ?? {})} />
      </React.StrictMode>
    );
  };

  render(data.props);

  return {
    unmount: () => root.unmount(),
    update: render,
  };
}
// @ts-expect-errorts-error
window.microfrontend = { create };
