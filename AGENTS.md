# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Prototype-specific design decisions

- Use the Atlassian/Jira design system as the product's UI language. Prefer official Atlassian icons, compact 16px controls, token-like blue/neutral colors, dense data tables, tabs, lozenges, and accessible focus states.
- Use the self-hosted Cairo variable font across the entire interface, including both Arabic and English content.
- Use `public/assets/manafa-logo.svg`, sourced from the official Manafa asset URL supplied by the user, as the header logo.
- Treat `public/reference/user-overview.png` and `public/reference/users-table.png` as the visual source of truth for the user-management screen.
- Keep the expanded sidebar at the screenshot-matched width and make the three-line control toggle a 72px icon-only collapsed state without moving the header branding.
- Keep the users table at the screenshot's 1470px baseline width and let cell content wrap when future values exceed their allocated column, rather than clipping data.
- Keep the overall admin shell fluid at different browser sizes and zoom levels. The overview cards must reflow from three columns to two and then one based on the available content width; do not force the entire page to a fixed minimum width. Preserve deliberate horizontal scrolling only inside dense table containers such as the 1470px users table.
- Keep new ownership and group-relationship views straightforward to port to PHP Blade: use ordinary tabs, data tables, section rows, badges, buttons, and basic CSS; avoid canvas/SVG diagrams, graph libraries, draggable nodes, connector maps, and complex layout logic.
- Keep the six overview cards visible above the tab row for Company Users, Invited Users, and Ownership & Management; switching tabs must only replace the content below the tabs.
- At a standard desktop browser window at 100% zoom, keep the six overview cards in a three-column, two-row layout even when the sidebar is expanded. Reflow to two or one column only when the actual content area is substantially narrower.
- Ownership and group-relationship tables must reuse the same header height, row rhythm, alternating backgrounds, borders, spacing, and CTA treatment as the Company Users table.
- Edit Group Structure must open a working form that updates the relationship, ownership/control, and status values shown in the table; never leave it as a toast-only action.
- Arabic content inside tables must use RTL text direction and right alignment; keep English labels, numbers, IDs, dates, and status columns in their existing LTR alignment.
- In the UC-001 ownership tree, show hierarchy through expandable nested levels and subtle level styling. Keep every Arabic owner name RTL and right-aligned inside its node while indentation is applied to the node controls, not to the Arabic text itself.
- Keep `Type` (`Individual` or `Company`) and `Ownership Level` (`Direct` or `Indirect`) in separate ownership-table columns; do not combine both concepts under one header.
- Treat `funding_request_capex_redesign_v3.html` and `funding_request_capex_redesign_v6.html` as revisions of the same CapEx funding-request detail, not separate destinations. Merge their complete business content into one native Manafa funding-request view.
- Organize the integrated financing feature under the existing company navigation: `Financing` contains `Funding Requests` and `Loans`, `Facility Contracts` remains a direct destination, and `Collateral` contains `Pledge Agreement`.
- Preserve the supplied financing business sequence and validations while rebuilding every screen with the existing Cairo/Atlassian Manafa shell; never embed or carry over the standalone source HTML styling.
- The funding request can only move to `Approved` after the supplier check is completed. Pledge Agreement creation must validate all four supplied fields and insert the created agreement into the native table.
- Keep the Create Loan progress sequence as `Create Loan`, `Tasks`, `Settings`, and `Live`, using the supplied admin screenshot as the visual reference for the first stage.
- Treat the loan stages as one persistent draft: required loan details unlock Tasks, all operational tasks unlock Settings, confirmed valid publishing settings unlock Live, and final confirmation is required before publishing.
- When an earlier loan stage changes, invalidate and relock its downstream stages. After publishing, lock the completed stepper against edits and provide working Live preview and new-draft reset actions rather than toast-only controls.
- Hide the earlier `Ownership Structure` and `Group Structure` prototype tabs. Replace them with `Ownership & Management` (UC-001) and `Permission Requests` (UC-008), using the User Management Post-Launch Enhancements BRD as the functional source of truth.
- UC-001 is read-only and Wathq-backed: support current owners and executives, direct and indirect hierarchy levels, stakeholder profiles, explicit corporate-owner retrieval with confirmation, per-company snapshots newest-first, empty/error/cooldown states, and ownership/management change history.
- UC-008 is a unified active-and-historical register: include manual and automatically processed requests, dedicated request details, delegated permissions, manager signature/invitation tracking, status-based SMS resend, signed documents, audit history, and read-only completed requests.
- Treat the recorded production request journey as the UC-008 interaction source of truth: overview request card and `Show All`, internal `Previous Requests` / `Pending Requests` tabs, compact request rows, the existing requester-details page with attached files and accept/reject actions, the full-page Authorization permission configurator, and the `Choose Delegators` modal for Delegation.
- UC-008 must enhance, not replace, that existing mechanism. Previously accepted rows become openable; accepted Authorization details show the exact saved practice method, delegation choice, and permission configuration in read-only form; accepted Delegation details show selected delegators, signature status and timestamps, allowed SMS resend, and the final signed document.
- Do not show Permission Requests as a lower User Management tab. Enter the existing production request journey from `Show All` on the overview Permissions Request card. The request register, request details, and Authorization permission configurator are dedicated subpages inside the admin shell: do not keep the six overview cards or the User Management tab strip above those subpages. Back returns from details/configuration to the request register, and selecting User Management in the sidebar returns to the overview.
- UC-001 must include both the read-only Owners & Executives table and a separate expandable ownership hierarchy. Implement the hierarchy as ordinary nested HTML lists/rows and CSS that can be ported to Blade; do not use canvas, SVG connectors, graph libraries, or drag-and-drop behavior.
- The UC-001 hierarchy must support multiple ownership levels, per-level expand/collapse, clickable individual and corporate owner profiles, visible owner details, explicit corporate-owner Wathq retrieval with confirmation, automatic expansion after a successful retrieval, and the existing cooldown/error protections.
- Do not add summary metric strips or informational read-only footers to UC-001; those are not part of the normal admin behavior.
- Use compact icon-only row actions matching the current admin: an eye for profile/detail viewing and a redo/refresh icon for Wathq retrieval or refresh, with accessible labels and native tooltips.
