import { useSelector, useDispatch } from 'react-redux';
import { openMenu, closeMenu } from '@/features/ui/uiSlice';
import Link from 'next/link'
import Image from 'next/image';
import { RootState } from '@/store/store';
const DashboardNav = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state: RootState) => state.ui.isMenuOpen);
  return (
    <>
        <Link href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={55}
          height={55}
        />
      </Link>
      <div className="hidden lg:flex items-center h-full w-full justify-center">
        <ul className="flex space-x-24 ">
          <li>
            <Link
              className="cursor-pointer pb-1.5 transition-transform duration-500 hover:text-yellow-500"
              href="/doctors"
            >
              Doctors
            </Link>
          </li>
          <li>
            <Link
              className="cursor-pointer pb-1.5 transition-transform duration-500 hover:text-yellow-500"
              href="/conversations"
            >
              Conversations
            </Link>
          </li>
          <li>
            <Link
              className="cursor-pointer pb-1.5 transition-transform duration-500 hover:text-yellow-500"
              href="/profile"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <Link
        href="/api/auth/logout"
        className="text-right btn_yellow rounded-full hidden lg:flex"
      >
        Logout
      </Link>
      {/* menu icon for mobile*/}
        <div className={`flex flex-col w-[45px] p-2 lg:hidden ${isMenuOpen? "" : "space-y-2"}`} onClick={isMenuOpen? () => dispatch(closeMenu()) : () => dispatch(openMenu())}>
            <div className={`h-[1px] w-[30px] bg-gray-600 ease-in-out duration-300 ${isMenuOpen? "rotate-45" : ""}`}></div>
            <div className={`h-[1px] w-[30px] bg-gray-600 ease-in-out duration-300 ${isMenuOpen? "-rotate-45" : ""}`}></div>
            <div className={`h-[1px] w-[30px] bg-gray-600 ${isMenuOpen? "hidden" : ""}`}></div>
        </div>
    </>
  )
}

export default DashboardNav