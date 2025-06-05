function Admin({ username }) {
    return (
        <div className="container">
            <h1>Admin Page</h1>
            <p>Welcome to the Admin Page, {username}!</p>
        </div>
    );
}

export default Admin;