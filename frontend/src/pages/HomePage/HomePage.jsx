import './HomePage.css'

const HomePage = ({ user }) => {
    return (
        <div>
            {user &&
                <h1>welcome home</h1>
            }
        </div>
    );
}

export default HomePage;