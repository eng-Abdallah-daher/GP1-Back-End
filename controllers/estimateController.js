const fuzzy = require("fuzzyset.js");
const Typo = require("typo-js");
const problemModel = require("../models/problemModel");


const dictionary = new Typo("en_US");

const fuzzySet = fuzzy();
const problemDescriptions = problemModel.getAllProblems();

problemDescriptions.forEach((problem) => {
  fuzzySet.add(problem.description);
});

function correctSpelling(description) {
  const correctedWords = description.split(" ").map((word) => {
    if (!dictionary.check(word)) {
      const suggestions = dictionary.suggest(word);
      return suggestions.length > 0 ? suggestions[0] : word;
    }
    return word;
  });
  return correctedWords.join(" ");
}

function detectProblems(description) {
  const problemParts = description
    .split(/\band\b|\bor\b|,|;/i)
    .map((part) => part.trim());

  let problemMatches = [];

  problemParts.forEach((part) => {
    const correctedDescription = correctSpelling(part.toLowerCase());
    const matches = fuzzySet.get(correctedDescription);

    if (matches && matches.length > 0) {
      const bestMatch = matches[0][1];
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
      numberOfProblems: matchedProblems.length,
      totalCost: costs.reduce((sum, cost) => sum + cost, 0),
    };
  }

  return { numberOfProblems: 0, totalCost: 300 };
}

module.exports = {
  estimateRepairCost,
};
