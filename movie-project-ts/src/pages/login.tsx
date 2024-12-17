import styled from "styled-components";
import useForm, { FormValues } from "../hooks/use-form";
import { validateLogin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";

// Define types for form inputs
interface LoginValues {
  email: string;
  password: string;
}

// Define the structure of the error messages for form validation
interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  // Initialize the form with the specific types for the values and errors
  const login = useForm<LoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form and proceed if no errors
    if (Object.keys(login.errors).length === 0) {
      console.log("Form submitted with:", login.values);

      // Attempt to call the login API
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          email: login.values.email,
          password: login.values.password,
        });

        // Store tokens in localStorage
        const { refreshToken, accessToken } = response.data;
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessToken", accessToken);

        alert("로그인에 성공했습니다!");
        navigate("/");  // Redirect to the home page after successful login
      } catch (error) {
        console.error('로그인 오류:', error);
        alert("로그인에 실패했습니다.");
      }
    } else {
      console.log("Validation errors:", login.errors);
    }
  };

  return (
    <Container>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <Input
          error={login.errors.email}
          touched={login.touched.email}
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...login.getTextInputProps('email')}
        />
        {login.touched.email && login.errors.email && <ErrorMsg>{login.errors.email}</ErrorMsg>}

        <Input
          error={login.touched.password && login.errors.password}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...login.getTextInputProps('password')}
        />
        {login.touched.password && login.errors.password && <ErrorMsg>{login.errors.password}</ErrorMsg>}

        <Button type="submit">로그인</Button>
      </form>
    </Container>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
`;

const Input = styled.input<{ error?: string; touched?: boolean }>`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${({ error, touched }) => (error && touched ? 'red' : '#ccc')};
  border-radius: 4px;
  width: 400px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #ff4081;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #ff4081;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #ff1a6b;
  }
`;
