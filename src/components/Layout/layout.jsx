import { Outlet, useLocation } from 'react-router-dom';
import Header from './header';
import SideNavbar from './side-navbar';
import { useEffect, useRef, useState } from 'react';

function Layout({ children }) {
  const sideNavRef = useRef(null);
  const [headerWidth, setHeaderWidth] = useState(window.innerWidth - 256);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const handleResize = () => {
      if (sideNavRef.current) {
        const sideNavWidth = sideNavRef.current.offsetWidth;
        setHeaderWidth(window.innerWidth - sideNavWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      {!isLoginPage && <SideNavbar ref={sideNavRef} />}
      <div
        style={{
          width: !isLoginPage ? `${headerWidth}px` : "",
          marginLeft: !isLoginPage ? "auto" : "",
        }}
      >
        {!isLoginPage && <Header />}
        <div className="p-15">
        <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default Layout;