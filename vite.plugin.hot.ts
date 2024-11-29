import react from "@vitejs/plugin-react";
import { Plugin } from "vite";

/**
 * Corrige o erro: Uncaught Error: @vitejs/plugin-react can't detect preamble. Something is wrong.
 * 
 * O código javascript era adicionado no .html e o plugin adiciona no ponto de entrada javascript.
 * 
 * Só funciona com @vitejs/plugin-react o @vitejs/plugin-react-swc não expoe o código js
 * 
 * Para funcionar com swc adicionar o javascript https://github.com/vitejs/vite-plugin-react-swc/blob/main/src/index.ts#L17
 */
export function injectJsHotReloadPlugin(entryPointFile: string): Plugin {
    return {
      name: "inject-hotreload-into-bundle",
      apply: "serve",
      transform(code: string, id: string) {
        if (id.endsWith(entryPointFile)) {
          return `
            ${react.preambleCode
              .replace("__BASE__", "/")
              .replaceAll("RefreshRuntime", "__Inject__RefreshRuntime")}
  
            ${code}
          `;
        }
        return code;
      },
    };
  }