import OutlineButton from "@/components/button/OutlineButton";
import SolidButton from "@/components/button/SolidButton";
import BackHeader from "@/components/header/BackHeader";
import { Layout } from "@/components/layout/Layout";
import MbtiTestTemplate from "@/components/templates/mbtiTest";
import { useState } from "react";
import "./settingMbti.scss";
import { useUpdateMbtiMutation } from "@/hook/profile/useMyInfoQuery";
import MBTITest from "@/pages/MBTITest/MBTITest";

const SettingMbti = () => {
  const [ei, setEi] = useState<number>(50);
  const [sn, setSn] = useState<number>(50);
  const [tf, setTf] = useState<number>(50);
  const [pj, setPj] = useState<number>(50);

  const { mutate: updateMbti } = useUpdateMbtiMutation();
  const [isMbtiTestOpen, setIsMbtiTestOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    // MBTI 점수 업데이트
    updateMbti({
      mbti_ei_score: 100 - ei,
      mbti_sn_score: 100 - sn,
      mbti_tf_score: 100 - tf,
      mbti_pj_score: 100 - pj,
    });
  };

  // 닉네임 업데이트

  return (
    <Layout>
      <BackHeader />
      <div className="setting-mbti-layout">
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
            onClick={handleSubmit}
            disabled={ei == 50 || sn == 50 || tf == 50 || pj == 50}
          >
            수정하기
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
      {isMbtiTestOpen && (
        <MBTITest
          onSubmit={(ei, sn, tf, jp) => {
            updateMbti({
              mbti_ei_score: ei,
              mbti_sn_score: sn,
              mbti_tf_score: tf,
              mbti_pj_score: 100 - jp,
            });
          }}
          onClose={() => setIsMbtiTestOpen(false)}
        />
      )}
    </Layout>
  );
};
export default SettingMbti;
