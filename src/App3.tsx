import React, { useEffect, useRef, useState } from 'react';

import {select, Selection} from 'd3-selection'
import {scaleLinear, scaleBand} from 'd3-scale'
import { max } from 'd3-array';

import { axisLeft, axisBottom } from 'd3-axis';
//scales 

//mock data

const data = [
  {
    name: 'foo',
    number: 1000,
  },
  {
    name: 'bar',
    number: 1123,
  },
  {
    name: 'baz',
    number: 4120,
  },
  {
    name: 'laz',
    number: 1232,
  },
  {
    name: 'das',
    number: 3133,
  },
  {
    name: 'was',
    number: 5423,
  },

  

]

const dimensions = {
  width: 800,
  height: 500,
  chartWidth: 700,
  chartHeight: 400,
  marginLeft: 100
}


const App3: React.FC = () => {

  const svgRef = useRef(null)

  const [selection, setSelection] = useState<null | Selection<null, unknown, null, undefined>>(null);


  const maxValue = max(data, data=> data.number) // gives max value from data // return value or undefined


  const y = scaleLinear()
  .domain([0,maxValue!]) // insert max value here
  .range([0,dimensions.chartHeight])


  //inkl. padding
  const x = scaleBand()
  .domain(data.map(data=>data.name))
  .range([0,dimensions.chartWidth]) //width of svg
  //.paddingOuter(0.6)



  const yAxis = axisLeft(y).ticks(4).tickFormat(d=>`$${d}`)
  const xAxis = axisBottom(x)

  useEffect(()=>{
    if(!selection){
      setSelection(select(svgRef.current))
    }else{
/*       console.log(y(0))
      console.log(y(12312))
      console.log(y(11232)) */


       const xAxisGroup = selection
      .append('g')
      .attr('transform',`translate(${dimensions.marginLeft},${dimensions.chartHeight})`)
      .call(xAxis);

     const yAxisGroup = selection
  
      .append('g')
      .attr('transform',`translate(${dimensions.marginLeft},0)`)

      .call(yAxis);
      
/*       selection
      .append('rect')
      .attr('width',dimensions.width)
      .attr('height',dimensions.height)
      .attr('fill','blue')
 */


      selection
      .append('g') 

      //like css
      .attr('transform',`translate(${dimensions.marginLeft},0)`)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
     // .attr('width',100)
      .attr('width',x.bandwidth)
      //.attr('x',(_,i)=>i*100)

/*       .attr('x',data=>{
        const xValue = x(data.name)
        if(xValue){
          return xValue
        }
        return null
      }) */

    .attr('x', data=>x(data.name)!) // typescript bang ! 
      .attr('fill','orange')
      .attr('height', data => y(data.number))


    }
  


  }, [selection]);

  return(
    <div>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>

        {/* group element with g */}


{/*           <g>
            <rect></rect>
            <rect></rect>
            <rect></rect>
            <rect></rect>


          </g>
      */}

      </svg>


    </div>
  )
}

export default App3;
