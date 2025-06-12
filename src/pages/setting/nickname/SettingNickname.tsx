import { useState } from "react";
import SolidButton from "@/components/button/SolidButton";
import InputBox from "@/components/input/InputBox";
import { Layout } from "@/components/layout/Layout";
import BackHeader from "@/components/header/BackHeader";
import "./settingNickname.scss";
import { useUpdateNicknameMutation } from "@/hook/profile/useMyInfoQuery";

const SettingNickname = () => {
  const [nickname, setNickname] = useState("");

  const { mutate: updateNickname } = useUpdateNicknameMutation();

  // 닉네임 업데이트
  const handleSubmit = () => {
    updateNickname(nickname);
  };

  return (
    <Layout>
      <BackHeader />
      <div className="setting-nickname-layout">
        <h1 className="title-text f-title1">닉네임 수정</h1>
        <div className="input-wrapper">
          <InputBox
            placeholder="수정할 닉네임을 입력해주세요"
            inputType={"text"}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <SolidButton
          size={"large"}
          type={"submit"}
          disabled={!nickname}
          onClick={handleSubmit}
        >
          수정하기
        </SolidButton>
      </div>
    </Layout>
  );
};
export default SettingNickname;
