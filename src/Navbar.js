import { Link } from "react-router-dom"
import "./styles.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Armonia.io</Link>
            <ul>
                <li><Link to="/books">Libri</Link></li>
                <li><Link to="/users">Utenti</Link></li>
            </ul>
        </nav >
    )
}
