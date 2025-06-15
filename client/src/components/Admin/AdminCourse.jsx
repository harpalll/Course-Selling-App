import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { API_URL } from "../../constants.js";

export const AdminCourse = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageLink: "",
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setShowModal(false);
    }
  });

  const fetchCourse = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/api/v1/user/course/${courseId}`);
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
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleEdit = async () => {
    setShowModal(true);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      imageLink: course.imageLink,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_URL}/api/v1/admin/courses/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setShowModal(false);
        setFormData({
          title: "",
          description: "",
          price: "",
          imageLink: "",
        });

        setCourse(res.data.updatedCourse);
        toast.success(`${course.title} Updated Successfully!`);
      }
    } catch (err) {
      console.error("Error creating course:", err);
      toast.error(`${course.title} Update failed!`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <>
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
                <button className="buy-now-btn" onClick={handleEdit}>
                  Edit Course
                </button>
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

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Edit Course</h2>
                  <button
                    className="close-btn"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleUpdate} className="course-form">
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
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                      Update Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
