import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="w-full grid grid-cols-3 gap-4 bg-black-persona p-4 text-deep-yellow-persona shadow-lg z-10">
            <div className="flex items-center justify-center">
                <a href="mailto:guilhermegomescunha@hotmail.com">
                    Guilherme Cunha ©
                </a>
            </div>
            <div className="flex items-center justify-center transition-transform duration-300 hover:scale-120">
                <a href='https://www.linkedin.com/in/guilherme-augusto-gomes-cunha-107a98169/' target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"/>
                </a>
            </div>
            <div className="flex items-center justify-center transition-transform duration-300 hover:scale-120">
                <a href='https://github.com/CunhaGuilhermeBR' target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github" />
                </a>
            </div>
        </div>
    );
};

export default Footer;
