import { scaleOrdinal } from 'd3';

export function sScale() {

    const sScale = scaleOrdinal()
        .domain(["< 1 million", "< 2 million", "< 5 million", "> 5 million"])
        .range([1, 2, 5, 10]);

    return sScale;
}
