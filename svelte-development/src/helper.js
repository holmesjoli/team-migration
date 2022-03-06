export function sizeScale(data) {

    const sScale = scaleLinear()
        .domain(extent(data.features, d => d.properties.VALUE))
        .range([0.25, 1]);

    return sScale;
}