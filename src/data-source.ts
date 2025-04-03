import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";

export const sequelize = new Sequelize(
  "postgresql://postgres:postgres@localhost:5432/payment",
  {
    define: {
      // Avoid autopluraization of table names
      freezeTableName: true,
      // disable automatic createdAt fields
      timestamps: false,
    },
  },
);

const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: import.meta.dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;

/* 
import { User } from "./models/user.entity.ts";

const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "blogs",
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});

await appDataSource.initialize();

export const userRepository = appDataSource.getRepository(User);
 */
