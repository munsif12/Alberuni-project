import axios from 'axios'

export const getData = async () =>
    await axios.get(`http://localhost:8000/api/stratex`);

// create
export const createUser = async (data) =>
    await axios.post(`http://localhost:8000/api/stratex-add`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

//remove
export const removeUser = async (data) => {
    console.log(data)
    return await axios.delete(`http://localhost:8000/api/stratex-remove`, { data });
}