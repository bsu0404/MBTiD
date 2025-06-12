import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserProfileQuery } from "@/hook/profile/useUserInfoQuery";
import { createVote } from "@/api/vote";

import { Layout } from "@/components/layout/Layout";
import SolidButton from "@/components/button/SolidButton";
import checkBox from "@/assets/checkbox/checkbox_checked.svg";
import EmptycheckBox from "@/assets/checkbox/checkbox_unchecked.svg";
import { VoteRequest } from "@/types/vote";
import "./guestBook.scss";

const MBTI_GROUPS = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["P", "J"],
];

const GuestbookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: profileData } = useUserProfileQuery(id ?? "");

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [mbti, setMbti] = useState(["", "", "", ""]);

  const handleMbtiSelect = (groupIndex: number, value: string) => {
    const updated = [...mbti];
    updated[groupIndex] = value;
    setMbti(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      alert("유효하지 않은 사용자입니다.");
      return;
    }

    if (isSubmitDisabled) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    const payload: VoteRequest = {
      target_user_id: id,
      first_mbti_element: mbti[0],
      second_mbti_element: mbti[1],
      third_mbti_element: mbti[2],
      forth_mbti_element: mbti[3],
      comment: message,
      incognito: isAnonymous ? "Y" : "N",
    };

    try {
      await createVote(payload);
      alert("투표가 성공적으로 등록되었습니다!");
      navigate(`/user/${id}`);
    } catch (error) {
      alert("투표 등록 중 오류가 발생했습니다.");
      console.error(error);
    }
  };
  const isSubmitDisabled = message.trim() === "" || mbti.some((v) => v === "");

  return (
    <Layout className="guestbook-layout">
      <form className="guestbook-form" onSubmit={handleSubmit}>
        <h2 className="title f-title2">
          {profileData?.nickname}님에게 방명록을 남겨보세요!
        </h2>
        <div
          className="anonymous-checkbox"
          onClick={() => setIsAnonymous(!isAnonymous)}
        >
          <img
            src={isAnonymous ? checkBox : EmptycheckBox}
            alt={isAnonymous ? "체크된 박스" : "체크되지 않은 박스"}
          />
          <span className="f-body2">익명으로 쓸래요.</span>
        </div>

        <textarea
          className="message-input f-body1"
          maxLength={130}
          placeholder="글을 작성해주세요. (공백 포함 130자 제한)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="mbti-section">
          <p className="mbti-title f-title2">유화정님에게 어울리는 MBTI는?</p>
          <div className="mbti-preview">
            {mbti.map((letter, idx) => (
              <span key={idx} className="mbti-letter f-title2">
                {letter}
              </span>
            ))}
          </div>
          <div className="mbti-selector">
            {MBTI_GROUPS.map((group, groupIdx) => (
              <div className="mbti-row " key={groupIdx}>
                {group.map((letter) => (
                  <>
                    <button
                      type="button"
                      key={letter}
                      className={
                        mbti[groupIdx] === letter
                          ? "mbti-button selected "
                          : "mbti-button "
                      }
                      onClick={() => handleMbtiSelect(groupIdx, letter)}
                    >
                      <p className="f-body1">{letter}</p>
                    </button>
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
        <SolidButton size={"large"} type={"submit"} disabled={isSubmitDisabled}>
          방명록 남기기
        </SolidButton>
      </form>
    </Layout>
  );
};

export default GuestbookForm;
