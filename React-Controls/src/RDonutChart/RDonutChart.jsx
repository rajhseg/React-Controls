import { useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";

import './RDonutChart.css';

export class RDonutChartItem {
  constructor(
     Value,
     Title,
     BackgroundColor,
     ForeColor) {
    this.Value = Value;
    this.Title = Title;
    this.BackgroundColor = BackgroundColor;
    this.ForeColor = ForeColor;
  }
}

class RRenderDonutChartItem extends RDonutChartItem {
   
   Percentage = 0;

   constructor(value, title, backgroundColor, forecolor){
    super(value, title, backgroundColor, forecolor);
   }

  ConvertToRenderItem(item) {
    this.Value = item.Value;
    this.Title = item.Title;
    this.BackgroundColor = item.BackgroundColor;
    this.ForeColor = item.ForeColor;
  }

  ConverToItem() {
    return new RDonutChartItem(this.Value, this.Title, this.BackgroundColor, this.ForeColor);
  }
}

export function RDonutChart({
    FontSize = 10,
    TextForeColor = 'white',
    RotateTextToInlineAngle = false,
    ShowTextOnTopOfChartItem = true,
    MoveTextUpwardsFromCenterInPx = 0,
    ChartWidth = 200,
    DataListHeight = 100,
    ShadowColor = 'blue',
    ShadowBlur = 10,
    Opacity = '1',
    ChartItems = []
}){

    const [IsRendered, setIsRendered] = useState(false);
    const [RenderItems, setRenderItems] = useState([]);

    let _lineWidth = 0;
    
    let context = null;
  
    const Id = useId();

    const HostElementId = useId();

    const progressCanvas = useRef();

    const LineWidth = () => {
        _lineWidth = (ChartWidth / 3) - 12;
        return _lineWidth;
    }

    useEffect(()=>{
        
        setRenderItems((prevState) => []);
        let _itms = [];

        if (ChartItems) {
            for (let index = 0; index < ChartItems.length; index++) {
                const element = ChartItems[index];
                let itm = new RRenderDonutChartItem(element.Value, element.Title, element.BackgroundColor, element.ForeColor);
               _itms.push(itm);
            }

            setRenderItems((prevState)=> [...prevState, ..._itms]);
            
         }

    }, [
        ChartItems,
        FontSize,
        TextForeColor,
        RotateTextToInlineAngle,
        ShowTextOnTopOfChartItem,
        MoveTextUpwardsFromCenterInPx,
        ChartWidth,
        DataListHeight,
        ShadowColor,
        ShadowBlur,
        Opacity    
    ]);

    useEffect(()=>{

        context = progressCanvas.current.getContext('2d');
        RenderChart();   

    }, [RenderItems])

    const Items = () => {
        return RenderItems.map(x => x.ConverToItem());
    }

    const GetXYForText = (x, y, length, angle) => {
        let x2 = x + length * Math.cos(angle);
        let y2 = y + length * Math.sin(angle);
        return { X: x2, Y: y2 };
    }

    const DrawText = (context, x, y, length, angle, color) => {
        let rad = (angle * Math.PI) / 180;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + length * rad, y + length * rad);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }

    const RenderChart = () => {

        setIsRendered((prevState) => false);

        if (progressCanvas && context && RenderItems.length > 0) {

            context.clearRect(0, 0, progressCanvas.current.width, progressCanvas.current.height);
            
            let x = ChartWidth / 2;
            let y = ChartWidth / 2;
            let radiusLength = (ChartWidth / 3) + (LineWidth() / 2);

            let totalValues = RenderItems.map(x => x.Value);
            let TotalCount = 0;

            for (let index = 0; index < totalValues.length; index++) {
                const element = totalValues[index];
                TotalCount = TotalCount + element;
            }

            let start = 0 * Math.PI / 180;
            let previousAngle = start;

            for (let index = 0; index < RenderItems.length; index++) {
                const element = RenderItems[index];

                let percentage = (element.Value * 100) / TotalCount;
                let end1 = (percentage / 100) * 359.98 * (Math.PI / 180);

                element.Percentage = percentage;
                context.fillStyle = element.BackgroundColor;
                context?.beginPath();
                context.lineWidth = LineWidth();

                context?.arc(x, y, ChartWidth / 3, previousAngle, (previousAngle + end1), false);
                context.strokeStyle = element.BackgroundColor;

                context.shadowBlur = ShadowBlur;
                context.shadowColor = ShadowColor;
                context?.stroke();
                context.closePath();

                if (ShowTextOnTopOfChartItem) {
                let endAngle = previousAngle + end1;
                let avgAngle = (previousAngle + (endAngle > previousAngle ? endAngle : endAngle + ((Math.PI * 359.58) / 180))) / 2;

                let metrics = context.measureText(element.Title);
                let textRadiusLength = radiusLength - metrics.width - 5 + MoveTextUpwardsFromCenterInPx;

                let pos = GetXYForText(x, y, textRadiusLength, avgAngle);

                context.beginPath();

                context.save();
                context.textAlign = "center";
                context.textBaseline = "middle";

                context.translate(pos.X, pos.Y);

                if (RotateTextToInlineAngle) {
                    context.rotate(avgAngle);
                } else {
                    context.rotate(Math.PI / 2);
                }

                context.font = FontSize + 'px verdana';
                context.fillStyle = TextForeColor;
                context.fillText(element.Title, 0, 0);

                context.stroke();
                context.restore();
                context.closePath();

                }

                previousAngle = previousAngle + end1;
            }

            progressCanvas.current.style.transform = "rotate(-90deg)";
            progressCanvas.current.style.opacity = Opacity;
        
            setIsRendered((prevState) => true);
    
        }
    }


    return (
        <>
        <div id={HostElementId} className="host">
            <div id={Id} style={{position: 'relative', width: (ChartWidth+'px'), height: ((ChartWidth + DataListHeight) +'px') }}>
                <canvas style={{position: 'absolute'}} ref={progressCanvas} width={ChartWidth} height={ChartWidth} 
                    className="canvasCenter">

                </canvas>    
                {
                    IsRendered  &&
                        <div style={{position: 'relative', bottom:-ChartWidth+'px', height: DataListHeight+'px' }}>
                            <div className="dataContainer">
                                {
                                    RenderItems.map((itm, index) => (
                                        <div className="data" key={index}>
                                            <div className="indicator" style={{backgroundColor: itm.BackgroundColor}}>                    
                                            </div>
                                            <span className="title" style={{width: '50px'}}>{itm.Title}</span>
                                            <span className="title" style={{width: '30px'}}>({itm.Value})</span>
                                        </div>
                                    ))
                                }
                                
                            </div>        
                        </div>
                }
            </div>
        </div>
        </>
    );
}

RDonutChart.propTypes = {
    FontSize: PropTypes.number,
    TextForeColor: PropTypes.string,
    RotateTextToInlineAngle: PropTypes.bool,
    ShowTextOnTopOfChartItem: PropTypes.bool,
    MoveTextUpwardsFromCenterInPx: PropTypes.number,
    ChartWidth: PropTypes.number.isRequired,
    DataListHeight: PropTypes.number,
    ShadowColor: PropTypes.string,
    ShadowBlur: PropTypes.number,
    Opacity: PropTypes.string,
    ChartItems: PropTypes.arrayOf(PropTypes.shape(
        {
            Value: PropTypes.number.isRequired,
            Title: PropTypes.string.isRequired,
            BackgroundColor: PropTypes.string.isRequired,
            ForeColor: PropTypes.string.isRequired
        }
    )).isRequired
}