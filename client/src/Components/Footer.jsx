export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-4 mt-auto">
      <div className="container text-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 offset-xl-3">
              © {new Date().getFullYear()} Pejman-MERN-Wonderland
            </div>
            <div className="col-xl-3 mb-1">Created by Pejman Hamedani</div>

            <small className="text-secondary">
              Built with React, Express, Node.js & MongoDB
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
