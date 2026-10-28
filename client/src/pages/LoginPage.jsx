
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      console.log(response.data);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="auth-container">
  <div className="auth-card">

    <div className="auth-brand">
      <div className="auth-brand-icon">
        N
      </div>

      <h2>Nexora</h2>
    </div>

    <div className="auth-heading">
      <h1>Welcome back</h1>

      <p>
        Sign in to continue to your workspace
      </p>
    </div>

    <form className="auth-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label htmlFor="email">
          Email address
        </label>

        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      {error && (
        <p className="auth-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="auth-button"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

    </form>

    <p className="auth-footer">
      Don't have an account?{" "}
      <Link to="/signup">
        Sign up
      </Link>
    </p>

  </div>
</div>
  );
}

export default LoginPage;
