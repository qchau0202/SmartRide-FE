import Customer from "../components/Customer";
import Driver from "../components/Driver";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "customer";
  return <>{role === "driver" ? <Driver /> : <Customer />}</>;
};

export default Home;
