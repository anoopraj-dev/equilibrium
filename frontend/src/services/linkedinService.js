// Simulated LinkedIn scraping and import flows
export const linkedinService = {
  async initiateOAuth() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://linkedin.com/oauth/v2/authorization?mock=true");
      }, 500);
    });
  },

  async importProfileData(authCode) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          personalInfo: {
            fullName: "Elon Musk",
            email: "elon@spacex.com",
            location: "Austin, TX",
            website: "https://spacex.com",
          },
          summary: "Pioneering technology architect building long-term sustainable systems.",
          skills: ["Systems Engineering", "Aeronautics", "Robotics", "Neural Nets"],
          experience: [
            { id: "li-1", company: "SpaceX", role: "CEO", period: "2002 - Present", description: "Spearheaded rocket designs." }
          ]
        });
      }, 2000);
    });
  }
};
