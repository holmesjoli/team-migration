import { scaleSqrt } from 'd3';

//Title size scale
export function sScale() {

    const sScale =  scaleSqrt()
        .domain([5E5, 1E6, 5E6, 1E7])
        .range([.15, .4]);

    return sScale;
}
