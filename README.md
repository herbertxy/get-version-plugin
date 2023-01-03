## get-version-plugin

webpack plugin for getting project version when webpack finished build

## use

- npm install get-version-plugin -D

- webpack.config.js

```javascript
  const GetVersionPlugin = require("get-version-plugin");

  plugins: [
    new GetVersionPlugin({
      path: path.join(__dirname, "./public/version.json"),
    }),
    ]
```
