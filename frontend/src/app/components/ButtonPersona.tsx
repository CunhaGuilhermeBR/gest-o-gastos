interface ButtonProps {
    img1: string;
    img2: string;
    onClick?: () => void;
}

const ButtonPersona: React.FC<ButtonProps> = ({ img1, img2, onClick }) => {
    return (
        <button className="link-wrapper p-2 mt-4" 
        type="submit"
        onClick={onClick}>
            <span className="fallback">Name</span>
            <div className="img-wrapper">
                <img className="normal" src={img1} />
                <img className="active" src={img2} />
            </div>
            <div className="shape-wrapper">
                <div className="shape red-fill jelly">
                    <svg x="0px" y="0px"
                        viewBox="0 0 108.1 47">
                        <polygon fill="#FF0000" points="29.5,8.5 150.7,0 108.1,32.7 3.1,47 " />
                    </svg>
                </div>
                <div className="shape cyan-fill jelly">
                    <svg x="0px" y="0px"
                        viewBox="0 0 108.1 47">
                        <polygon fill="#00FFFF" points="0.3,17 125.1,0 68.8,45.6 24.3,39 " />
                    </svg>
                </div>
            </div>
        </button>
    )
}

export default ButtonPersona