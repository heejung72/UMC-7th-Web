import styled from "styled-components";
import useForm from "../hooks/use-form";
import { validateSignup } from "../utils/validate";
import { useNavigate } from "react-router-dom"; // React Router에서 navigate 사용

const SignupPage = () => {
    const navigate = useNavigate();  // navigate 훅을 사용하여 페이지 이동

    const { values, errors, touched, getTextInputProps } = useForm({
        initialValues: {
            email: '',
            password: '',
            password2: '',
        },
        validate: validateSignup,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (Object.keys(errors).length === 0) {
            // 회원가입 API 호출
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    passwordCheck: values.password2,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('회원가입 성공:', data);
                
                            
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('email', values.email);  // 이메일 저장
                navigate('/login', { replace: true });
            } else {
                console.error('회원가입 실패:', data);
            }
        } else {
            console.log("Validation errors:", errors);
        }
    };

    return (
        <Container>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                id="email" 
                name="email" 
                    error={errors.email}
                    touched={touched.email}
                    type="email"
                    placeholder="이메일을 입력해주세요!" 
                    {...getTextInputProps('email')}
                />
                {touched.email && errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
                
                <Input 
                    id="password" 
                    name="password" 
                    error={errors.password}
                    touched={touched.password}
                    type="password"
                    placeholder="비밀번호를 입력해주세요!" 
                    {...getTextInputProps('password')}
                />
                {touched.password && errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}    

                <Input 
                                id="password2" 
                                name="password2" 
                    error={errors.password2}
                    touched={touched.password2}
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요!" 
                    {...getTextInputProps('password2')}
                />
                {touched.password2 && errors.password2 && <ErrorMsg>{errors.password2}</ErrorMsg>}             

                <Button type="submit">회원가입</Button>
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
