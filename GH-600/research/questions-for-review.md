# GH-600 questions for answer generation

=== Q1 [topic 2 q1] OFFICIAL=image:image3.png COMMUNITY=none ===
HOTSPOT

Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Overview

Contoso Ltd. is a software development company located in the United States.

Existing Environment

GitHub Environment

Contoso uses GitHub Enterprise and assigns GitHub Copilot Pro+ licenses to its developers. The developers use Microsoft Visual Studio Code as their IDE.

Contoso has a customer portal. The code for the portal is stored in a GitHub repository named repo1 that contains the following:

A custom agent named agent1 that includes instructions to review specs related to best practices

A custom instruction file named validate-instructions.md that is used to validate tone of voice and applies to all .md and .txt files

A custom instruction file named codereview.instructions.md that is used by the Copilot coding agent but is excluded for use by the Copilot code review

repo1 has the following structure:

The front-end is stored in the /frontend folder.

The API logic is stored in the /api folder.

Contoso has a second repository named repo2 that contains a legacy .NET application named App1 built by using .NET 6. repo2 has a multi-agent workflow for modernization tasks.

Contoso enables the Model Context Protocol (MCP) registry and allows the Microsoft Learn MCP Server. Every developer must configure their own connection to the Learn MCP Server.

Problem Statements

The developers working in repo1 report that the Microsoft Learn documentation is NOT being retrieved when they attempt to validate a design by using agent1.

The testing team at Contoso identifies that the customer portal uses inconsistent UI styles, which leads to customer confusion and branding issues. The UI inconsistencies stem from variations in the folder structure.

Agent Logs

You have the following logs for the multi-agent workflow used in repo2.

Requirements

Planned Changes

Contoso plans to have all agents and developers in repo1 use the Microsoft Learn MCP to ensure that reviews are validated by using the appropriate documentation. This must be implemented centrally.

Contoso plans to leverage AI-powered coding agents to implement new portal features and pages.

Technical Requirements

App1 must be upgraded to .NET 10. A previous upgrade attempt was started by using the Copilot modernization agent, but the attempt was never finalized.

You plan to retry the upgrade. You must first analyze App1 by using AI, and then generate a report that contains breaking changes and deprecated patterns before retrying the upgrade.

All AI-generated code for UI styling must adhere to a predefined folder structure.

The architects at Contoso need help building implementation plans for repo1. The company wants to implement a new agent named agent2 to analyze the code base and the code requirements, and then respond with a detailed plan. The agent must NOT be able to edit files or run local commands.

The developers must be able to delegate work to the Copilot coding agent by assigning issues to the agent.

You need to implement agent2 to meet the technical requirements.

How should you complete the YAML configuration? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q2 [topic 2 q2] OFFICIAL=letter:A COMMUNITY=D (1/1 votes: D=1) ===
Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Overview

Contoso Ltd. is a software development company located in the United States.

Existing Environment

GitHub Environment

Contoso uses GitHub Enterprise and assigns GitHub Copilot Pro+ licenses to its developers. The developers use Microsoft Visual Studio Code as their IDE.

Contoso has a customer portal. The code for the portal is stored in a GitHub repository named repo1 that contains the following:

A custom agent named agent1 that includes instructions to review specs related to best practices

A custom instruction file named validate-instructions.md that is used to validate tone of voice and applies to all .md and .txt files

A custom instruction file named codereview.instructions.md that is used by the Copilot coding agent but is excluded for use by the Copilot code review

repo1 has the following structure:

The front-end is stored in the /frontend folder.

The API logic is stored in the /api folder.

Contoso has a second repository named repo2 that contains a legacy .NET application named App1 built by using .NET 6. repo2 has a multi-agent workflow for modernization tasks.

Contoso enables the Model Context Protocol (MCP) registry and allows the Microsoft Learn MCP Server. Every developer must configure their own connection to the Learn MCP Server.

Problem Statements

The developers working in repo1 report that the Microsoft Learn documentation is NOT being retrieved when they attempt to validate a design by using agent1.

The testing team at Contoso identifies that the customer portal uses inconsistent UI styles, which leads to customer confusion and branding issues. The UI inconsistencies stem from variations in the folder structure.

Agent Logs

You have the following logs for the multi-agent workflow used in repo2.

Requirements

Planned Changes

Contoso plans to have all agents and developers in repo1 use the Microsoft Learn MCP to ensure that reviews are validated by using the appropriate documentation. This must be implemented centrally.

Contoso plans to leverage AI-powered coding agents to implement new portal features and pages.

Technical Requirements

App1 must be upgraded to .NET 10. A previous upgrade attempt was started by using the Copilot modernization agent, but the attempt was never finalized.

You plan to retry the upgrade. You must first analyze App1 by using AI, and then generate a report that contains breaking changes and deprecated patterns before retrying the upgrade.

All AI-generated code for UI styling must adhere to a predefined folder structure.

The architects at Contoso need help building implementation plans for repo1. The company wants to implement a new agent named agent2 to analyze the code base and the code requirements, and then respond with a detailed plan. The agent must NOT be able to edit files or run local commands.

The developers must be able to delegate work to the Copilot coding agent by assigning issues to the agent.

Before App1 is upgraded, you need to verify each individual upgrade step and whether all tests have passed.

Which file should you use?

				  
A.
					assessment.md

				  
B.
					plan.md

				  
C.
					agent.md

				  
D.
					tasks.md

=== Q3 [topic 2 q3] OFFICIAL=image:image5.png COMMUNITY=none ===
DRAG DROP

You have a GitHub repository that has a GitHub Actions workflow. The workflow runs an AI agent.

You need to ensure that the default GITHUB_TOKEN permissions are read-only, and write access is granted to only the job that performs repository write operations. The workflow must be able to create and approve pull requests only when explicitly enabled.

How should you complete the workflow? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q4 [topic 2 q4] OFFICIAL=image:image7.png COMMUNITY=none ===
DRAG DROP

You have a GitHub repository that uses the GitHub Copilot coding agent to resolve issues and create draft pull requests. The repository uses GitHub Actions for CI, and reviewers rely on pull request timelines and workflow artifacts to understand what the agent did.

During long-running agent tasks, the reviewers lose track of decisions and validation steps, which causes repeated questions and reworks when context drifts between iterations.

You need to persist task progress and decisions as durable artifacts and ensure that the reviewers can verify what the agent did during and after execution by using GitHub as the system of record.

What should you do for each requirement? To answer, drag the appropriate actions to the correct requirements. Each action may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q5 [topic 2 q5] OFFICIAL=image:image9.png COMMUNITY=none ===
DRAG DROP

You have a GitHub Enterprise Cloud Organization that uses the GitHub Copilot coding agent to resolve issues asynchronously.

When an issue is assigned to GitHub Copilot, the agent creates a draft pull request, but your team cannot always tell whether the agent is actively working, has completed its session, or is awaiting workflow approval.

Which execution context does each signal indicate? To answer, drag the appropriate context to the correct signals. Each signal may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q6 [topic 2 q6] OFFICIAL=letter:C COMMUNITY=C (1/1 votes: C=1) ===
You have a repository that uses the GitHub Copilot coding agent and supports hooks stored under .github/hooks.

You need a Shell command to run automatically whenever an agent execution fails.

Which type of hook should you use?

				  
A.
					postToolUse

				  
B.
					sessionEnd

				  
C.
					errorOccurred

				  
D.
					agentStop

=== Q7 [topic 2 q7] OFFICIAL=letter:C COMMUNITY=C (1/1 votes: C=1) ===
You are about to start a complex refactoring task in the GitHub Copilot CLI.

Before Copilot makes any changes, you need to review and agree on the approach.

What should you do first?

				  
A.
					Start the Copilot CLI and specify the --agent=Task parameter.

				  
B.
					Start the Copilot CLI and specify the --allow-all parameter.

				  
C.
					From the Copilot CLI, switch to plan mode.

				  
D.
					From the Copilot CLI, run the /compact command.

=== Q8 [topic 2 q8] OFFICIAL=letter:C COMMUNITY=C (1/1 votes: C=1) ===
A team assigns an issue to the GitHub Copilot coding agent by using the following one-line description: Fix the login bug.

Copilot creates a pull request, but the pull request is missing changes and has an incorrect scope.

How should you resolve the issue?

				  
A.
					Enable Copilot memory.

				  
B.
					Update the Model Context Protocol (MCP) server rate limits.

				  
C.
					Add a clear description of the problem to the issue.

				  
D.
					Allocate more resources to copilot-setup-steps.yml.

=== Q9 [topic 3 q1] OFFICIAL=letter:A COMMUNITY=D (1/1 votes: D=1) ===
Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Existing Environment

GitHub Environment

The GitHub environment contains the following:

Three repositories named product-api, billing-service, and infra-terraform.

Branch protection on the main branch in all repositories that requires at least one pull request review before merging

GitHub Actions runners used across all workflows

A GitHub team named SG_Dev that contains developers

A GitHub team named SG_Review that contains senior engineers and a security team

A .github/copilot-instructions.md file that includes general coding conventions for all features

Agent environment

The product-api repository uses a GitHub Copilot coding agent named agent1 that has the following configurations:

No custom agent profile is defined.

A Model Context Protocol (MCP) server named MCP1 is deployed to https://mcp.litwareinc.internal and provides access to internal ticketing and deployment APIs. MCP1 requires an API key for authentication.

A second Copilot coding agent named agent2 handles changes in infra-terraform and runs in parallel with agent1 when both agents have open assigned issues.

Copilot memory is NOT enabled for the organization.

Problem Statements

Litware identifies the following issues:

During two recent sessions, agent1 accessed files in billing-service, which is outside the agent's intended scope.

agent1 makes code changes immediately after receiving a task.

A developer named Ben, who is on the SG_Dev team, reports that agent1 completed a session with a successful status and opened a pull request, but the pull request contains no file changes. Other developers report this intermittently as well.

Both agent1 and agent2 modified shared/config.yaml in a parallel test run, generating conflicting outputs.

agent1 consistently uses raw try-catch blocks for error handling, which violates the defined implementation guidelines of SG_Dev.

Requirements

Planned Changes

Litware plans to make the following changes:

Ensure that agent1 can access all the tools in the environment.

Provide product-api with specific instructions to agent1 without affecting Copilot Chat or Copilot code review.

Configure MCP1 as a tool for agent1 by modifying the product-api repository MCP configuration.

Ensure that Copilot retains details that it has learned and uses that knowledge for future work. This must be applied to all licensed members of the organization.

Implementation guidelines

The development team at Litware identifies the following implementation guidelines:

Agent workflows must be able to run in parallel.

Application error handling must use the repository ErrorHandler class.

agent1 and agent2 must run on isolated branches during parallel execution. File-level conflicts must be detected before merges, and both agents must be able to run concurrently.

Security requirements

Litware identifies the following security requirements:

Only the members of SG_Review must be able to approve agent1 plan outputs.

All API keys must be stored and accessed securely.

The developers must NOT be able to self-approve.

Agent configuration

You need to configure agent1 to support the planned changes.

What should you do?

				  
A.
					Delete line 05 from the agent configuration.

				  
B.
					Add Use all available tools to the .github/copilot-instructions.md file.

				  
C.
					Add Use all available tools to the instructions in the agent configuration.

				  
D.
					Add the mcp-servers property to the agent configuration.

				  
E.
					In the agent configuration, replace line 05 with the following.05 tools: [].

=== Q10 [topic 3 q2] OFFICIAL=letter:B COMMUNITY=B (1/1 votes: B=1) ===
Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Existing Environment

GitHub Environment

The GitHub environment contains the following:

Three repositories named product-api, billing-service, and infra-terraform.

Branch protection on the main branch in all repositories that requires at least one pull request review before merging

GitHub Actions runners used across all workflows

A GitHub team named SG_Dev that contains developers

A GitHub team named SG_Review that contains senior engineers and a security team

A .github/copilot-instructions.md file that includes general coding conventions for all features

Agent environment

The product-api repository uses a GitHub Copilot coding agent named agent1 that has the following configurations:

No custom agent profile is defined.

A Model Context Protocol (MCP) server named MCP1 is deployed to https://mcp.litwareinc.internal and provides access to internal ticketing and deployment APIs. MCP1 requires an API key for authentication.

A second Copilot coding agent named agent2 handles changes in infra-terraform and runs in parallel with agent1 when both agents have open assigned issues.

Copilot memory is NOT enabled for the organization.

Problem Statements

Litware identifies the following issues:

During two recent sessions, agent1 accessed files in billing-service, which is outside the agent's intended scope.

agent1 makes code changes immediately after receiving a task.

A developer named Ben, who is on the SG_Dev team, reports that agent1 completed a session with a successful status and opened a pull request, but the pull request contains no file changes. Other developers report this intermittently as well.

Both agent1 and agent2 modified shared/config.yaml in a parallel test run, generating conflicting outputs.

agent1 consistently uses raw try-catch blocks for error handling, which violates the defined implementation guidelines of SG_Dev.

Requirements

Planned Changes

Litware plans to make the following changes:

Ensure that agent1 can access all the tools in the environment.

Provide product-api with specific instructions to agent1 without affecting Copilot Chat or Copilot code review.

Configure MCP1 as a tool for agent1 by modifying the product-api repository MCP configuration.

Ensure that Copilot retains details that it has learned and uses that knowledge for future work. This must be applied to all licensed members of the organization.

Implementation guidelines

The development team at Litware identifies the following implementation guidelines:

Agent workflows must be able to run in parallel.

Application error handling must use the repository ErrorHandler class.

agent1 and agent2 must run on isolated branches during parallel execution. File-level conflicts must be detected before merges, and both agents must be able to run concurrently.

Security requirements

Litware identifies the following security requirements:

Only the members of SG_Review must be able to approve agent1 plan outputs.

All API keys must be stored and accessed securely.

The developers must NOT be able to self-approve.

Agent configuration

You need to provide access to the API key of MCP1. The solution must meet the security requirements.

What should you do?

				  
A.
					Store the API key as a GitHub Codespaces user secret scoped to product-api.

				  
B.
					Store the API key as a secret in the Copilot environment of product-api by using a name prefix of COPILOT_MCP_, and then reference the variable name in the mcp.json configuration.

				  
C.
					In the product-api repository settings, add the API key directly to the .mcp/server.json file by using a plaintext apiKey field.

				  
D.
					In product-api, add the API key as a GitHub Actions encrypted secret and reference the secret by using ${{ secrets.KEY }} in the workflow YAML of agent1.

=== Q11 [topic 3 q3] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Existing Environment

GitHub Environment

The GitHub environment contains the following:

Three repositories named product-api, billing-service, and infra-terraform.

Branch protection on the main branch in all repositories that requires at least one pull request review before merging

GitHub Actions runners used across all workflows

A GitHub team named SG_Dev that contains developers

A GitHub team named SG_Review that contains senior engineers and a security team

A .github/copilot-instructions.md file that includes general coding conventions for all features

Agent environment

The product-api repository uses a GitHub Copilot coding agent named agent1 that has the following configurations:

No custom agent profile is defined.

A Model Context Protocol (MCP) server named MCP1 is deployed to https://mcp.litwareinc.internal and provides access to internal ticketing and deployment APIs. MCP1 requires an API key for authentication.

A second Copilot coding agent named agent2 handles changes in infra-terraform and runs in parallel with agent1 when both agents have open assigned issues.

Copilot memory is NOT enabled for the organization.

Problem Statements

Litware identifies the following issues:

During two recent sessions, agent1 accessed files in billing-service, which is outside the agent's intended scope.

agent1 makes code changes immediately after receiving a task.

A developer named Ben, who is on the SG_Dev team, reports that agent1 completed a session with a successful status and opened a pull request, but the pull request contains no file changes. Other developers report this intermittently as well.

Both agent1 and agent2 modified shared/config.yaml in a parallel test run, generating conflicting outputs.

agent1 consistently uses raw try-catch blocks for error handling, which violates the defined implementation guidelines of SG_Dev.

Requirements

Planned Changes

Litware plans to make the following changes:

Ensure that agent1 can access all the tools in the environment.

Provide product-api with specific instructions to agent1 without affecting Copilot Chat or Copilot code review.

Configure MCP1 as a tool for agent1 by modifying the product-api repository MCP configuration.

Ensure that Copilot retains details that it has learned and uses that knowledge for future work. This must be applied to all licensed members of the organization.

Implementation guidelines

The development team at Litware identifies the following implementation guidelines:

Agent workflows must be able to run in parallel.

Application error handling must use the repository ErrorHandler class.

agent1 and agent2 must run on isolated branches during parallel execution. File-level conflicts must be detected before merges, and both agents must be able to run concurrently.

Security requirements

Litware identifies the following security requirements:

Only the members of SG_Review must be able to approve agent1 plan outputs.

All API keys must be stored and accessed securely.

The developers must NOT be able to self-approve.

Agent configuration

You are evaluating how agent1 will behave after you implement the planned changes.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

=== Q12 [topic 3 q4] OFFICIAL=none COMMUNITY=C (2/3 votes: C=2,A=1) ===
Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Overview

Contoso Ltd. is a software development company located in the United States.

Existing Environment

GitHub Environment

Contoso uses GitHub Enterprise and assigns GitHub Copilot Pro+ licenses to its developers. The developers use Microsoft Visual Studio Code as their IDE.

Contoso has a customer portal. The code for the portal is stored in a GitHub repository named repo1 that contains the following:

A custom agent named agent1 that includes instructions to review specs related to best practices

A custom instruction file named validate-instructions.md that is used to validate tone of voice and applies to all .md and .txt files

A custom instruction file named codereview.instructions.md that is used by the Copilot coding agent but is excluded for use by the Copilot code review

repo1 has the following structure:

The front-end is stored in the /frontend folder.

The API logic is stored in the /api folder.

Contoso has a second repository named repo2 that contains a legacy .NET application named App1 built by using .NET 6. repo2 has a multi-agent workflow for modernization tasks.

Contoso enables the Model Context Protocol (MCP) registry and allows the Microsoft Learn MCP Server. Every developer must configure their own connection to the Learn MCP Server.

Problem Statements

The developers working in repo1 report that the Microsoft Learn documentation is NOT being retrieved when they attempt to validate a design by using agent1.

The testing team at Contoso identifies that the customer portal uses inconsistent UI styles, which leads to customer confusion and branding issues. The UI inconsistencies stem from variations in the folder structure.

Agent Logs

You have the following logs for the multi-agent workflow used in repo2.

Requirements

Planned Changes

Contoso plans to have all agents and developers in repo1 use the Microsoft Learn MCP to ensure that reviews are validated by using the appropriate documentation. This must be implemented centrally.

Contoso plans to leverage AI-powered coding agents to implement new portal features and pages.

Technical Requirements

App1 must be upgraded to .NET 10. A previous upgrade attempt was started by using the Copilot modernization agent, but the attempt was never finalized.

You plan to retry the upgrade. You must first analyze App1 by using AI, and then generate a report that contains breaking changes and deprecated patterns before retrying the upgrade.

All AI-generated code for UI styling must adhere to a predefined folder structure.

The architects at Contoso need help building implementation plans for repo1. The company wants to implement a new agent named agent2 to analyze the code base and the code requirements, and then respond with a detailed plan. The agent must NOT be able to edit files or run local commands.

The developers must be able to delegate work to the Copilot coding agent by assigning issues to the agent.

You need to make changes to repo1 to support the planned changes for the agents.

What should you modify?

				  
A.
					.github/agents/*.agent.md

				  
B.
					.vscode/settings.json

				  
C.
					.vscode/mcp.json

				  
D.
					&lt;project&gt;/.mcp/server.json

=== Q13 [topic 3 q5] OFFICIAL=none COMMUNITY=D (1/1 votes: D=1) ===
You have a GitHub repository.

You use the GitHub Copilot CLI to run an agentic workflow from the terminal.

During execution, the conversation history approaches the context limit. The agent cannot continue the current session unless the amount of retained context is reduced.

You need to continue the current session without losing all the prior progress.

Which Copilot CLI slash command should you run?

				  
A.
					/context

				  
B.
					/yolo

				  
C.
					/clear

				  
D.
					/compact

=== Q14 [topic 3 q6] OFFICIAL=none COMMUNITY=C (1/1 votes: C=1) ===
You have a GitHub Enterprise repository.

An agent opens pull requests to the main branch.

You need to ensure that changes to .github/workflows/* and /infra/* require approval from designated reviewers before merge.

What should you configure?

				  
A.
					a ruleset and an agents.md file

				  
B.
					a ruleset and a .copilotignore file

				  
C.
					a branch protection rule and a CODEOWNERS file

				  
D.
					a branch protection rule and copilot-instructions.md

=== Q15 [topic 3 q7] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

You have a GitHub repository that uses the following GrtHub Copilot CLI command in a Bash script.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

=== Q16 [topic 3 q8] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

You have a GitHub repository that uses GitHub Actions for CI.

Your team is piloting the GitHub Copilot coding agent to autonomously create branches and open pull requests. The repository follows trunk-based development that uses main as the default branch.

You need to ensure that the agent meets the following requirements:

Changes to main can occur only by using pull requests that have at least one approval.

When a pull request is opened, a validation workflow runs, and the agent can still create branches and open pull requests autonomously.

How should you configure the repository? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

=== Q17 [topic 3 q9] OFFICIAL=none COMMUNITY=C (1/2 votes: C=1,D=1) ===
You have a repository on github.com that uses the GitHub Copilot coding agent.

You also use the GitHub Copilot CLI locally to reproduce failures and continue the same work from your terminal.

You need to verify the current token usage.

Which Copilot CLI slash command should you run?

				  
A.
					/compact

				  
B.
					/diff

				  
C.
					/usage

				  
D.
					/context

=== Q18 [topic 3 q10] OFFICIAL=none COMMUNITY=none ===
DRAG DROP

Your team uses a remote GitHub Model Context Protocol (MCP) server for workflows in the software development life cycle (SDLC).

You need to commit a workspace-scoped MCP configuration to ensure that GitHub Copilot can connect to the GitHub-hosted MCP endpoint and authenticate by using a GitHub personal access token (PAT).

How should you complete the mcp.json configuration file? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q19 [topic 3 q11] OFFICIAL=none COMMUNITY=D (3/4 votes: E=1,D=3) ===
You have a GitHub Copilot coding agent named CodeAgent. The .agent.md file of CodeAgent contains the following YAML frontmatter.

---

name: CodeAgent

description: Performs repository analysis and code review tasks.

tools: ['edit', 'execute', 'read', 'search']

---

You need to issue a GitHub Copilot CLI command that preserves execution velocity for read-only tasks by eliminating approval prompts for low-risk tools. The solution must ensure that high-risk tools that can make changes remain available but still require explicit user approval before running.

Which command should you run?

				  
A.
					copilot agent run CodeAgent --deny-tool 'edit,execute'

				  
B.
					copilot agent run CodeAgent --allow-all-tools

				  
C.
					copilot agent run CodeAgent

				  
D.
					copilot agent run CodeAgent --allow-tool 'read,search'

				  
E.
					copilot agent run CodeAgent --allow-tool 'read,search' --deny-tool 'edit,execute'

=== Q20 [topic 3 q12] OFFICIAL=none COMMUNITY=none ===
DRAG DROP

You have a GitHub repository that uses GitHub Actions for CI on pull requests.

You have a GitHub Copilot coding agent that opens pull requests for backlog items, and your company requires automated checks for agent-generated changes.

You plan to standardize success criteria so that pull requests created by agents only succeed when unit tests pass and CodeQL analysis completes.

You need to configure a GitHub Actions workflow that runs on pull requests, executes unit tests, and performs CodeQL analysis.

How should you complete the workflow? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q21 [topic 3 q13] OFFICIAL=none COMMUNITY=A (1/1 votes: A=1) ===
You have a GitHub Enterprise Cloud repository that uses the GitHub Copilot coding agent.

Engineers assign issues to Copilot, and Copilot creates draft pull requests. The engineers start tasks either by assigning issues on github.com or by using GitHub Copilot Chat in an IDE. Reviewers request updates by leaving pull request comments.

You discover that sometimes, Copilot uses outdated requirements after a reviewer posts an updated instruction in a pull request comment, and, in several cases, Copilot fails to resume work from the comment.

You need to ensure that iteration requests are applied to the correct pull request session and are processed consistently.

What should you do?

				  
A.
					Ensure that the reviewer has write access to the repository. Instruct the reviewer to mention @copilot in the pull request comments.

				  
B.
					Ensure that the agent has write access to the repository. Instruct the reviewer to mention @github in the task comments.

				  
C.
					Ensure that the agent has write access to the repository. Instruct the reviewer to unassign and reassign the original issue to Copilot.

				  
D.
					Start a new task from Copilot Chat in the IDE. Instruct the reviewer to mention @github in the task comments.

=== Q22 [topic 3 q14] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

Your company uses GitHub Copilot custom agents in Microsoft Visual Studio Code.

The company also uses the Copilot coding agent on GitHub issues.

You have a file named .planner.agent.md that defines an agent named planner.planner has tools set to ['search', 'read', 'fetch']. There are explicit instructions NOT to write or modify any code. The file also defines a handoff labeled Start Implementation to an agent named implementer and sets send to false.

Developers report that after the planner agent produces a plan, implementation sometimes starts immediately in the same conversation, and code changes appear without an explicit agent switch.

When Copilot-created pull requests stall, maintainers review the pull request timeline and session logs. Several stalled sessions show outbound network commands blocked by a firewall, and the repositories do NOT contain a .github/copilot-instructions.md file.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

=== Q23 [topic 3 q15] OFFICIAL=none COMMUNITY=D (1/1 votes: D=1) ===
You have a GitHub repository.

Developers use the GitHub Copilot CLI and repository-scoped hooks under .github/hooks/*.json.

You need to allow the Copilot CLI to automatically run low-risk Bash commands. The solution must prevent the autonomous execution of high-risk commands, such as sudo, rm -rf /, and curl ... | bash.

What should you do?

				  
A.
					Configure a userPromptSubmitted hook that logs prompts and exits nonzero.

				  
B.
					Add .github/hooks/logs/ to .gitignore.

				  
C.
					Configure a sessionStart hook that prints a policy banner.

				  
D.
					Configure a preToolUse hook that returns permissionDecision: "deny".

=== Q24 [topic 3 q16] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

Your company uses Microsoft Visual Studio Code and GitHub Copilot Chat.

You have a GitHub repository that uses main as the default branch. The repository contains a workspace custom agent stored at .github/agents/release-notes.agent.md.

A developer switches to a branch named branch1 where the agent file does NOT exist. In the same session, the developer switches to a user profile named profile1.profile1 contains a custom agent file named release-notes.agent.md that has user-invokable set to false.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

=== Q25 [topic 4 q1] OFFICIAL=none COMMUNITY=none ===
DRAG DROP

You have a GitHub repository that uses a custom GitHub Copilot coding agent defined in the rollout-bot.agent.md file.

You need to update a workflow so that agent-profile changes can be rolled back by reverting a single commit and rerunning the workflow. The workflow must check out the exact commit being deployed and apply the agent profile from the repository at that commit.

How should you complete the workflow? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q26 [topic 4 q2] OFFICIAL=none COMMUNITY=none ===
You have a GitHub Enterprise organization that has Copilot memory enabled.

You create a new repository.

What are two ways that memories will be deleted from the repository? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.

				  
A.
					manually by repository members

				  
B.
					when the repository is archived

				  
C.
					when the code that created the memory is deleted

				  
D.
					automatically after 28 days

				  
E.
					when pull requests are merged

=== Q27 [topic 4 q3] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

You have a GitHub Enterprise organization that uses GitHub Copilot.

You discover that GitHub Copilot Chat responses in Microsoft Visual Studio Code are influenced by earlier, unrelated troubleshooting prompts from the same conversation.

You need to ensure that the Copilot Chat conversation context is limited to information relevant to the current work item. The solution must minimize effort.

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

=== Q28 [topic 4 q4] OFFICIAL=none COMMUNITY=none ===
DRAG DROP

Your company uses GitHub Copilot Enterprise.

Developers use GitHub Copilot agent mode in Microsoft Visual Studio Code on their laptops and Copilot Chat on github.com when they are away from their laptops.

When switching between environments, the developers notice that agent workflows lose continuity because the tools available in Visual Studio Code are unavailable on github.com.

You need to ensure that the agent tools and state are available consistently across environments and can be used from any device without local setup.

What should you do for each requirement? To answer, drag the appropriate actions to the correct requirements. Each action may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q29 [topic 4 q5] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

You have a GitHub repository that uses the GitHub Copilot coding agent to resolve issues and create draft pull requests.

You assign an issue to Copilot. Copilot creates a draft pull request. The pull request timeline shows Copilot started work, followed by status updates. The most recent status update is 55 minutes old.

You discover that the agent is no longer making progress.

You need to ensure that the work resumes without redoing the completed steps or changing the previously chosen approach.

What should you do? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

=== Q30 [topic 4 q6] OFFICIAL=none COMMUNITY=B (1/1 votes: B=1) ===
You have a GitHub repository that uses the GitHub Copilot coding agent.

Your company restricts GitHub Actions secrets.

Developers need the Copilot coding agent to call an internal dependency-scanning API during its run. The API requires an access token.

You need to ensure that the Copilot coding agent can use the token during execution without accessing the repository's Actions secrets and variables. The solution must prevent exposing the token in plaintext.

What should you do?

				  
A.
					Add the token as an Actions repository secret.

				  
B.
					Add the token as a secret in the Copilot environment.

				  
C.
					Store the token in a repository custom instructions file.

				  
D.
					Store the token in the agent configuration file.

=== Q31 [topic 5 q1] OFFICIAL=none COMMUNITY=A (1/1 votes: A=1) ===
You have a private GitHub repository that has Copilot memory enabled.

Several developers who have write access to the repository make changes across multiple branches, including creating some pull requests that are later closed without merging.

Your team needs to understand how GitHub Copilot ensures that only task-relevant, up-to-date information influences code suggestions, even when older memories exist.

How does Copilot manage memories?

				  
A.
					Copilot validates each memory's citations against the current branch before using the memory, and ignores the memory if the referenced code no longer exists.

				  
B.
					Copilot stores memories per user, ensuring that only the developer who created a memory can trigger the memory in future sessions.

				  
C.
					Copilot stores memories indefinitely until a repository administrator deletes them manually.

				  
D.
					Copilot automatically blocks memory creation from pull requests that are closed without merging, to prevent outdated information from being stored.

=== Q32 [topic 5 q2] OFFICIAL=none COMMUNITY=B (1/1 votes: B=1) ===
Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Existing Environment

GitHub Environment

The GitHub environment contains the following:

Three repositories named product-api, billing-service, and infra-terraform.

Branch protection on the main branch in all repositories that requires at least one pull request review before merging

GitHub Actions runners used across all workflows

A GitHub team named SG_Dev that contains developers

A GitHub team named SG_Review that contains senior engineers and a security team

A .github/copilot-instructions.md file that includes general coding conventions for all features

Agent environment

The product-api repository uses a GitHub Copilot coding agent named agent1 that has the following configurations:

No custom agent profile is defined.

A Model Context Protocol (MCP) server named MCP1 is deployed to https://mcp.litwareinc.internal and provides access to internal ticketing and deployment APIs. MCP1 requires an API key for authentication.

A second Copilot coding agent named agent2 handles changes in infra-terraform and runs in parallel with agent1 when both agents have open assigned issues.

Copilot memory is NOT enabled for the organization.

Problem Statements

Litware identifies the following issues:

During two recent sessions, agent1 accessed files in billing-service, which is outside the agent's intended scope.

agent1 makes code changes immediately after receiving a task.

A developer named Ben, who is on the SG_Dev team, reports that agent1 completed a session with a successful status and opened a pull request, but the pull request contains no file changes. Other developers report this intermittently as well.

Both agent1 and agent2 modified shared/config.yaml in a parallel test run, generating conflicting outputs.

agent1 consistently uses raw try-catch blocks for error handling, which violates the defined implementation guidelines of SG_Dev.

Requirements

Planned Changes

Litware plans to make the following changes:

Ensure that agent1 can access all the tools in the environment.

Provide product-api with specific instructions to agent1 without affecting Copilot Chat or Copilot code review.

Configure MCP1 as a tool for agent1 by modifying the product-api repository MCP configuration.

Ensure that Copilot retains details that it has learned and uses that knowledge for future work. This must be applied to all licensed members of the organization.

Implementation guidelines

The development team at Litware identifies the following implementation guidelines:

Agent workflows must be able to run in parallel.

Application error handling must use the repository ErrorHandler class.

agent1 and agent2 must run on isolated branches during parallel execution. File-level conflicts must be detected before merges, and both agents must be able to run concurrently.

Security requirements

Litware identifies the following security requirements:

Only the members of SG_Review must be able to approve agent1 plan outputs.

All API keys must be stored and accessed securely.

The developers must NOT be able to self-approve.

Agent configuration

You need to troubleshoot the issue reported by Ben.

What should you review?

				  
A.
					the GITHUB_TOKEN permissions block in the agent1 workflow

				  
B.
					the agent session log in the Agents panel

				  
C.
					the GitHub Actions runner log for the session job

				  
D.
					the GitHub Actions usage metrics of repo1

=== Q33 [topic 5 q3] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Overview

Contoso Ltd. is a software development company located in the United States.

Existing Environment

GitHub Environment

Contoso uses GitHub Enterprise and assigns GitHub Copilot Pro+ licenses to its developers. The developers use Microsoft Visual Studio Code as their IDE.

Contoso has a customer portal. The code for the portal is stored in a GitHub repository named repo1 that contains the following:

A custom agent named agent1 that includes instructions to review specs related to best practices

A custom instruction file named validate-instructions.md that is used to validate tone of voice and applies to all .md and .txt files

A custom instruction file named codereview.instructions.md that is used by the Copilot coding agent but is excluded for use by the Copilot code review

repo1 has the following structure:

The front-end is stored in the /frontend folder.

The API logic is stored in the /api folder.

Contoso has a second repository named repo2 that contains a legacy .NET application named App1 built by using .NET 6. repo2 has a multi-agent workflow for modernization tasks.

Contoso enables the Model Context Protocol (MCP) registry and allows the Microsoft Learn MCP Server. Every developer must configure their own connection to the Learn MCP Server.

Problem Statements

The developers working in repo1 report that the Microsoft Learn documentation is NOT being retrieved when they attempt to validate a design by using agent1.

The testing team at Contoso identifies that the customer portal uses inconsistent UI styles, which leads to customer confusion and branding issues. The UI inconsistencies stem from variations in the folder structure.

Agent Logs

You have the following logs for the multi-agent workflow used in repo2.

Requirements

Planned Changes

Contoso plans to have all agents and developers in repo1 use the Microsoft Learn MCP to ensure that reviews are validated by using the appropriate documentation. This must be implemented centrally.

Contoso plans to leverage AI-powered coding agents to implement new portal features and pages.

Technical Requirements

App1 must be upgraded to .NET 10. A previous upgrade attempt was started by using the Copilot modernization agent, but the attempt was never finalized.

You plan to retry the upgrade. You must first analyze App1 by using AI, and then generate a report that contains breaking changes and deprecated patterns before retrying the upgrade.

All AI-generated code for UI styling must adhere to a predefined folder structure.

The architects at Contoso need help building implementation plans for repo1. The company wants to implement a new agent named agent2 to analyze the code base and the code requirements, and then respond with a detailed plan. The agent must NOT be able to edit files or run local commands.

The developers must be able to delegate work to the Copilot coding agent by assigning issues to the agent.

You are evaluating the logs of the multi-agent workflow in repo2.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

=== Q34 [topic 5 q4] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

You have the following agent logs.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

=== Q35 [topic 5 q5] OFFICIAL=none COMMUNITY=D (1/1 votes: D=1) ===
You have a GitHub repository that uses GitHub Copilot code review on pull requests.

You plan to add repository-wide code review guidance that will apply to all files.

You need Copilot code review to consistently apply the guidance during pull request reviews.

What should you do?

				  
A.
					Modify the .github/pull_request_template.md file.

				  
B.
					Update the instructions in the .github/agents/*.agent.md files.

				  
C.
					Create a .github/instructions/copilot.instructions.md file.

				  
D.
					Create a .github/copilot-instructions.md file.

=== Q36 [topic 5 q6] OFFICIAL=none COMMUNITY=B (1/1 votes: B=1) ===
You have a GitHub Enterprise repository that uses the GitHub Copilot coding agent and opens draft pull requests for assigned issues.

Evaluation results show that the agent repeatedly opens pull requests that modify .github/workflows/*.yml to bypass failing checks instead of fixing the underlying code.

You need to ensure that the agent fixes the underlying code instead of bypassing the failing checks.

What should you do?

				  
A.
					Start the GitHub Copilot CLI by using --allow-all.

				  
B.
					Update .github/copilot-instructions.md.

				  
C.
					Create a branch ruleset.

				  
D.
					Disable GitHub Actions workflows for pull requests created by the agent.

=== Q37 [topic 5 q7] OFFICIAL=none COMMUNITY=D (1/1 votes: D=1) ===
You use a GitHub Actions workflow to orchestrate a multi-agent draft-review process for pull requests. The workflow uploads a single combined review-package artifact at the end of each run.

You discover that the review-package artifact is occasionally missing from the workflow run history, and you suspect that a user deleted it.

You need to identify which user manually deleted a workflow run artifact and when the deletion occurred.

What should you use?

				  
A.
					the checks.delete_logs audit log event

				  
B.
					the pull request description and comment history

				  
C.
					the merge commit history

				  
D.
					the artifact.destroy audit log event

=== Q38 [topic 5 q8] OFFICIAL=none COMMUNITY=C (1/1 votes: C=1) ===
You have a GitHub Enterprise Cloud Organization that uses the GitHub Copilot coding agent.

Copilot creates a draft pull request for an assigned issue, and the pull request timeline shows Copilot started work.

After 70 minutes, the agent session log stops updating, and the pull request body status stops changing.

You need to restart the agent so that it continues the task from the issue context and produces new commits to the existing draft pull request.

What should you do?

				  
A.
					Wait for the agent to complete.

				  
B.
					Merge the draft pull request and mention @copilot on the merged pull request.

				  
C.
					Unassign the issue from Copilot, and then reassign the issue to Copilot.

				  
D.
					Select Approve and run workflows in the pull request merge box.

=== Q39 [topic 5 q9] OFFICIAL=none COMMUNITY=D (1/1 votes: D=1) ===
You have a GitHub Enterprise Cloud Organization that uses a custom coding agent to run GitHub Actions workflows that create branches, open pull requests, and merge changes after required checks pass.

You need to log all agent-initiated actions and ensure that the logs are retained for two years.

What should you do?

				  
A.
					Configure audit log retention.

				  
B.
					Enable log forwarding.

				  
C.
					Enable Git events in the audit log.

				  
D.
					Configure audit log streaming to Azure Event Hubs.

=== Q40 [topic 5 q10] OFFICIAL=none COMMUNITY=C (1/1 votes: C=1) ===
You have multiple GitHub Copilot coding agents that run tasks concurrently.

You live stream the session log output and see the following.

What is a possible cause of the error?

				  
A.
					a postToolUse hook

				  
B.
					a GitHub app installation policy

				  
C.
					a preToolUse hook

				  
D.
					a Copilot firewall policy

=== Q41 [topic 5 q11] OFFICIAL=none COMMUNITY=C (1/1 votes: C=1) ===
You are analyzing the following agent logs.

You need to classify the error in a report for your company's CTO.

How should you classify the error?

				  
A.
					Context Issue

				  
B.
					Reasoning error

				  
C.
					Tool misuse

				  
D.
					Network issue

=== Q42 [topic 5 q12] OFFICIAL=none COMMUNITY=B (1/1 votes: B=1) ===
You have multiple GitHub Copilot coding agents that run tasks concurrently.

You are monitoring the agents from the terminal by using the GitHub CLI.

An agent appears stalled.

You need to live stream the session log output.

What should you do?

				  
A.
					Run gh agent-task view and specify the --log and --jq parameters.

				  
B.
					Run gh agent-task view and specify the --log and --follow parameters.

				  
C.
					Run gh agent-task list and specify the --web parameter.

				  
D.
					Run gh agent-task list and specify the --status and --jq parameters.

=== Q43 [topic 5 q13] OFFICIAL=none COMMUNITY=none ===
You have a GitHub Copilot coding agent that has completed a pull request for a security fix in your repository.

Before merging, you need to evaluate the quality of the agent's work by using both automated evaluation signals and human review.

You review the session log and the pull request.

What are two automated evaluation signals generated by the coding agent's built-in scanning tools? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.

				  
A.
					linting errors from the repository's CI pipeline configured in GitHub Actions

				  
B.
					comments from Copilot code review that suggest improvements to code patterns

				  
C.
					the detection of hardcoded secrets, such as API keys and tokens

				  
D.
					the median time to merge metric reported on the Copilot usage metrics dashboard

				  
E.
					CodeQL findings that identify security vulnerabilities in the generated code

=== Q44 [topic 5 q14] OFFICIAL=none COMMUNITY=B (1/1 votes: B=1) ===
You have a GitHub Enterprise repository that runs an autonomous agent by using a GitHub Actions workflow. The workflow has the following jobs:

agent-run that generates trace.json and plan.md

review that waits for human approval before continuing

deploy that uses the outputs from agent-run

You need to make the files inspectable in the GitHub Actions UI and ensure that the files are available to the review and deploy jobs.

What should you do in the workflow?

				  
A.
					Use dependency caching to store trace.json and plan.md.

				  
B.
					Upload trace.json and plan.md as workflow artifacts in agent-run, and download the files inside the jobs.

				  
C.
					Commit trace.json and plan.md back to the repository from agent-run.

				  
D.
					Store trace.json and plan.md on a network share and have later jobs retrieve them from the share.

=== Q45 [topic 5 q15] OFFICIAL=none COMMUNITY=A (1/1 votes: A=1) ===
A developer uses the GitHub Copilot CLI in plan mode.

Copilot produces a plan.

What does Copilot do next?

				  
A.
					saves the plan to plan.md

				  
B.
					creates a branch named /copilot/plan in the repository

				  
C.
					opens a pull request that has the plan as a comment

				  
D.
					begins the implementation

=== Q46 [topic 6 q1] OFFICIAL=none COMMUNITY=B (1/1 votes: B=1) ===
Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Existing Environment

GitHub Environment

The GitHub environment contains the following:

Three repositories named product-api, billing-service, and infra-terraform.

Branch protection on the main branch in all repositories that requires at least one pull request review before merging

GitHub Actions runners used across all workflows

A GitHub team named SG_Dev that contains developers

A GitHub team named SG_Review that contains senior engineers and a security team

A .github/copilot-instructions.md file that includes general coding conventions for all features

Agent environment

The product-api repository uses a GitHub Copilot coding agent named agent1 that has the following configurations:

No custom agent profile is defined.

A Model Context Protocol (MCP) server named MCP1 is deployed to https://mcp.litwareinc.internal and provides access to internal ticketing and deployment APIs. MCP1 requires an API key for authentication.

A second Copilot coding agent named agent2 handles changes in infra-terraform and runs in parallel with agent1 when both agents have open assigned issues.

Copilot memory is NOT enabled for the organization.

Problem Statements

Litware identifies the following issues:

During two recent sessions, agent1 accessed files in billing-service, which is outside the agent's intended scope.

agent1 makes code changes immediately after receiving a task.

A developer named Ben, who is on the SG_Dev team, reports that agent1 completed a session with a successful status and opened a pull request, but the pull request contains no file changes. Other developers report this intermittently as well.

Both agent1 and agent2 modified shared/config.yaml in a parallel test run, generating conflicting outputs.

agent1 consistently uses raw try-catch blocks for error handling, which violates the defined implementation guidelines of SG_Dev.

Requirements

Planned Changes

Litware plans to make the following changes:

Ensure that agent1 can access all the tools in the environment.

Provide product-api with specific instructions to agent1 without affecting Copilot Chat or Copilot code review.

Configure MCP1 as a tool for agent1 by modifying the product-api repository MCP configuration.

Ensure that Copilot retains details that it has learned and uses that knowledge for future work. This must be applied to all licensed members of the organization.

Implementation guidelines

The development team at Litware identifies the following implementation guidelines:

Agent workflows must be able to run in parallel.

Application error handling must use the repository ErrorHandler class.

agent1 and agent2 must run on isolated branches during parallel execution. File-level conflicts must be detected before merges, and both agents must be able to run concurrently.

Security requirements

Litware identifies the following security requirements:

Only the members of SG_Review must be able to approve agent1 plan outputs.

All API keys must be stored and accessed securely.

The developers must NOT be able to self-approve.

Agent configuration

You need to resolve the issue of the agents generating conflicting output. The solution must meet the implementation guidelines.

What should you do?

				  
A.
					Add shared/config.yaml to a CODEOWNERS file that requires SG_Review approval before any changes can be merged.

				  
B.
					Configure each agent to work on a separate branch and add a required status check that detects file-level overlap before either pull request can be merged.

				  
C.
					Configure tools: ['read', 'search'] in both agent profiles to prevent either agent from writing files.

				  
D.
					Configure a concurrency group on both agent workflows so that only one workflow runs at a time.

=== Q47 [topic 6 q2] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

You have a GitHub repository that contains the following custom agent files:

A file named planner.agent.md that includes YAML frontmatter with a handoffs entry that has label: Start Implementation, agent: implementer, and prompt: Now implement the plan outlined above

A file named implementer.agent.md that is in the same directory as planner.agent.md and includes YAML frontmatter that has name: IMPLEMENTER

You add a third agent file named review.agent.md.review.agent.md includes YAML frontmatter that has name: code-review.

You make the following changes to planner.agent.md:

Update the existing handoff to include send: true and model: GPT-5.2 (copilot).

Add a second handoff that has label: Run Review, agent: code-review, and prompt: Review the code changes made in the previous step.

No other agent files are modified.

For each of the following statements, select Yes if the statement is true. Otherwise, select No.

NOTE: Each correct selection is worth one point.

=== Q48 [topic 6 q3] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

You have a GitHub repository that uses GitHub Actions to validate pull requests opened by the GitHub Copilot coding agent. The workflow runs unit tests and a linter on pull request triggers, and Copilot opens draft pull requests on dedicated branches while iterating by using commits.

You discover that when multiple Copilot sessions push updates to the same pull request branch in quick succession, multiple workflow runs execute concurrently.

You need to enable parallel workflow executions across different pull request branches.

How should you configure workflow-level concurrency? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

=== Q49 [topic 6 q4] OFFICIAL=none COMMUNITY=D (1/1 votes: D=1) ===
You have a GitHub repository that contains an agent named Orchestrator.Orchestrator delegates work to the following specialized subagents:

Planner reviews issues and creates a plan of action.

Implementer writes code based on the plan of action.

Reviewer reviews the code.

You create a new agent named Summarizer that produces a concise summary of the work performed by the other agents.

You need to ensure that Orchestrator can invoke Summarizer as part of its workflow.

What should you do?

				  
A.
					In the YAML frontmatter of the Reviewer agent, add a handoffs entry that points to the Summarizer agent.

				  
B.
					In the YAML frontmatter of the Reviewer agent, add Summarizer to the agents list.

				  
C.
					In the YAML frontmatter of the Orchestrator agent, add Summarizer to the tools list.

				  
D.
					In the YAML frontmatter of the Orchestrator agent, add Summarizer to the agents list.

=== Q50 [topic 6 q5] OFFICIAL=none COMMUNITY=D (1/1 votes: D=1) ===
You have a multi-agent GitHub Actions workflow that uploads review artifacts for each run.

You discover that some workflow run artifacts are being deleted manually.

You need to use your organization's audit log data to identify which user deleted the artifacts.

Which audit log search filter should you use?

				  
A.
					repo:&lt;org&gt;/&lt;repo&gt;

				  
B.
					action:workflows.run

				  
C.
					operation:remove

				  
D.
					action:artifact.destroy

=== Q51 [topic 6 q6] OFFICIAL=none COMMUNITY=B (1/2 votes: B=1,A=1) ===
You have a GitHub Copilot coding agent named Orchestrator that runs a multi-phase workflow by using the following subagents:

Explorer gathers context by using read-only tools.

Modifier applies focused edits.

You are adding a new agent named Summarizer that generates a concise summary after modifications are complete. Summarizer includes the following YAML frontmatter.

The Orchestrator agent lists all three agents in its agents property.

After adding the Summarizer agent, Orchestrator successfully runs Explorer and Modifier but fails to run Summarizer.

What is a possible cause of the failure?

				  
A.
					Summarizer cannot be invoked as a subagent because disable-model-invocation is set to true.

				  
B.
					Orchestrator is missing a handoff entry to trigger Summarizer.

				  
C.
					Orchestrator cannot call Summarizer because user-invocable is set to false.

				  
D.
					Summarizer is missing the editing tools required to complete the workflow.

=== Q52 [topic 6 q7] OFFICIAL=none COMMUNITY=none ===
DRAG DROP

You have a GitHub repository that runs an agentic software development lifecycle (SDLC) workflow by using GitHub Actions. The workflow uses the following three executors implemented as scripts: spec_analyzer, risk_reviewer, and plan_merger.

You need to coordinate multiple specialized agents so that analysis and risk review run in parallel, and then a final executor merges the outputs into a single plan. The orchestration pattern must fan out one request to multiple executors, and then fan in the results to a final executor.

How should you complete the workflow definition? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q53 [topic 7 q1] OFFICIAL=none COMMUNITY=none ===
HOTSPOT

You have a GitHub repository that uses GitHub Copilot Chat in Microsoft Visual Studio Code. Custom agents are stored in the repository under version control.

Your team uses a multi-agent workflow where a planner agent produces an implementation plan that is then handed off to an implementation agent to make changes.

Recent prompts cause the planner agent to start editing files and running commands before the plan is approved.

You need to configure the planner agent to meet the following requirements:

Use only read-only tools.

Hand off to the implementation agent only after the plan is approved.

How should you configure the agent? To answer, select the appropriate options in the answer area.

NOTE: Each correct selection is worth one point.

=== Q54 [topic 7 q2] OFFICIAL=none COMMUNITY=none ===
DRAG DROP

Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Existing Environment

GitHub Environment

The GitHub environment contains the following:

Three repositories named product-api, billing-service, and infra-terraform.

Branch protection on the main branch in all repositories that requires at least one pull request review before merging

GitHub Actions runners used across all workflows

A GitHub team named SG_Dev that contains developers

A GitHub team named SG_Review that contains senior engineers and a security team

A .github/copilot-instructions.md file that includes general coding conventions for all features

Agent environment

The product-api repository uses a GitHub Copilot coding agent named agent1 that has the following configurations:

No custom agent profile is defined.

A Model Context Protocol (MCP) server named MCP1 is deployed to https://mcp.litwareinc.internal and provides access to internal ticketing and deployment APIs. MCP1 requires an API key for authentication.

A second Copilot coding agent named agent2 handles changes in infra-terraform and runs in parallel with agent1 when both agents have open assigned issues.

Copilot memory is NOT enabled for the organization.

Problem Statements

Litware identifies the following issues:

During two recent sessions, agent1 accessed files in billing-service, which is outside the agent's intended scope.

agent1 makes code changes immediately after receiving a task.

A developer named Ben, who is on the SG_Dev team, reports that agent1 completed a session with a successful status and opened a pull request, but the pull request contains no file changes. Other developers report this intermittently as well.

Both agent1 and agent2 modified shared/config.yaml in a parallel test run, generating conflicting outputs.

agent1 consistently uses raw try-catch blocks for error handling, which violates the defined implementation guidelines of SG_Dev.

Requirements

Planned Changes

Litware plans to make the following changes:

Ensure that agent1 can access all the tools in the environment.

Provide product-api with specific instructions to agent1 without affecting Copilot Chat or Copilot code review.

Configure MCP1 as a tool for agent1 by modifying the product-api repository MCP configuration.

Ensure that Copilot retains details that it has learned and uses that knowledge for future work. This must be applied to all licensed members of the organization.

Implementation guidelines

The development team at Litware identifies the following implementation guidelines:

Agent workflows must be able to run in parallel.

Application error handling must use the repository ErrorHandler class.

agent1 and agent2 must run on isolated branches during parallel execution. File-level conflicts must be detected before merges, and both agents must be able to run concurrently.

Security requirements

Litware identifies the following security requirements:

Only the members of SG_Review must be able to approve agent1 plan outputs.

All API keys must be stored and accessed securely.

The developers must NOT be able to self-approve.

Agent configuration

You need to implement the security requirements for agent1.

Which three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.

=== Q55 [topic 7 q3] OFFICIAL=none COMMUNITY=D (1/2 votes: D=1,A=1) ===
Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Existing Environment

GitHub Environment

The GitHub environment contains the following:

Three repositories named product-api, billing-service, and infra-terraform.

Branch protection on the main branch in all repositories that requires at least one pull request review before merging

GitHub Actions runners used across all workflows

A GitHub team named SG_Dev that contains developers

A GitHub team named SG_Review that contains senior engineers and a security team

A .github/copilot-instructions.md file that includes general coding conventions for all features

Agent environment

The product-api repository uses a GitHub Copilot coding agent named agent1 that has the following configurations:

No custom agent profile is defined.

A Model Context Protocol (MCP) server named MCP1 is deployed to https://mcp.litwareinc.internal and provides access to internal ticketing and deployment APIs. MCP1 requires an API key for authentication.

A second Copilot coding agent named agent2 handles changes in infra-terraform and runs in parallel with agent1 when both agents have open assigned issues.

Copilot memory is NOT enabled for the organization.

Problem Statements

Litware identifies the following issues:

During two recent sessions, agent1 accessed files in billing-service, which is outside the agent's intended scope.

agent1 makes code changes immediately after receiving a task.

A developer named Ben, who is on the SG_Dev team, reports that agent1 completed a session with a successful status and opened a pull request, but the pull request contains no file changes. Other developers report this intermittently as well.

Both agent1 and agent2 modified shared/config.yaml in a parallel test run, generating conflicting outputs.

agent1 consistently uses raw try-catch blocks for error handling, which violates the defined implementation guidelines of SG_Dev.

Requirements

Planned Changes

Litware plans to make the following changes:

Ensure that agent1 can access all the tools in the environment.

Provide product-api with specific instructions to agent1 without affecting Copilot Chat or Copilot code review.

Configure MCP1 as a tool for agent1 by modifying the product-api repository MCP configuration.

Ensure that Copilot retains details that it has learned and uses that knowledge for future work. This must be applied to all licensed members of the organization.

Implementation guidelines

The development team at Litware identifies the following implementation guidelines:

Agent workflows must be able to run in parallel.

Application error handling must use the repository ErrorHandler class.

agent1 and agent2 must run on isolated branches during parallel execution. File-level conflicts must be detected before merges, and both agents must be able to run concurrently.

Security requirements

Litware identifies the following security requirements:

Only the members of SG_Review must be able to approve agent1 plan outputs.

All API keys must be stored and accessed securely.

The developers must NOT be able to self-approve.

Agent configuration

You need to resolve the scoping issue associated to agent1.

What should you do?

				  
A.
					To the profile of agent1, add a custom instruction specifying that the agent must NOT access billing-service or infra-terraform.

				  
B.
					Add a permissions block to the agent1 workflow in product-api.

				  
C.
					Create a fine-grained personal access token (PAT) scoped to product-api and store the PAT as a GitHub Actions secret for agent1 to use.

				  
D.
					Create a ruleset for billing-service and infra-terraform that blocks push access from the github-actions bot account.

=== Q56 [topic 7 q4] OFFICIAL=none COMMUNITY=none ===
Case study

This is a case study. Case studies are not timed separately. You can use as much exam time as you would like to complete each case. However, there may be additional case studies and sections on this exam. You must manage your time to ensure that you are able to complete all questions included on this exam in the time provided.

To answer the questions included in a case study, you will need to reference information that is provided in the case study. Case studies might contain exhibits and other resources that provide more information about the scenario that is described in the case study. Each question is independent of the other questions in this case study.

At the end of this case study, a review screen will appear. This screen allows you to review your answers and to make changes before you move to the next section of the exam. After you begin a new section, you cannot return to this section.

To start the case study

To display the first question in this case study, click the Next button. Use the buttons in the left pane to explore the content of the case study before you answer the questions. Clicking these buttons displays information such as business requirements, existing environment, and problem statements. If the case study has an All Information tab, note that the information displayed is identical to the information displayed on the subsequent tabs. When you are ready to answer a question, click the Question button to return to the question.

Overview

Contoso Ltd. is a software development company located in the United States.

Existing Environment

GitHub Environment

Contoso uses GitHub Enterprise and assigns GitHub Copilot Pro+ licenses to its developers. The developers use Microsoft Visual Studio Code as their IDE.

Contoso has a customer portal. The code for the portal is stored in a GitHub repository named repo1 that contains the following:

A custom agent named agent1 that includes instructions to review specs related to best practices

A custom instruction file named validate-instructions.md that is used to validate tone of voice and applies to all .md and .txt files

A custom instruction file named codereview.instructions.md that is used by the Copilot coding agent but is excluded for use by the Copilot code review

repo1 has the following structure:

The front-end is stored in the /frontend folder.

The API logic is stored in the /api folder.

Contoso has a second repository named repo2 that contains a legacy .NET application named App1 built by using .NET 6. repo2 has a multi-agent workflow for modernization tasks.

Contoso enables the Model Context Protocol (MCP) registry and allows the Microsoft Learn MCP Server. Every developer must configure their own connection to the Learn MCP Server.

Problem Statements

The developers working in repo1 report that the Microsoft Learn documentation is NOT being retrieved when they attempt to validate a design by using agent1.

The testing team at Contoso identifies that the customer portal uses inconsistent UI styles, which leads to customer confusion and branding issues. The UI inconsistencies stem from variations in the folder structure.

Agent Logs

You have the following logs for the multi-agent workflow used in repo2.

Requirements

Planned Changes

Contoso plans to have all agents and developers in repo1 use the Microsoft Learn MCP to ensure that reviews are validated by using the appropriate documentation. This must be implemented centrally.

Contoso plans to leverage AI-powered coding agents to implement new portal features and pages.

Technical Requirements

App1 must be upgraded to .NET 10. A previous upgrade attempt was started by using the Copilot modernization agent, but the attempt was never finalized.

You plan to retry the upgrade. You must first analyze App1 by using AI, and then generate a report that contains breaking changes and deprecated patterns before retrying the upgrade.

All AI-generated code for UI styling must adhere to a predefined folder structure.

The architects at Contoso need help building implementation plans for repo1. The company wants to implement a new agent named agent2 to analyze the code base and the code requirements, and then respond with a detailed plan. The agent must NOT be able to edit files or run local commands.

The developers must be able to delegate work to the Copilot coding agent by assigning issues to the agent.

While upgrading App1, the agent identifies 47 issues, including a security vulnerability, and 46 API incompatibilities across different projects.

Which two actions are unsafe to delegate to the agent and require human involvement? Each correct answer presents a complete solution.

NOTE: Each correct selection is worth one point.

				  
A.
					Validate the assessment.md file for accuracy.

				  
B.
					Generate the assessment.md file.

				  
C.
					Approve all Git commits.

				  
D.
					Review the plan.md file for dependencies.

				  
E.
					Validate whether the tasks.md file exists.

=== Q57 [topic 7 q5] OFFICIAL=none COMMUNITY=none ===
DRAG DROP

You have a GitHub repository that uses the GitHub Copilot CLI to run autonomous tasks.

You need to validate each generated command before it runs. Any commands that attempt to modify paths outside the repository must be blocked.

How should you complete the YAML? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.

NOTE: Each correct selection is worth one point.

=== Q58 [topic 7 q6] OFFICIAL=none COMMUNITY=C (1/1 votes: C=1) ===
You have a GitHub Enterprise Cloud Organization that uses GitHub Actions for CI/CD.

You plan to enable an agent to update and deploy workflows that access production environment secrets.

You need to select an autonomy level for a compliance-sensitive workflow.

Which autonomy level should you select?

				  
A.
					read-only analysis with no ability to trigger workflows

				  
B.
					autonomous execution limited to non-production environments

				  
C.
					human-in-the-loop with required manual approvals for production

				  
D.
					fully autonomous execution without approvals
