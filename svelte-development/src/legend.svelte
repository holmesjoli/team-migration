<script>
    import { select} from "d3";
    let svg = select("#legend");

    let data = [{id: 1},
                {id: 2},
                {id: 3},
                {id: 4}];

    console.log(data);

    svg.selectAll("circles")
        .data(data)
        .enter()
        .append("circles")
            .attr("cx", 100)
            .attr("cy", 100)
            .attr("5", 50);

</script>

