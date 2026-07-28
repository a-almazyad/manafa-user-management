# UC001 and UC008 Acceptance Checklist

Source: [User Management Post-Launch Enhancements](https://manafaco.atlassian.net/wiki/spaces/PTS/pages/4503044149/User+Management+Post-Launch+Enhancements)

## UC001 — View Ownership & Management Information

- [x] Show company owners and executives in a single read-only view.
- [x] Show stakeholder name, National ID or Unified Number, type, role/designation, ownership percentage, and ownership level.
- [x] Keep `Type` and `Ownership Level` in separate columns.
- [x] Show direct and indirect ownership levels.
- [x] Keep the ownership hierarchy in one flat Blade-friendly table with no collapsible rows.
- [x] Show every indirect owner’s parent company in an `Ownership Through` column.
- [x] Open clickable read-only profiles for individuals and companies.
- [x] Use compact eye and redo icons for profile and Wathq row actions.
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
- [x] Require confirmation before calling Wathq for a corporate owner.
- [x] On success, add the returned owners to the hierarchy and update their indirect ownership level.
- [x] On success, select and display the new per-company snapshot.
- [x] Enforce a visible cooldown after a successful corporate-owner retrieval.
- [x] Show change history with changed information, previous value, updated value, timestamp, and source.

## UC008 — View Permission Request Details

- [x] Show one unified permission-request list.
- [x] Include manual-review requests.
- [x] Include automatically processed system requests.
- [x] Include active and historical/completed requests.
- [x] Preserve pending Authorization and Delegation requests that require Operations action.
- [x] Show request ID, type, requester, submitted date/time, processing mode, status, and action.
- [x] Provide search, status, and processing-mode filters.
- [x] Open a dedicated detail view for every request.
- [x] Use a compact eye icon for the permission-request detail action.
- [x] Show request type, source, requester, company, processing mode, and current status.
- [x] Show requester NID/Iqama, date of birth, mobile number, request date, and all attached documents.
- [x] Show the requested permissions.
- [x] Require Operations to configure at least one permission before approving an Authorization request.
- [x] Require Operations to select at least one manager before approving a Delegation request.
- [x] Require a borrower-visible rejection reason before rejecting either request type.
- [x] Move an approved Delegation request into manager-signature tracking and issue manager invitations.
- [x] Record approvals, rejections, configured permissions, and selected managers in the audit history.
- [x] For delegation requests, show the delegation document.
- [x] For delegation requests, show all selected managers.
- [x] Show each manager’s signature status and invitation status.
- [x] Show the signed delegation document when available.
- [x] Allow Operations to resend SMS for pending or expired invitations when the request is active.
- [x] Update the manager invitation state and last-SMS time after resend.
- [x] Add the resend action to the audit log.
- [x] Record request actions and status changes in the audit log.
- [x] Make completed requests read-only.
- [x] Remove resend actions from completed requests.
- [x] Mark the feature as available to authorized Operations users only.

## Regression and Visual Checks

- [x] Keep all six overview cards visible above every user-management tab.
- [x] Hide the previous `Ownership Structure` and `Group Structure` tabs.
- [x] Preserve the current production-style header, CR search, company name, sidebar, and help action.
- [x] Reuse the existing Manafa/Atlassian table density, borders, alternating rows, badges, and buttons.
- [x] Keep the self-hosted Cairo font and official Manafa logo.
- [x] Preserve the working sidebar collapse/expand behavior.
- [x] Build successfully with Vite.
- [x] Load successfully in the in-app browser with no framework overlay.
- [x] Complete the tested UC001 and UC008 interaction paths with no console errors or warnings.
