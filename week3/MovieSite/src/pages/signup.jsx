import styled from "styled-components";
import useForm from "../hooks/use-form";
import { validateSignup } from "../utils/validate";

const SignupPage = () => {
    const login = useForm({
      initialValues: {
        email: '',
        password: '',
        password2: '',
      }, 
      validate: validateSignup
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(login.errors).length === 0) {
            console.log("Logging in with:", login.values);
            // 로그인 API 호출 등을 이곳에서 처리할 수 있습니다.
        } else {
            console.log("Validation errors:", login.errors);
        }
    };

    
    return (
        <Container>
            <h1>회원가입</h1>
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
                    error={login.errors.password}
                    touched={login.touched.password}
                    type="password"
                    placeholder="비밀번호를 입력해주세요!" 
                    {...login.getTextInputProps('password')}
                />
                {login.touched.password && login.errors.password && <ErrorMsg>{login.errors.password}</ErrorMsg>}    

                <Input 
                    error={login.errors.password2}
                    touched={login.touched.password2}
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요!" 
                    {...login.getTextInputProps('password2')}
                />
                {login.touched.password2 && login.errors.password2 && <ErrorMsg>{login.errors.password2}</ErrorMsg>}             

                <Button type='submit'>회원가입</Button>
            </form>
        </Container>
    );
};

export default SignupPage;

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

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid transparent;
    border-radius: 4px;
    width: 500px;
    box-sizing: border-box;
    border-color: ${({ error, touched }) => (error && touched ? 'red' : '#ccc')};
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
