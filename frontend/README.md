# frontend

A simple web app that emulates calls

## Approach

This submission uses `preact`, a lightweight alternative to react.

* Modern functional components that use hooks instead of classes
* Components are stateless
* Routes handle all the state & async interactions


## What works
* Camera feed (if user provides authorization for camera, otherwise falls back to html5 video)
* Pausing video 
* Ending the call
* Adding participants with one click
* Removing participants with two clicks
* Extra "How was your call?" screen
* Backend support (optional)
* Black get-app-bar gets hidden in landscape
* Responsive backgrounds in css (2x, 3x)

Participant grid is implemented with css flexbox with a very few lines of css. Whole layout is fully flexible and takes all available space, can resize and rearrange in responds to reorientation.

Backend request is not inlined, however icons were.

## What's not perfect
* Mockups used different variations of the font, I used just one instead - the weights/letter-spacing may not be perfect.
* There was no special handling of mobile address bar. This is due to the fact it's pretty unreliable. However the layout is made in a way that takes all visible space, so any scroll-hack applied on top of the layout will produce good results. It's easy to see things work well when switching between orientations
* Polyfills were not used for things like `Element.closest` and `fetch`. Needs modern-ish browser, but can be easily fixed by including optional code.

## Running it

``` bash
# Run backend first by going to backend folder and running
npm install
node app.js

# then go to frontend to serve at localhost:5000
npm install
npm run serve

# go to localhost:5000
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
