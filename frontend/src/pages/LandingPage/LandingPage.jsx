import './LandingPage.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LandLogo from '../../img/Group.png'
import warteUhr from '../../img/Frame.png'

function LandingPage() {
    const redirect = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            redirect('/Login')
        }, 3000)
    }

    )

    return (
        <div className='landingPage'>
            <img className='landLogo' src={LandLogo} alt='Logo toktok' />
            <img className='warteUhr' src={warteUhr} alt='Warteuhr' />
        </div>
    );
}

export default LandingPage;