module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "db_main",
    poolSize: 10,
    entities: ["dist/**/*.entity{.ts,.js}"],
    authSource: "admin",
    useUnifiedTopology: true,
    synchronize: false,
    logging: false,
    migrations: ["dist/migrations/**/*{.ts,.js}"],
    cli: {
        migrationsDir: "src/migrations",
        subscribersDir: "src/subscriber"
    }
};