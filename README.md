# Devspark

Devspark is a browser extension composed of several parts, unified in this monorepo. It leverages different technologies across various components.

## Stack

Here's a breakdown of the technologies used in different parts of the extension:

- **Content-script:** SolidJS
- **Options:** React + TailwindCSS
- **Popup:** React + TailwindCSS
- **Background:** service-worker + vanilla js

## Installation

Start by installing the required dependencies:

```bash
pnpm install
```

## Development

You can develop and test the extension in either a Chromium-based browser or Firefox. Use one of the following commands based on your preference:

- For Chromium-based browsers:

```bash
pnpm run dev:chromium
```

- For Firefox:

```bash
pnpm run dev:firefox
```

The only difference is that they will generate different `manifest.json` files. Firefox uses version 2, while Chromium uses version 3.

## Building the Extension

The built extension files will be located in the `dist/` directory.

### Firefox

Build the extension for Firefox using:

```bash
pnpm run build:firefox
```

### Chrome

Build the extension for Google Chrome using:

```bash
pnpm run build:chrome
```

## Publishing

### Firefox

When you run `pnpm run build:firefox` the source code will be automatically zipped by `web-ext`. 
Once done you'll find the file in `./web-ext-artifacts`. 
You can upload this zip file to [AMO](https://addons.mozilla.org).
