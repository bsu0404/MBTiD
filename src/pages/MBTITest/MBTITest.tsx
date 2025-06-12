import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, questions } from "@/data/mbtiTest";
import { Layout } from "@/components/layout/Layout";
import TitleHeader from "@/components/header/TitleHeader";
import MBTIScoreGraph from "@/components/MBTIScoreGraph/MBTIScoreGraph";
import { mbtiType } from "@/types/mbti";
import { getMBTIBGColor, getMBTIColor } from "@/utils/getMbtiColor";
import SolidButton from "@/components/button/SolidButton";
import "./MBTITest.scss";

const MBTITest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });
  const navigate = useNavigate();

  const getOppositeCategory = (category: Category): Category => {
    const opposites: {
      [key in Category]: Category;
    } = {
      E: "I",
      I: "E",
      S: "N",
      N: "S",
      T: "F",
      F: "T",
      J: "P",
      P: "J",
    };
    return opposites[category];
  };

  const handleAnswer = (isYes: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    const updatedScores = { ...scores };

    if (isYes) {
      updatedScores[currentQuestion.category] += 1;
    } else {
      // 반대 축에 점수 추가
      const oppositeCategory = getOppositeCategory(currentQuestion.category);
      updatedScores[oppositeCategory] += 1;
    }

    setScores(updatedScores);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const calculatePercentages = () => {
    const totals = {
      EI: scores.E + scores.I,
      SN: scores.S + scores.N,
      TF: scores.T + scores.F,
      JP: scores.J + scores.P,
    };

    const percentages = {
      EI: Math.round((scores.E / totals.EI) * 100),
      SN: Math.round((scores.S / totals.SN) * 100),
      TF: Math.round((scores.T / totals.TF) * 100),
      JP: Math.round((scores.J / totals.JP) * 100),
    };

    // MBTI 계산
    const mbtiArr = [
      percentages.EI > 50 ? "E" : "I",
      percentages.SN > 50 ? "S" : "N",
      percentages.TF > 50 ? "T" : "F",
      percentages.JP > 50 ? "J" : "P",
    ];

    const mbti = mbtiArr.join("") as mbtiType;

    return { percentages, mbti };
  };

  if (currentQuestionIndex >= questions.length) {
    const { percentages, mbti } = calculatePercentages();
    const ei = percentages.EI > 50 ? percentages.EI : 100 - percentages.EI;
    const sn = percentages.SN > 50 ? percentages.SN : 100 - percentages.SN;
    const tf = percentages.TF > 50 ? percentages.TF : 100 - percentages.TF;
    const jp = percentages.JP > 50 ? percentages.JP : 100 - percentages.JP;

    return (
      <Layout>
        <TitleHeader title="MBTI 검사하기" />
        <div className="result-layout">
          <p className="result-title f-title1"> 당신의 MBTI 유형은? </p>
          <div
            className="result-card"
            style={{ backgroundColor: getMBTIBGColor(mbti) }}
          >
            <h1 className="mbti-result" style={{ color: getMBTIColor(mbti) }}>
              {mbti}
            </h1>
            <MBTIScoreGraph mbti={mbti} ei={ei} sn={sn} tf={tf} jp={jp} />
          </div>
          <SolidButton
            type="submit"
            size="large"
            onClick={() => {
              sessionStorage.setItem(
                "mbtiPercentages",
                JSON.stringify(percentages)
              );
              navigate("/join");
            }}
            color={getMBTIColor(mbti)}
          >
            회원가입 하러 가기
          </SolidButton>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleHeader title={"MBTI 검사하기"} />
      <div className="test-layout">
        <p className="count f-title2">{`${currentQuestionIndex}/38`}</p>
        <p className="question f-title1">
          {questions[currentQuestionIndex].question}
        </p>
        <div className="button-wrapper">
          <button className="select-button" onClick={() => handleAnswer(true)}>
            예
          </button>
          <button className="select-button" onClick={() => handleAnswer(false)}>
            아니요
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MBTITest;
