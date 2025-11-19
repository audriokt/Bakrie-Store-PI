import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginCustomer } from "../../../services/authService.js"
import { profileCustomer } from "../../../services/customerService.js"
import { useAuth } from "../../../hooks/useAuth.js"
import Loading from "../../../components/loader/Loading.jsx";
import Swal from "sweetalert2";

const LoginPage = () => {
    // akses fungsi yang ada di useContext lewat hook useAuth
    const {setAuthData, setUser} = useAuth()

    // pake useNavigate untuk navigasi ke halaman lain setelah login
    const navigate = useNavigate()

    // loading untuk sebagai penanda jika prose blm selesai loading bernilai true
    // klo selesai loading bernilai false
    const [loading, setLoading] = useState(false)

    // data untuk menampung nilai dari form login
    // nilai awal kosong
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const [loginError, setLoginError] = useState(false);

    // fungsi akan dipanggil ketika ada perubahan pada komponen input email dan password
    // perubahan akan disimpan ke dalam data login "data"
    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setData((prev)=> ({...prev, [name]:value}))
    }

    // fungsi bakal dipanggil klo form di submit
    // fungsi ini akan mengirim data login ke server dan mengembalikan token dan role di "res"
    // lalu data tersebut di simpan di localSorage pake function setAuthData
    // lalu ambil data user yang baru login pake function profileCustomer
    // trus isi nilai user
    // klo berhasil bakal di arahin ke halaman utama
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const resLogin = await loginCustomer(data);
            const { token, role } = resLogin.data;
            setAuthData(token, role);
            const resUser = await profileCustomer();
            setUser(resUser.data);

            Swal.fire({
              title: "Login Successful",
              text: "You have successfully logged in.",
              icon: "success",
              confirmButtonText: "Ok",
              confirmButtonColor: "#C31D1D"
            }).then((result) => {
              if(result.isConfirmed) {
                navigate("/");
              }
            });
        } catch (err) {
            console.error("Login Failed:", err);
            setLoginError(true);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="flex h-screen items-center justify-center bg-ookay">
      {/* Container utama */}
      <div className="flex bg-white rounded-[40px] shadow-2xl overflow-hidden w-[80%] max-w-5xl">
        {/* Bagian kiri: form login */}
        <motion.div
          className="flex flex-col justify-center items-center w-[50%] px-10 py-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo dan teks */}
          <img src="./logo/login.svg" alt="Logo" className="w-32 mb-2" />
          <p className="text-red-600 text-sm mb-6">
            Login to your account here!
          </p>

          {/* Form login */}
          <form className="space-y-4 w-full max-w-sm" onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="email" className="block text-sm text-red-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-red-500 rounded-md py-3 px-4 
                          focus:outline-none focus:ring-2 focus:ring-red-400 
                          text-gray-700 placeholder-gray-400"
                placeholder="Email"
                name="email"
                id="email"
                onChange={onChangeHandler}
                value={data.email}
              />
            </div>

            <div>
              <label className="block text-sm text-red-700 mb-2 font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-red-500 rounded-md py-3 px-4 
                          focus:outline-none focus:ring-2 focus:ring-red-400 
                          text-gray-700 placeholder-gray-400"
                placeholder="Password"
                name="password"
                id="password"
                onChange={onChangeHandler}
                value={data.password}
              />
            </div>

            {loginError && (
              <p className="text-red-600 text-sm mt-2">
                Login failed. Please check your email and password.
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-12 bg-red-600 text-white py-3 rounded-full
                hover:bg-red-700 transition-all duration-200 font-semibold shadow-md"
               disabled={loading}
            >
              {loading ? <Loading /> : "Login"}
            </motion.button>
          </form>

          <Link
            to="/signup"
            className="text-red-700 text-sm underline mt-4 hover:text-red-800"
          >
            Sign Up
          </Link>
        </motion.div>

        {/* Bagian kanan: animasi video */}
        <div className="w-[50%] bg-pink-50 flex justify-center items-center">
          <motion.video
            className="w-[80%] h-auto object-contain drop-shadow-lg rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <source src="/logo/baker-animation.mp4" type="video/mp4" />
          </motion.video>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
