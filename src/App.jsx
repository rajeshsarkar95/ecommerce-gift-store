import {useEffect,useState} from "react";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/user/Loader";

export default function App(){
  const [loading,setLoadig] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoadig(false);
    },2000);
    return () =>clearTimeout(timer);
  },[]);
  
  return (
    <>
      {loading ? <Loader /> : <AppRoutes />}
    </>
  );
}
