# Devspark

## Stack

### Content-script
SolidJS

### Options
React + TailwindCSS

### Popup
React + TailwindCSS

# Installation

`pnpm install`

# Dev

The development has to be improved but currently to start the extension in development mode you need to run three command in paralel:

- `npm run dev`
- `npm run dev:content` (it will generate the `index.global.js` file)
- `npm run dev:background` (it will generate the `background.global.js` file)

There are multiples `manifest.json` files. 
`manifestV2.json` is a manifest V2 file for firefox.
`manifestV3.json` is a manifest V3 file for chrome.

# Building the Extension:
The generated files will be in `dist/`.

## Firefox

`pnpm run build:firefox` builds the extension for Firefox.


## Chrome

`pnpm run build:chrome` builds the extensions for Google Chrome.


# Publishing

## Firefox

Simply ziping the `dist` folder didn't work. I had to use [web-ext](https://github.com/mozilla/web-ext).

In the `dist` folder, run `web-ext build` and it will create a zip file that can be uploaded to AMO (https://addons.mozilla.org)
