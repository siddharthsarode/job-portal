import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-gray-100 p-4">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-2">Oops!</h1>
        <p className="text-xl mb-4">
          Something went wrong or the page doesn't exist.
        </p>
        {error?.status && (
          <p className="text-gray-600">Error Code: {error.status}</p>
        )}
        {error?.statusText && (
          <p className="text-gray-600">Message: {error.statusText}</p>
        )}
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;
