import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

const STYLESHEET_LINK_PATTERN =
    /<link rel="stylesheet"([^>]*?)href="([^"]+)"([^>]*)>/g

function deferStylesheets(): Plugin {
    return {
        name: 'defer-stylesheets',
        apply: 'build',
        enforce: 'post',
        transformIndexHtml(html) {
            return html.replace(
                STYLESHEET_LINK_PATTERN,
                (_match, before: string, href: string, after: string) => {
                    const attrs = `${before}${after}`.trim()
                    const attrsSuffix = attrs ? ` ${attrs}` : ''

                    return (
                        `<link rel="preload" as="style" href="${href}"${attrsSuffix} ` +
                        `onload="this.onload=null;this.rel='stylesheet'">` +
                        `<noscript><link rel="stylesheet" href="${href}"${attrsSuffix}></noscript>`
                    )
                }
            )
        },
    }
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), deferStylesheets()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
