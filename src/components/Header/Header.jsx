import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import datawise from "/assets/logo-round.png";
import MenuSvg from "../../assets/svg/MenuSvg";
import { navigation } from "../../constants";
import Button from "../HomePage/Button";
import { HamburgerMenu } from "../designs/Header";
import Section from "../HomePage/Section";
import { useAuth } from "../../storage/AuthProvider";
import AuthModal from "../Modals/AuthModals/AuthModal";
import useAuthModal from "../../hooks/useAuthModal";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isNavItemDropdown, setIsNavItemDropdown] = useState(false);
  const [navUrl, setNavUrl] = useState("");
  const dropdownRef = useRef(null); // For handling outside clicks
  const navigate = useNavigate();
  const authModal = useAuthModal();
  const { state } = useAuth();

  const pathname = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsNavItemDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  }

  const handleNavItemClick = (e, item) => {
    e.preventDefault();

    if (item.requiresAuth && !state.userId) {
        authModal.open();
        setNavUrl(item.url);
        return;
    }

    if (item.hasDropdown) {
        setIsNavItemDropdown(!isNavItemDropdown)
    } else {
        navigate(item.url);
        if (openNavigation) {
            toggleNavigation();
        }
    }
  }

  return (
    <Section id="header" className="!px-0 !py-0">
      <div
        className={`fixed top-0 left-0 lg:left-20 w-full z-50 lg:backdrop-blur-sm ${
          openNavigation ? "bg-[#0E0C15]" : "bg-[#0E0C15]/90 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center px-5 lg:px-15 xl:px-20 max-lg:py-4">
          <a href="/" className="w-[12rem] xl:mr-12">
            <img
              className="lg:ml-20"
              src={datawise}
              loading="lazy"
              alt="Datawise"
              width={80}
              height={20}
            />
          </a>

          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div
              className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row"
              ref={dropdownRef}
            >
                {navigation.map((item) => {
                    if (item.isLoggedIn && !state.userId) {
                        return null;
                    }

                    return (
                        <div key={item.id} className="relative group">
                            <Link
                            to={item.url}
                            onClick={(e) => handleNavItemClick(e, item)}
                            className={`block relative font-code text-2xl text-n-14 transition-colors hover:text-color-1 ${
                                item.onlyMobile ? "lg:hidden" : ""
                              } px-6 py-4 md:py-4 lg:py-4 lg:-mr-0.25 lg:text-md lg:font-semibold ${
                                item.url === pathname.pathname
                                  ? "border-b-4 border-n-14 text-n-14 font-bold"
                                  : "text-n-14"
                              }`}
                            >
                                {item.title}
                            </Link>
                            {item.hasDropdown && (
                              <div
                                className={`absolute z-10 top-full left-0 mt-1 w-full bg-[#0E0C15] border border-[#3F3A52] rounded-lg shadow-lg group-hover:block`}
                              >
                                {item.dropdownItems.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.id}
                                    to={dropdownItem.url}
                                    className="block px-4 py-3 text-sm text-[#ddeeff] hover:text-[#004176]"
                                    onClick={() => {
                                      setIsNavItemDropdown(false);
                                    }}
                                  >
                                    {dropdownItem.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <HamburgerMenu />
          </nav>
          <Button className="ml-auto lg:hidden px-3" onClick={toggleNavigation}>
            <MenuSvg openNavigation={openNavigation}/>
          </Button>
        </div>
      </div>
      <AuthModal navUrl={navUrl} />
    </Section>
  );
};

export default Header;
