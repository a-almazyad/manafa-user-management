import { useEffect, useMemo, useState } from "react";
import ArrowLeftIcon from "@atlaskit/icon/core/arrow-left";
import CheckCircleIcon from "@atlaskit/icon/core/check-circle";
import DownloadIcon from "@atlaskit/icon/core/download";
import EyeOpenIcon from "@atlaskit/icon/core/eye-open";
import LockIcon from "@atlaskit/icon/core/lock-locked";
import RedoIcon from "@atlaskit/icon/core/redo";
import RefreshIcon from "@atlaskit/icon/core/refresh";
import SearchIcon from "@atlaskit/icon/core/search";
import WarningIcon from "@atlaskit/icon/core/warning";

const MAIN_COMPANY_ID = "1010225259";
const LOADED_CORPORATE_OWNER_ID = "1010123456";
const UNCALLED_CORPORATE_OWNER_ID = "7000018432";

const ownershipStakeholdersSeed = [
  {
    key: "owner-salman",
    id: "1006745231",
    name: "سلمان بن عبدالعزيز آل سعود",
    stakeholderType: "Individual",
    role: "Owner",
    designation: "Partner",
    ownership: 35,
    level: "Direct",
    source: "Wathq",
  },
  {
    key: "owner-mohammed",
    id: "1012345678",
    name: "محمد بن عبدالله آل سعود",
    stakeholderType: "Individual",
    role: "Owner",
    designation: "Partner",
    ownership: 25,
    level: "Direct",
    source: "Wathq",
  },
  {
    key: "owner-industrial-company",
    id: LOADED_CORPORATE_OWNER_ID,
    name: "الشركة الوطنية للاستثمار الصناعي",
    stakeholderType: "Company",
    role: "Owner",
    designation: "Corporate Owner",
    ownership: 30,
    level: "Direct",
    source: "Wathq",
    childrenLoaded: true,
  },
  {
    key: "owner-industrial-portfolio",
    id: "7000002814",
    name: "محفظة القطاع الصناعي",
    stakeholderType: "Company",
    role: "Owner",
    designation: "Investment Portfolio",
    ownership: 60,
    level: "Indirect",
    source: "Wathq",
    parentId: LOADED_CORPORATE_OWNER_ID,
  },
  {
    key: "owner-industrial-person",
    id: "1029084176",
    name: "عبدالعزيز بن خالد العتيبي",
    stakeholderType: "Individual",
    role: "Owner",
    designation: "Partner",
    ownership: 40,
    level: "Indirect",
    source: "Wathq",
    parentId: LOADED_CORPORATE_OWNER_ID,
  },
  {
    key: "owner-north-holding",
    id: UNCALLED_CORPORATE_OWNER_ID,
    name: "شركة الشمال القابضة",
    stakeholderType: "Company",
    role: "Owner",
    designation: "Corporate Owner",
    ownership: 10,
    level: "Direct",
    source: "Wathq",
    childrenLoaded: false,
    unifiedNumber: UNCALLED_CORPORATE_OWNER_ID,
  },
  {
    key: "executive-chairman",
    id: "1007304304",
    name: "احمد محمد عبدالرحمن الفالح",
    stakeholderType: "Individual",
    role: "Executive",
    designation: "Chairman",
    ownership: null,
    level: "Direct",
    source: "Wathq",
  },
  {
    key: "executive-director",
    id: "1001068640",
    name: "هاني سليمان عبدالرحمن الصالح",
    stakeholderType: "Individual",
    role: "Executive",
    designation: "Company Director",
    ownership: null,
    level: "Direct",
    source: "Wathq",
  },
];

const retrievedCorporateChildren = [
  {
    key: "owner-north-person",
    id: "1017739204",
    name: "نواف بن عبدالله الحربي",
    stakeholderType: "Individual",
    role: "Owner",
    designation: "Partner",
    ownership: 70,
    level: "Indirect",
    source: "Wathq",
    parentId: UNCALLED_CORPORATE_OWNER_ID,
  },
  {
    key: "owner-north-company",
    id: "7000030172",
    name: "شركة روافد الاستثمار",
    stakeholderType: "Company",
    role: "Owner",
    designation: "Corporate Owner",
    ownership: 30,
    level: "Indirect",
    source: "Wathq",
    parentId: UNCALLED_CORPORATE_OWNER_ID,
  },
];

const mainSnapshotRows = ownershipStakeholdersSeed
  .filter((row) => !row.parentId)
  .map((row) => ({ ...row }));

const historicalMainSnapshotRows = mainSnapshotRows.map((row) => (
  row.key === "owner-salman" ? { ...row, ownership: 30 } :
    row.key === "owner-mohammed" ? { ...row, ownership: 30 } :
      row
));

const snapshotsSeed = {
  [MAIN_COMPANY_ID]: [
    {
      id: "WTHQ-2026-0727-1142",
      companyId: MAIN_COMPANY_ID,
      companyName: "شركة اسمنت الجوف",
      retrievedAt: "27 Jul 2026, 11:42 AM",
      trigger: "Admin manual refresh",
      status: "Successful",
      rows: mainSnapshotRows,
    },
    {
      id: "WTHQ-2026-0718-0916",
      companyId: MAIN_COMPANY_ID,
      companyName: "شركة اسمنت الجوف",
      retrievedAt: "18 Jul 2026, 9:16 AM",
      trigger: "Company profile search",
      status: "Successful",
      rows: historicalMainSnapshotRows,
    },
    {
      id: "WTHQ-2026-0705-1548",
      companyId: MAIN_COMPANY_ID,
      companyName: "شركة اسمنت الجوف",
      retrievedAt: "5 Jul 2026, 3:48 PM",
      trigger: "Scheduled sync",
      status: "Successful",
      rows: historicalMainSnapshotRows.slice(0, 6),
    },
  ],
  [LOADED_CORPORATE_OWNER_ID]: [
    {
      id: "WTHQ-2026-0722-1015",
      companyId: LOADED_CORPORATE_OWNER_ID,
      companyName: "الشركة الوطنية للاستثمار الصناعي",
      retrievedAt: "22 Jul 2026, 10:15 AM",
      trigger: "Corporate owner retrieval",
      status: "Successful",
      rows: ownershipStakeholdersSeed.filter((row) => row.parentId === LOADED_CORPORATE_OWNER_ID),
    },
  ],
  [UNCALLED_CORPORATE_OWNER_ID]: [],
};

const changeHistory = [
  {
    id: "change-1",
    information: "Ownership percentage · سلمان بن عبدالعزيز آل سعود",
    previous: "30%",
    updated: "35%",
    changedAt: "27 Jul 2026, 11:42 AM",
    source: "Wathq · WTHQ-2026-0727-1142",
  },
  {
    id: "change-2",
    information: "Ownership percentage · محمد بن عبدالله آل سعود",
    previous: "30%",
    updated: "25%",
    changedAt: "27 Jul 2026, 11:42 AM",
    source: "Wathq · WTHQ-2026-0727-1142",
  },
  {
    id: "change-3",
    information: "Management designation · احمد محمد عبدالرحمن الفالح",
    previous: "Board Member",
    updated: "Chairman",
    changedAt: "18 Jul 2026, 9:16 AM",
    source: "Wathq · WTHQ-2026-0718-0916",
  },
  {
    id: "change-4",
    information: "Corporate owner added · شركة الشمال القابضة",
    previous: "—",
    updated: "10% direct ownership",
    changedAt: "5 Jul 2026, 3:48 PM",
    source: "Wathq · WTHQ-2026-0705-1548",
  },
];

const permissionRequestsSeed = [
  {
    id: "PR-2026-0189",
    type: "Authorization",
    requestedBy: "أحمد خالد العتيبي",
    requesterNationalId: "1038472916",
    requesterDob: "14 Mar 1988",
    requesterPhone: "0551847263",
    submittedAt: "28 Jul 2026, 9:14 AM",
    processing: "Manual review",
    status: "Pending review",
    source: "Borrower Portal",
    requestedFor: "شركة اسمنت الجوف",
    permissions: [],
    files: ["authorization-letter-0189.pdf"],
    delegationDocument: null,
    signedDocument: null,
    completed: false,
    managers: [],
    audit: [
      { id: "audit-189-1", event: "Authorization request submitted for Operations review", actor: "أحمد خالد العتيبي", at: "28 Jul 2026, 9:14 AM" },
    ],
  },
  {
    id: "PR-2026-0188",
    type: "Delegation",
    requestedBy: "سارة عبدالله الزهراني",
    requesterNationalId: "1047281935",
    requesterDob: "22 Sep 1991",
    requesterPhone: "0557291846",
    submittedAt: "27 Jul 2026, 11:36 AM",
    processing: "Manual review",
    status: "Pending review",
    source: "Borrower Portal",
    requestedFor: "شركة اسمنت الجوف",
    permissions: ["Facility Contract", "Assignment of Proceeds"],
    files: ["delegation-request-0188.pdf", "articles-of-association-0188.pdf"],
    delegationDocument: "delegation-request-0188.pdf",
    signedDocument: null,
    completed: false,
    managers: [
      { id: "manager-8", name: "خالد محمد الشمري", nationalId: "1019283746", phone: "0559182734", signature: "Not requested", invitation: "Not sent", lastSms: "—" },
      { id: "manager-9", name: "منى عبدالعزيز القحطاني", nationalId: "1028374651", phone: "0558273641", signature: "Not requested", invitation: "Not sent", lastSms: "—" },
    ],
    audit: [
      { id: "audit-188-1", event: "Delegation request submitted for Operations review", actor: "سارة عبدالله الزهراني", at: "27 Jul 2026, 11:36 AM" },
    ],
  },
  {
    id: "PR-2026-0187",
    type: "Delegation",
    requestedBy: "عيسى بسام فرح باعيسى",
    requesterNationalId: "1008343939",
    requesterDob: "24 Nov 1992",
    requesterPhone: "0553637002",
    submittedAt: "26 Jul 2026, 2:18 PM",
    processing: "Manual review",
    status: "Awaiting signatures",
    source: "Borrower Portal",
    requestedFor: "شركة اسمنت الجوف",
    permissions: ["Facility Contract", "Company Promissory Note", "Assignment of Proceeds"],
    files: ["delegation-request-0187.pdf"],
    delegationDocument: "delegation-request-0187.pdf",
    signedDocument: null,
    completed: false,
    managers: [
      { id: "manager-1", name: "محمد عبدالله السبيعي", nationalId: "1029084176", phone: "0554318721", signature: "Signed", invitation: "Completed", lastSms: "26 Jul, 2:19 PM" },
      { id: "manager-2", name: "نورة فهد القحطاني", nationalId: "1043019726", phone: "0558271046", signature: "Pending", invitation: "Pending", lastSms: "26 Jul, 2:19 PM" },
      { id: "manager-3", name: "سلمان أحمد العمري", nationalId: "1034862910", phone: "0552087134", signature: "Not signed", invitation: "Expired", lastSms: "24 Jul, 11:42 AM" },
    ],
    audit: [
      { id: "audit-187-1", event: "Manager signature received", actor: "System", at: "26 Jul 2026, 4:06 PM" },
      { id: "audit-187-2", event: "Operations approved delegation managers", actor: "Norah · Operations", at: "26 Jul 2026, 2:25 PM" },
      { id: "audit-187-3", event: "Request submitted for manual review", actor: "عيسى بسام فرح باعيسى", at: "26 Jul 2026, 2:18 PM" },
    ],
  },
  {
    id: "PR-2026-0186",
    type: "Delegation",
    requestedBy: "حامد سعيد حمدان الغامدي",
    requesterNationalId: "1030929341",
    requesterDob: "1 Jul 1991",
    requesterPhone: "0555781730",
    submittedAt: "24 Jul 2026, 10:04 AM",
    processing: "Automatic",
    status: "Completed",
    source: "Borrower Portal",
    requestedFor: "شركة اسمنت الجوف",
    permissions: ["Facility Contract", "Non-Objection Letter"],
    files: ["delegation-request-0186.pdf"],
    delegationDocument: "delegation-request-0186.pdf",
    signedDocument: "signed-delegation-0186.pdf",
    completed: true,
    managers: [
      { id: "manager-4", name: "عبدالله سعد الشهري", nationalId: "1018473926", phone: "0552190348", signature: "Signed", invitation: "Completed", lastSms: "24 Jul, 10:05 AM" },
      { id: "manager-5", name: "ريم خالد الدوسري", nationalId: "1039201847", phone: "0559372015", signature: "Signed", invitation: "Completed", lastSms: "24 Jul, 10:05 AM" },
    ],
    audit: [
      { id: "audit-186-1", event: "Delegation activated and signed document generated", actor: "System", at: "24 Jul 2026, 1:46 PM" },
      { id: "audit-186-2", event: "All manager signatures received", actor: "System", at: "24 Jul 2026, 1:45 PM" },
      { id: "audit-186-3", event: "Request automatically approved", actor: "System", at: "24 Jul 2026, 10:04 AM" },
    ],
  },
  {
    id: "PR-2026-0185",
    type: "Authorization",
    requestedBy: "تركي عبدالله الزهراني",
    requesterNationalId: "1041316504",
    requesterDob: "1 Jul 1983",
    requesterPhone: "0500045698",
    submittedAt: "21 Jul 2026, 9:38 AM",
    processing: "Manual review",
    status: "Approved",
    source: "Admin Portal",
    requestedFor: "شركة اسمنت الجوف",
    permissions: ["Company Promissory Note"],
    files: ["authorization-letter-0185.pdf"],
    delegationDocument: null,
    signedDocument: null,
    completed: true,
    managers: [],
    audit: [
      { id: "audit-185-1", event: "Permission assignment approved", actor: "Norah · Operations", at: "21 Jul 2026, 10:15 AM" },
      { id: "audit-185-2", event: "Request created", actor: "تركي عبدالله الزهراني", at: "21 Jul 2026, 9:38 AM" },
    ],
  },
  {
    id: "PR-2026-0184",
    type: "Delegation",
    requestedBy: "سلطان أحمد الحربي",
    requesterNationalId: "1034611333",
    requesterDob: "18 Dec 1987",
    requesterPhone: "0553182094",
    submittedAt: "18 Jul 2026, 3:12 PM",
    processing: "Manual review",
    status: "Rejected",
    source: "Borrower Portal",
    requestedFor: "شركة اسمنت الجوف",
    permissions: ["Facility Contract"],
    files: ["delegation-request-0184.pdf"],
    delegationDocument: "delegation-request-0184.pdf",
    signedDocument: null,
    rejectionReason: "The delegation document is incomplete.",
    completed: true,
    managers: [
      { id: "manager-6", name: "فيصل ناصر المطيري", nationalId: "1023948175", phone: "0551392074", signature: "Not requested", invitation: "Not sent", lastSms: "—" },
    ],
    audit: [
      { id: "audit-184-1", event: "Request rejected · delegation document was incomplete", actor: "Norah · Operations", at: "19 Jul 2026, 8:54 AM" },
      { id: "audit-184-2", event: "Request submitted for manual review", actor: "سلطان أحمد الحربي", at: "18 Jul 2026, 3:12 PM" },
    ],
  },
  {
    id: "PR-2026-0183",
    type: "Delegation",
    requestedBy: "نايف محمد الدوسري",
    requesterNationalId: "1025036128",
    requesterDob: "6 Feb 1989",
    requesterPhone: "0556419028",
    submittedAt: "15 Jul 2026, 11:26 AM",
    processing: "Automatic",
    status: "Completed",
    source: "Borrower Portal",
    requestedFor: "شركة اسمنت الجوف",
    permissions: ["Assignment of Proceeds"],
    files: ["delegation-request-0183.pdf"],
    delegationDocument: "delegation-request-0183.pdf",
    signedDocument: "signed-delegation-0183.pdf",
    completed: true,
    managers: [
      { id: "manager-7", name: "بدر صالح الغامدي", nationalId: "1049203817", phone: "0559032741", signature: "Signed", invitation: "Completed", lastSms: "15 Jul, 11:27 AM" },
    ],
    audit: [
      { id: "audit-183-1", event: "Delegation activated", actor: "System", at: "15 Jul 2026, 1:02 PM" },
      { id: "audit-183-2", event: "Request automatically approved", actor: "System", at: "15 Jul 2026, 11:26 AM" },
    ],
  },
];

function Badge({ tone = "neutral", children }) {
  return <span className={`enhancement-badge enhancement-badge--${tone}`}>{children}</span>;
}

function statusTone(status) {
  if (["Successful", "Signed", "Completed", "Approved", "Active"].includes(status)) return "success";
  if (["Expired", "Rejected", "Failed"].includes(status)) return "danger";
  if (["Pending", "Pending review", "Awaiting signatures"].includes(status)) return "warning";
  if (status === "Automatic") return "purple";
  return "neutral";
}

const configurablePermissions = [
  "Facility Contract",
  "Company Promissory Note",
  "Assignment of Proceeds",
  "Non-Objection Letter",
  "View Financing",
  "Upload Documents",
];

function resetMainHorizontalScroll() {
  const scrollContainer = document.querySelector(".content-scroll");
  const currentTop = scrollContainer?.scrollTop || 0;
  window.requestAnimationFrame(() => scrollContainer?.scrollTo({ top: currentTop, left: 0 }));
}

function ProfileModal({ stakeholder, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="enhancement-modal profile-detail-modal" role="dialog" aria-modal="true" aria-labelledby="stakeholder-profile-title">
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">OWNERSHIP &amp; MANAGEMENT</span>
            <h2 id="stakeholder-profile-title">Stakeholder profile</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="enhancement-modal-body">
          <div className="profile-detail-heading">
            <div>
              <strong lang="ar" dir="rtl">{stakeholder.name}</strong>
              <span>{stakeholder.stakeholderType} · {stakeholder.role}</span>
            </div>
            <Badge tone="neutral"><LockIcon label="" size="small" /> Read-only</Badge>
          </div>
          <dl className="enhancement-detail-grid">
            <div><dt>{stakeholder.stakeholderType === "Company" ? "Unified Number" : "National ID / Iqama"}</dt><dd>{stakeholder.id}</dd></div>
            <div><dt>Designation</dt><dd>{stakeholder.designation}</dd></div>
            <div><dt>Ownership percentage</dt><dd>{stakeholder.ownership == null ? "Not provided by Wathq" : `${stakeholder.ownership}%`}</dd></div>
            <div><dt>Ownership level</dt><dd>{stakeholder.level}</dd></div>
            <div><dt>Source</dt><dd>{stakeholder.source}</dd></div>
            <div><dt>Last successful retrieval</dt><dd>27 Jul 2026, 11:42 AM</dd></div>
          </dl>
        </div>
        <div className="modal-footer">
          <button className="secondary-button" type="button" onClick={onClose}>Close</button>
        </div>
      </section>
    </div>
  );
}

function WathqConfirmationModal({ company, onClose, onConfirm }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="enhancement-modal confirm-wathq-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-wathq-title">
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">WATHQ RETRIEVAL</span>
            <h2 id="confirm-wathq-title">Retrieve ownership from Wathq?</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="enhancement-modal-body">
          <p className="confirmation-copy">This will call Wathq for the selected corporate owner. A successful response will be stored as a new snapshot and added to the ownership hierarchy.</p>
          <div className="confirmation-company">
            <strong lang="ar" dir="rtl">{company.name}</strong>
            <span>Unified Number {company.id}</span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-button primary-button--strong" type="button" onClick={onConfirm}><RefreshIcon label="" size="small" />Confirm &amp; Call Wathq</button>
        </div>
      </section>
    </div>
  );
}

function OwnershipCurrentView({
  stakeholders,
  onOpenProfile,
  onRetrieve,
  retrievalState,
  onRefreshMain,
  mainCallInProgress,
  wathqError,
  onDismissError,
}) {
  const stakeholderById = new Map(stakeholders.map((row) => [row.id, row]));

  return (
    <>
      <div className="enhancement-section-header">
        <div>
          <h2 id="users-heading">Ownership &amp; Management</h2>
          <p>Latest successful Wathq response · 27 Jul 2026, 11:42 AM</p>
        </div>
        <button className="secondary-action-button" type="button" onClick={onRefreshMain} disabled={mainCallInProgress}>
          <RefreshIcon label="" size="small" />
          {mainCallInProgress ? "Calling Wathq…" : "Refresh from Wathq"}
        </button>
      </div>

      {wathqError ? (
        <div className="wathq-error" role="alert">
          <WarningIcon label="" />
          <div><strong>Unable to retrieve ownership information from Wathq. [WATHQ-429]</strong><span>No snapshot was created. Try again after the provider cooldown.</span></div>
          <button type="button" onClick={onDismissError}>Dismiss</button>
        </div>
      ) : null}

      <div className="table-shell enhancement-table-shell">
        <table className="users-table enhancement-table ownership-management-table">
          <colgroup>
            <col className="uc-owner-col-name" />
            <col className="uc-owner-col-id" />
            <col className="uc-owner-col-type" />
            <col className="uc-owner-col-role" />
            <col className="uc-owner-col-percentage" />
            <col className="uc-owner-col-level" />
            <col className="uc-owner-col-through" />
            <col className="uc-owner-col-action" />
          </colgroup>
          <thead>
            <tr>
              <th>Name</th><th>ID / Unified Number</th><th>Type</th><th>Role / Designation</th><th>Ownership %</th><th>Ownership Level</th><th>Ownership Through</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stakeholders.map((row) => {
              const childCount = stakeholders.filter((candidate) => candidate.parentId === row.id).length;
              const isRetrieving = retrievalState[row.id] === "inProgress";
              const isCoolingDown = retrievalState[row.id] === "cooldown";
              const hasValidUnifiedNumber = /^\d{10}$/.test(row.id);
              const parentOwner = row.parentId ? stakeholderById.get(row.parentId) : null;
              const canRetrieveOwnership = row.stakeholderType === "Company" && hasValidUnifiedNumber;
              const shouldRetrieve = canRetrieveOwnership && !row.childrenLoaded && !childCount;
              const ownershipActionLabel = isRetrieving
                ? "Retrieving ownership from Wathq"
                : isCoolingDown
                  ? "Ownership refresh cooldown active for 10 minutes"
                  : shouldRetrieve
                    ? `Retrieve ownership from Wathq for ${row.name}`
                    : `Refresh ownership from Wathq for ${row.name}`;
              return (
                <tr key={row.key} className={row.parentId ? "is-indirect-row" : ""}>
                  <td className="ownership-profile-cell">
                    <span className="stakeholder-name" lang="ar" dir="rtl">{row.name}</span>
                  </td>
                  <td className="ownership-number">{row.id}</td>
                  <td><Badge tone={row.stakeholderType === "Company" ? "purple" : "blue"}>{row.stakeholderType}</Badge></td>
                  <td><strong className="role-name">{row.role}</strong><span className="cell-secondary">{row.designation}</span></td>
                  <td className="ownership-number">{row.ownership == null ? "—" : `${row.ownership}%`}</td>
                  <td><Badge tone={row.level === "Direct" ? "success" : "warning"}>{row.level}</Badge></td>
                  <td className={parentOwner ? "ownership-through-cell" : "ownership-through-empty"} lang={parentOwner ? "ar" : undefined} dir={parentOwner ? "rtl" : undefined}>
                    {parentOwner?.name || "—"}
                  </td>
                  <td className="table-icon-actions">
                    <button className="table-icon-action" type="button" onClick={() => onOpenProfile(row)} aria-label={`View profile for ${row.name}`} title="View profile">
                      <EyeOpenIcon label="" size="small" />
                    </button>
                    {canRetrieveOwnership ? (
                      <button className="table-icon-action" type="button" onClick={() => onRetrieve(row)} disabled={isRetrieving || isCoolingDown} aria-label={ownershipActionLabel} title={ownershipActionLabel}>
                        <RedoIcon label="" size="small" />
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </>
  );
}

function SnapshotDetails({ snapshot, onOpenProfile }) {
  return (
    <article className="snapshot-detail-card">
      <div className="snapshot-detail-header">
        <div><span>Snapshot ID</span><strong>{snapshot.id}</strong></div>
        <Badge tone="success"><CheckCircleIcon label="" size="small" />{snapshot.status}</Badge>
      </div>
      <dl className="snapshot-meta">
        <div><dt>Company</dt><dd lang="ar" dir="rtl">{snapshot.companyName}</dd></div>
        <div><dt>Retrieved</dt><dd>{snapshot.retrievedAt}</dd></div>
        <div><dt>Retrieval trigger</dt><dd>{snapshot.trigger}</dd></div>
        <div><dt>Response status</dt><dd>{snapshot.status}</dd></div>
      </dl>
      <div className="table-shell enhancement-table-shell snapshot-result-table-shell">
        <table className="users-table enhancement-table snapshot-result-table">
          <thead><tr><th>Name</th><th>ID / Unified Number</th><th>Role</th><th>Ownership %</th><th>Level</th></tr></thead>
          <tbody>
            {snapshot.rows.map((row) => (
              <tr key={`${snapshot.id}-${row.key}`}>
                <td><button className="stakeholder-link" type="button" onClick={() => onOpenProfile(row)} lang="ar" dir="rtl">{row.name}</button></td>
                <td className="ownership-number">{row.id}</td>
                <td>{row.role} · {row.designation}</td>
                <td className="ownership-number">{row.ownership == null ? "—" : `${row.ownership}%`}</td>
                <td><Badge tone={row.level === "Direct" ? "success" : "warning"}>{row.level}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function OwnershipSnapshotsView({ snapshots, selectedCompany, onCompanyChange, onOpenProfile, onCallWathq, retrievalState }) {
  const companySnapshots = snapshots[selectedCompany] || [];
  const [selectedSnapshotId, setSelectedSnapshotId] = useState(companySnapshots[0]?.id || "");
  const selectedSnapshot = companySnapshots.find((snapshot) => snapshot.id === selectedSnapshotId) || companySnapshots[0];

  function changeCompany(value) {
    onCompanyChange(value);
    setSelectedSnapshotId((snapshots[value] || [])[0]?.id || "");
  }

  const uncalledCompany = ownershipStakeholdersSeed.find((row) => row.id === selectedCompany);

  return (
    <>
      <div className="enhancement-section-header">
        <div><h2 id="users-heading">Wathq Snapshots</h2><p>Successful responses are stored separately and displayed newest to oldest.</p></div>
        <label className="snapshot-company-filter">
          <span>Company</span>
          <select value={selectedCompany} onChange={(event) => changeCompany(event.target.value)}>
            <option value={MAIN_COMPANY_ID}>شركة اسمنت الجوف · {MAIN_COMPANY_ID}</option>
            <option value={LOADED_CORPORATE_OWNER_ID}>الشركة الوطنية للاستثمار الصناعي · {LOADED_CORPORATE_OWNER_ID}</option>
            <option value={UNCALLED_CORPORATE_OWNER_ID}>شركة الشمال القابضة · {UNCALLED_CORPORATE_OWNER_ID}</option>
          </select>
        </label>
      </div>

      {companySnapshots.length ? (
        <div className="snapshot-layout">
          <aside className="snapshot-list" aria-label="Available Wathq snapshots">
            {companySnapshots.map((snapshot, index) => (
              <button key={snapshot.id} type="button" className={selectedSnapshot?.id === snapshot.id ? "is-selected" : ""} onClick={() => setSelectedSnapshotId(snapshot.id)}>
                <div><strong>{snapshot.retrievedAt}</strong>{index === 0 ? <Badge tone="blue">Latest</Badge> : null}</div>
                <span>{snapshot.trigger}</span>
                <small>{snapshot.id}</small>
              </button>
            ))}
          </aside>
          {selectedSnapshot ? <SnapshotDetails snapshot={selectedSnapshot} onOpenProfile={onOpenProfile} /> : null}
        </div>
      ) : (
        <div className="wathq-empty-state">
          <div className="empty-state-icon"><RefreshIcon label="" /></div>
          <h3>No Wathq information has been retrieved for this company yet.</h3>
          <p>Call Wathq to retrieve the corporate owner’s ownership structure using its Unified Number.</p>
          <button className="primary-button primary-button--strong" type="button" onClick={() => onCallWathq(uncalledCompany)} disabled={retrievalState[selectedCompany] === "inProgress"}>
            <RefreshIcon label="" size="small" />
            {retrievalState[selectedCompany] === "inProgress" ? "Calling Wathq…" : "Call Wathq"}
          </button>
        </div>
      )}
    </>
  );
}

function OwnershipHistoryView() {
  return (
    <>
      <div className="enhancement-section-header">
        <div><h2 id="users-heading">Change History</h2><p>Recorded ownership and management changes from successful Wathq snapshots.</p></div>
      </div>
      <div className="table-shell enhancement-table-shell">
        <table className="users-table enhancement-table ownership-history-table">
          <thead><tr><th>Changed information</th><th>Previous value</th><th>Updated value</th><th>Change date &amp; time</th><th>Change source</th></tr></thead>
          <tbody>
            {changeHistory.map((change) => (
              <tr key={change.id}>
                <td>{change.information}</td><td>{change.previous}</td><td>{change.updated}</td><td>{change.changedAt}</td><td>{change.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function OwnershipManagement({ onNotify }) {
  const [view, setView] = useState("Current Structure");
  const [stakeholders, setStakeholders] = useState(ownershipStakeholdersSeed);
  const [profile, setProfile] = useState(null);
  const [confirmCompany, setConfirmCompany] = useState(null);
  const [retrievalState, setRetrievalState] = useState({});
  const [snapshots, setSnapshots] = useState(snapshotsSeed);
  const [snapshotCompany, setSnapshotCompany] = useState(MAIN_COMPANY_ID);
  const [mainCallInProgress, setMainCallInProgress] = useState(false);
  const [wathqError, setWathqError] = useState("");

  function retrieveCorporateOwner() {
    const company = confirmCompany;
    if (!company || retrievalState[company.id] === "inProgress") return;
    setConfirmCompany(null);
    setRetrievalState((current) => ({ ...current, [company.id]: "inProgress" }));
    window.setTimeout(() => {
      const rows = company.id === UNCALLED_CORPORATE_OWNER_ID
        ? retrievedCorporateChildren.map((row) => ({ ...row }))
        : stakeholders.filter((row) => row.parentId === company.id).map((row) => ({ ...row }));
      if (company.id === UNCALLED_CORPORATE_OWNER_ID) {
        setStakeholders((current) => current.map((row) => row.id === company.id ? { ...row, childrenLoaded: true } : row).concat(rows));
      }
      setSnapshots((current) => ({
        ...current,
        [company.id]: [{
          id: "WTHQ-2026-0727-1216",
          companyId: company.id,
          companyName: company.name,
          retrievedAt: "27 Jul 2026, 12:16 PM",
          trigger: "Corporate owner retrieval",
          status: "Successful",
          rows,
        }, ...(current[company.id] || [])],
      }));
      setRetrievalState((current) => ({ ...current, [company.id]: "cooldown" }));
      setSnapshotCompany(company.id);
      onNotify("Ownership retrieved and stored as a new Wathq snapshot");
    }, 700);
  }

  function refreshMainCompany() {
    if (mainCallInProgress) return;
    setWathqError("");
    setMainCallInProgress(true);
    window.setTimeout(() => {
      setMainCallInProgress(false);
      setWathqError("WATHQ-429");
    }, 650);
  }

  return (
    <div className="enhancement-view ownership-management-view">
      <div className="enhancement-subtabs" role="tablist" aria-label="Ownership and management views">
        {["Current Structure", "Wathq Snapshots", "Change History"].map((item) => (
          <button key={item} type="button" role="tab" aria-selected={view === item} className={view === item ? "is-active" : ""} onClick={() => setView(item)}>{item}</button>
        ))}
      </div>

      {view === "Current Structure" ? (
        <OwnershipCurrentView
          stakeholders={stakeholders}
          onOpenProfile={setProfile}
          onRetrieve={setConfirmCompany}
          retrievalState={retrievalState}
          onRefreshMain={refreshMainCompany}
          mainCallInProgress={mainCallInProgress}
          wathqError={wathqError}
          onDismissError={() => setWathqError("")}
        />
      ) : null}
      {view === "Wathq Snapshots" ? (
        <OwnershipSnapshotsView
          snapshots={snapshots}
          selectedCompany={snapshotCompany}
          onCompanyChange={setSnapshotCompany}
          onOpenProfile={setProfile}
          onCallWathq={setConfirmCompany}
          retrievalState={retrievalState}
        />
      ) : null}
      {view === "Change History" ? <OwnershipHistoryView /> : null}

      {profile ? <ProfileModal stakeholder={profile} onClose={() => setProfile(null)} /> : null}
      {confirmCompany ? <WathqConfirmationModal company={confirmCompany} onClose={() => setConfirmCompany(null)} onConfirm={retrieveCorporateOwner} /> : null}
    </div>
  );
}

function DocumentPreviewModal({ filename, signed, requestType, onClose, onDownload }) {
  const documentTitle = signed ? "Signed delegation document" : `${requestType} document`;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="enhancement-modal document-preview-modal" role="dialog" aria-modal="true" aria-labelledby="document-preview-title">
        <div className="modal-header">
          <div><span className="modal-eyebrow">PERMISSION REQUEST DOCUMENT</span><h2 id="document-preview-title">{documentTitle}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="document-preview-body">
          <div className="document-page">
            <img src={`${import.meta.env.BASE_URL}assets/manafa-logo.svg`} alt="Manafa" />
            <h3>{signed ? "Signed Delegation Agreement" : `${requestType} Request`}</h3>
            <p>This preview represents the document stored with the permission request.</p>
            <dl>
              <div><dt>Company</dt><dd>شركة اسمنت الجوف</dd></div>
              <div><dt>Document</dt><dd>{filename}</dd></div>
              <div><dt>Status</dt><dd>{signed ? "Signed by all selected managers" : "Submitted for Operations review"}</dd></div>
            </dl>
          </div>
        </div>
        <div className="modal-footer">
          <button className="secondary-button" type="button" onClick={onClose}>Close</button>
          <button className="primary-button primary-button--strong" type="button" onClick={() => onDownload(filename)}><DownloadIcon label="" size="small" />Download</button>
        </div>
      </section>
    </div>
  );
}

function RequestDecisionModal({ request, mode, onClose, onApprove, onReject }) {
  const [selectedPermissions, setSelectedPermissions] = useState(request.permissions);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState("");
  const isApproval = mode === "approve";

  function togglePermission(permission) {
    setSelectedPermissions((current) => (
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission]
    ));
    setError("");
  }

  function toggleManager(managerId) {
    setSelectedManagers((current) => (
      current.includes(managerId)
        ? current.filter((item) => item !== managerId)
        : [...current, managerId]
    ));
    setError("");
  }

  function submitDecision(event) {
    event.preventDefault();
    if (!isApproval && !rejectionReason.trim()) {
      setError("A rejection reason is required and will be shared with the borrower.");
      return;
    }
    if (isApproval && request.type === "Authorization" && !selectedPermissions.length) {
      setError("Select at least one permission before approving this request.");
      return;
    }
    if (isApproval && request.type === "Delegation" && !selectedManagers.length) {
      setError("Select at least one manager before approving this delegation.");
      return;
    }

    if (isApproval) {
      onApprove({
        permissions: selectedPermissions,
        managerIds: selectedManagers,
      });
      return;
    }
    onReject(rejectionReason.trim());
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="enhancement-modal request-decision-modal" role="dialog" aria-modal="true" aria-labelledby="request-decision-title">
        <form onSubmit={submitDecision}>
          <div className="modal-header">
            <div>
              <span className="modal-eyebrow">{request.id}</span>
              <h2 id="request-decision-title">{isApproval ? `Approve ${request.type} request` : `Reject ${request.type} request`}</h2>
            </div>
            <button type="button" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="enhancement-modal-body request-decision-body">
            {isApproval && request.type === "Authorization" ? (
              <>
                <p className="decision-help">Configure the permissions that will be granted to the requester. At least one permission is required.</p>
                <fieldset className="decision-options">
                  <legend>Permission configuration</legend>
                  {configurablePermissions.map((permission) => (
                    <label key={permission}>
                      <input type="checkbox" checked={selectedPermissions.includes(permission)} onChange={() => togglePermission(permission)} />
                      <span>{permission}</span>
                    </label>
                  ))}
                </fieldset>
              </>
            ) : null}
            {isApproval && request.type === "Delegation" ? (
              <>
                <p className="decision-help">Select the manager or managers who must sign. Invitations are sent after approval.</p>
                <fieldset className="decision-options decision-manager-options">
                  <legend>Delegators</legend>
                  {request.managers.map((manager) => (
                    <label key={manager.id}>
                      <input type="checkbox" checked={selectedManagers.includes(manager.id)} onChange={() => toggleManager(manager.id)} />
                      <span lang="ar" dir="rtl">{manager.name}</span>
                      <small>{manager.nationalId} · {manager.phone}</small>
                    </label>
                  ))}
                </fieldset>
              </>
            ) : null}
            {!isApproval ? (
              <label className="rejection-reason-field">
                <span>Rejection reason <b aria-hidden="true">*</b></span>
                <textarea value={rejectionReason} onChange={(event) => { setRejectionReason(event.target.value); setError(""); }} rows="5" placeholder="Explain why the request is being rejected" />
                <small>This reason will be visible to the borrower.</small>
              </label>
            ) : null}
            {error ? <div className="decision-error" role="alert"><WarningIcon label="" size="small" />{error}</div> : null}
          </div>
          <div className="modal-footer">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className={isApproval ? "primary-button primary-button--strong" : "danger-button"} type="submit">
              {isApproval ? "Confirm approval" : "Reject request"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function PermissionRequestList({ requests, onOpenRequest }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [processing, setProcessing] = useState("All processing");

  const filtered = useMemo(() => requests.filter((request) => {
    const matchesQuery = !query.trim() || [request.id, request.requestedBy, request.type]
      .some((value) => value.toLowerCase().includes(query.trim().toLowerCase()));
    const matchesStatus = status === "All statuses" || request.status === status;
    const matchesProcessing = processing === "All processing" || request.processing === processing;
    return matchesQuery && matchesStatus && matchesProcessing;
  }), [processing, query, requests, status]);

  return (
    <>
      <div className="enhancement-section-header permission-request-header">
        <div><h2 id="users-heading">Permission Requests</h2><p>Active and historical requests, including manual and automatically processed requests.</p></div>
        <Badge tone="neutral"><LockIcon label="" size="small" />Authorized Operations only</Badge>
      </div>
      <div className="request-filters">
        <label className="request-search"><SearchIcon label="" size="small" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search request ID, user, or type" aria-label="Search permission requests" /></label>
        <label><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter permission requests by status"><option>All statuses</option><option>Pending review</option><option>Awaiting signatures</option><option>Completed</option><option>Approved</option><option>Rejected</option><option>Expired</option></select></label>
        <label><span className="sr-only">Filter by processing</span><select value={processing} onChange={(event) => setProcessing(event.target.value)} aria-label="Filter permission requests by processing"><option>All processing</option><option>Manual review</option><option>Automatic</option></select></label>
      </div>
      <div className="request-summary">
        <div><strong>{requests.length}</strong><span>All requests</span></div>
        <div><strong>{requests.filter((request) => !request.completed).length}</strong><span>Active</span></div>
        <div><strong>{requests.filter((request) => request.processing === "Automatic").length}</strong><span>Automatic</span></div>
        <div><strong>{requests.filter((request) => request.completed).length}</strong><span>Historical</span></div>
      </div>
      <div className="table-shell enhancement-table-shell">
        <table className="users-table enhancement-table permission-requests-table">
          <thead><tr><th>Request ID</th><th>Request Type</th><th>Requested By</th><th>Submitted</th><th>Processing</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((request) => (
              <tr key={request.id}>
                <td className="request-id-cell">{request.id}</td>
                <td>{request.type}</td>
                <td className="arabic-requester" lang="ar" dir="rtl">{request.requestedBy}</td>
                <td>{request.submittedAt}</td>
                <td><Badge tone={request.processing === "Automatic" ? "purple" : "blue"}>{request.processing}</Badge></td>
                <td><Badge tone={statusTone(request.status)}>{request.status}</Badge></td>
                <td className="table-icon-actions">
                  <button className="table-icon-action" type="button" onClick={() => onOpenRequest(request.id)} aria-label={`View details for ${request.id}`} title="View details">
                    <EyeOpenIcon label="" size="small" />
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length ? <tr><td colSpan="7" className="no-results">No permission requests match the selected filters.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </>
  );
}

function RequestDetails({ request, onBack, onResendSms, onOpenDocument, onDecision }) {
  const canReview = !request.completed
    && request.processing === "Manual review"
    && ["Pending review", "Expired"].includes(request.status);
  const requestFiles = request.files || (request.delegationDocument ? [request.delegationDocument] : []);

  return (
    <div className="request-detail-view">
      <button className="back-link-button" type="button" onClick={onBack}><ArrowLeftIcon label="" size="small" />Back to permission requests</button>
      <div className="request-detail-heading">
        <div>
          <span className="request-detail-eyebrow">PERMISSION REQUEST</span>
          <h2 id="users-heading">{request.id}</h2>
          <p>{request.type} · submitted {request.submittedAt}</p>
        </div>
        <div className="request-detail-statuses">
          <Badge tone={request.processing === "Automatic" ? "purple" : "blue"}>{request.processing}</Badge>
          <Badge tone={statusTone(request.status)}>{request.status}</Badge>
        </div>
      </div>

      {request.completed ? (
        <div className="readonly-banner"><LockIcon label="" /><div><strong>Completed request · read-only</strong><span>Historical request details remain available, but no further changes can be made.</span></div></div>
      ) : null}

      {canReview ? (
        <div className="request-decision-bar">
          <div>
            <strong>Operations review required</strong>
            <span>Review the requester information and documents before accepting or rejecting this request.</span>
          </div>
          <div>
            <button className="danger-ghost-button" type="button" onClick={() => onDecision("reject")}>Reject</button>
            <button className="primary-button request-approve-button" type="button" onClick={() => onDecision("approve")}>Approve</button>
          </div>
        </div>
      ) : null}

      <div className="request-detail-grid">
        <section className="request-detail-card">
          <div className="detail-card-title"><h3>Request details</h3></div>
          <dl className="enhancement-detail-grid">
            <div><dt>Request type</dt><dd>{request.type}</dd></div>
            <div><dt>Current status</dt><dd>{request.status}</dd></div>
            <div><dt>Requested by</dt><dd lang="ar" dir="rtl">{request.requestedBy}</dd></div>
            <div><dt>National ID / Iqama</dt><dd className="ownership-number">{request.requesterNationalId}</dd></div>
            <div><dt>Date of birth</dt><dd>{request.requesterDob}</dd></div>
            <div><dt>Mobile number</dt><dd className="ownership-number">{request.requesterPhone}</dd></div>
            <div><dt>Request source</dt><dd>{request.source}</dd></div>
            <div><dt>Processing</dt><dd>{request.processing}</dd></div>
            <div><dt>Company</dt><dd lang="ar" dir="rtl">{request.requestedFor}</dd></div>
            <div><dt>Submitted</dt><dd>{request.submittedAt}</dd></div>
          </dl>
        </section>
        <section className="request-detail-card">
          <div className="detail-card-title"><h3>{request.status === "Pending review" && request.type === "Authorization" ? "Permission configuration" : "Requested permissions"}</h3><span>{request.permissions.length} selected</span></div>
          {request.permissions.length ? (
            <ul className="requested-permissions">
              {request.permissions.map((permission) => <li key={permission}><CheckCircleIcon label="" size="small" /><span>{permission}</span></li>)}
            </ul>
          ) : (
            <div className="requested-permissions-empty">
              <LockIcon label="" size="small" />
              <span>Permissions will be configured by Operations during approval.</span>
            </div>
          )}
        </section>
      </div>

      <section className="request-detail-card request-documents-card">
        <div className="detail-card-title"><h3>Request documents</h3><span>{requestFiles.length} attached</span></div>
        {requestFiles.map((filename) => (
          <div className="document-row" key={filename}>
            <div><strong>Supporting document</strong><span>{filename}</span></div>
            <button className="secondary-action-button" type="button" onClick={() => onOpenDocument({ filename, signed: false, requestType: request.type })}><EyeOpenIcon label="" size="small" />View</button>
          </div>
        ))}
        {request.type === "Delegation" ? (
          <div className="document-row">
              <div><strong>Signed delegation document</strong><span>{request.signedDocument || "Available after every selected manager signs"}</span></div>
              {request.signedDocument ? <button className="secondary-action-button" type="button" onClick={() => onOpenDocument({ filename: request.signedDocument, signed: true, requestType: request.type })}><EyeOpenIcon label="" size="small" />View signed document</button> : <Badge tone="neutral">Not available</Badge>}
          </div>
        ) : null}
      </section>

      {request.rejectionReason ? (
        <section className="request-detail-card rejection-detail-card">
          <div className="detail-card-title"><h3>Rejection reason</h3><span>Visible to borrower</span></div>
          <p>{request.rejectionReason}</p>
        </section>
      ) : null}

      {request.type === "Delegation" && request.managers.length ? (
        <>
          <section className="request-detail-card managers-card">
            <div className="detail-card-title"><div><h3>{request.status === "Pending review" ? "Proposed managers" : "Selected managers"}</h3><span>Signature and invitation status</span></div><span>{request.managers.filter((manager) => manager.signature === "Signed").length} of {request.managers.length} signed</span></div>
            <div className="table-shell enhancement-table-shell manager-table-shell">
              <table className="users-table enhancement-table managers-table">
                <thead><tr><th>Manager</th><th>National ID</th><th>Mobile Number</th><th>Signature Status</th><th>Invitation</th><th>Last SMS</th><th>Actions</th></tr></thead>
                <tbody>
                  {request.managers.map((manager) => {
                    const canResend = !request.completed && !manager.resendLocked && ["Pending", "Expired"].includes(manager.invitation);
                    return (
                      <tr key={manager.id}>
                        <td className="arabic-requester" lang="ar" dir="rtl">{manager.name}</td>
                        <td className="ownership-number">{manager.nationalId}</td>
                        <td className="ownership-number">{manager.phone}</td>
                        <td><Badge tone={statusTone(manager.signature)}>{manager.signature}</Badge></td>
                        <td><Badge tone={statusTone(manager.invitation)}>{manager.invitation}</Badge></td>
                        <td>{manager.lastSms}</td>
                        <td>
                          {canResend ? <button className="table-action-button table-action-button--compact" type="button" onClick={() => onResendSms(manager.id)}><RefreshIcon label="" size="small" />Resend SMS</button> : null}
                          {!canResend && manager.resendLocked ? <Badge tone="neutral">SMS sent</Badge> : null}
                          {!canResend && !manager.resendLocked ? <span className="cell-secondary">No action</span> : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}

      <section className="request-detail-card audit-card">
        <div className="detail-card-title"><h3>Audit log</h3><span>All request actions and status changes</span></div>
        <ol className="audit-list">
          {request.audit.map((event) => (
            <li key={event.id}><span className="audit-dot" /><div><strong>{event.event}</strong><span>{event.actor}</span></div><time>{event.at}</time></li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export function PermissionRequests({ onNotify, onStatsChange }) {
  const [requests, setRequests] = useState(permissionRequestsSeed);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [documentPreview, setDocumentPreview] = useState(null);
  const [decisionMode, setDecisionMode] = useState("");
  const selectedRequest = requests.find((request) => request.id === selectedRequestId);

  useEffect(() => {
    onStatsChange?.({
      total: requests.length,
      active: requests.filter((request) => !request.completed).length,
      historical: requests.filter((request) => request.completed).length,
    });
  }, [onStatsChange, requests]);

  function openRequest(requestId) {
    setSelectedRequestId(requestId);
    setDecisionMode("");
    resetMainHorizontalScroll();
  }

  function closeRequest() {
    setSelectedRequestId("");
    setDecisionMode("");
    resetMainHorizontalScroll();
  }

  function resendSms(managerId) {
    if (!selectedRequest || selectedRequest.completed) return;
    const selectedManager = selectedRequest.managers.find((manager) => manager.id === managerId);
    const canResend = selectedManager
      && !selectedManager.resendLocked
      && ["Pending", "Expired"].includes(selectedManager.invitation);
    if (!canResend) return;
    const managerName = selectedManager.name;

    setRequests((current) => current.map((request) => {
      if (request.id !== selectedRequest.id) return request;
      return {
        ...request,
        managers: request.managers.map((item) => item.id === managerId ? {
          ...item,
          invitation: "Pending",
          lastSms: "Just now",
          resendLocked: true,
        } : item),
        audit: [
          { id: `audit-${request.id}-${Date.now()}`, event: `SMS invitation resent to ${managerName}`, actor: "Norah · Operations", at: "28 Jul 2026, 11:30 AM" },
          ...request.audit,
        ],
      };
    }));
    onNotify(`SMS invitation resent to ${managerName}`);
  }

  function approveRequest({ permissions, managerIds }) {
    if (!selectedRequest) return;
    setRequests((current) => current.map((request) => {
      if (request.id !== selectedRequest.id) return request;

      if (request.type === "Authorization") {
        return {
          ...request,
          permissions,
          status: "Approved",
          completed: true,
          audit: [
            { id: `audit-${request.id}-${Date.now()}`, event: `Authorization approved with ${permissions.length} configured permissions`, actor: "Norah · Operations", at: "28 Jul 2026, 11:30 AM" },
            ...request.audit,
          ],
        };
      }

      const selectedManagers = request.managers
        .filter((manager) => managerIds.includes(manager.id))
        .map((manager) => ({
          ...manager,
          signature: "Pending",
          invitation: "Pending",
          lastSms: "Just now",
          resendLocked: true,
        }));

      return {
        ...request,
        status: "Awaiting signatures",
        managers: selectedManagers,
        audit: [
          { id: `audit-${request.id}-${Date.now()}`, event: `Delegation approved and SMS invitations sent to ${selectedManagers.length} selected manager${selectedManagers.length === 1 ? "" : "s"}`, actor: "Norah · Operations", at: "28 Jul 2026, 11:30 AM" },
          ...request.audit,
        ],
      };
    }));
    setDecisionMode("");
    onNotify(selectedRequest.type === "Authorization" ? "Authorization request approved" : "Delegation request approved and manager invitations sent");
    resetMainHorizontalScroll();
  }

  function rejectRequest(reason) {
    if (!selectedRequest) return;
    setRequests((current) => current.map((request) => (
      request.id === selectedRequest.id
        ? {
          ...request,
          status: "Rejected",
          completed: true,
          rejectionReason: reason,
          audit: [
            { id: `audit-${request.id}-${Date.now()}`, event: `Request rejected · ${reason}`, actor: "Norah · Operations", at: "28 Jul 2026, 11:30 AM" },
            ...request.audit,
          ],
        }
        : request
    )));
    setDecisionMode("");
    onNotify("Permission request rejected and the borrower was notified");
    resetMainHorizontalScroll();
  }

  return (
    <div className="enhancement-view permission-requests-view">
      {selectedRequest ? (
        <RequestDetails
          request={selectedRequest}
          onBack={closeRequest}
          onResendSms={resendSms}
          onOpenDocument={setDocumentPreview}
          onDecision={setDecisionMode}
        />
      ) : <PermissionRequestList requests={requests} onOpenRequest={openRequest} />}
      {documentPreview ? <DocumentPreviewModal {...documentPreview} onClose={() => setDocumentPreview(null)} onDownload={(filename) => onNotify(`${filename} is ready to download in the production integration`)} /> : null}
      {selectedRequest && decisionMode ? (
        <RequestDecisionModal
          request={selectedRequest}
          mode={decisionMode}
          onClose={() => setDecisionMode("")}
          onApprove={approveRequest}
          onReject={rejectRequest}
        />
      ) : null}
    </div>
  );
}
