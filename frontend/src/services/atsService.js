// Simulated Applicant Tracking Systems parsing and indexing checks
export const atsService = {
  async scanResumeAgainstJob(resumeText, jobDescription) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: 78,
          readability: "Excellent",
          grammarErrors: 0,
          keywordsAnalysis: [
            { keyword: "Kubernetes", found: true, count: 3, importance: "High" },
            { keyword: "Distributed Systems", found: true, count: 2, importance: "High" },
            { keyword: "Rust", found: false, count: 0, importance: "Medium" },
            { keyword: "Financial Modeling", found: false, count: 0, importance: "Low" },
          ],
          missingSkills: ["Rust", "SaaS Infrastructure Architectures"],
          suggestions: [
            "Integrate 'Rust' under Technical Skills if you have background experience.",
            "Incorporate a bullet detail showing direct ownership of SaaS Infrastructure Architectures."
          ]
        });
      }, 1500);
    });
  }
};
