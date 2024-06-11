// utils/scoreUtils.js

const normalize = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };
  
  const calculateTracePathScore = (averageScore, accuracy, timeTaken, minScore, maxScore, minTime, maxTime) => {
    const normalizedScore = normalize(averageScore, minScore, maxScore);
    const normalizedTime = 100 - normalize(timeTaken, minTime, maxTime);
    return 0.4 * normalizedScore + 0.4 * accuracy + 0.2 * normalizedTime;
  };
  
  const calculateImageSortScore = (time, score, accuracy, minTime, maxTime, minScore, maxScore) => {
    const normalizedTime = 100 - normalize(time, minTime, maxTime);
    const normalizedScore = normalize(score, minScore, maxScore);
    return 0.3 * normalizedTime + 0.4 * normalizedScore + 0.3 * accuracy;
  };
  
  const calculateMemoryMatchScore = (trials, pairsFound, timeTaken, minTrials, maxTrials, minPairs, maxPairs, minTime, maxTime) => {
    const normalizedTrials = 100 - normalize(trials, minTrials, maxTrials);
    const normalizedPairsFound = normalize(pairsFound, minPairs, maxPairs);
    const normalizedTime = 100 - normalize(timeTaken, minTime, maxTime);
    return 0.3 * normalizedTrials + 0.4 * normalizedPairsFound + 0.3 * normalizedTime;
  };
  
  const calculateOverallHealthScore = (tracePathScore, imageSortScore, memoryMatchScore) => {
    return (tracePathScore + imageSortScore + memoryMatchScore) / 3;
  };
  
  module.exports = {
    normalize,
    calculateTracePathScore,
    calculateImageSortScore,
    calculateMemoryMatchScore,
    calculateOverallHealthScore
  };
  