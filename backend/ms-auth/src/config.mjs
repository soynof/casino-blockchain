const APP = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    CORS: process.env.CORS || "*"
},
    COOKIES = {
        SESSION: { maxAge: 9000000, httpOnly: false, sameSite: false, secure: false },
        USER_DATA: { maxAge: 9000000, httpOnly: false, sameSite: false, secure: false }
    },
    MONGODB = {
        CONNECTIONSTRING: process.env.MONGODB_CONNSTRING || "mongodb://root:admin@localhost:27017/",
        DBNAME: "pigxury",
        COLLECTIONS: {
            LOGS: "logs"
        }
    }

export default { APP, COOKIES, MONGODB }