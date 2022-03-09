<script>
  export let data;
  export let path;
</script>

<g class="map-path">
  <path
    d={path(data.features[0])}
    fill="#eeeeee"
    stroke-width=0
  />
</g>
