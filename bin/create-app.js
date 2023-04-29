#! /usr/bin/env node

"use strict";

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx create-react-boilerplate my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "git@github.com:sllozier/create-react-boilerplate.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    );
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Installing dependencies...");
    execSync("npm install");

    console.log("Removing useless files");
    execSync("npx rimraf ./.git");
    fs.rmdirSync(path.join(projectPath, "bin"), { recursive: true });

    console.log("The installation is done, this is ready to use !");
  } catch (error) {
    console.log(error);
  }
}
main();

// const path = require("path");
// const util = require("util");
// const packageJson = require("../package.json");
// const fs = require("fs");
// const exec = util.promisify(require("child_process").exec);

// async function runCmd(command) {
//   try {
//     const { stdout, stderr } = await exec(command);
//     console.log(stdout);
//     console.log(stderr);
//   } catch {
//     (error) => {
//       console.log("\x1b[31m", error, "\x1b[0m");
//     };
//   }
// }

// if (process.argv.length < 3) {
//   console.log("\x1b[31m", "You have to provide name to your app.");
//   console.log("For example:");
//   console.log("    npx create-react-app my-app", "\x1b[0m");
//   process.exit(1);
// }

// const ownPath = process.cwd();
// const folderName = process.argv[2];
// const appPath = path.join(ownPath, folderName);
// const repo = "git@github.com:sllozier/create-react-boilerplate.git";

// try {
//   fs.mkdirSync(appPath);
// } catch (err) {
//   if (err.code === "EEXIST") {
//     console.log(
//       "\x1b[31m",
//       `The file ${appName} already exist in the current directory, please give it another name.`,
//       "\x1b[0m"
//     );
//   } else {
//     console.log(err);
//   }
//   process.exit(1);
// }

// async function setup() {
//   try {
//     console.log("\x1b[33m", "Downloading the project structure...", "\x1b[0m");
//     await runCmd(`git clone --depth 1 ${repo} ${folderName}`);

//     process.chdir(appPath);

//     console.log("\x1b[34m", "Installing dependencies...", "\x1b[0m");
//     await runCmd("npm install");
//     console.log();

//     await runCmd("npx rimraf ./.git");

//     fs.unlinkSync(path.join(appPath, "LICENSE.md"));
//     fs.rmdirSync(path.join(appPath, "bin"), { recursive: true });
//     fs.unlinkSync(path.join(appPath, "package.json"));

//     buildPackageJson(packageJson, folderName);

//     console.log(
//       "\x1b[32m",
//       "The installation is done, this is ready to use !",
//       "\x1b[0m"
//     );
//     console.log();

//     console.log("\x1b[34m", "You can start by typing:");
//     console.log(`    cd ${folderName}`);
//     console.log("    npm start", "\x1b[0m");
//     console.log();
//     console.log("Check Readme.md for more informations");
//     console.log();
//   } catch (error) {
//     console.log(error);
//   }
// }

// setup();

// function buildPackageJson(packageJson, folderName) {
//   const { bin, keywords, license, homepage, repository, bugs, ...newPackage } =
//     packageJson;

//   Object.assign(newPackage, {
//     name: folderName,
//     version: "1.0.0",
//     description: "",
//     author: "",
//     scripts: {
//       build: "webpack",
//       "build:dev": "npm run build -- --watch --mode=development",
//       seed: "node server/db/seed",
//       start: "node server",
//       "start:dev":
//         "npm run build:dev & npm run start-server & npm run css-watch",
//       "start:dev:logger": "LOGGING=true npm run start:dev",
//       "start:dev:seed": "SEED=true npm run start:dev",
//       "build:watch": "webpack -w",
//       "start-server":
//         "nodemon server -e html,js,scss --ignore public --ignore client",
//       "test:dev": "npm run test -- --watch",
//       "css-build": "webpack --mode production",
//       "css-watch": "npm run css-build -- --watch",
//     },
//     dependencies: {
//       "@reduxjs/toolkit": "^1.8.6",
//       axios: "^0.27.2",
//       bcrypt: "^5.0.1",
//       cors: "^2.8.5",
//       dotenv: "^16.0.2",
//       express: "^4.18.1",
//       jsonwebtoken: "^8.5.1",
//       mocha: "^10.0.0",
//       morgan: "^1.9.0",
//       nodemon: "^2.0.16",
//       path: "^0.12.7",
//       pg: "^8.7.3",
//       react: "^18.1.0",
//       "react-dom": "^18.1.0",
//       "react-redux": "^v8.0.1",
//       "react-router-dom": "^6.3.0",
//       "redux-logger": "^3.0.6",
//       "redux-persist": "^6.0.0",
//       "redux-thunk": "^2.4.1",
//       rimraf: "^5.0.0",
//       sequelize: "^6.20.0",
//     },
//     devDependencies: {
//       "@babel/core": "7.17.10",
//       "@babel/preset-env": "7.17.10",
//       "@babel/preset-react": "7.16.7",
//       "@babel/preset-stage-2": "^7.8.3",
//       "@babel/register": "^7.12.10",
//       "babel-loader": "8.2.5",
//       "css-loader": "^6.7.3",
//       "dotenv-webpack": "^8.0.1",
//       "mini-css-extract-plugin": "^2.7.5",
//       "style-loader": "^3.3.2",
//       webpack: "^5.79.0",
//       "webpack-cli": "^4.10.0",
//       "webpack-dev-server": "^4.7.3",
//     },
//   });

//   fs.writeFileSync(
//     `${process.cwd()}/package.json`,
//     JSON.stringify(newPackage, null, 2),
//     "utf8"
//   );
// }
