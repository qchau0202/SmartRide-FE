import Customer from "../components/Customer";
import Driver from "../components/Driver";
import { getCurrentUser } from "../services/api";
import { useEffect, useState } from "react";
const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCurrentUser();
      setUser(res.data.user);
    };
    fetchUser();
  }, []);
  return <>{user?.role === "driver" ? <Driver /> : <Customer />}</>;
};

export default Home;
