import propTypes from "prop-types";
import { useId } from "react";
import './RButton.css';

export function RButton({
    IsDisabled,
    onClick,
    ButtonType = "button",
    ButtonHeight = "32px",
    ButtonWidth = "100px",
    ForeColor = "whitesmoke",
    BackgroundColor = "blue",
    children
}) {

    let compId = useId();

    return (
        <>
        <button id={compId} className="btn" disabled={IsDisabled}
                onClick={(e) => onClick(e)} type={ButtonType}
                style={{'height': ButtonHeight, 
                        'width': ButtonWidth,
                        'color':ForeColor,
                        'backgroundColor':BackgroundColor, 
                        'border': '1px solid '+BackgroundColor}}>
            {children}
        </button >
        </>
    );
}

RButton.propTypes = {
    IsDisabled: propTypes.bool,
    ButtonType: propTypes.string,
    ButtonHeight: propTypes.string,
    ButtonWidth: propTypes.string,
    ForeColor: propTypes.string,
    BackgroundColor: propTypes.string,
    onClick: propTypes.func.isRequired,
    children: propTypes.node
}
