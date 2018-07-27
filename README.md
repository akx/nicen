Nicen
=====

Nicen is an (attempt at) an API-first omniglot pretty-printer.

Currently supported languages are

* C (clang-format)
* CSS (Prettier)
* JavaScript (Prettier)
* Python (Black and Autopep8)

Structure
---------

Nicen is a collection of what you could call microservices
designed to be run as a monolithic Docker container.

The services are 

* `nicen-hub`: the actual user-facing API server (Node.js + Express)
* `nicen-frontend`: an SPA served by the hub (Poi + React)
* `nicen-py`: a language server to deal with Python-based pretty-printers (Python + Flask)
* `nicen-js`: a language server to deal with JavaScript-based pretty-printers (Node.js + Express)

Development
-----------

For the JavaScript-based subprojects, `yarn && yarn dev` will get you going.
For the Python-based subprojects, create a virtualenv and `pip install -r requirements.txt`

Deployment
----------

* `docker build -t nicen .` and run; the service is exposed on port `$NICEN_PORT`, or 8042 by default.
