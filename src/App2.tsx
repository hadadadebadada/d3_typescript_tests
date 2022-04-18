import React, { useEffect, useRef, useState } from 'react';

import {select, selectAll, Selection} from 'd3-selection'


/* mock data */

// data for one
//const data = [{width:200, height:200, color:'orange'}]

const data =[
  {
  units:50,
  color:'purple'
},
{
  units:100,
  color:'red'
},
{
  units:200,
  color:'blue'
},
{
  units:100,
  color:'teal'
},
{
  units:50,
  color:'orange'
},
]

const App2: React.FC = () => {

  const svgRef = useRef(null)

  const [selection, setSelection] = useState<null | Selection<null, unknown, null, undefined>>(null);

  useEffect(()=>{
    if(!selection){
      setSelection(select(svgRef.current));
    } else{

      //select all
      const rects = selection.selectAll('rect')
      .data(data)
      .attr('width',100)
      .attr('height',d=>d.units)
      .attr('fill',d=>d.color)
      .attr('x',(_,i)=>i*100)


      console.log(rects)


      //rects which didnt enter the DOM yet
      rects
      .enter()
      .append('rect')
      .attr('width',100)
      .attr('height',d=>d.units)
      .attr('fill',d=>d.color)
      .attr('x',(_,i)=>i*100)

      //select one
     /*  selection.data(data)
      .append('rect')
      .attr('width', d=>d.width)
      .attr('height', d=>d.height)
      .attr('fill',d=>d.color) */

      ///hard coded
/*       .append('rect')
      .attr('height',100)
      .attr('width',100)
      .attr('fill','red') */
    }



  }, [selection]);

  return(
    <div>
      <svg ref={svgRef} width={600} height={600}>

        <rect>

        </rect>
    

        <rect>
          
        </rect>
    
        <rect>
          
        </rect>
    


      </svg>


    </div>
  )
}

export default App2;
