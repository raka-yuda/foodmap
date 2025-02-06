import { MainSidebarData } from "./sidebar-data";
import SidebarItem from "./sidebar-item";
import { Sidebar, useSidebar } from "@/components/ui/sidebar"
import Link from "next/link"
import { useRouter } from "next/router";
import { Switch } from "../ui/switch";
import { useSelector } from "react-redux";
import { changeTheme, ThemeState } from "@/redux/slices/theme-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { publicEnv } from "@/lib/env/client";

const AppSidebar = ({ children, variant }: any) => {

  const router = useRouter();
  const { pathname } = router;

  const sidebarItems = MainSidebarData;
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  const { themeVariant }: ThemeState = useSelector(
    (state: RootState) => state.theme
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeTheme = (isRounded: boolean) => {
    if(isRounded) {
      dispatch(changeTheme({
        themeVariant: "rounded"
      }));
    } else {
      dispatch(changeTheme({
        themeVariant: "default"
      }));
    }
  };

  return (
    <Sidebar className="!border-0 !z-20">
      {variant === "default" &&
        <ul className="menu flex flex-col py-4 overflow-y-auto  side-bar__color h-full">
          <div className="flex flex-col justify-center align-items divide-y divide-gray-500 px-4">
            <div className="flex justify-center items-center">
              <p className="text-xl py-4 text-white">Admin</p>
            </div>
            <hr />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <label className="text-xs m-3 text-white">Dashboard Menu</label>
              {sidebarItems.map((item, index) => {
                return (
                  <SidebarItem
                    key={`item-${index}`}
                    title={item.title}
                    child={item.child}
                  />
                );
              })}
            </div>
            {publicEnv.FEATURE_FLAG_THEME_TOGGLE &&
              <div>
                <div className="flex flex-row justify-between p-4 border rounded-3xl m-2">
                  <p className="text-white">
                    Theme v2:
                  </p>
                  <Switch checked={(themeVariant === "rounded")} onCheckedChange={handleChangeTheme}/>
                </div>
              </div>
            }
          </div>
        </ul>
      }

      {variant === "rounded" &&
        <div className="menu flex flex-col py-4 overflow-y-auto bg-white h-full px-2 z-20">
          <div className="flex flex-col justify-center align-items divide-y divide-gray-500 px-4">
            <div className="flex justify-center items-center">
              <p className={`font-bold text-xl py-4 text-[#2b2b2b]`}>🍛 Foodmap!</p>
            </div>
            <hr />
          </div>
          {/* <label className="text-xs m-3 text-black">Dashboard Menu</label> */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              {sidebarItems.map((item, index) => {
                return (
                  <div
                    key={`item-${index}`}
                    className="">
                    <button className="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer bg-white hover:text-gray-700 focus:outline-none">
                      <span className="flex items-center">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>

                        <span className="mx-4 font-medium text-left">{item.title}</span>
                      </span>
                    </button>
                      {item.child.map((item, index) => {
                        return (
                          <div
                            key={`sub-item-${index}`}
                            className="flex gap-y-2">
                            <div className="ml-8 h-auto border-l-2 border-[#c23531]"></div>
                            <Link
                              href={item.path}
                              className={`h-full w-full my-1 md:ml-4 md:mr-0 mx-4 py-2 px-6 block text-sm  hover:text-white cursor-pointer rounded-2xl 
                                ${item.path === pathname
                                  ? "bg-[#c23531] text-white"
                                  : "bg-white hover:bg-gray-300"
                                }`}
                            >
                              {item.title}
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
            {publicEnv.FEATURE_FLAG_THEME_TOGGLE &&
              <div>
                <div className="flex flex-row justify-between p-4 border rounded-3xl m-2">
                  <p>
                    Theme v2:
                  </p>
                  <Switch checked={(themeVariant === "rounded")} onCheckedChange={handleChangeTheme}/>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </Sidebar>
  );
};

export default AppSidebar;
