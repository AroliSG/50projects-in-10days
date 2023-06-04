import { Link } from "react-router-dom";

const ErrorMessage = () => {

    return (
      <div>
        <h2>404 Page was not found</h2>
        <button>
          <Link to="/">Go to the home page</Link>
        </button>
      </div>
    );
}

export default ErrorMessage;