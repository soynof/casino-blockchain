const REDIS = {
        CONNECTIONSTRING: process.env.REDIS_CONNSTRING || "redis://redis:6379",
        DBNAME: "pigxury"
    }

export default { REDIS }