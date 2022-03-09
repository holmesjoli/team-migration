import { scaleSqrt, scaleOrdinal } from 'd3';

//Title size scale
export function sScale() {

    const sScale =  scaleSqrt()
        .domain([5E5, 1E6, 5E6, 1E7])
        .range([.15, .4]);

    return sScale;
}

// Title Unique Array
// Returns the unique values of a variable in a dataset as an array
export function uniqueArray(data, variable) {
    let all = data.map(function (d) {
        return d[variable];
    });

    return [...new Set(all)];
}

// Title Region Color
// Param region object containing a mapping between region and color
export function regionColor(regions) {

    let reg = uniqueArray(regions, "name");
    let color = uniqueArray(regions, "color");

    let scale = scaleOrdinal()
        .domain(reg)
        .range(color);

    return scale;
}
