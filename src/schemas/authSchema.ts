import Joi from "joi";

export const authSchema = Joi.object({
   email: Joi.string()
      .pattern(new RegExp("[a-z0-9]+@+[a-z]+.+[a-z{2-4}]"))
      .min(6)
      .max(50)
      .trim()
      .required()
      .messages({
         "string.base": `It should be a type of 'text'`,
         "string.min": `This field should have a min length of {#limit}`,
         "string.max": `This field should have a max length of {#limit}`,
         "string.empty": `This field can not be empty`,
         "string.required": `This field is required`,
         "string.pattern.base": `Invalid email. For example: test@gmail.com`,
      }),
   password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{0,30}$"))
      .min(6)
      .max(20)
      .trim()
      .required()
      .messages({
         "string.base": `It should be a type of 'text'`,
         "string.min": `This field should have a min length of {#limit}`,
         "string.max": `This field should have a max length of {#limit}`,
         "string.empty": `This field can not be empty`,
         "string.required": `This field is required`,
         "string.pattern.base": `Incorrect symbols`,
      }),
}).with("email", "password");
