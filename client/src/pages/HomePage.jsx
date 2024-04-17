import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import NavBar from "../components/Nav/NavBar";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENTS } from "../utils/queries";
import UserCard from "../components/Card/UserCard";

export default function HomePage() {
  const { loading, data } = useQuery(QUERY_STUDENTS);
  const students = data?.students || [];

  const searchAll = () => {
    return (
      <div>
        {loading ? <div>Loading...</div> : <UserCard students={students} />}
      </div>
    );
  };

  const [seen, setSeen] = useState(false);
  function togglePop() {
    setSeen(!seen);
  }

  function Login(props) {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });

      // props.toggle();
    };

    return (
      <div className="popup">
        <div className="popup-inner">
          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Email:
              <input
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </label>
            <label>
              Password:
              <input
                placeholder="Password"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </label>
            <button type="submit" onClick={Login}>
              Login
            </button>
          </form>
          <button onClick={props.toggle}>Close</button>
        </div>
      </div>
    );
  }
  return (
    <section id="home-page">
      {Auth.loggedIn() ? (
        <>
          <NavBar />
          <div className="container">
            <img src="./assets/bootmate_logo.png" alt="bootMate() logo" />
            <h1>What are you waiting for?</h1>
            <h2>Search for projects to join or create your own!</h2>

            <div className="search-container">
              <form onSubmit={searchAll}>
                <input type="text" placeholder="Search..." name="search" />
                <button type="submit" id="search" className="btn">
                  Search
                </button>
              </form>
            </div>

            <div className="search-results">{searchAll()}</div>
          </div>
        </>
      ) : (
        <div className="container">
          <h1>Welcome to bootMate()</h1>

          <h2 id="subtag">Connect. Collaborate. Create</h2>
          <div className="text">
            <p id="description">
              bootMate() is a platform for developers to connect and collaborate
              on projects.
              <br></br>
              <br></br>
              Whether you're looking to start a new project or join an existing
              one, bootMate() is the place for you.
            </p>
            <h4 id="subtext">Login or Sign up today to get started!</h4>
          </div>

          <div className="login">
            <button className="btn" id="login" onClick={togglePop}>
              Login
            </button>
            {seen ? <Login toggle={togglePop} /> : null}
            <Link to="/signup">
              <button className="btn" id="signup">
                Sign Up
              </button>{" "}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}