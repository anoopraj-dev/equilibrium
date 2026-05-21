// Simulated AI processing endpoints (GPT/LLM workflows)
export const aiService = {
  async generateSummary({ role, highlights }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `Distinguished ${role} with a proven record of leading large-scale initiatives. Specialized in: ${highlights}. Expert in driving engineering performance, modernizing software lifecycles, and managing high-performing teams.`
        );
      }, 1500);
    });
  },

  async improveBulletPoints(bullets, tone = "Metric-Driven") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          bullets.map((b) => `Pioneered optimization of key service modules, accelerating throughput velocity by 40% while achieving a 15% reduction in overall system overhead under the ${tone} paradigm.`)
        );
      }, 1200);
    });
  },

  async generateInterviewQuestion(role) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "q1", question: `As a ${role}, how do you manage high-stakes deployment failures?`, idealAnswer: "Explain containment, rollbacks, post-mortems, and preventative automation." },
          { id: "q2", question: "Can you detail a complex systems design conflict you solved?", idealAnswer: "Address technical tradeoffs, alignment meetings, performance metrics, and compromises." }
        ]);
      }, 800);
    });
  },

  async evaluateInterviewAnswer(question, answer) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: 88,
          feedback: "Strong technical vocabulary and concrete results. Consider linking the system directly to operational ROI.",
          improvedAnswer: `${answer} Additionally, our architectural optimization directly decreased operational costs by 22% and increased release speeds.`
        });
      }, 1400);
    });
  }
};
