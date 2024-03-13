# 0x04. Files manager
This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination and background processing.

The objective is to build a simple platform to upload and view files:

* User authentication via a token
* List all files
* Upload a new file
* Change permission of a file
* View a file
* Generate thumbnails for images
You will be guided step by step for building it, but you have some freedoms of implementation, split in more files etc… (utils folder will be your friend)

Of course, this kind of service already exists in the real life - it’s a learning purpose to assemble each piece and build a full product.

Enjoy!

## Resources
### Read or watch:
* [Node JS getting started](https://intranet.alxswe.com/rltoken/buFPHJYnZjtOrTd610j6Og)
* [Process API doc](https://intranet.alxswe.com/rltoken/uYPplj2cPK8pcP0LtV6RuA)
* [Express getting started](https://intranet.alxswe.com/rltoken/SujfeWKCWmUMomfETjETEg)
* [Mocha documentation](https://intranet.alxswe.com/rltoken/FzEwplmoZiyGvkgKllZNJw)
* [Nodemon documentation](https://intranet.alxswe.com/rltoken/pdNNTX0OLugbhxvP3sLgOw)
* [MongoDB](https://intranet.alxswe.com/rltoken/g1x7y_3GskzVAJBTXcSjmA)
* [Bull](https://intranet.alxswe.com/rltoken/NkHBpGrxnd0sK_fDPMbihg)
* [Image thumbnail](https://intranet.alxswe.com/rltoken/KX6cck2nyLpQOTDMLcwxLg)
* [Mime-Types](https://intranet.alxswe.com/rltoken/j9B0Kc-4HDKLUe88ShbOjQ)
* [Redis](https://intranet.alxswe.com/rltoken/nqwKRszO8Tkj_ZWW1EFwGw)

## Learning Objectives
At the end of this project, you are expected to be able to [explain to anyone](https://intranet.alxswe.com/rltoken/88vbnogJmkEoxqu-6wAXEw), without the help of Google:
* how to create an API with Express
* how to authenticate a user
* how to store data in MongoDB
* how to store temporary data in Redis
* how to setup and use a background worker

## Requirements
* Allowed editors: ```vi, vim, emacs, Visual Studio Code```
* All your files will be interpreted/compiled on Ubuntu 18.04 LTS using ```node``` (version 12.x.x)
* All your files should end with a new line
* A ```README.md``` file, at the root of the folder of the project, is mandatory
* Your code should use the js extension
* Your code will be verified against lint using ESLint

## Provided files
package.json

.eslintrc.js

babel.config.js

and…
Don’t forget to run ```$ npm install``` when you have the ```package.json```
