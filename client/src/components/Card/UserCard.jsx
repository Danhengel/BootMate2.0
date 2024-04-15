import { Link } from "react-router-dom";

const UserCard = ({ students }) => {
    if (!students) {
        return <h3>No student data found</h3>;
    }

    return (
        <div className="student-card">
            {students.map((students) => (
                <div className="student-container" key={students.id}>
                    <div className="student-card">

                        <div className="user">
                            <div className="user-image">
                                <div className="banner-image">
                                    <img src={students.image} alt="user" />
                                </div>
                            </div>
                            
                            <div className="user-info">
                                <h1 className="name"> {students.firstName} {students.lastName} </h1>
                                <br></br>
                                <p className="work">Looking for work: {students.openEmploy === true ? "Yes" : "No"}</p>
                            </div>

                            <div className="button-wrapper"> 
                                <button className="userbtn fill"><a href={`mailto:${students.email}`}>EMAIL</a></button>
                                <Link to={`/profile/${students.id}`}><button className="userbtn fill" >PROFILE</button></Link>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserCard;