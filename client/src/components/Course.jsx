import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const Course = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/v1/user/course/${courseId}`
        );
        if (res.status === 200) {
          setCourse(res.data.course);
        } else {
          console.log("Error in fetching course");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/courses/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(`${course.title} Purchased Successfully!`);
        navigate("/purchases");
      } else {
        console.log("Error in fetching courses");
        toast.error(`Purchased Failed!`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(`Internal Server Error!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div>
          <div
            className="Banner"
            style={{
              height: "250px",
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "black",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                padding: "20px",
                color: "white",
              }}
            >
              {course.title}
            </h2>
            <div
              style={{
                padding: "10px",
                display: "flex",
                border: "1px solid black",
                background: "white",
                flexDirection: "column",
                borderRadius: "10px",
                width: "100%",
                maxWidth: "300px",
                minHeight: "300px",
                marginTop: "20px",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <img
                src={course.imageLink}
                style={{ width: "100%", height: "200px" }}
              />
              <span className="poppins-medium">Price: ₹ {course.price}</span>
              {/* <button className="buy-now-btn" style={{alignSelf:"flex-end"}}>Buy Now</button> */}
              <button className="buy-now-btn" onClick={handlePurchase}>
                Buy Now
              </button>
              <button className="buy-now-btn">Pay Via Crypto</button>
            </div>
          </div>

          <div
            className="overview"
            style={{
              padding: "20px",
            }}
          >
            <h3
              className="poppins-semibold"
              style={{
                borderBottom: "1px solid black",
                width: "fit-content",
              }}
            >
              Overview
            </h3>
            <p className="poppins-light">{course.description}</p>
          </div>
        </div>
      )}
    </>
  );
};
