import axios from "axios";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router";
import { FaUniversity } from "react-icons/fa";

export const AdminHome = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/analytics",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status == 200) {
        setAnalytics({
          ...analytics,
          userCount: res.data.userCount,
          courseCount: res.data.courseCount,
        });
      }
    })();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="container"
          style={{
            border: "1px solid black",
            padding: "1rem",
            borderRadius: "10px",
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div
            className="card"
            style={{
              border: "1px solid black",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <i
                style={{
                  background: "black",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {" "}
                <CiUser color="white" size={30} />
              </i>
              Users{" "}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>{analytics.userCount}</h3>
              <Link>
                <button className="go-to">
                  <FaArrowUpRightFromSquare />
                </button>
              </Link>
            </div>
          </div>

          <div
            className="card"
            style={{
              border: "1px solid black",
              padding: "1rem",
            }}
          >
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <i
                style={{
                  background: "black",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {" "}
                <FaUniversity color="white" size={30} />
              </i>
              Users{" "}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>{analytics.courseCount}</h3>
              <Link>
                <button className="go-to">
                  <FaArrowUpRightFromSquare />
                </button>
              </Link>
            </div>
          </div>

          {/* <div
            className="card"
            style={{
              border: "1px solid black",
            }}
          >
            <h3>Purchases</h3>
            <h3>Revenue</h3>
          </div> */}
        </div>
      </div>
    </>
  );
};
