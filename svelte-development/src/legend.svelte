<script>
    import {select, scaleOrdinal} from "d3";
    // import {sScale} from './helper.js';
    
    export let totalMigrants;

    const sScale = scaleOrdinal()
        .domain(["< 1 million", "< 2 million", "< 5 million", "> 5 million"])
        .range([.2, .4, 1, 2]);

    let data = [{value: "< 1 million", x: 100, y: 50},
                {value: "< 2 million", x: 100, y: 150},
                {value: "< 5 million", x: 100, y: 300},
                {value: "> 5 million", x: 100, y: 500}];

</script>

{#each data as {x, y, value}}
<g
    class="legend-container"
  transform="translate({sScale(value) * -50}, {sScale(value) * -50})">

    <g
    class="butterfly"
    transform="translate({x}, {y})">
    <text class="label" transform="translate({x}, {y} - 100)">{value}
    </text>

    <use
        xlink:href="#butterfly-0"
        transform='scale({sScale(value)})'
        fill="grey"
    />
    </g>
</g>
{/each}

