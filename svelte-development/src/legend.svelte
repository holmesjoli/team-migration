<script>
    import {select, scaleSqrt, scaleOrdinal} from "d3";

    export let width;
    console.log(width);
    // export let height;

    const sScale =  scaleSqrt()
        .domain([5E5, 1E6, 5E6, 1E7])
        .range([.05, .3]);

    let data = [{value: 5E5, text: "< 500,000", x: width/2, y: 50},
                {value: 1E6, text: "< 1 million", x: width/2, y: 100},
                {value: 5E6, text: "< 5 million", x: width/2, y: 175},
                {value: 1E7, text: "> 5 million", x: width/2, y: 325}];

        //         svg.append("g")
        // .attr("transform", `translate(${width / 2},${height / 2})`)

</script>

{#if width !== undefined}

    {#each data as {x, y, value, text}}
    <g
        class="legend-container"
        transform="translate({sScale(value)}, {sScale(value)})">

        <g
        class="butterfly"
        transform="translate({x}, {y})"
        text-anchor= "middle">
        <text class="label">{text}</text>

        <use
            xlink:href="#butterfly-0"
            transform='scale({sScale(value)})'
            fill="grey"
        />
        </g>
    </g>
    {/each}
{/if}

<style>

</style>

<!-- .attr("transform", `translate(${width / 2},${height / 2})`) -->