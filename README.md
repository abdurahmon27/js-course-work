# Fundamentals of Web Development Final Project

## Task Requirements

1. Please, place all your `SCSS` styles to `src/styles` folder.
2. The `package.json` file is already created, please don't delete NPM scripts which are already there. This file should look like this when you initiate the project:

   ```json
   {
      "scripts" {
         "postinstall": "cd ./test && npm i || true",
         "test": "cd ./tests && npm run tes  t",
         "build": "echo \"Dummy build script for Autocode\""
      }

   }
   ```

3. Your main HTML page should be named `index.html` and be placed `src/index.html`.
4. Root files for regular and mobile styles have to have names `style.scss` and `mobile.scss` and be placed inside `src/styles` folder. These names are used for automatic checks.
5. All the result CSS file have to be in `dist` folder.
   - result styles should be in `src/dist/style.css`
   - result minified styles should be in `src/dist/style.min.css`
