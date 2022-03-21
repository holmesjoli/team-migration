<script>
  import { afterUpdate } from 'svelte';
  import { select, selectAll } from "d3";
  import { uniqueArray, findRegionColor, getQuestionWithCountryName } from "./helper.js"
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
  let acqModeFiltered, possibleModes, possibleQuestions, unnecessaryQuestions, possiblePaths, a06aValue, a06aText, filteredQuestionToMode;
  let selectedColor = findRegionColor(selectedRegion);
  let allPaths = [
    "path_1", "path_2", "path_3", "path_4", "path_5",
    "path_6", "path_7", "path_8", "path_9", "path_10",
    "path_11", "path_12", "path_13", "path_14", "path_15",
    "path_16", "path_17", "path_18", "path_19", "path_20",
    "path_21", "path_22", "path_23", "path_24", "path_25",
    "path_26", "path_27", "path_28", "path_29", "path_30",
    "path_31", "path_32", "path_33", "path_34", "path_35",
    "path_36", "path_37", "path_38", "path_39", "path_40",
  ]

  $: h = w * 74 / 91;

  $: if (selectedCountry !== "") {

    // get possible modes, possible questions / paths, unnecessary questions
    acqModeFiltered = acqMode.filter(d => d.country == selectedCountry);
    possibleModes = uniqueArray(acqModeFiltered, "mode_id");
    // console.log(questionToMode)
    // console.log(possibleModes)

    possibleQuestions = [];
    possiblePaths = [];
    filteredQuestionToMode = [];
    questionToMode.forEach(el => {
      let mode = el.associated_mode;
      let isIncluded = possibleModes.includes(mode);
      if (isIncluded) {
        possibleQuestions.push(el.question);
        possiblePaths.push(el.path_to_light_up);
        filteredQuestionToMode.push(el);
      }
    })
    possibleQuestions = [...new Set(possibleQuestions)]
    possiblePaths = [...new Set(possiblePaths)]

    // console.log(possibleQuestions)
    // console.log(possiblePaths)
    // console.log(filteredQuestionToMode)

    unnecessaryQuestions = [];
    questions.forEach(el => {
      let id = el.question_id;
      let isIncluded = possibleQuestions.includes(id);
      if (!isIncluded) {
        unnecessaryQuestions.push(id)
      }
    })

    a06aValue = modeA06a.filter(d => d.country == selectedCountry)[0].values;
    a06aText = modeA06a.filter(d => d.values == a06aValue)[0].time;

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
        .selectAll(".butterfly__path")
        .attr("fill", "none")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 5)
        .attr("data-available", "true")
        .attr("data-matched", "false");
      butterflyPathsG
        .selectAll(".butterfly__path")
        .each(function() {
          let id = select(this).attr("id")
          if (!possiblePaths.includes(id)) {
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
              .style("font-size", "0.8rem")
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
                .style("font-size", "0.8rem")
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
            toggleMouseOver(select(this), select(this.parentNode))
          })
          .on("click", function() {
            toggleClick(select(this), select(this.parentNode))
          }) 
          .on("mouseleave", function() {
            toggleMouseLeave(select(this), select(this.parentNode))
          })
      })
        
      //   // *NOTE* for now, to set up the Documentation.svelte, setting this variable to a mode that's related to the question, not the actual mode that turns to "true". needs updates here.
      //   // trueMode = [...clicks.modes].filter(m => m[1] == true)[0][0]
      // })
    })
  }

  function toggleMouseOver(selection, parent) {
    let isAnswered =  parent.attr("data-question-answered");
    if (isAnswered == "false") {
      parent.selectAll("circle").style("opacity", 0)
      selection.style("opacity", 1)
      
      // make text visible
      let answer = selection.attr('data-answer-state')
      parent.select("text").text(answer)
    }
  }

  function toggleMouseLeave(selection, parent) {
    let id = parent.attr("data-question-id");
    let isAnswered = parent.attr("data-question-answered");
    // console.log(id, isAnswered)
    if (isAnswered == "false") {
      // make toggle invisible
      parent
        .style("opacity", 0)
        .style("pointer-events", "none")
        // make the original circle visible
        select(`circle#${id}`)
        .style("opacity", 1)
    }
    // make text normal weight
    select(`foreignObject[data-question-id=${id}]`).style("font-weight", "normal")
  }

  function toggleClick(selection, parent) {
    let id = parent.attr("data-question-id");
    let answer = selection.attr("data-answer-state");
    // console.log("user's answer:", answer)       
    
    // switch data-question-answered attribute
    parent
    .attr("data-question-answered", "true")
    .attr("data-answer", answer)
    // switch toggle cursor
    parent
    .style("cursor", "default")
    .style("pointer-events", "none")
    .selectAll("circle")
    .style("cursor", "default")
    .style("pointer-events", "none")            
    // make toggle question text Yes/No muted
    parent
    .select("text")
    .style("opacity", 0.1)
    // make question text muted
    select(`foreignObject[data-question-id=${id}]`)
    .style("opacity", 0.1)

    // light up paths
    let associatedQuestionToMode = filteredQuestionToMode.filter(el => el.question == id);
    associatedQuestionToMode.forEach(el => {
      // console.log(el)
      let path = el.path_to_light_up;
      // console.log("required answer", el.answer)
      if (el.answer == answer) {
        // console.log("answers matched!")

        // light up the path and the head
        select(`#${path}`)
          .attr("stroke", "#ae8625")
          .attr("data-matched", "true")
        if (el.citizenship_achieved == "TRUE") {
          select("#butterfly__head")
          .attr("fill", "url(#citizenship__achieved)")
        }
        
        // get new circles and texts to light up
        let childQuestion = el.child_question;
        // console.log(childQuestion)
        if (childQuestion !== "") {
          // make the child circle appear
          select(`circle#${childQuestion}`)
            .attr("data-waiting", "false")
            .attr("stroke", "black")
            .style("cursor", "pointer")
          // make the child text appear
          select(`foreignObject[data-question-id=${childQuestion}]`)
            .style("opacity", 1)
          // enable the toggle
          select(`g#switch__${childQuestion}`)
            .style("pointer-events", "auto")
            .on("mouseover", function() {
              select(this).style("opacity", 1)
            })
            .on("mouseleave", function() {
              select(this).style("opacity", 0)
            })
            .selectAll("circle")
            .on("mouseover", function() {
              select(`circle#${childQuestion}`)
                .style("opacity", 0)
              select(this).style("opacity", 1)
              let answer = select(this).attr('data-answer-state')
              select(this.parentNode).select("text").text(answer)
            })
            .on("mouseleave", function() {
              let isAnswered = select(this.parentNode).attr('data-question-answered')
              // console.log(isAnswered)
              if (isAnswered == "false") {
                select(`circle#${childQuestion}`)
                  .style("opacity", 1)
                select(this).style("opacity", 0)
                select(this.parentNode).select("text").text("")  
              }
            })
            .on("click", function() {
              toggleClick(select(this), select(this.parentNode))
            })
        }
      } else {
        // console.log("answers don't match")
        // disable the path
        let isMatched = select(`#${path}`)
          .attr("data-matched")
        if (isMatched == "false") {
          select(`#${path}`)
            .style("opacity", 0.1)
        }
        // disable the following questions and paths
        let followingQuestions = [el.child_question, el.grandchild_question]
        followingQuestions = followingQuestions.filter(q => q !== "");
        if (followingQuestions.length > 0) {
          followingQuestions.forEach(q => {
            // console.log(q)
            select(`circle#${q}`)
              .style("opacity", 0.3);
            let paths = filteredQuestionToMode
              .filter(el => el.question == q)                    
            paths.forEach(el => {
              let path = el.path_to_light_up;
              let isMatched = select(`#${path}`)
                .attr("data-matched")
              if (isMatched == "false") {
                select(`#${path}`)
                  .style("opacity", 0.1)
              }
            })
          })
        }
      }
    })       
  }

  function handleResetButton() {
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
        to answer questions. Paths will light up and the butterfly thorax will turn gold if there is a country-specific law that allows you to acquire citizenship with your condition.
        <!-- <span class="reset" on:click={handleResetButton}>RESET CONDITIONS</span> -->
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
  /* .reset {
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
  } */

</style>