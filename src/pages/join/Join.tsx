import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Layout, PageLayout } from "@/components/layout/Layout";
import InputBox from "@/components/input/InputBox";
import SolidButton from "@/components/button/SolidButton";
import BackHeader from "@/components/header/BackHeader";
import OutlineButton from "@/components/button/OutlineButton";
import { checkId, join } from "@/api/auth";
import "./join.scss";
import MbtiTestTemplate from "@/components/templates/mbtiTest";

export interface JoinProps {
  id: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  mbti_ei_score: number;
  mbti_sn_score: number;
  mbti_tf_score: number;
  mbti_pj_score: number;
}
export interface JoinReq {
  id: string;
  nickname: string;
  password: string;
  mbti_ei_score: number;
  mbti_sn_score: number;
  mbti_tf_score: number;
  mbti_pj_score: number;
}

const Join = () => {
  const navigate = useNavigate();
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [step, setStep] = useState<number>(1);
  const [ei, setEi] = useState<number>(50);
  const [sn, setSn] = useState<number>(50);
  const [tf, setTf] = useState<number>(50);
  const [pj, setPj] = useState<number>(50);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<JoinProps>({ mode: "onChange" });

  const watchId = watch("id");
  const watchPassword = watch("password");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkId(watchId).then(
        () => {
          setIsIdAvailable(watchId !== "takenId");
          console.log("ID is available:", isIdAvailable);
        },
        (error) => {
          console.error(error);
        }
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [watchId]);

  const handleJoin = (data: JoinProps) => {
    console.log("Form Submitted:", data);
    const joinData = {
      id: data.id,
      password: data.password,
      nickname: data.nickname,
      mbti_ei_score: 100 - ei, //34 (e) e i
      mbti_sn_score: 100 - sn, //64 (n) s n
      mbti_tf_score: 100 - tf, //15 (t) t f
      mbti_pj_score: 100 - pj, //94 (j) p j
    };

    join(joinData).then(
      (res) => {
        console.log(res);
        alert("회원가입되었습니다");
        navigate("/login");
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <PageLayout>
      <Layout>
        <BackHeader />
        <form onSubmit={handleSubmit(handleJoin)}>
          {step == 1 && (
            <div className="join-layout">
              <div className="f-title1 title">
                👋
                <br />
                MBTiD에 오신 걸 환영해요!
              </div>
              <div className="input-field">
                <InputBox
                  placeholder={"아이디"}
                  inputType="text"
                  {...register("id", {
                    required: "id를 입력하세요",
                    validate: () =>
                      isIdAvailable === false
                        ? "이미 사용 중인 아이디입니다"
                        : true,
                  })}
                />
                {errors.id && (
                  <p className="error-text f-caption">{errors.id.message}</p>
                )}
              </div>
              <div className="input-field">
                <InputBox
                  placeholder={"닉네임"}
                  inputType="text"
                  {...register("nickname", {
                    required: "닉네임을 입력하세요",
                  })}
                />
                {errors.nickname && (
                  <p className="error-text f-caption ">
                    {errors.nickname.message}
                  </p>
                )}
              </div>
              <div className="input-field">
                <InputBox
                  placeholder={"비밀번호"}
                  inputType="password"
                  {...register("password", {
                    required: "비밀번호를 입력하세요",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 8글자 이상이어야 합니다",
                    },
                  })}
                />
                {errors.password && (
                  <p className="error-text f-caption">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="input-field">
                <InputBox
                  placeholder={"비밀번호 확인"}
                  inputType="password"
                  {...register("confirmPassword", {
                    required: "비밀번호 확인을 입력하세요",
                    validate: (value) =>
                      value === watchPassword || "비밀번호가 일치하지 않습니다",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="error-text f-caption">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="button-section">
                <SolidButton
                  type="submit"
                  size="large"
                  disabled={!isValid || isIdAvailable === false}
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  회원가입 (1/2)
                </SolidButton>
                <OutlineButton
                  type="submit"
                  size="large"
                  onClick={() => {
                    navigate("/test");
                  }}
                >
                  MBTI 검사하기
                </OutlineButton>
              </div>
            </div>
          )}
          {step == 2 && (
            <div className="join-layout">
              <MbtiTestTemplate
                ei={ei}
                setEi={setEi}
                sn={sn}
                setSn={setSn}
                tf={tf}
                setTf={setTf}
                pj={pj}
                setPj={setPj}
              />
              <div className="button-section">
                <SolidButton
                  type="submit"
                  size="large"
                  onClick={() => handleSubmit(handleJoin)}
                  disabled={
                    !isValid || ei == 50 || sn == 50 || tf == 50 || pj == 50
                  }
                >
                  회원가입 (2/2)
                </SolidButton>
                <OutlineButton
                  type="button"
                  size="large"
                  onClick={() => {
                    navigate("/test");
                  }}
                >
                  MBTI 검사하기
                </OutlineButton>
              </div>
            </div>
          )}
        </form>
      </Layout>
    </PageLayout>
  );
};

export default Join;
