import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/usersSlice";
import UserItem from "../components/UserItem";

const UsersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const me = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.users.users);

  return (
    <div>
      <h1>Пользователи</h1>
      {users.length > 0 ? (
        <div>
          {users.map((user, i) => {
            if (user._id !== me.id) {
              return <UserItem key={i} user={user} />;
            }
          })}
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

export default UsersPage;
