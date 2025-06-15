import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/authContext";
import { toast } from "react-toastify";

export const Nav = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogOut = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      // TODO: UssrName should be displayed here !
      // toast.success(`${formData.username} Logged In!`);
      toast.success(`Logged Out Successfully!`);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1.5rem",
        }}
      >
        <Link to={"/"} className="nav-heading">
          <h3>Coursifiy</h3>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <Link to={"/courses"} className="link">
            Courses
          </Link>
          {isLoggedIn ? (
            <>
              <Link to={"/purchases"} className="link">
                Purchases
              </Link>
              <button className="log-out-btn" onClick={handleLogOut}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to={"/auth/login"} className="link">
                Login
              </Link>
              <Link to={"/auth/register"} className="link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
