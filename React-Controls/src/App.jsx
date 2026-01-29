
import { useEffect, useRef, useState } from 'react';
import './App.css'

import RButton  from './RButton/RButton'
import RDonutChart , { RDonutChartItem } from './RDonutChart/RDonutChart';
import RPieChart, { RPieChartItem } from './RPieChart/RPieChart';
import RScatterChart, { ScatterChartItem } from './RScatterChart/RScatterChart';
import { Graph } from './Models/models';
import RTextbox from './RTextbox/RTextbox';
import { useMemo } from 'react';
import RLineChart, { RLineChartItem } from './RLineChart/RLineChart';

function App() {

  const [chartItems, setChartItems] = useState([]);

  const [piechartItems, setPieChartItems] = useState([]);

  const [scatterChartItems, setScatterChartItems] = useState([]);

  const [lineChartItems, setLineChartItems] = useState([]);

  const [lineChartXAxisNames, setLineChartXAxisNames] = useState([]);

  const [ButtonHeight, setButtonHeight] = useState('40px');

  const bref = useRef();

  const [tValue, setTValue] = useState("");

  const handleClick = (e) => {
      let pieItem1 = new RDonutChartItem(24,'Batminton', 'darkgreen', 'white');
      setChartItems((prev)=> [...prev, pieItem1]);

      let pieItem2 = new RPieChartItem(24, 'Batminton', 'darkgreen', 'white');
      setPieChartItems((prev)=> [...prev, pieItem2]);

      setButtonHeight((prevState) => '40px');

      setTValue((prevState)=> "Hello World");

      console.log(bref.current.Id);
  }

  const CreateLineChartItems = () => {

    let item1 = new RLineChartItem("Soap", "teal", [25, 45, 12, 35, 18, 17, 40]);
    let item2 = new RLineChartItem("ToothPowder", "darkblue", [35, 75, 18, 45, 16, 27, 60]);
    let item3 = new RLineChartItem("Juice", "orangered", [15, 26, 38, 25, 46, 37, 70]);

    setLineChartItems((prev) => [item1, item2, item3]);
    setLineChartXAxisNames((prev) =>  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
  }

  const CreateDonutItems = () => {

    let pieItem1 = new RDonutChartItem(24,'Cricket', 'grey', 'white');
    let pieItem2 = new RDonutChartItem(35,'Volleyball', 'purple', 'white');
    let pieItem3 = new RDonutChartItem(12,'Tennis', 'gray', 'white');
    let pieItem4 = new RDonutChartItem(44,'BaseBall', 'teal', 'white');
    let pieItem5 = new RDonutChartItem(14,'Hockey', 'darkblue', 'white');
    let pieItem6 = new RDonutChartItem(44,'Football', '#13297A', 'white');
    
    setChartItems((prev)=>[]);

    let donutItems = [];
    
    donutItems.push(pieItem1);
    donutItems.push(pieItem2);
    donutItems.push(pieItem3);
    donutItems.push(pieItem4);
    donutItems.push(pieItem5);
    donutItems.push(pieItem6);

    setChartItems((prev)=> [...prev, ...donutItems]);
  }

  const CreatePieChartItems = () => {

    let pieItem1 = new RPieChartItem(24,'Cricket', 'grey', 'white');
    let pieItem2 = new RPieChartItem(35,'Volleyball', 'purple', 'white');
    let pieItem3 = new RPieChartItem(12,'Tennis', 'gray', 'white');
    let pieItem4 = new RPieChartItem(44,'BaseBall', 'teal', 'white');
    let pieItem5 = new RPieChartItem(14,'Hockey', 'darkblue', 'white');
    let pieItem6 = new RPieChartItem(44,'Football', '#13297A', 'white');
    
    setPieChartItems((prev)=>[]);

    let pieItems = [];
    
    pieItems.push(pieItem1);
    pieItems.push(pieItem2);
    pieItems.push(pieItem3);
    pieItems.push(pieItem4);
    pieItems.push(pieItem5);
    pieItems.push(pieItem6);

    setPieChartItems((prev)=> [...prev, ...pieItems]);
  }

  const CreateScatterChart = () => {
    
    let item1 = new ScatterChartItem("City 1", 'blue', [
       new Graph(2,8), new Graph(15,35), new Graph(20,65), new Graph(14, 30)
      ,new Graph(30,63), new Graph(35,78), new Graph(24,53), new Graph(26, 56)
      ,new Graph(20,42), new Graph(14,31), new Graph(34,75), new Graph(48, 72)
    ]);
    
    let item2 = new ScatterChartItem("City 2", "red", [
      new Graph(15,40), new Graph(18,55), new Graph(20,58)
      ,new Graph(45,83), new Graph(28,48), new Graph(44,83), new Graph(16, 26)
      ,new Graph(60,62), new Graph(64,61), new Graph(54,75), new Graph(68, 72)
    ]);

    let item3 = new ScatterChartItem("City 3", 'teal', [
      new Graph(14,35), new Graph(25,45), new Graph(40,85)
      ,new Graph(40,63), new Graph(55,78), new Graph(54,53), new Graph(66, 56)
      ,new Graph(20,32), new Graph(14,41), new Graph(34,75), new Graph(68, 72)
    ]);    

    setScatterChartItems((prevState)=>[item1, item2, item3]);

  }

  const UpdateValue = (e) => {
    setTValue((prevState)=> e);
  }

  useEffect(()=>{
    CreateDonutItems();
    CreatePieChartItems();
    CreateScatterChart();
    CreateLineChartItems();
  }, []);

  return (
      <>
        <RTextbox TextboxValue={tValue} ValueChanged={UpdateValue}></RTextbox>
        &nbsp;

        <RTextbox TextboxValue={tValue} ValueChanged={UpdateValue}></RTextbox>
        &nbsp;
        
        <RButton Style={{marginTop:'3px'}} ref={bref} ButtonHeight={ButtonHeight} IsDisabled={false} onClick={handleClick}>Submit</RButton>
        
        <br />
        <br />
        
        <RDonutChart DataListHeight={100} ChartWidth={300} ShadowColor={'blue'} ChartItems={chartItems} Opacity={'0.8'}></RDonutChart>

        <RPieChart DataListHeight={100} ChartWidth={300} ShadowColor={'blue'} ChartItems={piechartItems} Opacity={'0.8'}></RPieChart>

        <RScatterChart XAxisTitle={'Age'} YAxisTitle={'Weight'} ChartItems={scatterChartItems} Width={400} Height={400}></RScatterChart>

        <RLineChart XAxisTitle={'Day'} YAxisTitle={'Price'} ChartItems={lineChartItems} Width={400} Height={400} XAxisItemNames={lineChartXAxisNames}></RLineChart>

      </>
  )
}

export default App
