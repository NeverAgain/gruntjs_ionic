# Gruntjs File for Ionic Framework with haml / scss / coffeescript

## Assumption:
- Gruntfile.js is placed under project's root directory
- there are 4 directories called "www", "coffee", "scss", and "haml" under the project's root directory
- all the necessary npm packages included with grunt.loadNpmTasks() are installed already
- %script{:src => '//localhost:35729/livereload.js'} in included at the bottom of your index.haml

## Usage:

````
grunt serve
````

a livereload server will be opened on http://localhost:9000. any new changes to haml / scss / coffeescript files will be coverted in real time and reloaded on the aforementioned url.
