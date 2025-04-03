import { DataTypes, type ModelAttributes } from "sequelize";

import type { Migration } from "../data-source.ts";

export const userAttrs: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
};

export const up: Migration = async ({ context }) => {
  await context.getQueryInterface().createTable("user", userAttrs);
};

export const down: Migration = async ({ context }) => {
  await context.getQueryInterface().dropTable("user");
};
