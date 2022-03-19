<script>
  import { afterUpdate } from 'svelte';
  import { html, select, selectAll } from "d3";
  import {uniqueArray, findRegionColor, getQuestionWithCountryName, createPossibleQuestions, createUnnecessaryQuestions, clickContainer, highlightPath} from "./helper.js"
  import Documentation from './Documentation.svelte'

  export let selectedRegion;
  export let selectedCountry;
  export let definitions;
  export let warnings;
  export let questions;
  export let acqMode;
  export let questionToMode;
  export let butterflies;
  export let modeA06a;

  let w, trueMode;
  let selectedColor = findRegionColor(selectedRegion)
  let availableMode = // paths available based on the butterflyPath.svg
    ["A06f", "A07", "A01a", "A02a", "A02b", "A09",
    "A14", "A10", "A08", "A11", "A12a", "A12b", "A13", "A21", "A06e",
    "A06d", "A06a", "A06b", "A06c", "A25", "A26", "A24", "A23", "A22",
    "A19", "A18", "A16"] 

  let allQuestions = uniqueArray(questionToMode, "question");

  $: h = w * 74 / 91;

  $: if (selectedCountry !== "") {

    let acqModeFiltered = acqMode.filter(d => d.country == selectedCountry);
    let possibleModes = uniqueArray(acqModeFiltered, "mode_id");

    let possibleQuestions = createPossibleQuestions(possibleModes, questionToMode);
    let unnecessaryQuestions = createUnnecessaryQuestions(allQuestions, possibleQuestions);


    // console.log(modeA06a);
    let a06aValue = modeA06a.filter(d => d.country == selectedCountry)[0].values;

    let clicks = new clickContainer(possibleQuestions, possibleModes, a06aValue);
    // console.log(clicks);

    // console.log("possibleModes", possibleModes);
    // console.log("allQuestions", allQuestions);
    console.log("possibleQuestions", possibleQuestions);
    // console.log("unnecessaryQuestions", unnecessaryQuestions);

    // filter and see what modes are available
    let filteredAvailableMode = availableMode.filter(m => possibleModes.includes(m));
    // console.log("filteredAvailableMode", filteredAvailableMode);
    // console.log(filteredAvailableMode);

    afterUpdate(() => {
      // set default colors of the big butterfly
      let butterflySel = select("#butterfly-path")

      butterflySel
        .select("#butterfly__wings")
        .attr("fill", selectedColor.light);

      butterflySel
        .select("#butterfly__head")
        .attr("fill", "#977B67");

      let butterflyPathsG = butterflySel
        .select("#butterfly__paths");

      butterflyPathsG
        .selectAll("path")
        .attr("fill", "none")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 5)
        .attr("data-available", "true")
        .attr("data-active", "false");

      butterflyPathsG
        .selectAll("path")
        .each(function() {
          let id = select(this).attr("id")
          if (!filteredAvailableMode.includes(id)) {
            select(this)
              .attr("data-available", "false")
              .style("opacity", 0.1);
          }
        });

      let butterflyCirclesG = butterflySel
        .select("#butterfly__circles");

      butterflyCirclesG
        .selectAll("circle")
        .attr("fill", "white")
        .attr("stroke", "#000000")
        .attr("stroke-width", 4.5)
        .attr("data-available", "true")
        .attr("data-answer", "no")
        .style("cursor", "pointer");

      butterflyCirclesG
        .selectAll("circle")
        .each(function() {
          let id = select(this).attr("id")
          if(unnecessaryQuestions.includes(id)) {
            select(this).attr("data-available", "false").style("opacity", 0.1)
          }
        });

      if (!butterflyCirclesG.empty()) {
        // populate questions
        selectAll(".butterfly__questions__question").remove();
        questions.forEach(q => {
          let id = q.question_id;
          if (!unnecessaryQuestions.includes(id)) {
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
              // .style("opacity", q.visibility == "hidden" ? 0 : 1)
              .style("text-shadow", "-2px -2px 0 rgba(255, 255, 255, 0.7), 2px -2px 0 rgba(255, 255, 255, 0.7), -2px 2px 0 rgba(255, 255, 255, 0.7), 2px 2px 0 rgba(255, 255, 255, 0.7)")          
              .style("font-size", "0.8rem")
              .style("text-align", side.h == 'left' ? "right" : "left")
              .style("line-height", 1)
              .style("transition", "all 0.2s ease")     

              // add toggle switch
              let switchG = select("#butterfly__toggle")
                .append("g")
                .classed("switch", true)
                .attr("id", `switch__${id}`)
                .attr("transform", `translate(${position[0] - 20}, ${position[1]})`)
                .style("opacity", 0)
                .style("pointer-events", "none")
              switchG
                .append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 40)
                .attr("y2", 0)
                .attr('stroke', "white")
                .attr("stroke-width", 20)
                .attr("stroke-linecap", "round")
                .style("opacity", 0.8)
              switchG
                .append("circle")
                .attr("cx", 0)
                .attr("r", 10)
                .attr("data-answer-state", "No")
                .attr("stroke", "lightgray")
                .attr('stroke-width', 7.8)
                .attr('fill', "white")
                .style("opacity", 0)
                .style("cursor", "pointer")
              switchG
                .append("circle")
                .attr("cx", 20)
                .attr("r", 10)
                .attr("data-answer-state", "")
                .attr('fill', "white")
                .style("opacity", 1)
              switchG
                .append("circle")
                .attr("cx", 40)
                .attr("r", 10)
                .attr("data-answer-state", "Yes")
                .attr("stroke", "black")
                .attr('stroke-width', 7.8)
                .attr('fill', "white")
                .style("opacity", 0)
                .style("cursor", "pointer")
              switchG
                .append("text")
                .attr("x", 10)
                .attr("y", 30)
                .style("font-size", "0.8rem")
                .style("font-weight", "bold")
                .text("")
                .style("text-shadow", "-2px -2px 0 rgba(255, 255, 255, 0.7), 2px -2px 0 rgba(255, 255, 255, 0.7), -2px 2px 0 rgba(255, 255, 255, 0.7), 2px 2px 0 rgba(255, 255, 255, 0.7)")  
            }
        })
      }

//@Yuriko-Schumacher this branch some extra logic for A06a. One of the their weird ones that requires a checkbox or toggle. Al we should have to do is get the value from that checkbox and add it as status.

// So I think the only thing we should need to change is on line 181. Right now I'm setting the status to "blah", which is just my way of saying temporary placeholder. What we'll want to do is set blah equal to the outcome of a user click event.

// The options in the user click event should be:

// values: 1 text: "Fewer than 5 years"
// values: 2 text: "Exactly 5 years",
// values: 3 text: "Between 5 years and 10 years",
// values: 4 text: "More than 10 years"

// Let me know if any of this is confusing

      // circles on click event
      butterflyCirclesG.selectAll("circle").on("mouseover", function() {
        let id = select(this).attr("id");
        if (!unnecessaryQuestions.includes(id)) {
          select(this)
          .transition(200)
          .attr("r", 10)
          .attr("stroke-width", 7.8)
        }
        select(`foreignObject[data-question-id=${id}]`).style("font-weight", "bold")
      })

      butterflyCirclesG.selectAll("circle").on("mouseleave", function() {
        select(this).transition(200).attr("r", 5.8).attr("stroke-width", 4.5)
        let id = select(this).attr("id")
        select(`foreignObject[data-question-id=${id}]`).style("font-weight", "normal")
      })

      butterflyCirclesG.selectAll("circle").on("click", function() {
        let id = select(this).attr("id");
        let status;
        clicks.updateClick(id, status);

        // make this circle invisible
        select(this).style("opacity", 0).style("pointer-events", "none")

        // make toggle visible
        let toggleG = select(`#switch__${id}`)
        toggleG
          .style("opacity", 1)
          .style("pointer-events", "auto")
        toggleG.selectAll("circle").on("mouseover", function() {
          if (status == undefined) {
            toggleG.selectAll("circle").style("opacity", 0)
            select(this).style("opacity", 1)
            
            // make text visible
            let answer = select(this).attr('data-answer-state')
            toggleG.select("text").text(answer)
          }
        })
        .on("click", function() {
          let answer = select(this).attr('data-answer-state')
          // set answer state
          status = answer == "Yes" ? true : false
          // disable pointer events
          toggleG.style("pointer-events", "none")

          let inputValue;
          if (id == "Q22" && status == true) {
            let form = select("#answer-selection__Q22")
            form.style("display", "block")
            let submitButton = form.select("div")
            submitButton.on("click", function() {
              let selectedInput = form.select("input:checked")
              if (!selectedInput.empty()) {
                inputValue = selectedInput.attr("value")
                form.style("opacity", 0.1)
                console.log(inputValue)
              }
            })
          }
        })
        // if (status) {
          highlightPath(clicks, butterflyPathsG);
        // }
        
        if (status) {
          select(this).attr("data-answer", "yes").attr("fill", "black")
        } 
        // else {
        //   status = true;
        //   select(this).attr("data-answer", "no").attr("fill", "white")
        // }
        
        // *NOTE* for now, to set up the Documentation.svelte, setting this variable to a mode that's related to the question, not the actual mode that turns to "true". needs updates here.
        // trueMode = [...clicks.modes].filter(m => m[1] == true)[0][0]
      })
    })
  }

</script>

<section id="big-butterfly__container" bind:clientWidth="{w}">
  {#if selectedCountry !== ""}
    <h1 class="title">
      Paths to acquire citizenship in <span class="country-highlight" style="background-color: {selectedColor.vivid}">{selectedCountry}</span>
    </h1>
    <div class="instructions">
      <p class="user-signifier">Click
        <svg width=18 height=18>
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
        to answer questions. Paths will light up if there is a country-specific law that allows you to acquire citizenship with your condition.
      </p></div>
    {#if w !== undefined}
      <div id="citizenship-paths" style="height: {h}">
        <div id="butterfly__graphic">
          {@html butterflies[2]}
          <form id="answer-selection__Q22">
            <strong>How long did you live in {selectedCountry}?</strong><br>
            <input type="radio" id="fewer-than-five" name="answer__Q22" value="Fewer than 5 years">
            <label for="fewer-than-five">Fewer than 5 years</label><br>
            <input type="radio" id="exactly-five" name="answer__Q22" value="Exactly 5 years">
            <label for="exactly-five">Exactly 5 years</label><br>
            <input type="radio" id="five-to-ten" name="answer__Q22" value="Between 5 years and 10 years">
            <label for="five-to-ten">Between 5 and 10 years</label><br>
            <input type="radio" id="more-than-ten" name="answer__Q22" value="More than 10 years">
            <label for="more-than-ten">More than 10 years</label>
            <div class="submit-button">Submit</div>
          </form>
        </div>
      </div>
      {#if trueMode !== undefined}
        <Documentation selectedCountry={selectedCountry} bind:trueMode={trueMode} acqMode={acqMode} warnings={warnings} definitions={definitions}/>
      {/if}
    {/if}
  {/if}
</section>

<style>
  #big-butterfly__container {
    margin-top: 7rem;
  }
  #butterfly__graphic {
    position: relative;
  }
  .country-highlight {
    color: white;
    padding: 0.3em 0.5em;
    border-radius: 8px;
  }
  .instructions {
    padding: 10px;
    margin: 10px auto;
    max-width: 600px;
    font-size: 18px;
  }
  #answer-selection__Q22 {
    position: absolute;
    display: none;
    font-size: 0.8rem;
    width: 150px;
    text-align: left;
    bottom: 15vh;
    right: 0;
  }
  .submit-button {
    cursor: pointer;
    font-size: 0.7rem;
    width: fit-content;
    background: rgb(227, 227, 227);
    border: 1px solid black;
    margin-top: 0.4em;
    padding: 0.2em 0.4em;
    border-radius: 0.4em;
  }

</style>