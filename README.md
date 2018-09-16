#  appCondominio2FA 

![appHome](https://lh3.googleusercontent.com/mxqFmf3Ou_HuxNfl62xKDGSLyIMLrKSuC_banOrq6pz0l6CiVvoGCiMUO6jhOuG1FnKw5nXhCuOUUtSdiUVj=w2560-h954)

##  Introduction

A simple app for condominium to release the resident and visitors* access to the building using a 2auth time based algorithm to generate de access code.

**scheduling a visit*

##  Installation

This app requires [Node.js](https://nodejs.org/) v6+ and [Mongo DB](https://www.mongodb.com/) database to run.

Install the project dependencies with npm install, configure the .env (see the configuration topic bellow) and start the server using the "start" script.

```sh
$ cd appCondominio2FA
$ npm install -d
$ npm start
```


##  Configuration

To config the global vars you just need to create a .env like the ".env.example" file ( or the example bellow ) with the connection string and DB name.

    MONGO_CONNECTION=yourStringConnectionHere
    MONGO_DB=yourDatabaseNameHere

##  Documentation

TODO...

##  Troubleshooting/Issues

TODO...

##  FAQ

Nothing Yet..

##  Maintainers/Sponsors

Current maintainers:

* [Lucas](https://github.com/lucasqueirozti)

##  License

**MIT**
