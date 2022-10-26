import moment from "moment";

const UserItem = ({ user }) => {
  let now = moment();
  let momDate = moment(user.birthdate);
  let diff = now.diff(momDate, "years");

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "20px",
        borderBottom: "1px solid black",
      }}
    >
      <div>
        <img
          style={{ width: "100px", height: "100px", borderRadius: "50px" }}
          src={"http://localhost:5000/" + user.image}
          alt=""
        />
      </div>
      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <div>{user.name}</div>
        <div>{diff} лет</div>
      </div>
    </div>
  );
};

export default UserItem;
