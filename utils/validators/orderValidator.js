import Joi from 'joi';

export const OrderValidator = Joi.object({
  client: Joi.string()
    .regex(/[А-Яа-яA-ZA-z]/)
    .required()
    .messages({
      'string.empty': 'Поле не може бути пустим',
      'string.pattern.base':
        "Введено невалідне ім'я. Ім'я повинно містити від двох літер",
    }),
  clientPhone: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .required()
    .messages({
      'string.empty': 'Поле не може бути пустим',
      'string.pattern.base':
        "Введено невалідний номер телефону. Формат: +380123456789",
    }),
  question: Joi.any()
});
