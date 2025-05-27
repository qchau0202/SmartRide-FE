import { RouterProvider } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import router from "./routes";
import { ConfigProvider } from "antd";
import antdTheme from "./contexts/ThemeContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <ConfigProvider theme={antdTheme}>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </ConfigProvider>
    </>
  );
};

export default App;
