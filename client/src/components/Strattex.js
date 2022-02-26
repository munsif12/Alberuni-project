import React, { useState, useEffect } from 'react'
import { getData, createUser, removeUser } from '../functions/stratex'


const initialState = {
    firstName: '',
    lastName: '',
    role: '',
};

const Strattex = () => {
    const [data, setData] = useState([])
    const [user, setUser] = (useState(initialState))

    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        handleData()
    }, [])

    const handleData = () => {
        getData()
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(user)
            .then((res) => {
                setData(res.data)
                console.log(res);
                window.alert(`"${user.firstName}" is created`);
                // window.location.reload();
            })
            .catch((err) => {
                if (err.response.status === 422) window.alert(err.response.data);
                console.log(err);
            });
    };

    const handleRemove = (c) => {
        console.log(c)
        // let answer = window.confirm("Are you sure you want to Delete?");
        if (window.confirm("Are you sure you want to Delete?")) {
            // console.log("Sent Delete Request", slug);
            removeUser(c)
                .then((res) => {
                    setData(res.data)
                    console.log(res.data)
                    // window.alert(`${user.firstName} is deleted`);
                })
                .catch((err) => {
                    // if (err.response.status === 400) toast.error(err.response.data);
                    console.log(err);
                });
        }
        // console.log(id)
    };

    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase()); // lowercase to keep search consistent
    };

    const searched = (keyword) => (c) => c.firstName.toLowerCase().includes(keyword);

    return (
        <>
            <nav class="navbar sticky-top navbar-light bg-light">
                <div class="container-fluid w-50">
                    <div class="col-sm-9">
                        <input value={keyword}
                            onChange={handleSearchChange} type="text" class="form-control" id="search-user" placeholder="Search for employee" />
                    </div>
                    <div class="col-sm-2 ml-2">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-user-modal">
                            Add User
                        </button>
                    </div>
                </div>
            </nav>

            <div class="container pt-5">
                <h2>Users</h2>
                <table class="table mb-5 align-middle" id="users">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }} scope="col">#</th>
                            <th style={{ width: "20%" }} scope="col">First</th>
                            <th style={{ width: "20%" }} scope="col">Last</th>
                            <th style={{ width: "20%" }} scope="col">Role</th>
                            <th style={{ width: "20%" }} scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((d, i) => ( */}
                        {data.filter(searched(keyword)).map((c, i) => {
                            if (c.role === "1") {
                                return (
                                    <>
                                        <tr key={i}>
                                            <th scope="row">{c.role}</th>
                                            <td>{c.firstName}</td>
                                            <td>{c.lastName}</td>
                                            <td>Users</td>
                                            <td /><button type="button" class="btn btn-outline-danger btn-sm" onClick={() => handleRemove(c)}>Delete</button>

                                        </tr>
                                    </>
                                )
                            } else return null;
                        })}
                    </tbody>
                </table>
                <h2>Senior Users</h2>
                <table class="table mb-5 align-middle" id="senior-users">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }} scope="col">#</th>
                            <th style={{ width: "20%" }} scope="col">First</th>
                            <th style={{ width: "20%" }} scope="col">Last</th>
                            <th style={{ width: "20%" }} scope="col">Role</th>
                            <th style={{ width: "20%" }} scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(searched(keyword)).map((c, i) => {
                            if (c.role === "2") {
                                return (
                                    <>
                                        <tr key={i}>
                                            <th scope="row">{c.role}</th>
                                            <td>{c.firstName}</td>
                                            <td>{c.lastName}</td>
                                            <td>Senior Users</td>
                                            <td /><button type="button" class="btn btn-outline-danger btn-sm" onClick={() => handleRemove(c)}>Delete</button>

                                        </tr>
                                    </>
                                )
                            } else return null;
                        })}
                    </tbody>
                </table>
                <h2>WFM</h2>
                <table class="table mb-5 align-middle" id="wfm-users">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }} scope="col">#</th>
                            <th style={{ width: "20%" }} scope="col">First</th>
                            <th style={{ width: "20%" }} scope="col">Last</th>
                            <th style={{ width: "20%" }} scope="col">Role</th>
                            <th style={{ width: "20%" }} scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(searched(keyword)).map((c, i) => {
                            if (c.role === "3") {
                                return (
                                    <>
                                        <tr key={i}>
                                            <th scope="row">{c.role}</th>
                                            <td>{c.firstName}</td>
                                            <td>{c.lastName}</td>
                                            <td>WFM Professionals</td>
                                            <td /><button type="button" class="btn btn-outline-danger btn-sm" onClick={() => handleRemove(c)}>Delete</button>

                                        </tr>
                                    </>
                                )
                            } else return null;
                        })}
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="add-user-modal" tabindex="-1" aria-labelledby="add-user-modal-label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="add-user-modal-label">Add a new user</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="first-name-input">First Name</label>
                                <input name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange} type="text" class="form-control" id="first-name-input" placeholder="Mark" />
                            </div>
                            <div class="mb-3">
                                <label for="last-name-input">Last Name</label>
                                <input name="lastName"
                                    value={user.lastName}
                                    onChange={handleChange} type="text" class="form-control" id="last-name-input" placeholder="Otto" />
                            </div>
                            <div class="mb-3">
                                <label for="role-select">Role</label>
                                <select name="role"
                                    onChange={handleChange} class="form-select" id="role-select" aria-label="Role select">
                                    <option selected>Select a role</option>
                                    <option value={1}>User</option>
                                    <option value={2}>Senior User</option>
                                    <option value={3}>WFM</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleSubmit} type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Strattex