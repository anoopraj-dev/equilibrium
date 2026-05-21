// Simulated Auth API endpoints and JWT handling
export const authService = {
  async getCurrentUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Elon Musk",
          email: "elon@spacex.com",
          tier: "Premium Elite",
        });
      }, 500);
    });
  },

  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          localStorage.setItem("eq_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
          resolve({
            name: "Elon Musk",
            email,
            tier: "Premium Elite",
          });
        } else {
          reject(new Error("Invalid credentials provided."));
        }
      }, 1000);
    });
  },

  async signup(name, email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("eq_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
        resolve({
          name,
          email,
          tier: "Premium Elite",
        });
      }, 1200);
    });
  },

  async logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("eq_token");
        resolve(true);
      }, 300);
    });
  },

  isAuthenticated() {
    return !!localStorage.getItem("eq_token");
  }
};
