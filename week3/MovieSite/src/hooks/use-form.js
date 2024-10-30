import { useState, useEffect } from 'react';

function useForm({ initialValues, validate }) {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const handleChangeInput = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleBlur = (name) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
    };

    const getTextInputProps = (name) => {
        const value = values[name];
        const onChange = (event) => handleChangeInput(name, event.target.value);
        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    };

    useEffect(() => {
        setErrors(validate(values));
    }, [validate, values]);

    return { values, errors, touched, getTextInputProps };
}

export default useForm;
