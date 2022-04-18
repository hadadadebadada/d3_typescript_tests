import React, { useEffect, useRef, useState } from 'react';

import {select, Selection} from 'd3-selection'

import {scaleLinear, scaleBand} from 'd3-scale'
import { max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import 'd3-transition'
import { easeElastic } from 'd3-ease'

const initData = [
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

const App4: React.FC = () => {

  const svgRef = useRef<SVGSVGElement | null>(null)



  const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null);



  //put data into state

  const [data, setData] = useState(initData)

  const maxValue = max(data, data=> data.number) // gives max value from data // return value or undefined


  let y = scaleLinear()
/*   .domain([0,maxValue!]) // insert max value here
  .range([0,dimensions.chartHeight]) */

  .domain([0,maxValue!])
  .range([dimensions.chartHeight,0])

  //inkl. padding
  let x = scaleBand()
  .domain(data.map(data=>data.name))
  .range([0,dimensions.chartWidth]) //width of svg
  .paddingInner(0.05)




  //loading bars from data  
  useEffect(()=>{
    if(!selection){ //if selection not been set 
      setSelection(select(svgRef.current))
    }else{

        selection
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width',x.bandwidth)
        .attr('height',data => dimensions.height - y(data.number))
        .attr('x',data=> x(data.name)!)
        .attr('fill','orange') 
        .attr('y',data => y(data.number))
        




    }
  


  }, [selection]);
  

  /// add new bars
  useEffect(() => {
    if (selection) {
        /**
         * update the scales
         */
        x = scaleBand()
            .domain(data.map(d => d.name))
            .range([0, dimensions.width])
            .padding(0.05)
        y = scaleLinear()
            .domain([0, max(data, d => d.number)!])
            .range([dimensions.height, 0])

        /**
         * join the data
         */
        const rects = selection.selectAll('rect').data(data)
        /**
         * remove exit selection
         */
        rects.exit().remove()
        /**
         * update the current shapes in the DOM
         */
        rects
            .attr('x', d => x(d.name)!)
            .attr('y', d => y(d.number))
            .attr('width', x.bandwidth)
            .attr('height', d => dimensions.height - y(d.number))
            .attr('fill', 'orange')
        /**
         * append the enter selection shapes to the DOM
         */
        rects
            .enter()
            .append('rect')
            .attr('x', d => x(d.name)!)
            .attr('y', d => y(d.number))
            .attr('width', x.bandwidth)
            .attr('height', d => dimensions.height - y(d.number))
            .attr('fill', 'orange')
    }
}, [data])


  const addRandom = () => {
      let random = require('random-string-generator');
 
      console.log(random());  // 'qCCm2Yoyycjm' or others
      const dataToBeAdded = {
          name: random(),
          number: Math.floor(Math.random()*(800)+ 200)
      }

      setData([...data, dataToBeAdded])
  }

  const removeRandom = () => {

    if(data.length === 0){
        return
    }else
    {
        const slicedData = data.slice(0, data.length-1)
        setData(slicedData)
    }

  }

  return(
    <div>

<svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
</svg>
    

    <button onClick={addRandom}>add rand</button>
    <button onClick={removeRandom}>remove</button>


    </div>
  )
}

export default App4;
