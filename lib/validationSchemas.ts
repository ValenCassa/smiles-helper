import * as Yup from "yup";

const requiredMessage = "El campo es requerido";

export const validationSchema = Yup.object().shape({
  origin: Yup.string()
    .max(5, "Maximo de 5 caracteres")
    .required(requiredMessage),
  destination: Yup.string()
    .max(5, "Maximo de 5 caracteres")
    .required(requiredMessage)
    .test(
      "origin-destination",
      "El origen y destino no pueden ser iguales",
      function (value, ctx) {
        return ctx.parent?.origin?.toLowerCase() !== value?.toLocaleLowerCase();
      }
    ),
  from: Yup.string().nullable().required(requiredMessage),
  to: Yup.string()
    .required(requiredMessage)
    .test(
      "from-to",
      "La fecha de salida debe ser menor a la de regreso",
      function (value, ctx) {
        if (value && ctx.parent?.from) {
          return new Date(value) > new Date(ctx.parent.from);
        }
        return true;
      }
    )
    .test(
      "length",
      "El rango debe ser menor o igual a un mes",
      function (value, ctx) {
        if (value && ctx.parent?.from) {
          const from = new Date(ctx.parent.from);
          const to = new Date(value);
          const diff = to.getTime() - from.getTime();
          return diff <= 2592000000;
        }
        return true;
      }
    ),
  sort: Yup.string().oneOf(
    ["money", "duration", "miles"],
    "El campo debe ser money, duration o miles"
  ),
});
