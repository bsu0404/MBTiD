import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/home/Home";
import Event from "@/pages/my/My";
import Login from "@/pages/login/Login";
import Join from "@/pages/join/Join";
import GuestbookForm from "@/pages/guestBook/GuestBook";
import User from "@/pages/user/User";
import My from "@/pages/my/My";
import Friend from "./pages/friend/Friend";
import SettingNickname from "./pages/setting/nickname/SettingNickname";
import SettingMbti from "./pages/setting/mbti/SettingMbti/SettingMbti";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("ebafb0b3627f38af30e9783b31e0edcb"); // 본인의 JS 키로 변경
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/vote/:id/write" element={<GuestbookForm />} />
            <Route path="/my" element={<My />} />
            <Route path="/friends" element={<Friend />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/setting/nickname" element={<SettingNickname />} />
          <Route path="/setting/mbti" element={<SettingMbti />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
