import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/authContext.js";
import { toast } from "react-toastify";

export const AdminNav = () => {
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
        <Link
          to={"/admin"}
          className="nav-heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h3>Coursifiy</h3>
          <span className="admin-badge poppins-semibold">ADMIN</span>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {isLoggedIn ? (
            <>
              <Link to={"/admin/courses"} className="link">
                Courses
              </Link>
              <button className="log-out-btn" onClick={handleLogOut}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to={"/admin/auth/login"} className="link">
                Login
              </Link>
              <Link to={"/admin/auth/register"} className="link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
