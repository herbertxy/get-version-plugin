const fs = require("fs");
const execSync = require("child_process").execSync; //同步子进程

const pluginName = "get-version-plugin";

class GetVersionPlugin {
  constructor(options) {
    if (options.path) this.path = options.path;
    if (options.offset) this.offset = options.offset;
  }

  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
    //   console.log("webpack 构建正在启动！");
    });

    const name = execSync("git show -s --format=%cn").toString().trim(); // Commit author
    let date = new Date(execSync("git show -s --format=%cd").toLocaleString()); // Date with default timezone 0
    date.setHours(date.getHours() + (this.offset || 0)).toLocaleString() // Add offset and Convert to string with modified date
    let message = execSync("git show -s --format=%s").toString().trim(); // Commit message
    let commit = execSync("git show -s --format=%h").toString().trim();  //  Commit id
    let branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim(); // Branch

    compiler.hooks.done.tap(pluginName, () => {
      // console.log("webpack 构建过程结束！",compiler.options);
      try {
        let version_json = JSON.stringify(
          {
            name,
            date,
            message,
            commit,
            branch,
          },
          null,
          2
        );
        const version_file = fs.createWriteStream(this.path);
        version_file.write(version_json, (err) => {
          if (err) {
            return;
          } else {
            console.log('succeed generator version '+this.path
            ,version_json);
          }
        });
      } catch (e) {
        throw new Error(e);
      }
    });
  }
}

module.exports = GetVersionPlugin;
