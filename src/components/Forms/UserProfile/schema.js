import * as Yup from "yup";

const requiredMessage = 'Обязательно к заполнению';

export default Yup.object().shape({
  firstName: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  lastName: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  middleName: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  country: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  city: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  address: Yup.string().required(requiredMessage).min(8, 'Минимум 8 символа').typeError(requiredMessage),
});
