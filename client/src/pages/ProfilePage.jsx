import NavBar from "../components/Nav/NavBar";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT} from "../utils/queries";
import ProfileCard from "../components/Profile/ProfileCard";

export default function ProfilePage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_STUDENT, {
    variables: { id },
  });
  
  if (error) return <div>Error : {error.message}</div>;
  if (loading) return <div>Loading...</div>;

  const student = data.student;

  return (
    <section>
      <NavBar />
      <div>
        {loading ? <div>Loading...</div> : <ProfileCard student={student} />}
      </div>
    </section>
  )
};