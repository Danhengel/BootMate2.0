import Auth from "../../utils/auth";
import { Link, useLocation } from "react-router-dom";
export default function Nav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const location = useLocation();
  const profileId = Auth.getProfile().data._id;
  if (location.pathname === `/profile/${profileId}`)
  {
    return (
      <nav className= "navbar">
        <Link to="/"><button id="profile-page" className="btn">Home</button></Link>
        <button onClick={logout} id="logout" className="btn">Logout</button>
      </nav>
    );
  } else {
    const profileId = Auth.getProfile().data._id;
    const firstName = Auth.getProfile().data.firstName;
    return (
      <nav className="navbar">
        <Link to={`/profile/${profileId}`}><button id="profile-page" className="btn">{firstName}’s Profile</button></Link>
        <button onClick={logout} id="logout" className="btn">Logout</button>
      </nav>
    );
  }
}