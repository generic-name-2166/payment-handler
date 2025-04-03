import { DataTypes, type ModelAttributes } from "sequelize";

import { sequelize } from "../data-source.ts";

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

export const User = sequelize.define("user", userAttrs);
