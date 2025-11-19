import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { useEffect, useRef, useState } from "react";
import { subscribe, unsubscribe } from '../console-monkey-patch'; //ALLOWS ME TO GET THE DATA



function GetD3Data(data){
    let EmptyArr = []
    for(let i = 0; i < data.length; i++){
        const match = data[i].match(/cutoff:([0-9.]+)/);
        let match2 = null;
        if(match){
            match2 = parseFloat(match[1]);
        }
        if(match2 != null){
            EmptyArr.push(match2);
        }
        

    }
    return EmptyArr; //Arr should be filled with the extracted hcutoffs

}



export function BarChart(){
    useEffect(() => { //Runs on every render.
        const handleD3Data = (event) => {
            const logLines = event.detail; //this gets the event details, aka the log data.
            const hcutoffsInArray = GetD3Data(logLines); //Gets all the hcutoffs in an array
                    
            //Selecting the element
            const svg = d3.select('svg');

            //determine the size of the element
            let width = svg.node().getBoundingClientRect().width;
            let height = svg.node().getBoundingClientRect().height;

            //Set the hiehgt and width of the attribute.
            svg.attr("width", width).attr("height", height);
            svg.selectAll("*").remove(); //clear all previously may need to muck around with this later

            let yScale = d3.scaleLinear()
                .domain([0, d3.max(hcutoffsInArray)])
                .range([height, 0]);

            let xScale = d3.scaleBand()
                .domain(hcutoffsInArray.map((_, i) => i))
                .range([0, width])
                .paddingInner(0.1);

 
            svg.selectAll('rect')
                .data(hcutoffsInArray)
                .enter()
                .append('rect')
                .attr('x', (_, i) => xScale(i))
                .attr('y', d => yScale(d))
                .attr('width', xScale.bandwidth())
                .attr('height', d => height - yScale(d))
                .attr('fill', 'steelblue');

            svg.append('g')
                .call(d3.axisLeft(yScale));
                    
            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(xScale));
        };

        subscribe("d3Data", handleD3Data);
        return () => unsubscribe("d3Data", handleD3Data);
 
        
    }, []); //runs once

     return (
        <div style={{ marginTop: "20px" }}>
            <h3>CutOff Bar Chart</h3>
            <svg style={{ width: "100%", height: "300px" }}></svg>
        </div>
    );
}


