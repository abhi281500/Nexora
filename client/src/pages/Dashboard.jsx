import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        setError("Session expired. Please login again.");
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to logout. Please try again."
      );
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">N</div>
          <h2>Nexora</h2>
        </div>

        <nav className="dashboard-nav">
          <a href="/dashboard" className="dashboard-nav-link active">
            <span>▦</span>
            Dashboard
          </a>

          <a href="#" className="dashboard-nav-link">
            <span>◫</span>
            Projects
          </a>

          <a href="#" className="dashboard-nav-link">
            <span>✓</span>
            Tasks
          </a>

          <a href="#" className="dashboard-nav-link">
            <span>⚙</span>
            Settings
          </a>
        </nav>

        <button className="dashboard-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">WORKSPACE OVERVIEW</p>
            <h1>Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back, {user.name}!
            </p>
          </div>

          <div className="dashboard-user">
            <div className="dashboard-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user.name}</strong>
              <p>{user.email}</p>
            </div>
          </div>
        </header>

        {error && <p className="dashboard-error">{error}</p>}

        <section className="dashboard-stats">
          <div className="dashboard-stat-card">
            <p>Total Projects</p>
            <h2>0</h2>
            <span>No projects created yet</span>
          </div>

          <div className="dashboard-stat-card">
            <p>Active Tasks</p>
            <h2>0</h2>
            <span>Tasks assigned to you</span>
          </div>

          <div className="dashboard-stat-card">
            <p>Completed Tasks</p>
            <h2>0</h2>
            <span>Your completed work</span>
          </div>
        </section>

        <section className="dashboard-welcome-card">
          <div>
            <p className="dashboard-eyebrow">GET STARTED</p>
            <h2>Your workspace starts here.</h2>
            <p>
              Create your first project, organize tasks, and collaborate
              with your team.
            </p>

            <button
              className="dashboard-primary-button"
              onClick={() => alert("Project creation will be added in Phase 2.")}
            >
              + Create your first project
            </button>
          </div>

          <div className="dashboard-welcome-visual">N</div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;