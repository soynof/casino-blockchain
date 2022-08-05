const APP = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || "development",
    CORS: process.env.CORS || "*"
},
    MONGODB = {
        CONNECTIONSTRING: process.env.MONGODB_CONNSTRING || "mongodb://root:admin@localhost:27017/",
        DBNAME: "pigxury",
        COLLECTIONS: {
            LOGS: "logs"
        }
    }

export default { APP, MONGODB }