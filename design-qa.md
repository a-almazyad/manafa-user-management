# Design QA — Blade-friendly UC001/UC008 action refinement

source visual truth:

- `/Users/aalmazyad/Documents/Claudecode/manafa-user-management/public/reference/users-table.png`
- The user’s latest direction: remove the UC001 metric strip and read-only footer, replace collapsible ownership rows with a standard Blade-friendly table, and use compact eye/redo row actions.

implementation screenshots:

- `/private/tmp/uc001-flat-actions-final.png`
- `/private/tmp/uc001-flat-actions-right-final.png`
- `/private/tmp/uc008-eye-actions-final.png`

combined comparison:

- `/private/tmp/uc001-refinement-comparison.png`

viewport: 1280 × 720 CSS px in the Codex in-app browser

pixel dimensions and density normalization:

- Source: 1902 × 940 px, 72 dpi.
- Implementation captures: 1280 × 720 px, normalized by the Browser screenshot API.
- Browser CSS viewport: 1280 × 720 with `devicePixelRatio: 2`.
- The source’s top-left 1280 × 720 region and the implementation’s 1280 × 720 capture were placed in one 1280 × 1460 comparison image. The source is a wider desktop state, so the comparison judges shared shell geometry, typography, tokens, table rhythm, borders, and alignment without claiming identical wide-grid proportions at the narrower test viewport.

state:

- User Management → Ownership & Management → Current Structure
- User Management → Permission Requests → unified request list
- Focused ownership-table state horizontally scrolled to `Ownership Through` and `Actions`

## Full-view comparison evidence

The combined comparison confirms that the revised ownership view still uses the production Manafa header, CR search row, expanded company sidebar, Cairo typography, neutral background, standard tabs, dense black table header, alternating neutral rows, compact badges, and the same border rhythm as the Company Users source.

Removing the four-metric strip moves the table closer to the section heading and restores the normal admin information hierarchy. Removing the bottom read-only message eliminates the non-standard informational footer.

## Focused region comparison evidence

The focused right-side ownership capture verifies a flat table with ordinary rows only. Direct and indirect records remain visible at the same time; indirect rows show their parent company in `Ownership Through`. No row expander, nested indentation, connector, diagram, or JavaScript-only hierarchy control remains.

The ownership `Actions` column uses compact Atlaskit eye and redo icons. The eye opens the stakeholder profile; redo opens the existing confirmation flow for retrieval/refresh and preserves in-progress/cooldown behavior. The permission-request list now uses the same eye-only detail action.

## Findings

- No actionable P0, P1, or P2 visual differences remain in the tested states.
- Fonts and typography: passed. Self-hosted Cairo remains active across Arabic and English. Ownership names now use plain dark table text matching the source instead of a second clickable profile affordance.
- Spacing and layout rhythm: passed. The non-standard summary strip and footer are gone; table density, padding, row height, borders, and alternating backgrounds remain consistent with the production table.
- Colors and visual tokens: passed. The screen continues to use the existing Manafa/Atlassian blue, neutral, success, warning, and purple tokens.
- Image quality and asset fidelity: passed. The official Manafa logo remains unchanged and all actions use installed Atlaskit icons.
- Copy and content: passed. `Ownership Through` communicates the former hierarchy in a Blade-friendly column, and icon actions expose native tooltips plus descriptive accessible labels.
- Accessibility: passed for the tested path. Icon-only buttons have `aria-label` and `title`, disabled refresh actions remain non-interactive during progress/cooldown, Arabic relationship cells use RTL direction, and the eye action opens the labelled profile/detail view.

## Comparison history

### Pass 1 — blocked

- [P1] UC001 used a collapsible ownership hierarchy that did not fit the implementation team’s Blade table capability.
  - Fix: removed expandable state and rendered all direct/indirect records as normal rows with an `Ownership Through` column.
- [P2] Four ownership summary boxes and a bottom read-only note introduced patterns not used by the normal admin.
  - Fix: removed both sections and tightened the section-to-table spacing.
- [P2] Text-heavy row buttons did not match existing action treatment.
  - Fix: replaced ownership profile/retrieval actions with eye/redo icons and permission `View details` with an eye icon.
- [P2] Ownership names remained clickable after the eye action was added, creating duplicate profile affordances.
  - Fix: changed current-structure names to plain RTL table text and kept profile access exclusively in the action column.

### Pass 2 — passed

- The final combined and focused captures show a standard table-only implementation, consistent row rhythm, no non-standard summary/footer, no expandable ownership behavior, and compact working icon actions.

## Primary interactions tested

- Eye icon on an individual ownership row opened the read-only stakeholder profile and the modal closed successfully.
- Redo icon on an unretrieved corporate owner opened the explicit Wathq confirmation.
- Confirming retrieval added the returned owners as always-visible flat rows, populated `Ownership Through`, and changed the redo action to the cooldown state.
- Permission-request eye icon opened the correct dedicated request detail.
- Vite production build completed successfully.
- Browser page identity and meaningful content were verified; no framework overlay appeared.
- Final browser warning/error log was empty.

## Follow-up polish

- [P3] The fixed 1280 px in-app viewport requires the existing horizontal-scroll behavior to reach the final ownership columns. At the 1902 px production reference width, the 1470 px table fits within the established expanded-sidebar layout.

final result: passed
