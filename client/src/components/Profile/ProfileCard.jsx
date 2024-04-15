import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../utils/mutations";
import { UPDATE_PROJECT } from "../../utils/mutations";
// import { REMOVE_PROJECT } from '../../utils/mutations';
import Auth from "../../utils/auth";
import { useLocation } from "react-router-dom";

const ProfileCard = ({ student }) => {
  if (!student) {
    return <h3 className="error">No student data found</h3>;
  }

  const [isPopOpen, setIsPopOpen] = useState(false);

  const togglePop = () => {
    setIsPopOpen(!isPopOpen);
  };

  function AddProject(props) {
    const [formState, setFormState] = useState({
      name: "",
      baseLanguage: "",
      description: "",
    });
    const [newProject] = useMutation(ADD_PROJECT);

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        await newProject({
          variables: {
            name: formState.name,
            baseLanguage: formState.baseLanguage,
            openCollab: formState.openCollab === "Yes" ? true : false,
            description: formState.description,
          },
        });
      }
      catch (e) {
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
          <h2>New Project</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Project Name:
              <input
                placeholder="Project Name"
                name="name"
                type="text"
                id="name"
                onChange={handleChange}
              />
            </label>
            <label>
              Base Language:
              <select
                name="baseLanguage"
                id="baseLanguage"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="C#">C#</option>
              </select>
            </label>
            <label>
              Open Collaboration:
              <select name="openCollab" id="openCollab" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label>
              Description:
              <input
                placeholder="Description"
                name="description"
                type="text"
                id="description"
                onChange={handleChange}
              />
            </label>
            <button type="submit">
              Add Project
            </button>
          </form>
          <br></br>
          <button onClick={props.toggle}>Close</button>
        </div>
      </div>
    );
  }

  function EditProject(props) {
    const [formState, setFormState] = useState({
      openCollab: "",
      description: "",
    });
    const [updateProject] = useMutation(UPDATE_PROJECT);

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await updateProject({
          variables: {
            openCollab: formState.openCollab,
            description: formState.description,
          },
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
    };

    return (
      <div className="popup">
        <div className="popup-inner">
          <h2>Edit Project</h2>

          <form onSubmit={handleFormSubmit}>
            <label>
              Project Name:
              <input
                placeholder="Project Name"
                name="name"
                type="text"
                id="name"
                onChange={handleChange}
              />
            </label>
            <label>
              Base Language:
              <input
                placeholder="Base Language"
                name="baseLanguage"
                type="text"
                id="baseLanguage"
                onChange={handleChange}
              />
            </label>
            <label>
              Open Collaboration:
              <input
                placeholder="Open Collaboration"
                name="openCollab"
                type="text"
                id="openCollab"
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <input
                placeholder="Description"
                name="description"
                type="text"
                id="description"
                onChange={handleChange}
              />
            </label>
            <button type="submit" onClick={updateProject}>
              Update Project
            </button>
          </form>
          <br></br>
          <button onClick={props.toggle}>Close</button>
        </div>
      </div>
    );
  }

  const location = useLocation();
  const profileId = Auth.getProfile().data._id;

  if (location.pathname === `/profile/${profileId}`) {
    return (
      <section>
        <div className="profile-page" key={student.id}>
          <div className="profile-container">
            <div id="profile-pic">
              <img src={student.image} alt="Profile Picture" />
              <h1 className="profile-text">
                {student.firstName} {student.lastName}
              </h1>
            </div>
            <br></br>
            <div id="profile-info">
              <h2 className="profile-text">
                Email: <span className="italics">{student.email}</span>
              </h2>
              <h2 className="profile-text">
                Looking For Work:{" "}
                <span className="italics">
                  {student.openEmploy === true ? "Yes" : "No"}
                </span>
              </h2>
            </div>

            <h2>Current Projects</h2>

            <div className="project-container">
              {student.projects.map((project) => (
                <div className="project-card" key={project.id}>
                  <div className="project-info">
                    <h3 className="project-text">
                      Project Name: {project.name}
                    </h3>
                    <h3 className="project-text">
                      Base Language: {project.baseLanguage}
                    </h3>
                    <h3 className="project-text">
                      Open Collaboration:{" "}
                      {project.openCollab === true
                        ? "Hell Yea!"
                        : "It's Gonna be a no for me, dawg"}
                    </h3>
                    <h3 className="project-text">
                      Description: {project.description}
                    </h3>
                  </div>
                  <div>
                    <button
                      className="btn"
                      id="edit-project"
                      onClick={togglePop}
                    >
                      Edit Project
                    </button>
                    {isPopOpen ? <EditProject toggle={togglePop} /> : null}
                    <br></br>
                    <button className="btn" id="remove-project" onClick="">
                      Remove Project
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <button className="btn" id="add-project" onClick={togglePop}>
                  Add Project
                </button>
                {isPopOpen ? <AddProject toggle={togglePop} /> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div className="profile-page" key={student.id}>
          <div className="profile-container">
            <div id="profile-pic">
              <img src={student.image} alt="Profile Picture" />
              <h1 className="profile-text">
                {student.firstName} {student.lastName}
              </h1>
            </div>
            <br></br>
            <div id="profile-info">
              <h2 className="profile-text">
                Email: <span className="italics">{student.email}</span>
              </h2>
              <h2 className="profile-text">
                Looking For Work:{" "}
                <span className="italics">
                  {student.openEmploy === true ? "Yes" : "No"}
                </span>
              </h2>
            </div>

            <h2>Current Projects</h2>

            <div className="project-container">
              {student.projects.map((project) => (
                <div className="project-card" key={project.id}>
                  <div className="project-info">
                    <h3 className="project-text">
                      Project Name: {project.name}
                    </h3>
                    <h3 className="project-text">
                      Base Language: {project.baseLanguage}
                    </h3>
                    <h3 className="project-text">
                      Open Collaboration:{" "}
                      {project.openCollab === true
                        ? "Hell Yea!"
                        : "It's Gunna be a no for me, dawg"}
                    </h3>
                    <h3 className="project-text">
                      Description: {project.description}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default ProfileCard;