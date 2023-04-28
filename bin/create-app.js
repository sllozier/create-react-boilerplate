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
const git_repo = YOUR_GIT_URL;

// const ownPath = process.cwd();
// const folderName = process.argv[2];
// const appPath = path.join(ownPath, folderName);
// const repo = 'https://github.com/Leopold-V/react-parcel-app.git';

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

// async function setup() {
//   try {
//     console.log("\x1b[33m", "Downloading the project structure...", "\x1b[0m");
//     await runCmd(`git clone --depth 1 ${repo} ${folderName}`);

//     process.chdir(appPath);

//     console.log("\x1b[34m", "Installing dependencies...", "\x1b[0m");
//     await runCmd("npm install");
//     console.log();

//     await runCmd("npx rimraf ./.git");

//     fs.unlinkSync(path.join(appPath, "LICENSE.MD"));
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
//       start:
//         "npm run clean && parcel serve public/index.html --dist-dir development -p 3000",
//       build:
//         "rimraf ./build && parcel build public/*.html --dist-dir build --public-url ./",
//       test: "jest",
//       clean: "rimraf ./development && rimraf ./.parcel-cache",
//       prettify: "npx prettier --write ./src/",
//     },
//     devDependencies: {
//       "@parcel/transformer-sass": "^2.0.0-beta.2",
//       "@testing-library/dom": "^7.30.3",
//       "@testing-library/jest-dom": "^5.11.10",
//       "@testing-library/react": "^11.2.6",
//       autoprefixer: "^10.2.5",
//       "babel-preset-react-app": "^10.0.0",
//       jest: "^26.6.3",
//       "jest-cli": "^26.6.3",
//       parcel: "^2.0.0-beta.2",
//       prettier: "2.2.1",
//     },
//     dependencies: {
//       babel: "^6.23.0",
//       "jest-styled-components": "^7.0.3",
//       "normalize.css": "^8.0.1",
//       "prop-types": "^15.7.2",
//       react: "^17.0.2",
//       "react-dom": "^17.0.2",
//       "react-router-dom": "^5.2.0",
//       rimraf: "^3.0.2",
//       "styled-components": "^5.2.3",
//     },
//     postcss: {
//       plugins: {
//         autoprefixer: {
//           overrideBrowserslist: ["> 1%", "last 4 versions", "ie >= 9"],
//         },
//       },
//     },
//   });

//   fs.writeFileSync(
//     `${process.cwd()}/package.json`,
//     JSON.stringify(newPackage, null, 2),
//     "utf8"
//   );
// }
