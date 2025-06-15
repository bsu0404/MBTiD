import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useJoinMutation } from "@/hook/auth/useJoinMutation ";
import { checkId } from "@/api/auth";

import { Layout } from "@/components/layout/Layout";
import InputBox from "@/components/input/InputBox";
import SolidButton from "@/components/button/SolidButton";
import BackHeader from "@/components/header/BackHeader";
import OutlineButton from "@/components/button/OutlineButton";
import Loading from "@/components/common/loading/Loading";
import MbtiTestTemplate from "@/components/templates/mbtiTest";
import MBTITest from "../MBTITest/MBTITest";
import "./join.scss";

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
type IdStatus = "unchecked" | "available" | "unavailable";

const Join = () => {
  const navigate = useNavigate();
  const [isMbtiTestOpen, setIsMbtiTestOpen] = useState<boolean>(false);
  const [idStatus, setIdStatus] = useState<IdStatus>("unchecked");
  const [step, setStep] = useState<number>(1);
  const [ei, setEi] = useState<number>(50);
  const [sn, setSn] = useState<number>(50);
  const [tf, setTf] = useState<number>(50);
  const [pj, setPj] = useState<number>(50);

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors, isValid },
    watch,
  } = useForm<JoinProps>({ mode: "onChange" });
  const { mutate: join, isPending } = useJoinMutation();

  const watchId = watch("id");
  const watchPassword = watch("password");

  const handleCheckId = async () => {
    if (!watchId) return;

    try {
      await checkId(watchId);
      setIdStatus("available");
      clearErrors("id");
      alert("사용 가능한 아이디입니다");
    } catch {
      setIdStatus("unavailable");
      setError("id", {
        type: "manual",
        message: "이미 사용 중인 아이디입니다",
      });
    }
  };

  const handleJoin = async (data: JoinProps) => {
    const joinData = {
      id: data.id,
      password: data.password,
      nickname: data.nickname,
      mbti_ei_score: 100 - ei, //34 (e) e i
      mbti_sn_score: 100 - sn, //64 (n) s n
      mbti_tf_score: 100 - tf, //15 (t) t f
      mbti_pj_score: 100 - pj, //94 (j) p j
    };

    join(joinData, {
      onSuccess: () => {
        alert("회원가입되었습니다");
        sessionStorage.setItem("savedId", joinData.id);
        navigate("/login", { replace: true });
      },
      onError: () => {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  if (isPending) return <Loading />;

  return (
    <>
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
                <div className="input-with-button">
                  <InputBox
                    placeholder={"아이디"}
                    inputType="text"
                    {...register("id", {
                      required: "id를 입력하세요",
                      onChange: () => {
                        setIdStatus("unchecked");
                        clearErrors("id"); // 입력이 바뀌면 에러 메시지도 같이 리셋
                      },
                    })}
                  />
                  {watchId && idStatus !== "available" && (
                    <div className="button-wrapper">
                      <SolidButton
                        size="small"
                        type="button"
                        onClick={handleCheckId}
                      >
                        중복 검사
                      </SolidButton>
                    </div>
                  )}
                </div>

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
                  disabled={!isValid || idStatus !== "available"}
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  회원가입 (1/2)
                </SolidButton>
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
                    !isValid ||
                    ei == 50 ||
                    sn == 50 ||
                    tf == 50 ||
                    pj == 50 ||
                    isPending
                  }
                >
                  {isPending ? "가입 중..." : "회원가입 (2/2)"}
                </SolidButton>
                <OutlineButton
                  type="button"
                  size="large"
                  onClick={() => {
                    setIsMbtiTestOpen(true);
                  }}
                >
                  MBTI 검사하기
                </OutlineButton>
              </div>
            </div>
          )}
        </form>
      </Layout>
      {isMbtiTestOpen && (
        <MBTITest
          onSubmit={(ei, sn, tf, jp) => {
            setEi(ei);
            setSn(sn);
            setTf(tf);
            setPj(jp);
            setIsMbtiTestOpen(false);
          }}
          onClose={() => setIsMbtiTestOpen(false)}
        />
      )}
    </>
  );
};

export default Join;
