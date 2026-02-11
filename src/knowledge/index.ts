import { DataSource, Knowledge } from "@botpress/runtime";

// const LinkedInSource = DataSource.Website.fromWebsite(
//   "https://www.linkedin.com/in/raahuljohn/"
// );

// export const PortfolioKB = new Knowledge({
//   name: "Portfolio",
//   description:
//     "Knowledge base containing John's LinkedIn profile — experience, education, skills, projects, and professional background.",
//   sources: [LinkedInSource],
// });

const portfolioFile = DataSource.Directory.fromPath("src/knowledge/",{
    filter: (filePath) => filePath.endsWith('.pdf') || filePath.endsWith('.txt') || filePath.endsWith('.md'),
});
export const PortfolioKB = new Knowledge({
    name: "Portfolio",
    description:
      "Knowledge base containing John's LinkedIn profile — experience, education, skills, projects, and professional background.",
    sources: [portfolioFile],
  });