import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyProfileQuery } from "@/hook/profile/useMyInfoQuery";
import useAuthStore from "@/store/auth";

import { Layout } from "@/components/layout/Layout";
import Loading from "@/components/common/loading/Loading";
import MyMbtiSettingCard from "@/components/card/myMbtiSettingsCard/MyMbtiSettingsCard";
import "./my.scss";

const My = () => {
  const { isLoggedIn, clearToken, setUserId } = useAuthStore();
  const navitate = useNavigate();

  const { data: profileData, isLoading } = useMyProfileQuery(isLoggedIn);

  useEffect(() => {
    if (profileData) setUserId(profileData.userId);
  }, [profileData, setUserId]);

  if (!isLoggedIn) {
    navitate("/login");
    return null;
  }
  if (isLoading || !profileData) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="title f-title2">나의 MBTiD</div>
      {profileData && (
        <MyMbtiSettingCard data={profileData} onLogout={clearToken} />
      )}
    </Layout>
  );
};

export default My;
