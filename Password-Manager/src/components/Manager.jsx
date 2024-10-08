import React from "react";
import { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ website: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        setpasswordArray(passwords);
        console.log(passwords);
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.info("Copied to clipboard!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        } else {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eyecross.png";
        }
    };

    const savePassword = async () => {
        if (
            form.website.length > 3 &&
            form.username.length > 3 &&
            form.password.length > 3
        ) {
            //IF ID EXISTS AIN DB DELETE IT:
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: form.id }),
            });
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...form, id: uuidv4() }),
            });
            toast.info("Password Saved Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.info("Unable to save!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        // console.log([...passwordArray,form]);
    };

    const deletePassword = async (id) => {
        console.log(`deleting id: ${id}`);
        let enquire = confirm("Are you sure you want to delete?");
        //localStorage
        if (enquire) {
            setpasswordArray(passwordArray.filter((item) => item.id !== id));
            // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=> item.id!==id)));
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            toast.info("Password Deleted!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };
    const editPassword = (id) => {
        console.log(`editing id: ${id}`);
        //localStorage
        setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
        setpasswordArray(passwordArray.filter((item) => item.id !== id));

        // localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
        // console.log([...passwordArray,form]);
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition=" Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="p-3 md:mycontainer min-h-[70vh]">
                <h1 className=" text-white text-4xl font-bold text-center">
                    <span className="text-[#a36eff]">&lt;</span>
                    Pass
                    <span className="text-[#a36eff]">Man/&gt;</span>
                </h1>
                <p className="text-[#a36eff] text-lg text-center">
                    The most convinient password manager
                </p>
                <div className="flex flex-col p-4 text-black gap-6 items-center">
                    <input
                        value={form.website}
                        name="website"
                        onChange={handleChange}
                        placeholder="Enter Website URL"
                        className="rounded-full placeholder:font-bold placeholder:font-mono border border-orange-500 w-full p-4 py-1"
                        type="text"
                        id="website"
                    />
                    <div className="flex flex-col md:flex-row w-full gap-3 justify-between">
                        <input
                            value={form.username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="rounded-full placeholder:font-bold placeholder:font-mono  border border-orange-500 w-full p-4 py-1"
                            type="text"
                            id="username"
                        />
                        <div className="relative">
                            <input
                                value={form.password}
                                name="password"
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-orange-500 w-full p-4 py-1 placeholder:font-bold placeholder:font-mono"
                                type="password"
                                ref={passwordRef}
                                id="password"
                            />
                            <span
                                className="absolute right-[6px] top-[5px]"
                                onClick={showPassword}
                            >
                                <img
                                    ref={ref}
                                    src="icons/eye.png"
                                    className="p-1 cursor-pointer"
                                    width={26}
                                    alt="eye"
                                />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="text-white active:scale-75 transition-all  gap-2 flex justify-center items-center bg-[#a36eff] rounded-full hover:bg-[#a36effc4] px-4 py-2 w-fit"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                        ></lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwords text-white">
                    <h2 className="text-2xl font-bold py-4">Your Passwords:</h2>
                    {passwordArray.length === 0 && <div>No Saved Passwords to show.</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className="bg-[#a36eff]">
                                <tr>
                                    <th className="py-3 border-b-2">Website</th>
                                    <th className="py-3 border-x-2 border-b-2">Username</th>
                                    <th className="py-3 border-b-2">Passwords</th>
                                    <th className="py-3 border-b-2 border-l-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#a36eff6d] ">
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center py-2 border-r-2 border-b-2">
                                                <div className="flex items-center justify-center gap-2">
                                                    <a href={item.website} target="_blank">
                                                        {item.website}
                                                    </a>
                                                    <div
                                                        onClick={() => copyText(item.website)}
                                                        className="lordicopy size-7 cursor-pointer w-[250] h-[250]"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/nmguxqka.json"
                                                            trigger="hover"
                                                            stroke="bold"
                                                            colors="primary:#ffffff,secondary:#a36eff"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center  py-2 border-r-2 border-b-2">
                                                <div className="flex justify-center items-center gap-2">
                                                    <span>{item.username}</span>
                                                    <div
                                                        onClick={() => copyText(item.username)}
                                                        className="lordicopy size-7 cursor-pointer w-[250] h-[250]"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/nmguxqka.json"
                                                            trigger="hover"
                                                            stroke="bold"
                                                            colors="primary:#ffffff,secondary:#a36eff"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center  py-2 border-b-2 border-r-2">
                                                <div className="flex justify-center items-center">
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div
                                                        onClick={() => copyText(item.password)}
                                                        className="lordicopy size-7 cursor-pointer w-[250] h-[250]"
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/nmguxqka.json"
                                                            trigger="hover"
                                                            stroke="bold"
                                                            colors="primary:#ffffff,secondary:#a36eff"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center flex justify-center gap-2 items-center py-2 border-b-2">
                                                <span
                                                    className="invert cursor-pointer"
                                                    onClick={() => deletePassword(item.id)}
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </span>
                                                <span
                                                    onClick={() => editPassword(item.id)}
                                                    className="invert cursor-pointer"
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
