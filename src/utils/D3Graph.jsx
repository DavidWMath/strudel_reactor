import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { eventNames } from "npm";
import { useEffect, useRef, useState } from "react";


function GetD3Data(data){
    let EmptyArr = []
    for(let i = 0; i < data.length; i++){
        const match = data[i].match(/hcutoff:([0-9.]+)/);
        const match2 = parseFloat(match); //convert to directly nums
        EmptyArr.push(match2);
    }
    return EmptyArr; //Arr should be filled with the extracted hcutoffs

    //I reckon i may pass the emptyarr to barchart as the "dataset"
}



function BarChart(dataSet){
    useEffect(() => { //Runs on every render.
        //Selecting the element
        const svg = d3.select('svg');

        //determine the size of the element
        let width = svg.node().getBoundingClientRect().width;
        let height = svg.node().getBoundingClientRect().height;

        const chartMargins = {
            left: 40,
            right: 25,
            top: 25, 
            bottom: 80
        };

        width = width - (chartMargins.left + chartMargins.right);
        height = height - (chartMargins.top + chartMargins.bottom);

        //Set the hiehgt and width of the attribute.
        svg.attr("width", width).attr("height", height);
        svg.selectAll("*").remove(); //clear all previously may need to muck around with this later


        

        //set bar margins/height
        let totalItemRange = d3.extent(dataSet, (d,i) => d.totalItems);
        let maxTotalItems = totalItemRange[1];

        console.log(maxTotalItems);

        const barMargin = 10;
        const barWidth = w/dataSet.length;  

        let yScale = d3.scaleLinear()
            .domain([0, maxTotalItems])
            .range([h, 0]);

        let monthArray = Array.from(dataSet, (d,i) => d.monthName);
        console.log(monthArray);

        let xScale = d3.scaleBand()
            .domain(monthArray)
            .range([0,w])
            .paddingInner(0.1)

        const chartGroup = svg.append('g')
            .classed('chartGroup', true)
            .attr('transform', `translate(${chartMargins.left},${chartMargins.top})`);
        
        let barGroups = svg
            .selectAll('g')
            .data(dataSet);
        
        var newBarGroups = barGroups.enter()
            .append('g')
            .attr('transform', (d,i) => {
                return `transform(${xScale(d.monthName)}, ${yScale(d.totalItems)})`;
            });

        newBarGroups
            .append('rect')
            .attr('x', 0)
            .attr('height', 0)
            .attr('y', (d,i) => { return h - yScale(d.totalItems);})
            .attr('width', xScale.bandWidth())
            .style('fill', 'transparent')
            .transition().duration((d,i) => i * 500)
            .delay((d,i) => i + 200)
            .attr('y', 0)
            .attr('height', (d,i) => {return h - yScale(d.totalItems);})
            .style("fill", (d,i) => { return `rgb(20, 20, ${i * 15 + 80})`})
            
        
        newBarGroups
            .append("text")
            .attr("text-anchor", "middle")
            .attr('x', (d, i) => { return xScale.bandWidth() / 2;})
            .attr('y', 20)
            .attr('fill', 'white')
            .style('font-size', '1em')
            .text((d,i) => d.totalItems.toLocaleString());


        let yAxis = d3.axisLeft(yScale);
        chartGroup.append('g')
            .classed('axis y', true)
            .call(yAxis);
        
        let xAxis = d3.axisBottom(xScale);
        chartGroup.append('g')
            .attr('transform', `translate(0,${h})`)
            .classed('axis x', true)
            .call(xAxis);

        chartGroup.selectAll('.axis.x text')
            .attr("transform", "rotate(-70)")
            .attr("dx", "-0.8em")
            .attr("dy", "0.25em")
            .style("text-anchor", "end")
            .style("font-size", "0.9em");

    });
}

const handleD3Data = (event) => {
    console.log(event.detail);
};
