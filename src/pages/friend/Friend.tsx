import FriendCard from "@/components/card/friendCard/FriendCard";
import { Layout } from "@/components/layout/Layout";
import { useMyFriendQuery } from "@/hook/friend/useMyFriendQuery";
import useAuthStore from "@/store/auth";

const Friend = () => {
  const { isLoggedIn } = useAuthStore();

  const { data: friendsData } = useMyFriendQuery(isLoggedIn);

  return (
    <Layout>
      <div className="title f-title2">친구들의 MBTiD를 확인해보세요!</div>
      <section className="friend-list">
        {friendsData?.data.map((item) => <FriendCard friendData={item} />)}
      </section>
    </Layout>
  );
};

export default Friend;
