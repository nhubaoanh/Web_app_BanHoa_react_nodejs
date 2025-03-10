import { Outlet } from "react-router-dom";
import Footer from "../Footers";
import Headers from "../Headers";


function LayoutDefault() {
  return (
    <>
      <header>
        <Headers/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}
export default LayoutDefault;