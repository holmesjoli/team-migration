<script>
  import { afterUpdate } from 'svelte';
  import { select, selectAll } from "d3";
  import { uniqueArray, findRegionColor, getQuestionWithCountryName, createPossibleQuestions, createUnnecessaryQuestions, clickContainer } from "./helper.js"
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

  let w, trueMode, clicks;
  let acqModeFiltered, possibleModes, possibleQuestions, unnecessaryQuestions, a06aValue, a06aText, filteredAvailableModes, newQuestions;
  let selectedColor = findRegionColor(selectedRegion)
  let availableModes =
  // paths available based on the butterflyPath.svg
    ["A06f", "A07", "A01a", "A02a", "A02b", "A09",
    "A14", "A10", "A08", "A11", "A12a", "A12b", "A13", "A21", "A06e",
    "A06d", "A06a", "A06b", "A06c", "A25", "A26", "A24", "A23", "A22",
    "A19", "A18", "A16"] 

  let allQuestions = uniqueArray(questionToMode, "question");

  function handleResetButton() {
    possibleModes.forEach(mode => {
      clicks.modes.set(mode, false)
    })
    possibleQuestions.forEach(question => {
      clicks.questions.set(question, false)
    })
    clicks.updatePaths();
    let butterflyPathsG = select("#butterfly__paths");
    clicks.highlightPath(butterflyPathsG);
    console.log(clicks)
  }

  $: h = w * 74 / 91;

  $: if (selectedCountry !== "") {

    acqModeFiltered = acqMode.filter(d => d.country == selectedCountry);
    possibleModes = uniqueArray(acqModeFiltered, "mode_id");
    possibleQuestions = createPossibleQuestions(possibleModes, questionToMode);
    unnecessaryQuestions = createUnnecessaryQuestions(allQuestions, possibleQuestions);

    a06aValue = modeA06a.filter(d => d.country === selectedCountry)[0].values;
    a06aText = modeA06a.filter(d => d.values == a06aValue)[0].time;
    clicks = new clickContainer(possibleQuestions, possibleModes);
    // console.log(clicks);

    // console.log("possibleModes", possibleModes);
    // console.log("allQuestions", allQuestions);
    // console.log("possibleQuestions", possibleQuestions);
    // console.log("unnecessaryQuestions", unnecessaryQuestions);

    // filter and see what modes are available
    filteredAvailableModes = availableModes.filter(m => possibleModes.includes(m));
    // console.log("filteredAvailableModes", filteredAvailableModes);
    // console.log(filteredAvailableModes);

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
          if (!filteredAvailableModes.includes(id)) {
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
        .attr("data-waiting", "false")
        .attr("data-answer", "no")
        .style("cursor", "pointer");
      // Make unavailable nodes muted and unclickable
      butterflyCirclesG
        .selectAll("circle")
        .each(function() {
          let id = select(this).attr("id")
          if(unnecessaryQuestions.includes(id)) {
            select(this)
              .attr("data-available", "false")
              .attr("stroke", "lightgray")
              .style("opacity", 0.3)
              .style("cursor", "default")
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

            // mute colors of the questions waiting for another quesiton to be answered
            let node = butterflyCirclesG.select(`#${id}`);
            if (q.visibility == "hidden") {
              node
                .attr("stroke", "lightgray")
                .attr("data-waiting", "true")
                .style("cursor", "default")
            }

            let position = [+node.attr("cx"), +node.attr("cy")]

            select("#butterfly__questions")
              .append("foreignObject")
              .html(getQuestionWithCountryName(selectedCountry, text, a06aText))
              .classed("butterfly__questions__question", true)
              .attr("data-question-id", id)
              .attr("x", side.h == "left" ? position[0] - 170 - 30 : position[0] + 30)
              .attr("y", side.v == "upper" ? position[1] - 30 : side.v == "middle" ? position[1] - 15 : position[1] + 10)
              .attr("width", 170)
              .attr("height", 170)
              .style("opacity", q.visibility == "hidden" ? 0 : 1)
              .style("text-shadow", "-2px -2px 0 rgba(255, 255, 255, 0.7), 2px -2px 0 rgba(255, 255, 255, 0.7), -2px 2px 0 rgba(255, 255, 255, 0.7), 2px 2px 0 rgba(255, 255, 255, 0.7)")          
              .style("font-size", "1rem")
              .style("text-align", side.h == 'left' ? "right" : "left")
              .style("line-height", 1)
              .style("transition", "all 0.2s ease")     

              // add toggle switch
              let switchG = select("#butterfly__toggle")
                .append("g")
                .classed("switch", true)
                .attr("transform", `translate(${position[0] - 10}, ${position[1]})`)
                .attr("id", `switch__${id}`)
                .attr("data-question-id", `${id}`)
                .attr("data-question-answered", "false")
                .attr("data-answer", "NA")
                .style("opacity", 0)
                .style("pointer-events", "none")
              switchG
                .append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 20)
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
                .attr("data-answer-state", "Yes")
                .attr("stroke", "black")
                .attr('stroke-width', 7.8)
                .attr('fill', "white")
                .style("opacity", 0)
                .style("cursor", "pointer")
              switchG
                .append("text")
                .attr("x", 10)
                .attr("y", -20)
                .attr("text-anchor", "middle")
                .style("font-size", "1rem")
                .style("font-weight", "bold")
                .text("")
                .style("text-shadow", "-2px -2px 0 rgba(255, 255, 255, 0.7), 2px -2px 0 rgba(255, 255, 255, 0.7), -2px 2px 0 rgba(255, 255, 255, 0.7), 2px 2px 0 rgba(255, 255, 255, 0.7)")  
            }
        })
      }

      // circles on hover event
      butterflyCirclesG
      .selectAll("circle[data-available='true'][data-waiting='false']")
      .on("mouseover", function() {
        //  get question id -- eg. "Q02"
        let id = select(this).attr("id");
        let status = clicks.questions.get(id);

        // make question bold
        select(`foreignObject[data-question-id=${id}]`)
        .style("font-weight", "bold")

        // make this circle invisible
        select(this)
        .transition(200)
        .style("opacity", 0)

        let toggleG = select(`#switch__${id}`)
        // make toggle visible
        toggleG
          .style("opacity", 1)
          .style("pointer-events", "auto")

        // make toggle swichable
        toggleG
          .selectAll("circle")
          .on("mouseover", function() {
            let isAnswered =  select(this.parentNode).attr("data-question-answered");
            if (isAnswered == "false") {
              toggleG.selectAll("circle").style("opacity", 0)
              select(this).style("opacity", 1)
              
              // make text visible
              let answer = select(this).attr('data-answer-state')
              toggleG.select("text").text(answer)
            }
          })
          .on("click", function() {
            let id = select(this.parentNode).attr("data-question-id");
            let answer = select(this).attr("data-answer-state");
            console.log(answer)
            // *FROM SIMPLE TOGGLE*
            if (!unnecessaryQuestions.includes(id)) {
              let status = clicks.questions.get(id);
              status = answer == "Yes" ? true : false;
              clicks.questions.set(id, status);
              clicks.updatePaths();
              clicks.highlightPath(butterflyPathsG);
              clicks.updateClick(id, status);
              console.log(clicks);
            }
            
            // switch data-question-answered attribute
            select(this.parentNode)
            .attr("data-question-answered", "true")
            .attr("data-answer", answer)
            // switch toggle cursor
            select(this.parentNode)
            .style("cursor", "default")
            .style("pointer-events", "none")
            .selectAll("circle")
            .style("cursor", "default")
            .style("pointer-events", "none")            
            // make toggle question text Yes/No invisible
            select(this.parentNode)
            .select("text")
            .style("opacity", 0)
            // make question text muted
            select(`foreignObject[data-question-id=${id}]`)
            .style("opacity", 0.1)
            console.log(select(this))

            // get new circles and texts to light up
            newQuestions = questions.filter(q => q.q_waiting == id);
            if (newQuestions.length > 0) {
              let newQuestionIds = newQuestions.map(q => q.question_id);
              console.log(newQuestionIds)
              newQuestionIds.forEach(qId => {
                console.log(qId)
                let circle = select(`circle#${qId}`);
                let isAvailable = circle.attr("data-available");
                console.log(isAvailable)
                if (isAvailable == "true") {
                  console.log(circle)
                  circle
                    .attr("stroke", "black");
                }
              })
            }
            
          }) 
        toggleG
          .on("mouseleave", function() {
            let id = select(this).attr("data-question-id");
            let isAnswered = select(this).attr("data-question-answered");
            if (isAnswered == "false") {
              // make toggle invisible
              select(this)
              .style("opacity", 0)
              .style("pointer-events", "none")
              // make the original circle visible
              select(`circle#${id}`)
              .style("opacity", 1)
            }
            // make text normal weight
            select(`foreignObject[data-question-id=${id}]`).style("font-weight", "normal")
          })
      })

      // butterflyCirclesG.selectAll("circle").on("click", function() {
      //   let id = select(this).attr("id");

      //   // Below is extra step for Q23
      //   // .on("click", function() {
      //   //   let answer = select(this).attr('data-answer-state')
      //   //   // set answer state
      //   //   status = answer == "Yes" ? true : false
      //   //   // disable pointer events
      //   //   toggleG.style("pointer-events", "none")

      //   //   let inputValue;
      //   //   if (id == "Q22" && status == true) {
      //   //     let form = select("#answer-selection__Q22")
      //   //     form.style("display", "block")
      //   //     let submitButton = form.select("div")
      //   //     submitButton.on("click", function() {
      //   //       let selectedInput = form.select("input:checked")
      //   //       if (!selectedInput.empty()) {
      //   //         inputValue = selectedInput.attr("value")
      //   //         form.style("opacity", 0.1)
      //   //         console.log(inputValue)
      //   //       }
      //   //     })
      //   //   }
      //   // })
      //   // if (status) {
      //     // highlightPath(clicks, butterflyPathsG);
      //   // }
        
      //   // else {
      //   //   status = true;
      //   //   select(this).attr("data-answer", "no").attr("fill", "white")
      //   // }
        
      //   // *NOTE* for now, to set up the Documentation.svelte, setting this variable to a mode that's related to the question, not the actual mode that turns to "true". needs updates here.
      //   // trueMode = [...clicks.modes].filter(m => m[1] == true)[0][0]
      // })
    })
  }

</script>

<section id="big-butterfly__container" bind:clientWidth="{w}">
  {#if selectedCountry !== ""}
    <h1 class="title">
      Paths to acquire citizenship in <span class="country-highlight" style="background-color: {selectedColor.vivid}">{selectedCountry}</span>
    </h1>
    <div class="instructions">
      <p class="user-signifier">Click buttons
        <svg
          width=18
          height=18
          transform="translate(0, 5)"
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
        to answer questions. Paths will light up if there is a country-specific law that allows you to acquire citizenship with your condition.
        <span class="reset" on:click={handleResetButton}>RESET CONDITIONS</span>
      </p>
    </div>
    {#if w !== undefined}
      <div id="citizenship-paths" style="height: {h}">
        <div id="butterfly__graphic">
          {@html butterflies[2]}
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
  .title {
    padding: 20px;
    margin: 10px;
    padding-top: 60px;
  }
  .instructions {
    padding: 10px;
    margin: 10px auto;
    max-width: 600px;
    font-size: 18px;
  }
  .reset {
    display: inline;
    cursor: pointer;
    font-size: 0.7rem;
    width: fit-content;
    background: white;
    padding: 0 0.4em;
    border-radius: 0.4em;
    border: 2px solid #aaaaaa;
  }
  .reset:hover {
    background: #aaaaaa;
    color: white;
  }

</style>