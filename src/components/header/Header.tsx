import { HeaderLayout } from "../layout/Layout";
import "./header.scss";
import MBTIDLogo from "../../assets/mbtidLogo.svg";
import { NavLink } from "react-router-dom";
import useAuthStore from "@/store/auth";

type MenuItemType = {
  name: string;
  path: string;
};
const MenuItem = ({ name, path }: MenuItemType) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        "menu-item body1-medium" + (isActive ? " active" : "")
      }
    >
      {name}
    </NavLink>
  );
};
const Header = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <HeaderLayout>
      <div className="header-container">
        <NavLink to="/">
          <img className="header-logo" src={MBTIDLogo} alt="MBTiD 로고" />
        </NavLink>

        <div className="menu-container">
          {isLoggedIn && (
            <>
              <MenuItem name="홈" path="/" />
              <MenuItem name="보관함" path="/friends" />
              <MenuItem name="MY" path="/my" />
            </>
          )}
          {!isLoggedIn && (
            <>
              <MenuItem name="로그인" path="/login" />
              <MenuItem name="회원가입" path="/join" />
            </>
          )}
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Header;
