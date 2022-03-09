<script>
  import { afterUpdate } from 'svelte';
  import { select, selectAll } from "d3";
  import {uniqueArray, findRegionColor} from "./helper.js"
  import Documentation from './Documentation.svelte'
  import regions from './regions.js'
import { each } from 'svelte/internal';

  export let selectedRegion;
  export let selectedCountry;
  export let definitions;
  export let warnings;
  export let questions;
  export let acqMode;
  export let questionToMode;
  export let butterflies;

  let w;
  let selectedColor = findRegionColor(selectedRegion)
  let availableMode = // paths available based on the butterflyPath.svg
    ["A06f", "A07", "A01a", "A02a", "A02b", "A09",
    "A14", "A10", "A08", "A11", "A12a", "A12b", "A13", "A21", "A06e",
    "A06d", "A06a", "A06b", "A06c", "A25", "A26", "A24", "A23", "A22",
    "A19", "A18", "A16"] 

  $: h = w * 74 / 91;

  $: if (selectedCountry !== "") {
    // filter and see what modes are available
    let selectedAcqMode = acqMode.filter(d => d.country == selectedCountry)
    selectedAcqMode = uniqueArray(selectedAcqMode, "mode_id")
    let filteredAvailableMode = availableMode.filter(m => selectedAcqMode.includes(m));
    let unnecessaryQuestion = questionToMode.filter(q => !selectedAcqMode.includes(q.mode_id))
    unnecessaryQuestion = uniqueArray(unnecessaryQuestion, "question")
    let necessaryQuestion = questionToMode.filter(q => selectedAcqMode.includes(q.mode_id))
    necessaryQuestion = uniqueArray(necessaryQuestion, "question")
    unnecessaryQuestion = unnecessaryQuestion.filter(q => necessaryQuestion.indexOf(q) == -1);

    afterUpdate(() => {
      // set default colors of the big butterfly
      let butterflySel = select("#butterfly-path")
      butterflySel
        .select("#butterfly__wings")
        .attr("fill", selectedColor.light)
      butterflySel
        .select("#butterfly__head")
        .attr("fill", "#977B67")
      let butterflyPathsG = butterflySel
        .select("#butterfly__paths")
      butterflyPathsG
        .selectAll("path")
        .attr("fill", "none")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 5)
        .attr("data-available", "true")
        .attr("data-active", "false")
      butterflyPathsG
        .selectAll("path")
        .each(function() {
          let id = select(this).attr("id")
          if (!filteredAvailableMode.includes(id)) {
            select(this)
              .attr("data-available", "false")
              .style("opacity", 0.1);
          }
        })
      let butterflyCirclesG = butterflySel
        .select("#butterfly__circles")
      butterflyCirclesG
        .selectAll("circle")
        .attr("fill", "white")
        .attr("stroke", "#000000")
        .attr("stroke-width", 4.5)
        .attr("data-available", "true")
        .attr("data-answer", "no")
        .style("cursor", "pointer")
      butterflyCirclesG
        .selectAll("circle")
        .each(function() {
          let id = select(this).attr("id")
          if(unnecessaryQuestion.includes(id)) {
            select(this).attr("data-available", "false").style("opacity", 0.1)
          }
        })

      // populate questions
      if (!butterflyCirclesG.empty()) {
        selectAll(".butterfly__questions__question").remove();
        questions.forEach(q => {
          let id = q.question_id;
          if (!unnecessaryQuestion.includes(id)) {
            let text = q.question;
            let side = {
              h: q.h_side,
              v: q.v_side
            };
            let node = butterflyCirclesG.select(`#${id}`);
            if (q.visibility == "hidden") {
              node
                .attr("stroke", "lightgray")
                .style("cursor", "default")
            }
            let position = [+node.attr("cx"), +node.attr("cy")]

            select("#butterfly__questions")
              .append("foreignObject")
              .html(getQuestionWithCountryName(selectedCountry, text))
              .classed("butterfly__questions__question", true)
              .attr("data-question-id", id)
              .attr("x", side.h == "left" ? position[0] - 170 - 20 : position[0] + 20)
              .attr("y", side.v == "upper" ? position[1] - 30 : side.v == "middle" ? position[1] - 15 : position[1] + 10)
              .attr("width", 170)
              .attr("height", 170)
              .style("opacity", q.visibility == "hidden" ? 0 : 1)
              .style("text-shadow", "-2px -2px 0 rgba(255, 255, 255, 0.7), 2px -2px 0 rgba(255, 255, 255, 0.7), -2px 2px 0 rgba(255, 255, 255, 0.7), 2px 2px 0 rgba(255, 255, 255, 0.7)")          
              .style("font-size", "0.8rem")
              .style("text-align", side.h == 'left' ? "right" : "left")
              .style("line-height", 1)
              .style("transition", "all 0.2s ease")     
            }
        })
      }

      // circles on click event
      butterflyCirclesG.selectAll("circle").on("mouseover", function() {
        select(this).transition(200).attr("r", 10).attr("stroke-width", 7.8)
        let id = select(this).attr("id")
        select(`foreignObject[data-question-id=${id}]`).style("font-weight", "bold")
      })

      butterflyCirclesG.selectAll("circle").on("mouseleave", function() {
        select(this).transition(200).attr("r", 5.8).attr("stroke-width", 4.5)
        let id = select(this).attr("id")
        select(`foreignObject[data-question-id=${id}]`).style("font-weight", "normal")
      })

      butterflyCirclesG.selectAll("circle").on("click", function() {
        let answerStatus = select(this).attr("data-answer")
        if (answerStatus == "no") {
          select(this).attr("data-answer", "yes").attr("fill", "black")
        } else {
          select(this).attr("data-answer", "no").attr("fill", "white")
        }
        console.log(select(this))
      })
    })

      acqMode = acqMode.filter(function(d) {
        return d.country === selectedCountry;
      });

      let showDef = uniqueArray(acqMode, "definition")[0];
      let showWarn = uniqueArray(acqMode, "restriction_warning")[0];

      if (showDef !== "NA") {
        definitions = definitions.filter(function(d) {
          d.definition_id === showDef;
        });

        // let def = definitions.definition[0];
      }

      if (showWarn !== "NA") {
        warnings = warnings.filter(function(d) {
          d.restriction_warning === showWarn;
        });
        // let warn = warnings.message[0];
      }

    // if (selectedRegion !== "") {
    //   let color = colorScale(selectedRegion);
    // }
  }

  function getQuestionWithCountryName(selectedCountry, question) {
    let words = question.split(/[\s}]+/)
    let index = words.findIndex(w => w == "{cntry")
    if (index !== -1) {
      words[index] = selectedCountry
    }
    words = words.join(" ").replace(/\s+(\W)/g, "$1")
    return words
  }
</script>

<section id="big-butterfly__container" bind:clientWidth="{w}">
  {#if selectedCountry !== ""}
    <h1>
      Paths to acquire citizenship in <span class="country-highlight" style="background-color: {selectedColor.vivid}">{selectedCountry}</span>
    </h1>
      Click nodes
        <svg
          width=18
          height=18
        >
          <circle
            cx=9
            cy=9
            r=5
            stroke-width=4
            stroke="black"
            fill="white"
          >
          </circle>
        </svg>
      to answer questions, see if there's a law that allows you to aquire citizenship with your condition.
    {#if w !== undefined}
      <div id="citizenship-paths" style="height: {h}">
        <div id="butterfly__graphic">
          {@html butterflies[2]}
        </div>
      </div>
      <Documentation />
    {/if}
  {/if}
</section>

<style>
  #big-butterfly__container {
    margin-top: 7rem;
  }
  .country-highlight {
    color: white;
    padding: 0.3em 0.5em;
    border-radius: 8px;
  }
  #documentation {
    display: flex;
    flex-direction: row;
  }
  #documentation div {
    background: rgb(211, 211, 211);
    max-height: 75px;
  }
</style>