// utils/validate.ts

interface UserValues {
    email: string;
    password: string;
    password2?: string; // Optional for signup
  }
  
  interface Errors {
    email?: string;
    password?: string;
    password2?: string;
    passwordCheck?: string;
  }
  
  const emailPattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
  
  function validateUser(values: UserValues): Errors {
    const errors: Errors = {};
  
    if (!values.email) {
      errors.email = "이메일은 필수 입력요소입니다.";
    } else if (typeof values.email !== 'string') {
      errors.email = "문자열이어야 합니다.";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "유효한 이메일 형식이어야 합니다.";
    }
  
    if (!values.password) {
      errors.password = "비밀번호는 필수 입력요소입니다.";
    } else if (typeof values.password !== 'string') {
      errors.password = "문자열이어야 합니다.";
    } else if (values.password.length < 8) {
      errors.password = "비밀번호는 8자 이상이어야 합니다.";
    } else if (values.password.length > 16) {
      errors.password = "비밀번호는 16자 이하여야 합니다.";
    }
  
    return errors;
  }
  
  function validateLogin(values: UserValues): Errors {
    return validateUser(values);
  }
  
  const validateSignup = (values: UserValues): Errors => {
    const errors: Errors = validateUser(values);
    if (!values.password2) {
      errors.password2 = '비밀번호 검증 또한 필수 입력요소입니다.';
    } else if (values.password !== values.password2) {
      errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }
    return errors;
  };
  
  export { validateLogin, validateSignup };
  