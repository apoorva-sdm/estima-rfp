# Estima — RFP estimation prototype

**Live prototype:** https://apoorva-sdm.github.io/estima-rfp/

Estima is an intelligent estimation system designed for a global technological services and automotive giant. It helps pre-sales teams answer RFPs for SAP implementation projects by turning scope inputs into a defensible effort estimate in person-days.

This repository is a fully clickable, front-end prototype built from the Figma designs. It is not a set of linked screenshots: forms, dropdowns, chips, tables and dialogs all work, and the effort numbers are recalculated from your inputs.

## What you can try

1. **Sign in.** The fields are prefilled, and any username and password work.
2. **Home.** Open an in-progress estimate, or start from one of the activity cards.
3. **Create New Estimate.**
   - Estimate details and key estimation elements, with validation of mandatory fields
   - Estimate setup: calendar, working hours and productivity figures
   - SAP Modules and SAP Objects: add and remove chips, and get a suggestion from a similar estimate
   - Module-level complexity, then a choice between Default and Customized (RICEFW) configuration
   - Other estimation factors: integrations (with added rows), testing, environment and more
   - A short questionnaire, then the generated estimate: total effort, phase-wise effort and non-functional effort
4. **Estimate Directory.** Search for estimates, open one, and use Edit, Manage Access, Send for Approval, Export to Excel (CSV) or Export to PDF (print).

## Notes

- Client, project and people names are placeholders. The company logo is intentionally blurred.
- Everything runs in the browser. Data is kept only for the current tab session, and nothing is sent anywhere.
- Built with plain HTML, CSS and JavaScript. There is no build step, so open `index.html` through any static server.

Designed and prototyped by [Apoorva B S](https://apoorva-sdm.github.io/).
