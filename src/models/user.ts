import { Model } from "sequelize";
import { sequelize } from "../data-source.ts";
import { userAttrs } from "../migrations/user.migration.ts";

export class User extends Model {}

User.init(userAttrs, { sequelize, modelName: "user" });
