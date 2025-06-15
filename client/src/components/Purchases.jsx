import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../constants.js";

export const Purchases = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${API_URL}/api/v1/user/purchasedCourses`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          setPurchasedCourses(res.data.purchasedCourses);
        } else {
          console.log("Error in fetching purchased courses");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="courses-container">
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <>
          <h2 className="course-title">Courses</h2>

          <div className="card-grid">
            {purchasedCourses.map((course) => (
              <div key={course._id} className="course-card">
                <div style={{ width: "100%" }}>
                  <img src={course.imageLink} />
                </div>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <span>₹ {course.price}</span>
                <button className="course-card-btn">
                  <Link to={`/course/${course._id}`} className="link-card">
                    View Details
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
