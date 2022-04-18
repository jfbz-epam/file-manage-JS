# file-manage-JS
JS project used to emulate a basic folder management tool. 
Developed using NodeJS.

entry point: index.js

Project is executed with the command: node index.js

Folders:
- src: contains methods, objects and validators folders. Also inputParse.js file
  - methods: methods folder
    - LIST: contains function that prints folder structure
    - UPDATE: contains functions of UPDATE, CREATE and MOVE.
  - objects: objects folder
    - folder: contains anonymous function that creates object with folder structure
  - validators: validators folder
    - validateMethod: contains anonymous function that checks if method is valid
    - validateRoute: contains anonymous function that checks if a route exists on a determined folder.
  - inputParse: contains anonymous function that handles index.js request.

  # Created by Juan Fernando Bustamante Zapata. EPAM Systems. 
  # contact: juan_bustamante@epam.com