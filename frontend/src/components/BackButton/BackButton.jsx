import { useNavigate } from 'react-router-dom';
import { GoChevronLeft } from "react-icons/go";
import './BackButton.css'

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <>
            <button className='backButton' onClick={() => navigate(-1)}><GoChevronLeft className='icon' /></button>
        </>
    );
}

export default BackButton;