function FacultyDashboard() {
  return (
    <div className="container py-5">
      <div className="card shadow text-center">
        <div className="card-body">
          <h2 className="card-title text-primary">Faculty Dashboard</h2>
          <p className="card-text">Welcome, esteemed faculty member 👩‍🏫</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
