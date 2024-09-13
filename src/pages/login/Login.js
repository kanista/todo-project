import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import './login.scss';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { email, password } = values;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {

            if (email === storedUser.email && password === storedUser.password) {
                message.success("Login successful!");

                // Save login status to local storage (for dashboard access)
                localStorage.setItem("isLoggedIn", true);

                // Redirect to dashboard
                navigate("/dashboard");
            } else {
                message.error("Invalid email or password!");
            }
        } else {
            message.error("No user found. Please register first.");
        }
    };

    return (
        <div className="login-container">
            <Form
                form={form}
                name="login"
                className="login-form"
                layout="vertical"
                onFinish={onFinish}
            >
                <h1 className="title">Log In</h1>
                <p className="subtitle">Welcome back! Please enter your details</p>
                <br />

                <Form.Item
                    label="E-mail Address"
                    name="email"
                    rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
                >
                    <Input type="email" placeholder="Enter e-mail address" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input type="password" placeholder="........" />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit">
                        Log In
                    </Button>
                </Form.Item>

                <p className="register-prompt">
                    Don't have an account? <span className="register-link" onClick={() => navigate("/register")}>Register</span>
                </p>
            </Form>
        </div>
    );
};

export default Login;


