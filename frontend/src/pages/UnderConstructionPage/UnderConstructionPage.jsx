import BackButton from '../../components/BackButton/BackButton';
import NavbarBottom from '../../components/NavbarBottom/NavbarBottom';
import './UnderConstructionPage.css'

const UnderConstructionPage = () => {
    return (
        <div>
            <BackButton />
            <div className='underConstruction'>
                <h1>Under Construction</h1>
                <img src='https://source.unsplash.com/random/?construction'></img>
            </div>
            <NavbarBottom />
        </div>
    );
}

export default UnderConstructionPage;