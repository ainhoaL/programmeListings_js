#Programme Listings

> Simple ES6 application that shows the paginated A-Z listings of BBC programmes, showing an image, title and small description per programme. It calls a BBC API to get the data.

##Installation

```shell
$ npm install
```

##Running the application

In the command line:
```shell
$ npm start
```

Then go to [localhost:8080/idex.html](http://localhost:8080/index.html)

You can now browse through the programmes with the top A-Z navigation and for letters with more than 20 programmes you will see a pagination at the bottom to take you through the pages.

This task transpiles all the ES6 code into the folders bld (from src) and bldtest (from test). It also copies across any non js files like index.html and styles.css.
Then it starts a webpack-dev-server that bundles the files in the bld folder and serves it.


##Testing the application

In the command line:
```shell
$ npm test
```

Runs the tests in the console.
Note: some of the tests are skipped because they need to be run on the browser to work. Browser unit testing not yet setup.

##Developing

1. Open 2 consoles.
2. In one run:
```shell
$ npm run dev
```
Transpiles all the ES6 code into the folders bld (from src) and bldtest (from test). It also copies across any non js files like index.html and styles.css.
Then it runs the tests (you will see the results in the console) and waits.
Every time it sees a file change in src or test, the task will redo the whole process. The tests are run every time code changes so errors are caught fast.

3. In the other one run:
```shell
$ npm run start-dev
```
Starts a webpack-dev-server that bundles the javascript in the bld folder.
Every time a file in bld is changed the server rebundles the files and the page in the browser refreshes instantly showing the changes.

##Tourbleshooting Installation

I have once run into a problem installing, where it would not install the babel preset correctly. If that happens, type the following commands to install it correctly.
```shell
$ npm install gulp-babel
$ npm install babel-preset-es2015 --save-dev
```
