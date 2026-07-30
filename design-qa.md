# Design QA — UC008 production permission journey

## Source visual truth

- `/Users/aalmazyad/Desktop/Screenshot 2026-07-30 at 9.12.03 AM.png` — overview request card and `Show All`
- `/Users/aalmazyad/Desktop/Screenshot 2026-07-30 at 9.12.08 AM.png` — `Previous Requests` empty state
- `/Users/aalmazyad/Desktop/Screenshot 2026-07-30 at 9.12.12 AM.png` — pending request register
- `/Users/aalmazyad/Desktop/Screenshot 2026-07-30 at 9.12.15 AM.png` — Authorization requester details and Accept/Reject
- `/Users/aalmazyad/Desktop/Screenshot 2026-07-30 at 9.12.22 AM.png`
- `/Users/aalmazyad/Desktop/Screenshot 2026-07-30 at 9.12.24 AM.png` — full-page Permissions configurator

## Implementation evidence

- `/private/tmp/uc008-wide-overview.png`
- `/private/tmp/uc008-norm-pending-final.png`
- `/private/tmp/uc008-norm-detail.png`
- `/private/tmp/uc008-norm-config.png`

## Combined comparison evidence

- `/private/tmp/uc008-qa-pending-final.png`
- `/private/tmp/uc008-qa-detail-final.png`
- `/private/tmp/uc008-qa-config-final.png`

The production webpage was cropped from each supplied screenshot at the shared application bounds and normalized to the same 1475 × 872 CSS-pixel viewport used for the final implementation captures. Each comparison places the source and implementation together in one image.

## Visual findings

- Information architecture: passed. The overview `Show All` action opens a dedicated `Pending Requests` workspace with the exact production tab order and no overview cards or lower User Management tab strip.
- Request register: passed. Rows reuse the production pale surface, request icon, type, RTL requester name, date, and status. Prototype-only request IDs, source/processing badges, and eye actions are absent.
- Request details: passed. `Authorization request`, Pending status, requester facts, `Attached files`, `Proof file`, Reject, and Accept follow the supplied component anatomy and alignment.
- Permissions configurator: passed. The two production cards, radio groups, complete checkbox hierarchy, collapse affordance, Back, and Approve use the same layout and density. `Manage Delegation` is included in the User Management group.
- Typography and tokens: passed. The self-hosted Cairo font, Manafa logo, Atlassian icons, blue actions, neutral surfaces, warning lozenges, borders, and focus states remain consistent with the current admin shell.
- Responsive behavior: passed. The shell stays fixed during subpage navigation, the requester facts reflow at narrower content widths, and the six overview cards remain 3 × 2 at 1920 × 1080.
- Accessibility: passed. Tabs expose selected state, the full request row is keyboard-actionable, Arabic names use RTL, controls have native labels, the rejection error is announced, and saved historical controls are disabled.

## Functional paths tested

- Overview `Show All` → Previous Requests / Pending Requests.
- Pending Authorization → requester details → Reject → required reason validation → Save → request moves to Previous Requests.
- Pending Authorization → Accept → Permissions → required permission selection → Approve → request moves to Previous Requests as Accepted.
- Previous accepted Authorization → requester details → View Permissions → exact saved Practice Method, Can Delegate, and checked permissions in the same disabled read-only configurator with no Approve action.
- Pending Delegation → requester details → Accept → working `Choose Delegators` modal.
- Header and sidebar remain stable throughout the journey; no shell scroll displacement remains.

## Comparison history

### Pass 1

- [P1] Register rows exposed prototype metadata and a separate eye action instead of matching production.
- [P1] Accepted Authorization displayed its saved permissions inline on a new-looking detail layout.
- [P2] The request card and permission cards used denser, smaller component anatomy than the supplied screenshots.
- [P2] The admin shell could programmatically scroll the header out of view after focused actions.

### Pass 2

- Removed request IDs, sources, processing badges, read-only badges, and eye actions from the production-shaped pages.
- Restored the production requester page and full-page Permissions configurator.
- Moved historical saved configuration behind `View Permissions` on that same configurator.
- Matched row width, RTL name placement, surfaces, spacing, button treatment, and responsive behavior.
- Prevented the fixed admin shell from becoming a hidden programmatic scroll container.

No actionable P0, P1, or P2 visual differences remain in the tested UC008 states.

final result: passed
