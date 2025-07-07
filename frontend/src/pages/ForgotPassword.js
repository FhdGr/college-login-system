import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
        { email }
      );
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: 400 }}
      >
        <h2 className="text-center mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {sent && (
          <div className="alert alert-success py-1">
            Reset link sent! Check your console.
          </div>
        )}
        {error && <div className="alert alert-danger py-1">{error}</div>}

        {!sent && (
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
