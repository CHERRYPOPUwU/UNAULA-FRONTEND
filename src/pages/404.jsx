import { Link } from "react-router-dom";
import "../styles/pages/404.css";

export function NotFoundPage() {
  return (
    <section className="page_404">
            <div style={{ textAlign: 'center' }}>
                <h1 className="title">404</h1>
                <div className="four_zero_four_bg"></div>
                <div>
                    <h3>Looks like you're lost</h3>
                    <p >The page you are looking for is not available.</p>
                    <Link to="/login" className="link_404">Go to Home</Link>
                </div>
            </div>
        </section>

  );
}
