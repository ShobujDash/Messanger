import {useEffect} from 'react'
import axios from 'axios';
import { Outlet ,useNavigate,useLocation} from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'
import { logout ,setOnlineUser,setSocketConnection,setUser} from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.png'
import io from 'socket.io-client'



function Home() {
 
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const basepath = location.pathname === "/"
   
  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials:true
      })

      dispatch(setUser(response?.data?.data))

      if (response.data.data.logout) {
        dispatch(logout())
        navigate("/email")
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, []) 
  
  // socket connection
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_APP_BACKEND_URL, {
      auth: {
        token:localStorage.getItem("token")
      }
    });

    socketConnection.on("onlineUser", (data) => { 
      dispatch(setOnlineUser(data))
    });

    dispatch(setSocketConnection(socketConnection))


    return () => {
      socketConnection.disconnect();
    }

  },[])

  return (
    <div className="grid md:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={` bg-white ${!basepath && "hidden"} md:block`}>
        <Sidebar />
      </section>

      {/* message component */}
      <section className={`${basepath && "hidden"} `}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basepath ? "hidden" : "md:flex"
        }`}
      >
        <div>
          <img src={logo} width={200} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
}

export default Home
