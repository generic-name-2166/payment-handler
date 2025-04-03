import { DataTypes } from "sequelize";
import type { Migration } from "../data-source.ts";
import { User, userAttrs } from "../models/user.ts";

export const up: Migration = async ({ context }) => {
  await context.getQueryInterface().createTable("user", userAttrs);
  await User.create({ id: 0, balance: 10000 });
};

export const down: Migration = async ({ context }) => {
  await context.getQueryInterface().dropTable("user");
};
