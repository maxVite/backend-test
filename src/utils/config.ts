import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const configModuleForRoot = ConfigModule.forRoot({
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'local')
      .default('development')
      .required(),
    SIMPLE_ARRAY: Joi.string()
      .allow('')
      .custom((value: string) => {
        if (!value) return [];
        else return value.split(',').map((item: string) => item.trim());
      }),
    JSON_API_URL: Joi.string().required(),
    PORT: Joi.number().port().default(3000),
  }),
  validationOptions: {
    abortEarly: true,
  },
});
