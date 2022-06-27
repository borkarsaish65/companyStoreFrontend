import './NavBar.css';
import { Link } from "react-router-dom";


function NavBar() {

    return (
        <div className='navbar'>
            <div className='d-flex '>
                <nav>
                <Link className='link' to="/">Home</Link>
                <Link className='link' to="/company-listing">Company Listing</Link>
                </nav>
            </div>
        </div>

    );
}
  
  export default NavBar;
  