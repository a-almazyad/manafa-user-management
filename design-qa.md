# Design QA — UC001 table alignment and hierarchy balance

## Visual source of truth

- Existing UC-001 `Current Structure` implementation before this refinement.
- Durable user direction: move `Owners & Executives` name rows to the left and make the `Ownership Hierarchy` more balanced and consistent.
- `/private/tmp/uc001-layout-before.png`

## Final implementation evidence

- `/private/tmp/uc001-table-final.png` — 1475 × 872 desktop table alignment
- `/private/tmp/uc001-hierarchy-pass1.png` — default viewport hierarchy
- `/private/tmp/uc001-hierarchy-narrow.png` — 900 × 760 responsive hierarchy

## Visual findings

- Owners & Executives table: passed. Arabic names retain RTL glyph direction while aligning to the left edge of the Name column. ID, Role, and Ownership Percentage keep their existing LTR alignment and table rhythm.
- Hierarchy columns: passed. Every owner/company name begins at one consistent horizontal origin. Ownership percentages and Retrieve Ownership actions use fixed, predictable columns.
- Ownership depth: passed. Only the expand/collapse control is indented; deeper Arabic names no longer drift to the right.
- Row balance: passed. A compact column-label band clarifies the owner, percentage, and action areas. Root, direct, and indirect levels preserve the existing subtle Atlassian neutral/blue treatments.
- Responsive behavior: passed. At 900 × 760 the hierarchy removes the desktop label band, preserves aligned name and percentage columns, and stacks Retrieve Ownership beneath the corporate owner name. The page does not gain global horizontal overflow.
- Typography and design system: passed. Cairo, Atlassian icons, blue links/actions, compact controls, borders, hover states, and focus behavior remain unchanged.

## Functional paths tested

- Expanded and collapsed `الشركة الوطنية للاستثمار الصناعي`; nested owners hide and return correctly.
- Opened Retrieve Ownership for the same corporate owner; the Wathq confirmation dialog appeared and Cancel closed it without changing data.
- Verified at 1475 × 872 and 900 × 760.
- Production build completed successfully.
- No lint script exists in the project, so lint could not be run.

## Comparison history

### Pass 1

- [P1] Owners & Executives names were forced to the right side of the Name column.
- [P1] Hierarchy indentation shifted the entire row, causing names and values to lose a consistent column origin across ownership levels.
- [P2] Ownership percentages and optional actions did not have a clearly balanced column structure.

### Final pass

- Left-aligned the RTL name controls inside the UC-001 table.
- Rebuilt hierarchy rows on a four-column CSS grid: level control, owner/company, ownership, and action.
- Moved depth indentation into the level-control column only.
- Added responsive action stacking without introducing page-level overflow.

No actionable P0, P1, or P2 visual differences remain in the tested states.

final result: passed
