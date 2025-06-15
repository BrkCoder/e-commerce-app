import { Badge, Menu } from "antd";
import type { MenuProps } from "antd";
import { NavLink, useNavigate } from "react-router";
import { useUserStore } from "../store/userStore";
import { tokenService } from "../services/Token";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavStore } from "../store/navStore";
import useCartStore from "../store/useCartStore";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = useUserStore();
  const { activeNav, setActiveNav } = useNavStore();
  const cartItemsAmount = useCartStore()((state) => state.items.length);

  const handleLogout = () => {
    tokenService.removeToken();
    setProfile(null);
    navigate("/account/login");
    setActiveNav("login");
  };

  const accountMenu = profile
    ? {
        type: "submenu" as const,
        key: "account",
        label: <span>{profile.username}</span>,
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        icon: (
          <img
            src={"https://i.imgur.com/LDOO4Qs.jpg"}
            alt="Profile"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              verticalAlign: "middle",
            }}
          />
        ),
        children: [
          {
            key: "profile",
            icon: (
              <UserOutlined
                style={{ fontSize: "24px", verticalAlign: "middle" }}
              />
            ),
            label: "profile",
          },
          {
            key: "logout",
            icon: (
              <LogoutOutlined
                style={{ fontSize: "24px", verticalAlign: "middle" }}
              />
            ),
            label: "logout",
            onClick: handleLogout,
          },
        ],
      }
    : {
        type: "submenu" as const,
        key: "account",
        label: <span>Account</span>,
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        icon: (
          <UserOutlined style={{ fontSize: "24px", verticalAlign: "middle" }} />
        ),
        children: [
          {
            key: "login",
            icon: (
              <LoginOutlined
                style={{ fontSize: "24px", verticalAlign: "middle" }}
              />
            ),
            label: <NavLink to="/account/login" onClick={() => {
              setActiveNav("login");
            }}>Login</NavLink>
          },
          {
            key: "register",
            icon: (
              <UserAddOutlined
                style={{ fontSize: "24px", verticalAlign: "middle" }}
              />
            ),
            label: <NavLink to="/account/register" onClick={() => {
              setActiveNav("register");
            }}>Register</NavLink>,
          },
        ],
      };

  const items: MenuProps["items"] = [
    {
      key: "home",
      icon: (
        <HomeOutlined style={{ fontSize: "24px", verticalAlign: "middle" }} />
      ),
      label: (
        <NavLink
          to="/"
          onClick={() => {
            setActiveNav("home");
          }}
        >
          Home
        </NavLink>
      ),
    },
    {
      key: "cart",
      icon: (
        <Badge style={{ verticalAlign: "middle" }} count={profile?.id ? cartItemsAmount : 0} style={{ backgroundColor: "#52c41a" }} overflowCount={99}>
          <ShoppingCartOutlined
            style={{ fontSize: "24px", verticalAlign: "middle" }}
          />
        </Badge>
      ),
      label: (
        <NavLink
          to="/cart"
          onClick={() => setActiveNav("cart")}
        >
          Cart
        </NavLink>
      ),
    },
    accountMenu,
  ];

  const firstItemKey =
    items[0] && typeof items[0].key === "string" ? items[0].key : "home";

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[firstItemKey]}
      selectedKeys={[activeNav]}
      items={items}
      style={{ display: "flex", flexDirection: "row", minWidth: "350px" }}
    />
  );
};

export default Navbar;
