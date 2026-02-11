import { Workflow } from "@botpress/runtime";
import { PortfolioKB } from "../knowledge/index";

export const PeriodicIndexingWorkflow = new Workflow({
  name: "periodic_portfolio_indexing",
  description: "A workflow that runs periodic indexing of the knowledge base",
  schedule: "0 */6 * * *", // Every 6 hours
  handler: () => PortfolioKB.refresh(),
});
