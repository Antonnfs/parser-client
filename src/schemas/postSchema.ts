import Joi from "joi";

export const postSchema = Joi.object({
   title: Joi.string().min(2).max(100).trim().required().messages({
      "string.base": `It should be a type of 'text'`,
      "string.min": `This field should have a min length of {#limit}`,
      "string.max": `This field should have a max length of {#limit}`,
      "string.empty": `Title is required`,
      "string.required": `Title is required`,
   }),
   content: Joi.string().min(2).max(500).trim().required().messages({
      "string.base": `It should be a type of 'text'`,
      "string.min": `This field should have a min length of {#limit}`,
      "string.max": `This field should have a max length of {#limit}`,
      "string.empty": `Content field is required`,
      "string.required": `Content field is required`,
   }),
   creator: Joi.string().min(2).max(50).trim().required().messages({
      "string.base": `It should be a type of 'text'`,
      "string.min": `This field should have a min length of {#limit}`,
      "string.max": `This field should have a max length of {#limit}`,
      "string.empty": `Creator is required`,
      "string.required": `Creator is required`,
   }),
   link: Joi.string().min(2).max(500).trim().required().messages({
      "string.base": `It should be a type of 'text'`,
      "string.min": `This field should have a min length of {#limit}`,
      "string.max": `This field should have a max length of {#limit}`,
      "string.empty": `Link is required`,
      "string.required": `Link is required`,
   }),
});
