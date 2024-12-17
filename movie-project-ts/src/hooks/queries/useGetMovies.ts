import { useState } from "react";

// Types for the form data
interface FormValues {
  [key: string]: string | number;
}

// Types for the validation errors
interface FormErrors {
  [key: string]: string | undefined;
}

// Types for the touched fields
interface TouchedFields {
  [key: string]: boolean;
}

interface UseFormProps {
  initialValues: FormValues;
  validate: (values: FormValues) => FormErrors;
}

export default function useForm({
  initialValues,
  validate,
}: UseFormProps) {
  // State for form values
  const [values, setValues] = useState<FormValues>(initialValues);

  // State for validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // State for tracking touched fields
  const [touched, setTouched] = useState<TouchedFields>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the value of the specific field
    setValues({
      ...values,
      [name]: value,
    });

    // Validate the form with the current value
    const validationErrors = validate({ ...values, [name]: value });
    setErrors(validationErrors);

    // Mark the field as touched
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: string) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: () => setTouched({ ...touched, [name]: true }),
    className: touched[name] ? "touched" : "",
    "aria-invalid": errors[name] ? "true" : "false", // Error state reflected
  });

  return { values, errors, touched, getTextInputProps };
}
