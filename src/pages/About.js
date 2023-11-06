import { Botonera } from '../Components/Botonera';
import { AboutHeader } from '../Components/About/AboutHeader';
import { AboutBody } from '../Components/About/AboutBody';

const About = () => {
    return (
        <div className='App-About'>
            <AboutHeader />
            <AboutBody />
            <Botonera page="About"/>
        </div>
    )
};

export default About;