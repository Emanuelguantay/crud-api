import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return true;
          const valueTrim = value.replace(/ /g, '');
          if (valueTrim === '') return false;
          return true;
        },
      },
    });
  };
}