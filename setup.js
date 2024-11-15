#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");

async function init() {
  console.log("🚀 Starting project setup...");

  // Prompt for the project name
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter your project name:",
      validate: (input) => !!input || "Project name cannot be empty!",
    },
  ]);

  // Clone the template repository
  const repoURL = "https://github.com/your-username/template-repo.git"; // Replace with your repo URL
  console.log("📂 Cloning template repository...");
  execSync(`git clone ${repoURL} ${projectName}`, { stdio: "inherit" });

  // Navigate to the new project directory
  process.chdir(projectName);

  // Remove the old .git history
  execSync("rm -rf .git");

  // Initialize a new Git repository
  execSync("git init", { stdio: "inherit" });

  // Update the package.json name field
  const packagePath = path.join(process.cwd(), "package.json");
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
    packageJson.name = projectName;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  }

  // Install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });

  console.log(`🎉 Project '${projectName}' setup is complete!`);
}

init().catch((err) => {
  console.error("❌ An error occurred:", err);
  process.exit(1);
});
