function Profile({ username }) {
    return (
        <div className="container">
            <h1>Profile Page</h1>
            <p>Welcome to your Profile, {username}!</p>
        </div>
    );
}

export default Profile;