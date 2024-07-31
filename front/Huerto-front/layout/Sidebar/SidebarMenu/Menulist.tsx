import { sidebarItemType } from "Types/LayoutDataType";
import CustomizerContext from "helper/Customizer";
import layoutContext from "helper/Layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../../helper/User";

type menuListType = {
  MENUITEMS: sidebarItemType[];
  handleActive: (title: string, level: number) => void;
  active: string;
  setActiveLink: Function;
  setActive: Function;
  activeLink: string | undefined;
  level: number;
  className?: string;
};
const Menulist = ({
  setActive,
  handleActive,
  active,
  MENUITEMS,
  level,
  activeLink,
  setActiveLink,
}: menuListType) => {
  const { pinedMenu } = useContext(layoutContext);
  const router = useRouter();
  const { layoutName } = useContext(CustomizerContext);
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const existRole = (item: sidebarItemType, idRole: string) => {
    console.log(item.role);
    return item.role?.includes(idRole);
  };

  const renderBody = (item: sidebarItemType, i: number) => {
    return (
      <li
        key={i}
        className={`${pinedMenu.includes(item.title || "") ? "pined" : ""} ${level == 0 ? "sidebar-list" : ""}  `}
      >
        <a
          style={{ cursor: "pointer" }}
          className={
            level === 0
              ? `sidebar-link sidebar-title  ${(item.pathSlice && active.includes(item.pathSlice)) || activeLink == item.path?.split("/")[item.path.split("/").length - 1] ? "active" : ""}`
              : `text-decoration-none ${activeLink == item.path?.split("/")[item.path.split("/").length - 1] ? "active" : ""}`
          }
          onClick={() => {
            if (item.type == "sub") {
              handleActive(item.pathSlice ? item.pathSlice : "", level);
            } else {
              if (level == 0) {
                setActive("");
              }
              setActiveLink(
                item.path?.split("/")[item.path.split("/").length - 1],
              );
              router.push(
                layoutName
                  ? item.path + `?layout=${layoutName.toLowerCase()}`
                  : `/${item.path}`,
              );
            }
          }}
        >
          {item.icon && item.icon}
          <span>{t(`${item.title}`)}</span>

          {item.children && (
            <div className="according-menu">
              {item.pathSlice && active.includes(item.pathSlice) ? (
                <i className="fa fa-angle-down" />
              ) : (
                <i className="fa fa-angle-right" />
              )}
            </div>
          )}
        </a>
        {item.children && (
          <ul
            className={` ${level >= 1 ? "nav-sub-childmenu submenu-content" : "sidebar-submenu list-group"}`}
            style={
              item.pathSlice && active.includes(item.pathSlice)
                ? {
                    opacity: "1",
                    transition: "opacity 500ms ease-in 0s",
                    display: "block",
                  }
                : { display: "none" }
            }
          >
            <Menulist
              setActive={setActive}
              MENUITEMS={item.children}
              handleActive={handleActive}
              active={active}
              level={level + 1}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      {MENUITEMS.map((item, i) =>
        level === 0 ? (
          <>
            {item.role &&
              (item.role[0] === "all" ||
                item.role?.includes(user?.idRole?.name)) &&
              renderBody(item, i)}
          </>
        ) : (
          <>{renderBody(item, i)}</>
        ),
      )}
    </>
  );
};

export default Menulist;
