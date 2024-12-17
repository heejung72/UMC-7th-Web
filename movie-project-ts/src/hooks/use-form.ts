import { useState } from "react";

// Define types for the form values and validation errors
interface FormValues {
  [key: string]: string | number | boolean; // Adjust this depending on your form fields
}

interface Errors {
  [key: string]: string; // Error messages for each form field
}

interface UseFormProps {
  initialValues: FormValues;
  validate: (values: FormValues) => Errors; // Validation function that takes form values and returns errors
}

export default function useForm({ initialValues, validate }: UseFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Validate and update errors on change
    const validationErrors = validate({ ...values, [name]: value });
    setErrors(validationErrors);

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: string) => ({
    name,
    value: values[name] as string, // Assert value as string, adjust if you have other types
    onChange: handleChange,
    onBlur: () => setTouched({ ...touched, [name]: true }),
    className: touched[name] ? "touched" : "",
    "aria-invalid": errors[name] ? "true" : "false", // Reflect the error state
  });

  return { values, errors, touched, getTextInputProps };
}
