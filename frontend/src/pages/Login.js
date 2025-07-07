import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      const role = res.data.user.role.toLowerCase();
      navigate(`/${role}-dashboard`);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: 400 }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <div className="alert alert-danger py-1">{error}</div>}

        <button className="btn btn-primary w-100">Login</button>

        <p className="mt-3 text-center">
          <a href="/forgot-password" className="text-decoration-none">
            Forgot your password?
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
