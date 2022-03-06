<script>
    import {select, scaleLinear} from "d3";

    // import regions from './regions.js';
    // let svg = select("#legend");

    const sScale = scaleLinear()
    .domain([1, 2, 3, 4])
    .range([0.25, 1]);

    let data = [{value: 1, x: 50, y: 50},
                {value: 2, x: 50, y: 150},
                {value: 3, x: 50, y: 300},
                {value: 4, x: 50, y: 500}];

</script>

{#each data as {x, y, value}}
<g
    class="legend-container"
  transform="translate({sScale(value) * -50}, {sScale(value) * -50})">

    <g
    class="butterfly"
    transform="translate({x}, {y})">

    <use
        xlink:href="#butterfly-0"
        transform='scale({sScale(value)})'
        fill="grey"
    />
    </g>
</g>
{/each}

