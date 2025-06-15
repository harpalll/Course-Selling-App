import axios from "axios";
import { useEffect, useState } from "react";
import "./AdminCourses.css";
import { Link } from "react-router";

export const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageLink: ""
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setShowModal(false);
    }
  });

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "http://localhost:3000/api/v1/admin/courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          setCourses(res.data.courses);
        } else {
          console.log("Error in fetching courses");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/admin/courses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setCourses(prev => [...prev, res.data.course]);
        setShowModal(false);
        setFormData({
          title: "",
          description: "",
          price: "",
          imageLink: ""
        });
      }
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  return (
    <div className="courses-container">
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <>
          {courses.length > 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="course-title">Courses</h2>
                <button className="course-card-btn" onClick={() => setShowModal(true)} style={{cursor: "pointer"}}>
                  Add New
                </button>
              </div>

              <div className="card-grid">
                {courses.map((course) => (
                  <div key={course._id} className="course-card">
                    <div style={{ width: "100%" }}>
                      <img 
                        src={course.imageLink}
                      />
                    </div>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <span>₹ {course.price}</span>
                    <button className="course-card-btn">
                      <Link to={`/admin/course/${course._id}`} className="link-card">
                        View Details
                      </Link>
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="poppins-semibold">No Courses Found</h2>
            </>
          )}
        </>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Course</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (₹)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageLink">Image Link</label>
                <input
                  type="text"
                  id="imageLink"
                  name="imageLink"
                  value={formData.imageLink}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
