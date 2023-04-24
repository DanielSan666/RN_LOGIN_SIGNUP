import { IP_SENSOR, IP_SERVER } from "../Constants";

export const dataUser = async (id) => {
  const res = await fetch(`${IP_SERVER}/api/users/${id}`);
  return await res.json();
};

export const getData = async () => {
  const res = await fetch(`${IP_SENSOR}/distancia`);
  return await res.json();
};

export const getSingleData = async () => {
  const res = await fetch(`${IP_SERVER}/api/data/single`);
  return await res.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`${IP_SERVER}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const UpdatedUser = response.json();
  return UpdatedUser, true;
};
