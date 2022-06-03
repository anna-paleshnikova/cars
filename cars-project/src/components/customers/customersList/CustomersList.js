import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUsers,
} from "../../../utils/http-utils/customer-requests";
import { CustomerCard } from "../customerCard/CustomerCard";
import "./CustomerList.scss";

export function CustomerList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  const deleteUserHandler = async (id) => {
    await deleteUser(id);
    setUsers((pervState) => {
      return pervState.filter((user) => user.id !== id);
    });
  };

  return (
    <div className="users-list-wrapper">
      {users &&
        users.map((user) => (
          <CustomerCard
            key={user.id}
            user={user}
            deleteUser={deleteUserHandler}
          />
        ))}
    </div>
  );
}
