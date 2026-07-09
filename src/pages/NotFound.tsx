import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary leading-none">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-black">
          Page Not Found
        </h2>
        <Link
          to="/dashboard"
          className="
            inline-flex
            items-center
            justify-center
            mt-8
            h-10
            p-6
            rounded-xl
            bg-primary
            text-white
            font-medium
            hover:opacity-90
            transition-all
            text-base
          "
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
