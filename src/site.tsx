/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Map } from "./components/map";

const ButtonLazy = React.lazy(() =>
  import("./components/button").then((C) => ({
    default: C.Button,
  }))
);

const Components = {
  Button: (...props: any) => (
    <Suspense fallback={"loading"}>
      <ButtonLazy {...props} />
    </Suspense>
  ),
  Map: Map,
};

type DetailMicrofrontend<T> = {
  component: keyof typeof Components;
  element: Element;
  props?: T;
};

export function create<T>(data: DetailMicrofrontend<T>) {
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
