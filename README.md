# React + TypeScript + Vite

## CI/CD

GitHub Actions workflows are configured in `.github/workflows`.

- `CI` runs on pull requests and pushes to `main`/`master`.
- `Deploy` runs on pushes to `main`/`master` and can also be started manually.
- Both workflows use Node 24 and run `npm ci`, `npm run test`, `npm run lint`, and `npm run build`.

Production deploy uses Vercel CLI. Add these repository secrets in GitHub to enable deployment:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

If the Vercel secrets are not configured, the deploy workflow skips only the deployment steps after successful checks.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
    "$schema": "./node_modules/oxlint/configuration_schema.json",
    "plugins": ["react", "typescript", "oxc"],
    "options": {
        "typeAware": true
    },
    "rules": {
        "react/rules-of-hooks": "error",
        "react/only-export-components": [
            "warn",
            { "allowConstantExport": true }
        ]
    }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
