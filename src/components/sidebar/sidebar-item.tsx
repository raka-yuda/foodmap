import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ItemProps {
  title: string;
  path: string;
}

interface Props {
  title: string;
  path?: string;
  child: ItemProps[];
}

const SidebarItem = ({ title, path, child }: Props) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div x-data="{ open: false }">
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

          <span className="mx-4 font-medium text-left">{title}</span>
        </span>
      </button>

      {child && (
        <div x-show="open" className="bg-gray-100">
          {child.map((item, index) => {
            return (
              <Link 
                key={`sub-item-${index}`} 
                href={item.path}
                className={`py-4 px-16 block text-sm hover:bg-red-600 hover:text-white ${
                  item.path === pathname
                    ? "bg-red-600 text-white"
                    : "bg-white"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
