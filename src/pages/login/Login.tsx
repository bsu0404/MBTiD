import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/auth";
import { login } from "@/api/auth";

import { Layout, PageLayout } from "@/components/layout/Layout";
import InputBox from "@/components/input/InputBox";
import SolidButton from "@/components/button/SolidButton";
import OutlineButton from "@/components/button/OutlineButton";
import logo from "@/assets/mbtidLogo.svg";
import "./login.scss";

export interface LoginProps {
  id: string;
  password: string;
}

const Login = () => {
  const { setToken } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  const handleLogin = (data: LoginProps) => {
    const loginData = {
      id: data.id,
      password: data.password,
    };

    login(loginData).then(
      (res) => {
        console.log(res);
        setToken(res.data.accessToken, loginData.id);
        navigate("/");
      },
      (error) => {
        setError(true);
        console.error(error);
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: {
      // errors,
      isValid,
    },
  } = useForm<LoginProps>({ mode: "onChange" });

  return (
    <PageLayout>
      <Layout>
        <div className="login-layout">
          <img src={logo} className="logo" />
          <div className="f-title2 title">
            나의 MBTI를 소개하고 <br />
            친구들에게 공유해보세요!
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="input-field">
              <InputBox
                placeholder={"아이디"}
                inputType="text"
                {...register("id", {
                  required: "id를 입력하세요",
                })}
              />
              {/* {errors.id && (
                <p className="error-text f-caption ">아이디를 입력해주세요</p>
              )} */}
            </div>
            <div className="input-field">
              <InputBox
                placeholder={"비밀번호"}
                inputType="password"
                {...register("password", { required: "비밀번호를 입력하세요" })}
              />
              {/* {errors.password && (
                <p className="error-text f-caption ">비밀번호를 입력해주세요</p>
              )} */}
            </div>
            {error && (
              <p className="error-text f-caption">
                아이디 또는 비밀번호가 일치하지 않습니다.
              </p>
            )}
            <div className="button-section">
              <SolidButton
                type="submit"
                size="large"
                disabled={!isValid}
                onClick={() => handleSubmit(handleLogin)}
              >
                로그인
              </SolidButton>
              <OutlineButton
                type="submit"
                size="large"
                onClick={() => {
                  navigate("/join");
                }}
              >
                회원가입
              </OutlineButton>
            </div>
          </form>
        </div>
      </Layout>
    </PageLayout>
  );
};

export default Login;
