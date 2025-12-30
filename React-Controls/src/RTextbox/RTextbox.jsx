import React, { ChangeEvent, forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from "react";

import PropTypes from 'prop-types'

import './RTextbox.css';

const RTextbox = forwardRef(function RTextbox({
    Style,
    LabelText = "",
    PlaceholderText = "",
    LabelForeColor = "blue",
    BottomLineColor = "blue",
    ReadOnly = false,
    Disabled = false,
    TextBoxWidth = "200px",
    TextBoxHeight = "30px",
    Font = "",
    EnableMarginTextBottom = true,
    MarginTextBottom = "10px",
    IsPasswordBox = false,
    TextboxValue = '',
    ValueChanged =  (e) => { },
    Click =  (e) => {},
    Focus = (e) => {},
    Blur = (e) => {},
    Cut = (e) => {},
    Copy = (e) => {},
    Paste = (e) => {},
    KeyDown = (e) => {},
    KeyUp = (e) => {},
    KeyPress = (e) => {},
    MouseEnter = (e) => {},
    MouseDown = (e) => {},
    MouseUp = (e) => {},
    MouseLeave = (e) => {},
    MouseMove = (e) => {},
    MouseOut = (e) =>  {},
    MouseOver = (e) => {},
    DblClick = (e) => {},
    Drag = (e) => {},
    DragEnd = (e) => {},
    DragEnter = (e) => {},
    DragLeave = (e) => {},
    DragOver = (e) => {},
    DragStart = (e) => {},
    Drop = (e) => {},
    Input = (e) => {},
    Change = (e) => {}
}, ref) {

    let HostElementId = useId();
    let Id = useId();

    const [tValue, setTValue] = useState("");
    const inpRef = useRef();

    useEffect(() => {
        setTValue((prevState)=> TextboxValue);
    }, [TextboxValue]);

    useImperativeHandle(ref, () => ({
        Id: Id,
        HostElementId: HostElementId,
        InputElement: inpRef.current,
        Value: tValue
    }));

    const textBoxValueChange = (e) => {
        Change(e);
        const { value }  = e.target;
        setTValue((prevState)=> value);
        ValueChanged(value);
    }

    return (
        <>
        <div id={HostElementId} className="host" style={Style}>
            <div id={Id} className="txtroot">

                <span className="span" style={{ width: TextBoxWidth, color: LabelForeColor}}> 
                    {LabelText}
                </span>
                
                <input ref={inpRef}  readOnly={ReadOnly}  
                        disabled={Disabled}
                        type={IsPasswordBox ? 'password' : 'text'}
                        value={tValue} className="txtbox" 
                
                        style={{ height: TextBoxHeight, 
                                width: TextBoxWidth,
                                borderBottomColor: BottomLineColor,       
                                marginBottom: EnableMarginTextBottom ? MarginTextBottom : '', 
                                font: Font, 
                                pointerEvents:(Disabled || ReadOnly) ? 'none': undefined
                            }}

                    onInput={(e)=> Input(e)} 

                    onDrag={(e) => Drag(e)}  onDragEnd={(e) => DragEnd(e)} 
                    onDragEnter={(e)=> DragEnter(e)} onDragLeave={(e) => DragLeave(e)}
                    onDragOver={(e) => DragOver(e)} onDragStart={(e) => DragStart(e)}
                    onDrop={(e) => Drop(e)}
                    
                    onClick={(e)=> Click(e)} onDoubleClick={(e)=> DblClick(e)}
                    onBlur={(e)=>Blur(e)} onFocus={(e)=> Focus(e)}
                    
                    onCut={(e)=> Cut(e)} onCopy={(e)=>Copy(e)} onPaste={(e)=> Paste(e)}

                    onKeyDown={(e)=> KeyDown(e)} onKeyUp={(e)=> KeyUp(e)} onKeyPress={(e)=>KeyPress(e)}
                    
                    onMouseDown={(e)=> MouseDown(e)} onMouseEnter={(e)=>MouseEnter(e)} onMouseUp={(e)=> MouseUp(e)}
                    onMouseLeave={(e)=>MouseLeave(e)} onMouseMove={(e)=>MouseMove(e)}
                    onMouseOut={(e)=>MouseOut(e)} onMouseOver={(e)=>MouseOver(e)}
                    
                    placeholder={PlaceholderText}
                    onChange={(e)=> textBoxValueChange(e)}
                    />     

            </div>
        </div>
        </>
    );

});

 RTextbox.propTypes = {
    Style: PropTypes.object,
    LabelText: PropTypes.string,
    PlaceholderText: PropTypes.string,
    LabelForeColor: PropTypes.string,
    BottomLineColor: PropTypes.string,
    ReadOnly: PropTypes.bool,
    Disabled: PropTypes.bool,
    TextBoxWidth: PropTypes.string,
    TextBoxHeight: PropTypes.string,
    Font: PropTypes.string,
    EnableMarginTextBottom: PropTypes.bool,
    MarginTextBottom: PropTypes.string,
    IsPasswordBox: PropTypes.bool,
    TextboxValue: PropTypes.string,
    ValueChanged: PropTypes.func,
    Click: PropTypes.func,
    Focus: PropTypes.func,
    Blur: PropTypes.func,
    Cut: PropTypes.func,
    Copy: PropTypes.func,
    Paste: PropTypes.func,
    KeyDown: PropTypes.func,
    KeyUp: PropTypes.func,
    KeyPress: PropTypes.func,
    MouseEnter: PropTypes.func,
    MouseDown: PropTypes.func,
    MouseUp: PropTypes.func,
    MouseLeave: PropTypes.func,
    MouseMove: PropTypes.func,
    MouseOut: PropTypes.func,
    MouseOver: PropTypes.func,
    DblClick: PropTypes.func,
    Drag: PropTypes.func,
    DragEnd: PropTypes.func,
    DragEnter: PropTypes.func,
    DragLeave: PropTypes.func,
    DragOver: PropTypes.func,
    DragStart: PropTypes.func,
    Drop: PropTypes.func,
    Input: PropTypes.func,
    Change: PropTypes.func
};


export default RTextbox;