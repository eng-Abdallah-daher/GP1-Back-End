const fuzzy = require("fuzzyset.js");
const spellchecker = require("spellchecker");
const problemModel = require("../models/problemModel");

const fuzzySet = fuzzy();
const problemDescriptions = problemModel.getAllProblems();

problemDescriptions.forEach((problem) => {
  fuzzySet.add(problem.description);
});

function correctSpelling(description) {
  const misspelledWords = description.split(" ").map((word) => {
    if (spellchecker.isMisspelled(word)) {
      return spellchecker.getCorrectionsForMisspelling(word)[0];
    }
    return word;
  });
  return misspelledWords.join(" ");
}

// Function to detect problems by handling descriptions intelligently
function detectProblems(description) {
  // Split the description into possible parts (problems) based on common conjunctions
  const problemParts = description
    .split(/\band\b|\bor\b|,|;/i)
    .map((part) => part.trim());

  let problemMatches = [];

  // Iterate over each part and perform fuzzy matching
  problemParts.forEach((part) => {
    const correctedDescription = correctSpelling(part.toLowerCase());
    const matches = fuzzySet.get(correctedDescription);

    if (matches && matches.length > 0) {
      // Get the best match for the current part
      const bestMatch = matches[0][1]; // Best match is the first in the sorted list

      // Get the problem from the model by the best match
      const problem = problemModel.getProblemByDescription(bestMatch);

      if (
        problem &&
        !problemMatches.some(
          (existingProblem) =>
            existingProblem.description === problem.description
        )
      ) {
        problemMatches.push(problem);
      }
    }
  });

  return problemMatches;
}

function estimateRepairCost(description) {
  const matchedProblems = detectProblems(description);

  if (matchedProblems.length > 0) {
    const costs = matchedProblems.map((problem) => problem.cost);
    return {
      numberOfProblems: matchedProblems.length, // The number of problems found
      totalCost: costs.reduce((sum, cost) => sum + cost, 0), // Total sum of costs for all problems
    };
  }

  return { numberOfProblems: 0, totalCost: 300 }; // Default cost if no matching problems found
}

module.exports = {
  estimateRepairCost,
};
