const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).trim().required(),
  lastName: Joi.string().min(3).max(20).trim().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .pattern(/@(gmail|hotmail)\.com$/),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .trim()
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .trim()
    .required(),
});

exports.loginSchema = Joi.object({
  emailOrPhone: Joi.alternatives([
    Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .pattern(/@(gmail|hotmail)\.com$/),
    Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  ]),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

exports.userIdSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});
