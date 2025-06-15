import FriendCard from "@/components/card/friendCard/FriendCard";
import { Layout } from "@/components/layout/Layout";
import { useMyFriendQuery } from "@/hook/friend/useMyFriendQuery";
import useAuthStore from "@/store/auth";
import "./friend.scss";
import Loading from "@/components/common/loading/Loading";

const Friend = () => {
  const { isLoggedIn } = useAuthStore();

  const { data: friendsData, isPending } = useMyFriendQuery(isLoggedIn);

  if (isPending) return <Loading />;

  return (
    <Layout>
      <div className="title f-title2">친구들의 MBTiD를 확인해보세요!</div>
      <section className="friend-list">
        {friendsData && friendsData.data.length > 0 ? (
          friendsData?.data.map((item) => (
            <FriendCard friendData={item} key={item.user_id} />
          ))
        ) : (
          <div className="no-data-container">
            <p className="no-data-text f-body2">
              아직 보관함이 비어있어요.
              <br />
              친구의 명함을 추가해보세요!
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Friend;
