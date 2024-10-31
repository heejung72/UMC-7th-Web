// useForm.js (훅)
import { useState } from "react";

export default function useForm({ initialValues, validate }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

        // 실시간 검증을 위해 값이 변경될 때마다 에러 업데이트
        const validationErrors = validate({ ...values, [name]: value });
        setErrors(validationErrors);

        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const getTextInputProps = (name) => ({
        name,
        value: values[name],
        onChange: handleChange,
        onBlur: () => setTouched({ ...touched, [name]: true }),
    });

    return { values, errors, touched, getTextInputProps };
}
