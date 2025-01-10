export default (sequence) => {
  const dp = Array(sequence.length).fill(1);

  for (let i = 1; i < sequence.length; i++) {
    for (let j = 0; j < i; j++) {
      if (sequence[i] > sequence[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}