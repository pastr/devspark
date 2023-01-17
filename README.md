# Devspark Toolbox

## Requirements
No special requirement that I'm aware of.

## Stack 
React + TailwindCSS bundled with Vite.

# Installation
`npm i`

# Dev

The development has to be improved but currently to start the extension in development mode you need to run three command in paralel:

- `npm run dev`
- `npm run dev:content` (it will generate the `index.global.js` file)
- `npm run dev:background` (it will generate the `background.global.js` file)

There are multiples `manifest.json` files for now. 
`manifestV2.json` is a manifest V2 file for firefox.
`manifestV2.json` is a manifest V3 file for chrome.
`manifest.json` is the one being read by the browser so you can change its content to match the browser you want to test with. 

# Building the Extension:

## Firefox
`npm run build:firefox` builds the extension for Firefox.

The generated files are in `dist/`.

## Chrome
`npm run build:chrome` builds the extensions for Google Chrome.


# Publishing

## Firefox

Simply ziping the `dist` folder didn't work. I had to use [web-ext](https://github.com/mozilla/web-ext).

In the `dist` folder I ran `web-ext build` and it created a zip file that I uploaded to AMO (https://addons.mozilla.org)