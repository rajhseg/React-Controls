import propTypes from "prop-types";
import { forwardRef, useId, useImperativeHandle, useRef } from "react";

import './RButton.css';

const RButton = forwardRef(function RButton({
    IsDisabled,
    onClick,
    ButtonType = "button",
    ButtonHeight = "32px",
    ButtonWidth = "100px",
    ForeColor = "whitesmoke",
    BackgroundColor = "blue",
    children
}, ref) {

    let bRef = useRef();
    let compId = useId();

    useImperativeHandle(ref, () => ({
        Id: compId,
        HostElementId: '',
        Click(){  
            bRef?.current?.click();
        }
    }));

    return (
        <>
        <div className="host">
        <button ref={bRef} id={compId} className="btn" disabled={IsDisabled}
                onClick={(e) => onClick(e)} type={ButtonType}
                style={{'height': ButtonHeight, 
                        'width': ButtonWidth,
                        'color':ForeColor,
                        'backgroundColor':BackgroundColor, 
                        'border': '1px solid '+BackgroundColor}}>
            {children}
        </button >
        </div>
        </>
    );
});

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

export default RButton;
