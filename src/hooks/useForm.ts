import {useFormik} from 'formik';

export const useForm = (initialValues: object, schema: object): any => {
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values: any) => console.log(values),
  });
  return formik;
};
