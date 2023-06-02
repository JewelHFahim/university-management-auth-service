1. npm install typescript --save-dev
2. npm install mongoose --save
3. npm install express --save
4. tsc —init (change rootDir nad outDir in tsconfig.json)
5. npm i dotenv
6. ts-node-dev
7. cors

after installing dependencies create ->

fl src/
-app.ts
-server.ts
-fl config
--index.ts
.env
.gitignore

after creating folder, initial setup to run the server

# app.ts

{
import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()
const port = 5000

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
res.send('Hello World!')
})

export default app;
}

# server.ts

{
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function bootstrap() {

    try {
        await mongoose.connect(config.database_url as string);
        console.log('Database connected Successfully');

        app.listen(config.port, () => {
            console.log(`Application listening on port ${config.port}`)
        })

    } catch (error) {
        console.log('Faild to connect', error)
    }

}
bootstrap();
}

# index.ts

{
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
port: process.env.PORT,
database_url: process.env.DATABSE_URL
}
}

# env

for creating database, need create a new user in mongodb atlast, give admin permission, give network access, go database, connect, driver, collect given link and past it in env database_url
{
NODE_ENV=development
PORT=5000

DATABSE_URL=mongodb+srv://university_admin:S8VtNdOiXVySvikQ@cluster0.pahlhyl.mongodb.net/university-management?retryWrites=true&w=majority

}

# ts-node-dev

after installing ts-node-dev, goto package.json =>
in script file write the commad

{
"start": "ts-node-dev --respawn --transpile-only src/server.ts",
}

# finally

{
npm start
BOOM..!
}

**Next Day**
copy this two line and paste it on the ts.config file
{
"include": ["src"], // which files to compile
"exclude": ["node_modules"], // which files to skip
}

# Eslint & Prettier

npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

create a file in root dire. name it .eslintrc and paste below code

// .eslintrc
{
"parser": "@typescript-eslint/parser",
"parserOptions": {
"ecmaVersion": 12,
"sourceType": "module",
},
"plugins": ["@typescript-eslint"],
// HERE
"extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],

"rules": {
"@typescript-eslint/no-unused-vars": "error",
"@typescript-eslint/consistent-type-definitions": ["error", "type"],
},

"env": {
"browser": true,
"es2021": true
}
}

//may need to change ecmaVersion

    "lint:check": "eslint --ignore-path .eslintignore --ext .js,.ts .",
    "lint:fix": "eslint --fix",

add this line in the package.json in script

//create a file in root dir name it .eslintignore and write
dist
node_modules
.env

# install prettier

npm install --save-dev prettier

create a file name it .prttierrc an d write this below code on it

{
"semi": false,
"singleQuote": true,
"arrowParens": "avoid"
}

in package.json => script => add below command
"prettier:check": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",

# Avoiding conflicts when working with ESLint and Prettier

npm install --save-dev eslint-config-prettier


# Husky
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm test"


# lint Staged

sob gulo check na kore jara stage e jabe only tader check kroa hobe.

npm install --save-dev lint-staged # requires further setup

