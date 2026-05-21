// Simulated Resume CRUD Operations with LocalStorage fallbacks
export const resumeService = {
  async getResumes() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const local = localStorage.getItem("eq_resumes");
        if (local) {
          resolve(JSON.parse(local));
        } else {
          const defaults = [
            { id: "1", title: "Executive Tech Leader Resume", template: "Classic Premium", lastModified: "2 hours ago", strength: 94 },
            { id: "2", title: "Full-Stack Engineer Narrative", template: "Modern Sleek", lastModified: "2 days ago", strength: 88 },
            { id: "3", title: "Principal Product Director Resume", template: "Minimal Grid", lastModified: "1 week ago", strength: 92 },
          ];
          localStorage.setItem("eq_resumes", JSON.stringify(defaults));
          resolve(defaults);
        }
      }, 400);
    });
  },

  async getResumeById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Return standard structure for mock id
        resolve({
          id,
          title: id === "2" ? "Full-Stack Engineer Narrative" : "Executive Tech Leader Resume",
          template: "Modern Sleek",
          personalInfo: {
            fullName: "Elon Musk",
            email: "elon@spacex.com",
            phone: "+1 (555) 0199",
            location: "Austin, TX",
            website: "https://spacex.com",
          },
          summary: "Pioneering technology architect and entrepreneur driven to scale next-generation aerospace and automotive architectures.",
          skills: ["Systems Architecture", "Aerospace Engineering", "FSD Deep Learning Networks", "Venture Scaling"],
          experience: [
            { id: "e1", company: "SpaceX", role: "Chief Engineer", period: "2002 - Present", description: "Spearheaded starship propellant systems." }
          ],
          education: [
            { id: "ed1", school: "UPenn", degree: "B.S. Physics", period: "1992 - 1995" }
          ],
          projects: [],
          certifications: [],
          achievements: [],
          strength: 92
        });
      }, 300);
    });
  },

  async saveResume(resume) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(resume);
      }, 500);
    });
  },

  async deleteResume(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }
};
