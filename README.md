# Manafa User Management Prototype

This repository contains the complete React/Vite source code for the Manafa company-admin prototype.

Included flows:

- User Management, including UC001 Ownership & Management and UC008 Permission Requests
- CapEx Funding Request review and supplier approval
- Create Loan, repayment editing, tasks, settings, and go-live stages
- Create Facility Contract, including conditions, products, and guarantees
- Pledge Agreement list and creation

## Requirements

- Node.js 20 LTS or newer
- npm (included with Node.js)

## Run locally

1. Extract the ZIP file.
2. Open a terminal in the extracted `manafa-user-management` folder.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the app:

   ```bash
   npm run dev -- --host 0.0.0.0
   ```

5. Open the local URL printed in the terminal. Other devices on the same network can use the printed Network URL.

## Run the production build

Build the project, then start the Vite preview server:

```bash
npm run build
npm run preview -- --host 0.0.0.0
```

## Rebuild after making changes

```bash
npm run build
```

The new production files will be written to `dist`.

## GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.
Every push to `main` builds the Vite app and publishes the `dist` artifact to GitHub Pages.

In the GitHub repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**.
