import { DatabaseError, Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";
import { down, up } from "./migrations/user.migration.ts";

const sequelize_ = new Sequelize(
  "postgresql://postgres:postgres@localhost:5432",
);

try {
  await sequelize_.getQueryInterface().createDatabase("payment");
} catch (err) {
  if (!(err instanceof DatabaseError)) {
    throw err;
  }
}

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

export const migrator: Umzug<Sequelize> = new Umzug<Sequelize>({
  migrations: [
    {
      name: "01-user",
      up,
      down,
    },
  ],
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
