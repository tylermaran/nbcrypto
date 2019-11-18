// Importing Dependencies
import React from 'react';

// Importing Styles
import './About.css';

const About = props => {
    return (
        <div className="about">
            <div className="sub_title">
                About:
            </div>
            <br/>
            <p>This project is open to community improvement. Check out the repo at <a id="github_link" href="https://github.com/tylermaran/nbcrypto">github.com/tylermaran/nbcrypto</a></p>
        </div>
    );
};

export default About;
