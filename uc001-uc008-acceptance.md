# UC001 and UC008 Acceptance Checklist

Source: [User Management Post-Launch Enhancements](https://manafaco.atlassian.net/wiki/spaces/PTS/pages/4503044149/User+Management+Post-Launch+Enhancements)

## UC001 — View Ownership & Management Information

- [x] Show company owners and executives in a read-only table first, then show owners again in a dedicated hierarchy below it.
- [x] Keep the Current Structure table to exactly four columns: `Name`, `ID`, `Role`, and `Ownership Percentage`.
- [x] Show direct and indirect ownership levels.
- [x] Show the current company as the ownership-tree root.
- [x] Show direct owners at level 1 and indirect owners at deeper ownership levels.
- [x] Support multiple ownership levels with nested Blade-friendly HTML rows and no graph library.
- [x] Allow admins to expand or collapse individual corporate-owner levels.
- [x] Keep each hierarchy row simple: RTL owner name and ownership percentage only, plus the retrieval action when the owner is a company.
- [x] Open clickable read-only profiles for individuals and companies.
- [x] Keep Arabic stakeholder names RTL and aligned to the same right edge, including indirect rows.
- [x] Show the latest successful Wathq response as the current structure.
- [x] Show last successful retrieval date and time.
- [x] Provide a manual main-company Wathq refresh action.
- [x] Prevent duplicate calls while a Wathq request is in progress.
- [x] Display the required failure message with the Wathq error code.
- [x] Create no snapshot when the Wathq call fails.
- [x] Store successful Wathq responses as separate, never-overwritten snapshots.
- [x] Store snapshots per company.
- [x] Order snapshots newest to oldest.
- [x] Make snapshots selectable.
- [x] Show snapshot date/time, trigger, returned ownership/management information, and response status.
- [x] Show the exact required empty state: “No Wathq information has been retrieved for this company yet.”
- [x] Show the empty-state action: “Call Wathq”.
- [x] Call a corporate owner explicitly only; no automatic retrieval is triggered.
- [x] Require a valid 10-digit Unified Number before showing the corporate-owner retrieval action.
- [x] Show a visible `Retrieve Ownership` button on eligible corporate-owner hierarchy rows.
- [x] Require confirmation before calling Wathq for a corporate owner.
- [x] On success, add the returned owners to the hierarchy, update their indirect ownership level, and automatically expand the retrieved corporate owner.
- [x] On success, select and display the new per-company snapshot.
- [x] Enforce a visible cooldown after a successful corporate-owner retrieval.
- [x] Show change history with changed information, previous value, updated value, timestamp, and source.

## UC008 — View Permission Request Details

- [x] Preserve the production `Previous Requests` and `Pending Requests` internal tabs.
- [x] Keep Permission Requests out of the lower User Management tab row and enter the register from `Show All` on the overview request card.
- [x] Open the Permission Request register, request details, and Authorization configurator as dedicated admin subpages without the overview cards or User Management tab strip.
- [x] Return from request details/configuration to the request register, and return to the overview through the active User Management sidebar item.
- [x] Include manual-review requests.
- [x] Include automatically processed system requests.
- [x] Include active and historical/completed requests.
- [x] Preserve pending Authorization and Delegation requests that require Operations action.
- [x] Show compact production-style request rows with request type, RTL requester name, request date, and status only.
- [x] Open a dedicated detail view for every request.
- [x] Make the full compact request row the detail action, matching production without an added eye button.
- [x] Keep prototype request IDs, sources, processing badges, and read-only badges out of the production-shaped row and requester page.
- [x] Show requester NID/Iqama, date of birth, mobile number, request date, and all attached documents.
- [x] Preserve the existing request details → Accept/Reject sequence.
- [x] Preserve the existing full-page Authorization permission configurator, including Practice Method, Can Delegate, and the permission hierarchy.
- [x] Preserve the existing Delegation `Choose Delegators` modal.
- [x] Require Operations to configure at least one permission before approving an Authorization request.
- [x] Require Operations to select at least one manager before approving a Delegation request.
- [x] Require a borrower-visible rejection reason before rejecting either request type.
- [x] Move an accepted request from Pending Requests to Previous Requests.
- [x] Make every previous accepted request openable from its existing request row.
- [x] Open an accepted Authorization request through the same requester page, then show its saved Practice Method, Can Delegate value, and full granted-permission configuration through `View Permissions` on the same configurator in read-only form.
- [x] Move an approved Delegation request into manager-signature tracking and issue manager invitations.
- [x] Record approvals, rejections, configured permissions, and selected managers in the audit history.
- [x] For delegation requests, show the delegation document.
- [x] For delegation requests, show all selected managers.
- [x] Show each manager’s signature status, signing date/time, and latest SMS time.
- [x] Show the signed delegation document when available.
- [x] Allow Operations to resend SMS for pending or expired invitations when the request is active.
- [x] Update the manager invitation state and last-SMS time after resend.
- [x] Add the resend action to the audit log.
- [x] Record request actions and status changes in the audit log.
- [x] Make completed requests read-only.
- [x] Remove resend actions from completed requests.
- [x] Mark the feature as available to authorized Operations users only.

## Regression and Visual Checks

- [x] Keep all six overview cards visible above Company Users, Invited Users, and Ownership & Management; hide them on the dedicated Permission Request subpages.
- [x] Hide the previous `Ownership Structure` and `Group Structure` tabs.
- [x] Preserve the current production-style header, CR search, company name, sidebar, and help action.
- [x] Reflow overview cards from three to two to one column without page-level horizontal clipping; keep horizontal scrolling scoped to dense tables.
- [x] Reuse the existing Manafa/Atlassian table density, borders, alternating rows, badges, and buttons.
- [x] Keep the self-hosted Cairo font and official Manafa logo.
- [x] Preserve the working sidebar collapse/expand behavior.
- [x] Build successfully with Vite.
- [x] Load successfully in the in-app browser with no framework overlay.
- [x] Complete the tested UC001 and UC008 interaction paths with no console errors or warnings.
