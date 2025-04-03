import { checkSchema, type Schema } from "express-validator";

const postSchema: Schema = {
  id: {
    isInt: true,
    toInt: true,
    in: "body",
    optional: false,
  },
  amount: {
    isInt: true,
    toInt: true,
    in: "body",
    optional: false,
  },
};

const validate = checkSchema(postSchema);
export default validate;
