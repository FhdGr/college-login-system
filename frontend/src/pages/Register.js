import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        form
      );
      localStorage.setItem("token", res.data.token);
      const role = res.data.user.role.toLowerCase();
      navigate(`/${role}-dashboard`);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: 400 }}
      >
        <h2 className="text-center mb-4">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-control mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />

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

        <select
          name="role"
          className="form-select mb-3"
          value={form.role}
          onChange={handleChange}
        >
          <option>Faculty</option>
          <option>Staff</option>
          <option>Student</option>
        </select>

        {error && <div className="alert alert-danger py-1">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;
