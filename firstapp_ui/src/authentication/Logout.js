function Logout() {
    const handleLogout = (event) => {
        localStorage.getItem('authTokens') ? localStorage.removeItem('authTokens') : console.log('No User to logout')
      };
    return (
    <div>
      <a href="/login/" onClick={handleLogout}>Logout</a>
    </div>
    );
  }
  
  export default Logout;