import { Link } from "react-router-dom"; 
import "./css/Episodes.css"; 

const Episodes = () => { 
    return (
        <div className="episodes-page"> 
            <h1>Episodes of Earth 3.0</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem, soluta accusantium! Et error earum, voluptatibus laboriosam iure commodi consequatur doloremque neque voluptatem maiores, blanditiis ipsam, a cupiditate. Laborum, voluptates nulla?</p>

            <Link to= "/" className="back-button">Back to Home</Link>
        </div>
    );
};

export default Episodes; 
