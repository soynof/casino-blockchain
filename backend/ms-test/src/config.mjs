const APP = {
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV || "development",
    CORS: process.env.CORS || "*"
},
REDIS = {
    CONNECTIONSTRING: process.env.REDIS_CONNSTRING || "redis://redis:6379",
    DBNAME: "pigxury"
}

export default { APP, REDIS }