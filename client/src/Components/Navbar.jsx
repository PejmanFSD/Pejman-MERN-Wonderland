import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <header>
            <div>
                <h1>Pejman MERN Wonderland</h1>
                <Link to="/">
                    Home Page
                </Link>
            </div>
        </header>
    )
}