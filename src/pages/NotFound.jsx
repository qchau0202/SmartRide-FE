import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-gray-500">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="text-emerald-500 hover:text-emerald-600 text-center underline"
        >
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

