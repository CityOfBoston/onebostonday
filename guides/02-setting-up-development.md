# Setting up your local environment

## Prereqs
* Atleast NPM 2.15.9 
* Atleast Gulp 3.9.1

## Setting up the repo
1. Clone down this repo locally
2. `cd` into the directory
3. run `npm install`
4. Begin development by running `gulp watch`
5. You should now be able to hit `http://localhost:3000` to see the site.

## Other notes
* Only work with `build/` files for static (css, js, images) assets.
* When editting html, only edit ejs and json files from the `public/` directory.
* Don't worry about compiling harp.js files. These are processed automatically when deploying to production.
