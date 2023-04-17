import InsunranceManagement from "../components/navItems/InsuranceCenter/InsuranceManager";
import ProductTypeManager from "../components/navItems/Dellcorg/ProductTypeManager";
import ProductTracking from "../components/navItems/Dellcorg/ProductTracking";
import AccountManager from "../components/navItems/Dellcorg/AccountManager";
import FactoryManager from "../components/navItems/Factory/FactoryManager";
import SellManager from "../components/navItems/Factory/SellManager";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import FactoryIcon from "@mui/icons-material/Factory";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import ErrorManager from "../components/navItems/Factory/ErrorManager";
import ReceiveErrorInfo from "../components/navItems/Factory/ReceiveErrorInfo";
import AgentProduct from "../components/navItems/Agent/AgentProduct";
import InsuranceManager from "../components/navItems/Agent/InsuranceManager";
import CustomerManager from "../components/navItems/Agent/CustomerManager";
import SellReport from "../components/navItems/Agent/SellReport";

export const path = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  NOMATCH: "/",
};

export const date = {
  QUARTER: [
    { value: 1, label: "Quý 1", months: [1, 2, 3] },
    { value: 2, label: "Quý 2", months: [4, 5, 6] },
    { value: 3, label: "Quý 3", months: [7, 8, 9] },
    { value: 4, label: "Quý 4", months: [10, 11, 12] },
  ],
};

export const major = {
  R1: "DellCorg",
  R2: "Factory",
  R3: "Agent",
  R4: "Insurance Center",
};

export const toast = {
  success: {
    title: "Success",
    icon: <FontAwesomeIcon icon={faCircleCheck} />,
  },
  warning: {
    title: "Warning",
    icon: <FontAwesomeIcon icon={faCircleExclamation} />,
  },
};

export const NAV_ITEM = [
  {
    name: "Quản lý tài khoản",
    component: <AccountManager />,
    accessRolekey: ["R1"],
    icon: <PeopleIcon />,
    path: "AccountManager",
  },
  {
    name: "Quản lý dòng sản phẩm",
    component: <ProductTypeManager />,
    accessRolekey: ["R1"],
    icon: <CategoryIcon />,
    path: "ProductTypeManager",
  },

  {
    name: "Theo dõi sản phẩm",
    component: <ProductTracking />,
    accessRolekey: ["R1"],
    icon: <LocalOfferIcon />,
    path: "ProductTracking",
  },
  {
    name: "Quản lý sản xuất",
    component: <FactoryManager />,
    accessRolekey: ["R2"],
    icon: <FactoryIcon />,
    path: "FactoryManager",
  },
  {
    name: "Thống kê lỗi",
    component: <ErrorManager />,
    accessRolekey: ["R2"],
    icon: <EngineeringIcon />,
    path: "ErrorManager",
  },
  {
    name: "Thống kê bán",
    component: <SellManager />,
    accessRolekey: ["R2"],
    icon: <StorefrontIcon />,
    path: "SellManager",
  },
  {
    name: "Danh sách sp lỗi từ TTBH",
    component: <ReceiveErrorInfo />,
    accessRolekey: ["R2"],
    icon: <ConstructionIcon />,
    path: "ReceiveErrorInfo",
  },
  {
    name: "Quản lý sản phẩm",
    component: <AgentProduct />,
    accessRolekey: ["R3"],
    icon: <StorefrontIcon />,
    path: "AgentProduct",
  },
  {
    name: "Quản lý bảo hành",
    component: <InsuranceManager />,
    accessRolekey: ["R3"],
    icon: <EngineeringIcon />,
    path: "InsunranceManagement",
  },
  {
    name: "Quản lý khách hàng",
    component: <CustomerManager />,
    accessRolekey: ["R3"],
    icon: <PeopleIcon />,
    path: "CustomerManager",
  },
  {
    name: "Thống kê bán hàng",
    component: <SellReport />,
    accessRolekey: ["R3"],
    icon: <LocalOfferIcon />,
    path: "SellReport",
  },
  {
    name: "Quản lí bảo hành",
    component: <InsunranceManagement />,
    accessRolekey: ["R4"],
    icon: <HomeRepairServiceIcon />,
    path: "InsunranceManagement",
  },
];
