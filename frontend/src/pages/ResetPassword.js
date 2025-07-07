import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.error || "Reset failed");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: 400 }}
      >
        <h2 className="text-center mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="form-control mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        {success && (
          <div className="alert alert-success py-1">
            Password updated! Redirecting...
          </div>
        )}
        {error && <div className="alert alert-danger py-1">{error}</div>}

        {!success && (
          <button className="btn btn-primary w-100">Update Password</button>
        )}
      </form>
    </div>
  );
}

export default ResetPassword;
