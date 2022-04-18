import React, { useEffect, useRef } from 'react';

import {select, selectAll} from 'd3-selection'

const App1: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(()=>{
    //console.log(select(svgRef.current))
    console.log(    selectAll('rect')    )

    selectAll('rect')
    .attr('width',100)
    .attr('height',100)
    .attr('fill','blue')
    .attr('x',(_,i)=>i*100)


    /* in selectAll ==> ID selector ==> #foo || className selector ==> .foo */

/*         select(svgRef.current)
    .append('rect')
    .attr('width',100) //first name of attr, then value
    .attr('height',100)
    .attr('fill','blue') */
  })

  return(
    <div>
      <svg ref={svgRef}>
    

      <rect></rect>
      <rect></rect>
      <rect></rect>
      <rect></rect>
      <rect></rect>

      </svg>


    </div>
  )
}

export default App1;
