import { createContext, useState, useEffect } from 'react'
import { profileCustomer } from '../services/customerService.js'

// membuat context untuk menyimpan data otentikasi dan user aktif login
export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    // variabel untuk simpan data authentikasi dari user saat login berupa token dan role
    // diset nilai awal null
    const [auth, setAuth] = useState({
        token : null,
        role : null
    })

    // variabel untuk menyimpan data user yang sedang login diisi null semua
    // data buat isinya diambil dari api profileCustomer
    const [user, setUser] = useState({
        id : null,
        username : null,
        address : null,
        email : null,
        phone_num : null,
        img_url : null,
        updatedAt : null,
        createdAt : null,
    })

    // fungsi wrapper setAuth untuk ngatur nilai otentikasi
    // jadi token dan role disimpan di local storage juga
    const setAuthData = (token, role) => {
        localStorage.setItem("token", token)
        localStorage.setItem("role", role)
        setAuth({token, role })
    }

    // klo logout maka token dan role bakal dihapus dari local storage
    // user yang blm log ga bisa di otentikasi
    // kemudian kosongkan data user dan data otentikasi
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        setAuth({
            token : null,
            role : null
        })

        setUser(null)
    }

    // fungsi untuk mengambil data user saat ini jika sudah login
    // lalu mengisi nilai user
    // klo gagal bakal kirim error di konsole klo ambil data use gagal
    const fetchUser = async () => {
        try {
            const res = await profileCustomer()
            setUser(res.data)
        } catch (er) {
            console.log("Gagal ambil data User: ", er)
        }
    }

    //ambil data saat app di load dna cek apakah token dan role ada di local storage
    // klo ada maka akan menyimpan nilai auth
    useEffect(() => {
        const token = localStorage.getItem("token")
        const role = localStorage.getItem("role")
        if (token && role) {
            setAuth(token, role)
            fetchUser()
        }
    }, [])

    // kasi akses ke niali dan funsi di authContext ke
    // komponen anak yang dibungkus AuthProvider
    // cth.
    // <AuthProvider>
    // <App />
    // </AuthProvider> maka <App /> adalah children
    return (
        <AuthContext.Provider
            value={
            {auth,
                setAuthData,
                user,
                setUser,
                logout,
                fetchUser
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}