const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phone: Joi.string().regex(/^[0-9]{10}$/),
});

exports.loginSchema = Joi.object({
  emailOrPhone: Joi.alternatives([
    Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  ]),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
