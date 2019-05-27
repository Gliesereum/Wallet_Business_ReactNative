import * as Yup from "yup";

const requiredMessage = 'Обязательно к заполнению';

export default Yup.object().shape({
  name: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  description: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  country: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  city: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  buildingNumber: Yup.string().typeError(requiredMessage),
  officeNumber: Yup.string().typeError(requiredMessage),
});
