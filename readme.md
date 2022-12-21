## get-version-plugin

webpack plugin for getting project version when webpack finished build

## use

```javascript
  plugins: [
    new GetVersionPlugin({
      path: path.join(__dirname, "./public/version.json"),
    }),
    ]
```
