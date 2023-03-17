import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const loaction = useLocation();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    count === 0 &&
      navigate(`/${path}`, {
        state: loaction.pathname,
      });

    //if user not logged in insted of redirecting to login page we will redirect to the page where he previsouly searched
    //will be done after login success in LOGIN PAGE
    return () => {
      clearInterval(timer);
    };
  }, [count, navigate, loaction, path]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h2 className="Text-center">
          Redirecting to {path === "login" ? "login" : "home"} page in {count}{" "}
          seconds...{" "}
        </h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
