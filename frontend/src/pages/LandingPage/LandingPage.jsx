import './LandingPage.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LandLogo from '../../img/Group.png'

function LandingPage() {
    const redirect = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            redirect('/Login')
        }, 3000)
    }

    )

    return (
        <div>
            <img className="LandLogo" src={LandLogo} alt='LandLogo' />
            <p>Hier ist dann die Warteanimation</p>
        </div>
    );
}

export default LandingPage;