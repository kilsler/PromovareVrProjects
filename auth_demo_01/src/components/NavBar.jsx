import { Link } from 'react-router-dom';

function NavBar({ auth, onLogout }) {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {auth.isAuthenticated ? (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        {auth.roles.includes('ROLE_ADMIN') && (
                            <li><Link to="/admin">Admin</Link></li>
                        )}
                        <li>
                            <button onClick={onLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;