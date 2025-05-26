import { RouterProvider } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
import router from "./routes";
import { ConfigProvider } from "antd";
import antdTheme from "./contexts/ThemeContext";
const App = () => {
  return (
    <>
      <ConfigProvider theme={antdTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
};

export default App;
