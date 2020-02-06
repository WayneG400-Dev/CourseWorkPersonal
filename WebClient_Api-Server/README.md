# WebClient_Api-Server

## Web Client Project

### Express based API

* MYSQL Database
* Configuration File
* Access and Request logging
* Full Debug Logging

### Install

    git clone http://159.65.56.20/brightsparxtech/WebClient_Api-Server.git
    cd WebClient_Api-Server
    npm install

### Config Requirements

    Before Launching the Server please set the MYSQL Connection Details in the src/config/index file - See Comments on Each Field for additional details :
> MYSQL_HOST: 'localhost',
>
> MYSQL_PORT: 3306,
>
> MYSQL_USER: 'user',
>
> MYSQL_PASSWORD: 'password',
>
> MYSQL_DATABASE: 'TEST_APP',
>
> MYSQL_SCHEMA: 'TEST_METADB',

### Server Configurables

    The Server's Port and Base route can be altered as needed via the src/config/index file - See Comments on Each Field for additional details :
> SRV_PORT: 5000,
>
> SRV_BASE: '/api',
>

### Logging and Debug Settings

    The Server provides a default access log file which rotates either daily or when a size limit of 10mb is reached. Additional Logging can be achived by setting DEBUG_LOG to true. This provides additional responce and request log files. (see Examples).
    Setting the DEBUG_ALL flag places the Server into Debug mode. In Debug Mode the server creates DEBUG folders in each of the Seperation Folders (actions,controller...) additional log files will be generated in these folders. In Debug Mode the DEBUG elements are re-created per request.

### Run Server in Dev Mode - with nodemon

    npm run dev

### Check Server againt lint

    npm run lint

### Check Server pre ES6 compatibility

    npm run build

#### Contributors : Ritu Kohli & Wayne Gouws @ BrightSparxTech