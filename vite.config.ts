import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".scss", ".css"],

        // find + change path in jsconfig.json
        alias: [{find: "@", replacement: path.resolve(__dirname, "src")},
            {find: "~", replacement: path.resolve(__dirname, "node_modules")}
        ]
    },
    server: {
        port: 3000
    }
})
