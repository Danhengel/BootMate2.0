import { useQuery } from '@apollo/client';
import { QUERY_STUDENT } from '../../utils/queries';
import UserCard from './UserCard';

function StudentList() {
  const { loading, data } = useQuery(QUERY_STUDENT);
  const students = data?.students || [];

  return (
    <div>
      <h1>Student List</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          students.map((student) => (
            <UserCard key={student._id} student={student} />
          ))
        )}
      </div>
    </div>
  );
}

export default StudentList;