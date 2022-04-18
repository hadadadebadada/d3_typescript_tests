import React, { useRef, useState, useEffect } from 'react'
import { select, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { easeElastic } from 'd3-ease'

import { select as d3Select } from 'd3-selection';
import { transition as d3Transition } from 'd3-transition';
d3Select.prototype.transition = d3Transition;

let initialData = [
    {
        name: 'foo',
        units: 32,
    },
    {
        name: 'bar',
        units: 67,
    },
    {
        name: 'baz',
        units: 81,
    },
    {
        name: 'hoge',
        units: 38,
    },
    {
        name: 'piyo',
        units: 28,
    },
    {
        name: 'hogera',
        units: 59,
    },
]
const App: React.FC = () => {
    const dimensions = { width: 800, height: 500 }
    const svgRef = useRef<SVGSVGElement | null>(null)
    const [data, setData] = useState(initialData)
    const [name, setName] = useState('')
    const [unit, setUnit] = useState('')

    let x = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, dimensions.width])
        .padding(0.05)

    let y = scaleLinear()
        .domain([0, max(data, d => d.units)!])
        .range([dimensions.height, 0])

    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)

    useEffect(() => {
        if (!selection) {
            setSelection(select(svgRef.current))
        } else {
            selection
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', d => x(d.name)!)
                .attr('y', dimensions.height)
                .attr('width', x.bandwidth)
                .attr('fill', 'orange')
                .attr('height', 0)
                /**
                 * Transitions work similar to CSS Transitions
                 * From an inital point, to the conlcuded point
                 * in which you set the duration, and the ease
                 * and a delay if you'd like
                 */
                .transition()
                .delay(2000)

                .duration(20000)
                .delay((_, i) => i * 100)
                .ease(easeElastic)
                .attr('height', d => dimensions.height - y(d.units))
                .attr('y', d => y(d.units))
                .attr('fill', 'blue')

        }
    }, [selection])

    useEffect(() => {
        if (selection) {
            x = scaleBand()
                .domain(data.map(d => d.name))
                .range([0, dimensions.width])
                .padding(0.05)
            y = scaleLinear()
                .domain([0, max(data, d => d.units)!])
                .range([dimensions.height, 0])

            const rects = selection.selectAll('rect').data(data)

            rects
                .exit()
                .transition()
                .ease(easeElastic)
                .duration(400)
                .attr('height', 0)
                .attr('y', dimensions.height)
                .remove()

            /**
             * a delay is added here to aid the transition
             * of removing and adding elements
             * otherwise, it will shift all elements
             * before the add/remove transitions are finished
             */
            rects
                .transition()
                .delay(300)
                .attr('x', d => x(d.name)!)
                .attr('y', d => y(d.units))
                .attr('width', x.bandwidth)
                .attr('height', d => dimensions.height - y(d.units))
                .attr('fill', 'orange')

            rects
                .enter()
                .append('rect')
                .attr('x', d => x(d.name)!)
                .attr('width', x.bandwidth)
                .attr('height', 0)
                .attr('y', dimensions.height)
                .attr('fill', 'orange')

                .transition()
                .delay(1000)
                .duration(5000)
                .ease(easeElastic)
                .attr('height', d => dimensions.height - y(d.units))
                .attr('y', d => y(d.units))
                .attr('fill', 'blue')
        }
    }, [data])

    /**
     * functions to help add and remove elements to show transitions
     */
    const addData = () => {
        let random = require('random-string-generator');

        const dataToAdd = {
            name: random(),
            units: Math.round(Math.random() * 80 + 20),
        }
        setData([...data, dataToAdd])
    }

    const removeData = () => {
        if (data.length === 0) {
            return
        }
        setData([...data.slice(0, data.length - 1)])
    }

    return (
        <>
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
            />
            <button onClick={addData}>Add Data</button>
            <button onClick={removeData}>Remove Data</button>
        </>
    )
}

export default App
