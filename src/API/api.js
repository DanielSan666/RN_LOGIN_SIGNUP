
const ip = "192.168.1.22"

export const dataUser = async(id)=>{

    const res = await fetch(`http://${ip}:5000/api/users/${id}`)
    return await res.json()
}

export const getData = async () => {
    const res = await fetch(`http://${ip}:5000/api/data/`)
    return await res.json()
}

export const updateUser = async(id, userData)=> {
  const response = await fetch(`http://${ip}:5000/api/users/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
  const UpdatedUser = response.json()
  return UpdatedUser, true;
}
