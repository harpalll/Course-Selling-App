export const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "justify-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "0 20px",
            width: "60%",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
            }}
          >
            Coursifiy
          </h1>
          <p
            style={{
              textAlign: "left",
              width: "40%",
            }}
          >
            The Coursify.me has an easy to use builder for you to create your
            online school in a few steps.
          </p>
          <button className="home-btn">Get Courses</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
          }}
        >
          <img src="1.svg" alt="" className="home-img" />
        </div>
      </div>
    </>
  );
};
