# UniScrape Ui

This is the UI of the UniSrape application.

## Installing & Running in Dev mode

Please follow the following steps:

1. create a directory on your machine called `uniscrape` (or something you recognise)
2. in that directory checkout the server/api for this project
```
$ git clone https://github.com/szalontaijordan/uniscrape-server.git
```
... then the UI part
```
$ git clone https://github.com/szalontaijordan/uniscrape-ui.git
```
3. enter both the server and the UI directory then in both install it (this may take a long time)
```
$ npm install
```
4. run the server in the server directory with
```
$ npm run dev
```
5. run the UI in the UI direcotry with
```
$ npm run dev
```
6. open the browser at `http://localhost:8080`

It is important to keep these two repositories in the same directory, because the output of the build task puts the files in the server's public folder, so it can render them.

The project is still under development, so there is no better method ***yet*** to start working.
