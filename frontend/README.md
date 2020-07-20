# Image tags

This is a small software to upload and tag photos, simply click and drag a square around any object on the photo and add a tag, saved images are stored in localStorage and can be viewed in the gallery. The tag and square are visible on hover only.

## known issues

- There is no notification on wether saving the image was successful or not. A suggestion is to add a snackbar that notifies the user when the image is saved.

- The label does not center itself good enough under the drawn rectangle, the positioning coordinates for the label and for the square need to be mapped so it renders correctly.

- If the mouse leaves the canvas area while drawing the square, mouseup does not get register, a function to check mousedown outside canvas need to be added.

- There are no breakpoints. Since this repo is more of a micro frontend service rather than a full app. However, should this be integrated with other services, breakpoints will be necessary.

- Should this ever be used in production, extensive testing is necessary for all components. Preferably the tests should be written during development of the components, but given a short time frame, and that the project is very small, it wasn't prioritised at that moment.

- The naming conventions should be looked over.

- Saving to localStorage is obviously not a good solution for production code. It needs to be properly wired to a backend service.

- The linter needs to be better configured.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
