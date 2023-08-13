import React from 'react';


function Footer() {
    return (
        <footer className="footer" style={{
            marginTop: '1rem', backgroundColor: "#1b80e4",
            padding: '10px'  ,
    textAlign: 'center'
}}>
            <p>&copy; {new Date().getFullYear()} Bytes&Beyond. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
