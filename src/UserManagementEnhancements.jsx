import { useEffect, useMemo, useState } from "react";
import AttachmentIcon from "@atlaskit/icon/core/attachment";
import CheckCircleIcon from "@atlaskit/icon/core/check-circle";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import ChevronUpIcon from "@atlaskit/icon/core/chevron-up";
import DownloadIcon from "@atlaskit/icon/core/download";
import EyeOpenIcon from "@atlaskit/icon/core/eye-open";
import LockIcon from "@atlaskit/icon/core/lock-locked";
import PersonAddedIcon from "@atlaskit/icon/core/person-added";
import PersonIcon from "@atlaskit/icon/core/person";
import RefreshIcon from "@atlaskit/icon/core/refresh";
import WarningIcon from "@atlaskit/icon/core/warning";

const MAIN_COMPANY_ID = "1010225259";
const LOADED_CORPORATE_OWNER_ID = "1010123456";
const PORTFOLIO_OWNER_ID = "7000002814";
const UNCALLED_CORPORATE_OWNER_ID = "7000018432";
const VALID_UNIFIED_NUMBER_PATTERN = /^\d{10}$/;

const mainCompanyStakeholder = {
  key: "main-company",
  id: MAIN_COMPANY_ID,
  name: "شركة اسمنت الجوف",
  stakeholderType: "Company",
  role: "Current Company",
  designation: "Borrower Company",
  ownership: null,
  level: "Root",
  source: "Wathq",
  isRoot: true,
};

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
    id: PORTFOLIO_OWNER_ID,
    name: "محفظة القطاع الصناعي",
    stakeholderType: "Company",
    role: "Owner",
    designation: "Investment Portfolio",
    ownership: 60,
    level: "Indirect",
    source: "Wathq",
    parentId: LOADED_CORPORATE_OWNER_ID,
    childrenLoaded: true,
  },
  {
    key: "owner-industrial-portfolio-person",
    id: "1035582147",
    name: "فهد بن سليمان الدوسري",
    stakeholderType: "Individual",
    role: "Owner",
    designation: "Partner",
    ownership: 55,
    level: "Indirect",
    source: "Wathq",
    parentId: PORTFOLIO_OWNER_ID,
  },
  {
    key: "owner-industrial-portfolio-company",
    id: "7000049128",
    name: "شركة أصول الصناعة",
    stakeholderType: "Company",
    role: "Owner",
    designation: "Corporate Owner",
    ownership: 45,
    level: "Indirect",
    source: "Wathq",
    parentId: PORTFOLIO_OWNER_ID,
    childrenLoaded: false,
    unifiedNumber: "7000049128",
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

const retrievedCorporateChildrenByCompany = {
  [UNCALLED_CORPORATE_OWNER_ID]: retrievedCorporateChildren,
  "7000049128": [
    {
      key: "owner-assets-industry-person",
      id: "1047712856",
      name: "خالد بن ناصر السبيعي",
      stakeholderType: "Individual",
      role: "Owner",
      designation: "Partner",
      ownership: 60,
      level: "Indirect",
      source: "Wathq",
      parentId: "7000049128",
    },
    {
      key: "owner-assets-industry-company",
      id: "7000073261",
      name: "شركة المدار للاستثمارات",
      stakeholderType: "Company",
      role: "Owner",
      designation: "Corporate Owner",
      ownership: 40,
      level: "Indirect",
      source: "Wathq",
      parentId: "7000049128",
      childrenLoaded: false,
      unifiedNumber: "7000073261",
    },
  ],
  "7000030172": [
    {
      key: "owner-rwafed-person",
      id: "1026658174",
      name: "سعود بن فهد القحطاني",
      stakeholderType: "Individual",
      role: "Owner",
      designation: "Partner",
      ownership: 100,
      level: "Indirect",
      source: "Wathq",
      parentId: "7000030172",
    },
  ],
};

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
  [PORTFOLIO_OWNER_ID]: [
    {
      id: "WTHQ-2026-0720-1435",
      companyId: PORTFOLIO_OWNER_ID,
      companyName: "محفظة القطاع الصناعي",
      retrievedAt: "20 Jul 2026, 2:35 PM",
      trigger: "Corporate owner retrieval",
      status: "Successful",
      rows: ownershipStakeholdersSeed.filter((row) => row.parentId === PORTFOLIO_OWNER_ID),
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
    practiceMethod: "Individually",
    canDelegate: "Yes",
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
    practiceMethod: null,
    canDelegate: null,
    permissions: ["Facility Contract", "Assignment of Proceeds"],
    files: ["delegation-request-0188.pdf", "articles-of-association-0188.pdf"],
    delegationDocument: "delegation-request-0188.pdf",
    signedDocument: null,
    completed: false,
    managers: [
      { id: "manager-8", name: "خالد محمد الشمري", nationalId: "1019283746", phone: "0559182734", signature: "Not requested", signedAt: "—", invitation: "Not sent", lastSms: "—" },
      { id: "manager-9", name: "منى عبدالعزيز القحطاني", nationalId: "1028374651", phone: "0558273641", signature: "Not requested", signedAt: "—", invitation: "Not sent", lastSms: "—" },
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
    practiceMethod: null,
    canDelegate: null,
    permissions: ["Facility Contract", "Company Promissory Note", "Assignment of Proceeds"],
    files: ["delegation-request-0187.pdf"],
    delegationDocument: "delegation-request-0187.pdf",
    signedDocument: null,
    completed: false,
    managers: [
      { id: "manager-1", name: "محمد عبدالله السبيعي", nationalId: "1029084176", phone: "0554318721", signature: "Signed", signedAt: "26 Jul 2026, 4:06 PM", invitation: "Completed", lastSms: "26 Jul, 2:19 PM" },
      { id: "manager-2", name: "نورة فهد القحطاني", nationalId: "1043019726", phone: "0558271046", signature: "Pending", signedAt: "—", invitation: "Pending", lastSms: "26 Jul, 2:19 PM" },
      { id: "manager-3", name: "سلمان أحمد العمري", nationalId: "1034862910", phone: "0552087134", signature: "Not signed", signedAt: "—", invitation: "Expired", lastSms: "24 Jul, 11:42 AM" },
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
    practiceMethod: null,
    canDelegate: null,
    permissions: ["Facility Contract", "Non-Objection Letter"],
    files: ["delegation-request-0186.pdf"],
    delegationDocument: "delegation-request-0186.pdf",
    signedDocument: "signed-delegation-0186.pdf",
    completed: true,
    managers: [
      { id: "manager-4", name: "عبدالله سعد الشهري", nationalId: "1018473926", phone: "0552190348", signature: "Signed", signedAt: "24 Jul 2026, 1:12 PM", invitation: "Completed", lastSms: "24 Jul, 10:05 AM" },
      { id: "manager-5", name: "ريم خالد الدوسري", nationalId: "1039201847", phone: "0559372015", signature: "Signed", signedAt: "24 Jul 2026, 1:45 PM", invitation: "Completed", lastSms: "24 Jul, 10:05 AM" },
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
    status: "Accepted",
    source: "Admin Portal",
    requestedFor: "شركة اسمنت الجوف",
    practiceMethod: "Individually",
    canDelegate: "Yes",
    permissions: ["Manage Wallet", "View Wallet", "View Users", "Manage Company Profile", "Accept Loan"],
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
    practiceMethod: null,
    canDelegate: null,
    permissions: ["Facility Contract"],
    files: ["delegation-request-0184.pdf"],
    delegationDocument: "delegation-request-0184.pdf",
    signedDocument: null,
    rejectionReason: "The delegation document is incomplete.",
    completed: true,
    managers: [
      { id: "manager-6", name: "فيصل ناصر المطيري", nationalId: "1023948175", phone: "0551392074", signature: "Not requested", signedAt: "—", invitation: "Not sent", lastSms: "—" },
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
    practiceMethod: null,
    canDelegate: null,
    permissions: ["Assignment of Proceeds"],
    files: ["delegation-request-0183.pdf"],
    delegationDocument: "delegation-request-0183.pdf",
    signedDocument: "signed-delegation-0183.pdf",
    completed: true,
    managers: [
      { id: "manager-7", name: "بدر صالح الغامدي", nationalId: "1049203817", phone: "0559032741", signature: "Signed", signedAt: "15 Jul 2026, 1:01 PM", invitation: "Completed", lastSms: "15 Jul, 11:27 AM" },
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
  if (["Successful", "Signed", "Completed", "Approved", "Accepted", "Active"].includes(status)) return "success";
  if (["Expired", "Rejected", "Failed"].includes(status)) return "danger";
  if (["Pending", "Pending review", "Awaiting signatures"].includes(status)) return "warning";
  if (status === "Automatic") return "purple";
  return "neutral";
}

const permissionGroups = [
  {
    id: "wallet",
    label: "Wallet & Payment",
    permissions: ["Manage Wallet", "Request Withdrawal", "View Wallet", "Request Early Payment"],
  },
  {
    id: "fund-request",
    label: "Fund Request",
    permissions: ["Request Financing", "Accept Consents"],
  },
  {
    id: "user-management",
    label: "User Management",
    permissions: ["View Users", "Manage Users", "Manage Delegation"],
  },
  {
    id: "company-management",
    label: "Company Management",
    permissions: ["Manage Company Profile"],
  },
  {
    id: "financing-flow",
    label: "Financing Flow",
    permissions: ["Accept Murabaha", "Accept Financial Offer", "Accept Loan", "Manage SCF Discount Offer"],
  },
];

const configurablePermissions = permissionGroups.flatMap((group) => group.permissions);

function resetMainHorizontalScroll() {
  const scrollContainer = document.querySelector(".content-scroll");
  const appShell = document.querySelector(".admin-app");
  window.requestAnimationFrame(() => {
    appShell?.scrollTo({ top: 0, left: 0 });
    scrollContainer?.scrollTo({ top: 0, left: 0 });
  });
}

function getStakeholderRetrievalDate(stakeholder, snapshots) {
  if (stakeholder.isRoot) return snapshots[MAIN_COMPANY_ID]?.[0]?.retrievedAt || "Not retrieved";
  if (stakeholder.stakeholderType === "Company") return snapshots[stakeholder.id]?.[0]?.retrievedAt || "Not retrieved";
  const sourceCompanyId = stakeholder.parentId || MAIN_COMPANY_ID;
  return snapshots[sourceCompanyId]?.[0]?.retrievedAt || "Not retrieved";
}

function createProfileStakeholder(stakeholder, parent, snapshots) {
  return {
    ...stakeholder,
    ownershipThrough: parent?.name || (stakeholder.isRoot ? "—" : mainCompanyStakeholder.name),
    lastRetrieved: getStakeholderRetrievalDate(stakeholder, snapshots),
  };
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
            <div><dt>Stakeholder type</dt><dd>{stakeholder.stakeholderType}</dd></div>
            <div><dt>Role / designation</dt><dd>{stakeholder.role} · {stakeholder.designation}</dd></div>
            <div><dt>Ownership percentage</dt><dd>{stakeholder.ownership == null ? "Not provided by Wathq" : `${stakeholder.ownership}%`}</dd></div>
            <div><dt>Ownership level</dt><dd>{stakeholder.level}</dd></div>
            <div><dt>Ownership through</dt><dd lang="ar" dir="rtl">{stakeholder.ownershipThrough || "—"}</dd></div>
            <div><dt>Source</dt><dd>{stakeholder.source}</dd></div>
            <div><dt>Last successful retrieval</dt><dd>{stakeholder.lastRetrieved || "Not retrieved"}</dd></div>
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

function OwnershipTreeNode({
  node,
  depth,
  childrenByParent,
  expandedIds,
  onToggle,
  onOpenProfile,
  onRetrieve,
  retrievalState,
  snapshots,
  stakeholderById,
}) {
  const children = childrenByParent.get(node.id) || [];
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isRetrieving = retrievalState[node.id] === "inProgress";
  const isCoolingDown = retrievalState[node.id] === "cooldown";
  const canRetrieveOwnership = !node.isRoot
    && node.stakeholderType === "Company"
    && VALID_UNIFIED_NUMBER_PATTERN.test(node.id);
  const parent = node.parentId ? stakeholderById.get(node.parentId) : null;
  const profileStakeholder = createProfileStakeholder(node, parent, snapshots);

  return (
    <li
      className={`ownership-tree-node${node.isRoot ? " is-root" : ""}${depth > 1 ? " is-indirect" : ""}`}
      role="treeitem"
      aria-level={depth + 1}
      aria-expanded={hasChildren ? isExpanded : undefined}
      style={{ "--ownership-indent": `${depth * 18}px` }}
    >
      <div className="ownership-tree-row">
        <span className="ownership-tree-leading">
          {hasChildren ? (
            <button
              className="ownership-tree-toggle"
              type="button"
              onClick={() => onToggle(node.id)}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} ownership below ${node.name}`}
              title={isExpanded ? "Collapse ownership level" : "Expand ownership level"}
            >
              {isExpanded ? <ChevronDownIcon label="" size="small" /> : <ChevronRightIcon label="" size="small" />}
            </button>
          ) : <span className="ownership-tree-toggle-placeholder" aria-hidden="true" />}
        </span>
        <button
          className="ownership-tree-name"
          type="button"
          onClick={() => onOpenProfile(profileStakeholder)}
          lang="ar"
          dir="rtl"
        >
          {node.name}
        </button>
        {!node.isRoot ? (
          <strong className="ownership-tree-percentage">
            {node.ownership == null ? "—" : `${node.ownership}%`}
          </strong>
        ) : <span className="ownership-tree-root-label">Current company</span>}
        {canRetrieveOwnership ? (
          <button
            className="secondary-action-button ownership-tree-retrieve"
            type="button"
            onClick={() => onRetrieve(node)}
            disabled={isRetrieving || isCoolingDown}
          >
            <RefreshIcon label="" size="small" />
            {isRetrieving ? "Retrieving…" : isCoolingDown ? "Cooldown active" : "Retrieve Ownership"}
          </button>
        ) : <span className="ownership-tree-action-placeholder" aria-hidden="true" />}
      </div>
      {hasChildren && isExpanded ? (
        <ul className="ownership-tree-children" role="group">
          {children.map((child) => (
            <OwnershipTreeNode
              key={child.key}
              node={child}
              depth={depth + 1}
              childrenByParent={childrenByParent}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onOpenProfile={onOpenProfile}
              onRetrieve={onRetrieve}
              retrievalState={retrievalState}
              snapshots={snapshots}
              stakeholderById={stakeholderById}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function OwnershipHierarchy({
  stakeholders,
  snapshots,
  onOpenProfile,
  onRetrieve,
  retrievalState,
}) {
  const owners = useMemo(
    () => stakeholders.filter((stakeholder) => stakeholder.role === "Owner"),
    [stakeholders],
  );
  const stakeholderById = useMemo(
    () => new Map([mainCompanyStakeholder, ...owners].map((stakeholder) => [stakeholder.id, stakeholder])),
    [owners],
  );
  const childrenByParent = useMemo(() => {
    const grouped = new Map();
    owners.forEach((owner) => {
      const parentId = owner.parentId || MAIN_COMPANY_ID;
      const children = grouped.get(parentId) || [];
      children.push(owner);
      grouped.set(parentId, children);
    });
    return grouped;
  }, [owners]);
  const [expandedIds, setExpandedIds] = useState(() => new Set([
    MAIN_COMPANY_ID,
    ...owners.filter((owner) => owner.childrenLoaded).map((owner) => owner.id),
  ]));

  useEffect(() => {
    const expandableIds = new Set(
      [MAIN_COMPANY_ID, ...owners.map((owner) => owner.id)]
        .filter((ownerId) => (childrenByParent.get(ownerId) || []).length > 0),
    );
    setExpandedIds((current) => {
      const next = new Set(current);
      expandableIds.forEach((ownerId) => {
        const owner = stakeholderById.get(ownerId);
        if (owner?.childrenLoaded || owner?.isRoot) next.add(ownerId);
      });
      return next;
    });
  }, [childrenByParent, stakeholderById, owners]);

  function toggleNode(nodeId) {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  }

  return (
    <section className="ownership-hierarchy-section" aria-labelledby="ownership-hierarchy-heading">
      <div className="ownership-panel-heading">
        <div>
          <div>
            <h3 id="ownership-hierarchy-heading">Ownership Hierarchy</h3>
            <p>Owners are shown beneath the company they own. Corporate owners can be retrieved from Wathq.</p>
          </div>
        </div>
      </div>
      <div className="ownership-tree-shell">
        <div className="ownership-tree-columns" aria-hidden="true">
          <span />
          <span>Owner / Company</span>
          <span>Ownership</span>
          <span>Action</span>
        </div>
        <ul className="ownership-tree-list" role="tree" aria-label="Company ownership hierarchy">
          <OwnershipTreeNode
            node={mainCompanyStakeholder}
            depth={0}
            childrenByParent={childrenByParent}
            expandedIds={expandedIds}
            onToggle={toggleNode}
            onOpenProfile={onOpenProfile}
            onRetrieve={onRetrieve}
            retrievalState={retrievalState}
            snapshots={snapshots}
            stakeholderById={stakeholderById}
          />
        </ul>
      </div>
    </section>
  );
}

function OwnershipCurrentView({
  stakeholders,
  snapshots,
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

      <div className="ownership-table-heading">
        <h3>Owners &amp; Executives</h3>
      </div>
      <div className="table-shell enhancement-table-shell">
        <table className="users-table enhancement-table ownership-management-table">
          <colgroup>
            <col className="uc-owner-col-name" />
            <col className="uc-owner-col-id" />
            <col className="uc-owner-col-role" />
            <col className="uc-owner-col-percentage" />
          </colgroup>
          <thead>
            <tr>
              <th>Name</th><th>ID</th><th>Role</th><th>Ownership Percentage</th>
            </tr>
          </thead>
          <tbody>
            {stakeholders.map((row) => {
              const parentOwner = row.parentId ? stakeholderById.get(row.parentId) : null;
              return (
                <tr key={row.key}>
                  <td className="ownership-profile-cell">
                    <button
                      className="stakeholder-link"
                      type="button"
                      onClick={() => onOpenProfile(createProfileStakeholder(row, parentOwner, snapshots))}
                      lang="ar"
                      dir="rtl"
                    >
                      {row.name}
                    </button>
                  </td>
                  <td className="ownership-number">{row.id}</td>
                  <td><strong className="role-name">{row.role}</strong></td>
                  <td className="ownership-number">{row.ownership == null ? "—" : `${row.ownership}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <OwnershipHierarchy
        stakeholders={stakeholders}
        snapshots={snapshots}
        onOpenProfile={onOpenProfile}
        onRetrieve={onRetrieve}
        retrievalState={retrievalState}
      />

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
                <td><button className="stakeholder-link" type="button" onClick={() => onOpenProfile({ ...row, ownershipThrough: snapshot.companyName, lastRetrieved: snapshot.retrievedAt })} lang="ar" dir="rtl">{row.name}</button></td>
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

function OwnershipSnapshotsView({ snapshots, stakeholders, selectedCompany, onCompanyChange, onOpenProfile, onCallWathq, retrievalState }) {
  const companySnapshots = snapshots[selectedCompany] || [];
  const [selectedSnapshotId, setSelectedSnapshotId] = useState(companySnapshots[0]?.id || "");
  const selectedSnapshot = companySnapshots.find((snapshot) => snapshot.id === selectedSnapshotId) || companySnapshots[0];
  const companyOptions = useMemo(
    () => [mainCompanyStakeholder, ...stakeholders.filter((stakeholder) => stakeholder.stakeholderType === "Company")],
    [stakeholders],
  );

  function changeCompany(value) {
    onCompanyChange(value);
    setSelectedSnapshotId((snapshots[value] || [])[0]?.id || "");
  }

  const uncalledCompany = companyOptions.find((row) => row.id === selectedCompany);

  return (
    <>
      <div className="enhancement-section-header">
        <div><h2 id="users-heading">Wathq Snapshots</h2><p>Successful responses are stored separately and displayed newest to oldest.</p></div>
        <label className="snapshot-company-filter">
          <span>Company</span>
          <select value={selectedCompany} onChange={(event) => changeCompany(event.target.value)}>
            {companyOptions.map((company) => <option key={company.id} value={company.id}>{company.name} · {company.id}</option>)}
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
      const existingRows = stakeholders.filter((row) => row.parentId === company.id);
      const rows = (existingRows.length ? existingRows : retrievedCorporateChildrenByCompany[company.id] || [])
        .map((row) => ({ ...row }));
      setStakeholders((current) => {
        const updated = current.map((row) => row.id === company.id ? { ...row, childrenLoaded: true } : row);
        if (current.some((row) => row.parentId === company.id)) return updated;
        return updated.concat(rows);
      });
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
          snapshots={snapshots}
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
          stakeholders={stakeholders}
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

function displayRequestStatus(status) {
  if (status === "Pending review") return "Pending";
  if (status === "Approved") return "Accepted";
  return status;
}

function productionDate(value) {
  if (!value) return "—";
  const match = value.match(/^(\d{1,2})\s([A-Z][a-z]{2})\s(\d{4})/);
  if (!match) return value;
  const month = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  }[match[2]];
  return `${String(match[1]).padStart(2, "0")}/${month}/${match[3]}`;
}

function PermissionConfigurationPanel({
  permissions,
  practiceMethod,
  canDelegate,
  readOnly = false,
  onPermissionsChange,
  onPracticeMethodChange,
  onCanDelegateChange,
}) {
  const allSelected = configurablePermissions.every((permission) => permissions.includes(permission));

  function setPermission(permission, checked) {
    if (readOnly) return;
    onPermissionsChange?.(
      checked
        ? [...new Set([...permissions, permission])]
        : permissions.filter((item) => item !== permission),
    );
  }

  function setGroup(group, checked) {
    if (readOnly) return;
    const groupPermissions = new Set(group.permissions);
    onPermissionsChange?.(
      checked
        ? [...new Set([...permissions, ...group.permissions])]
        : permissions.filter((item) => !groupPermissions.has(item)),
    );
  }

  return (
    <div className={`permission-configuration${readOnly ? " is-readonly" : ""}`}>
      <section className="permission-method-card">
        <h3>Permissions</h3>
        <div className="permission-method-options">
          <fieldset>
            <legend>Practice Method</legend>
            {["Individually", "Jointly"].map((method) => (
              <label key={method}>
                <input
                  type="radio"
                  name={`practice-method-${readOnly ? "readonly" : "editable"}`}
                  checked={practiceMethod === method}
                  disabled={readOnly}
                  onChange={() => onPracticeMethodChange?.(method)}
                />
                <span>{method}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Can Delegate?</legend>
            {["Yes", "No"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`can-delegate-${readOnly ? "readonly" : "editable"}`}
                  checked={canDelegate === option}
                  disabled={readOnly}
                  onChange={() => onCanDelegateChange?.(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
        </div>
      </section>

      <fieldset className="permission-tree" disabled={readOnly}>
        <legend className="sr-only">System permissions</legend>
        <div className="permission-tree-root">
          <label>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(event) => onPermissionsChange?.(event.target.checked ? configurablePermissions : [])}
            />
            <strong>System Permissions</strong>
          </label>
          <ChevronUpIcon label="Collapse system permissions" size="small" />
        </div>
        {permissionGroups.map((group) => {
          const groupSelected = group.permissions.every((permission) => permissions.includes(permission));
          return (
            <div className="permission-tree-group" key={group.id}>
              <label className="permission-tree-group-label">
                <input type="checkbox" checked={groupSelected} onChange={(event) => setGroup(group, event.target.checked)} />
                <span>{group.label}</span>
              </label>
              <div className="permission-tree-children">
                {group.permissions.map((permission) => (
                  <label key={permission}>
                    <input
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      onChange={(event) => setPermission(permission, event.target.checked)}
                    />
                    <span>{permission}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}

function PermissionConfigurator({ request, onBack, onApprove, readOnly = false }) {
  const [selectedPermissions, setSelectedPermissions] = useState(request.permissions);
  const [practiceMethod, setPracticeMethod] = useState(request.practiceMethod || "Individually");
  const [canDelegate, setCanDelegate] = useState(request.canDelegate || "Yes");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (readOnly) {
      onBack();
      return;
    }
    if (!selectedPermissions.length) {
      setError("Select at least one permission before approving this request.");
      return;
    }
    onApprove({
      permissions: selectedPermissions,
      managerIds: [],
      practiceMethod,
      canDelegate,
    });
  }

  return (
    <form className="request-permission-configurator" onSubmit={submit}>
      <div className="permission-flow-heading">
        <h2 id="users-heading">Permissions</h2>
        <button type="button" onClick={onBack}>Back</button>
      </div>
      <PermissionConfigurationPanel
        permissions={selectedPermissions}
        practiceMethod={practiceMethod}
        canDelegate={canDelegate}
        readOnly={readOnly}
        onPermissionsChange={(value) => { setSelectedPermissions(value); setError(""); }}
        onPracticeMethodChange={setPracticeMethod}
        onCanDelegateChange={setCanDelegate}
      />
      {error ? <div className="decision-error permission-config-error" role="alert"><WarningIcon label="" size="small" />{error}</div> : null}
      <div className="permission-config-actions">
        <button className="secondary-button" type="button" onClick={onBack}>Back</button>
        {!readOnly ? <button className="primary-button permission-approve-button" type="submit">Approve</button> : null}
      </div>
    </form>
  );
}

function DelegatorSelectionModal({ request, onClose, onApprove, onNotify }) {
  const [selectedManagers, setSelectedManagers] = useState(() => request.managers.map((manager) => manager.id));
  const [error, setError] = useState("");

  function toggleManager(managerId) {
    setSelectedManagers((current) => (
      current.includes(managerId)
        ? current.filter((item) => item !== managerId)
        : [...current, managerId]
    ));
    setError("");
  }

  function submit(event) {
    event.preventDefault();
    if (!selectedManagers.length) {
      setError("Select at least one delegator before accepting this request.");
      return;
    }
    onApprove({ permissions: request.permissions, managerIds: selectedManagers });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="enhancement-modal delegator-selection-modal" role="dialog" aria-modal="true" aria-labelledby="choose-delegators-title">
        <form onSubmit={submit}>
          <div className="modal-header">
            <h2 id="choose-delegators-title">Choose Delegators</h2>
            <button type="button" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="enhancement-modal-body">
            <div className="delegator-modal-toolbar"><span>Select the managers who must sign this delegation.</span><button type="button" onClick={() => onNotify?.("Delegators are managed from Company Users")}>Add Delegator</button></div>
            <div className="delegator-options">
              {request.managers.map((manager) => (
                <label key={manager.id}>
                  <input type="checkbox" checked={selectedManagers.includes(manager.id)} onChange={() => toggleManager(manager.id)} />
                  <span lang="ar" dir="rtl">{manager.name}</span>
                  <small>{manager.nationalId}</small>
                  <small>{manager.requesterDob || "Date of birth not available"}</small>
                  <small>{manager.phone}</small>
                </label>
              ))}
            </div>
            {error ? <div className="decision-error" role="alert"><WarningIcon label="" size="small" />{error}</div> : null}
          </div>
          <div className="modal-footer">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit">Save</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function RejectionModal({ request, onClose, onReject }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!reason.trim()) {
      setError("A rejection reason is required and will be shared with the borrower.");
      return;
    }
    onReject(reason.trim());
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="enhancement-modal request-decision-modal" role="dialog" aria-modal="true" aria-labelledby="reject-request-title">
        <form onSubmit={submit}>
          <div className="modal-header">
            <div><h2 id="reject-request-title">Rejection reason</h2></div>
            <button type="button" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="enhancement-modal-body request-decision-body">
            <label className="rejection-reason-field">
              <span>Rejection reason <b aria-hidden="true">*</b></span>
              <textarea value={reason} onChange={(event) => { setReason(event.target.value); setError(""); }} rows="5" placeholder="Explain why the request is being rejected" />
              <small>This reason will be shared with the requester.</small>
            </label>
            {error ? <div className="decision-error" role="alert"><WarningIcon label="" size="small" />{error}</div> : null}
          </div>
          <div className="modal-footer">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit">Save</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function RequestHistoryCard({ request, onOpenRequest }) {
  return (
    <button className="permission-request-row" type="button" onClick={() => onOpenRequest(request.id)} aria-label={`Open ${request.type} request from ${request.requestedBy}`}>
      <span className="request-type-icon" aria-hidden="true"><PersonAddedIcon label="" /></span>
      <span className="request-row-person">
        <strong>{request.type}</strong>
        <span lang="ar" dir="rtl">{request.requestedBy}</span>
      </span>
      <time dateTime={request.submittedAt}>{productionDate(request.submittedAt)}</time>
      <Badge tone={statusTone(request.status)}>{displayRequestStatus(request.status)}</Badge>
    </button>
  );
}

function PermissionRequestList({ requests, onOpenRequest }) {
  const [activeListTab, setActiveListTab] = useState("Previous Requests");
  const pendingRequests = useMemo(
    () => requests.filter((request) => request.status === "Pending review"),
    [requests],
  );
  const previousRequests = useMemo(
    () => requests.filter((request) => request.status !== "Pending review"),
    [requests],
  );
  const visibleRequests = activeListTab === "Pending Requests" ? pendingRequests : previousRequests;

  return (
    <>
      <div className="enhancement-section-header permission-request-header">
        <div><h2 id="users-heading">Pending Requests</h2></div>
      </div>
      <section className="permission-register-panel" aria-label="Permission request register">
        <div className="enhancement-subtabs permission-register-tabs" role="tablist" aria-label="Permission request status">
          <button type="button" role="tab" aria-selected={activeListTab === "Previous Requests"} className={activeListTab === "Previous Requests" ? "is-active" : ""} onClick={() => setActiveListTab("Previous Requests")}>Previous Requests</button>
          <button type="button" role="tab" aria-selected={activeListTab === "Pending Requests"} className={activeListTab === "Pending Requests" ? "is-active" : ""} onClick={() => setActiveListTab("Pending Requests")}>Pending Requests ({pendingRequests.length})</button>
        </div>
        <div className="permission-request-list">
          {visibleRequests.map((request) => <RequestHistoryCard key={request.id} request={request} onOpenRequest={onOpenRequest} />)}
          {!visibleRequests.length ? <div className="permission-register-empty">No Records found</div> : null}
        </div>
      </section>
    </>
  );
}

function RequestDetails({ request, onBack, onResendSms, onOpenDocument, onAccept, onReject, onViewPermissions }) {
  const canReview = request.status === "Pending review" && request.processing === "Manual review";
  const requestFiles = request.files || (request.delegationDocument ? [request.delegationDocument] : []);
  const isPrevious = request.status !== "Pending review";
  const canViewSavedPermissions = isPrevious && request.type === "Authorization" && request.status === "Accepted";

  return (
    <div className="production-request-detail">
      <div className="request-page-heading">
        <h2 id="users-heading">{isPrevious ? "Previous Requests" : "Pending Requests"}</h2>
        <button type="button" onClick={onBack}>Back</button>
      </div>

      <section className="production-request-card">
        <div className="production-request-card-heading">
          <div><h3>{request.type} request</h3></div>
          <div className="request-detail-statuses">
            <Badge tone={statusTone(request.status)}>{displayRequestStatus(request.status)}</Badge>
          </div>
        </div>

        <div className="production-request-body">
          <h4>Requester</h4>
          <dl className="requester-summary">
            <div className="requester-identity">
              <span className="requester-avatar" aria-hidden="true"><PersonIcon label="" /></span>
              <span><strong lang="ar" dir="rtl">{request.requestedBy}</strong><small>{request.requesterNationalId}</small></span>
            </div>
            <div><dt>Request Date</dt><dd>{productionDate(request.submittedAt)}</dd></div>
            <div><dt>Date Of Birth</dt><dd>{productionDate(request.requesterDob)}</dd></div>
            <div><dt>Phone Number</dt><dd>{request.requesterPhone}</dd></div>
          </dl>

          <h4>Attached files</h4>
          <div className="production-attached-files">
            {requestFiles.map((filename, index) => (
              <button type="button" key={filename} onClick={() => onOpenDocument({ filename, signed: false, requestType: request.type })}>
                <AttachmentIcon label="" size="small" /><span>{index === 0 ? "Proof file" : `Attached file ${index + 1}`}</span>
              </button>
            ))}
            {request.type === "Delegation" ? (
              request.signedDocument ? (
                <button type="button" onClick={() => onOpenDocument({ filename: request.signedDocument, signed: true, requestType: request.type })}>
                  <DownloadIcon label="" size="small" /><span>{request.signedDocument}</span><Badge tone="success">Signed</Badge>
                </button>
              ) : <span className="signed-document-placeholder">Signed delegation document will appear after all selected delegators sign.</span>
            ) : null}
          </div>
        </div>

        {canReview ? (
          <div className="production-request-actions">
            <button className="danger-ghost-button" type="button" onClick={onReject}>Reject</button>
            <button className="primary-button request-approve-button" type="button" onClick={onAccept}>Accept</button>
          </div>
        ) : null}
        {canViewSavedPermissions ? (
          <div className="production-request-actions">
            <button className="primary-button request-approve-button" type="button" onClick={onViewPermissions}>View Permissions</button>
          </div>
        ) : null}
      </section>

      {request.rejectionReason ? (
        <section className="request-detail-card rejection-detail-card">
          <div className="detail-card-title"><h3>Rejection reason</h3><span>Visible to borrower</span></div>
          <p>{request.rejectionReason}</p>
        </section>
      ) : null}

      {request.type === "Delegation" && request.permissions.length ? (
        <section className="request-detail-card delegated-permissions-card">
          <div className="detail-card-title"><h3>Delegated permissions</h3><span>{request.permissions.length} permissions</span></div>
          <ul className="requested-permissions">
            {request.permissions.map((permission) => <li key={permission}><CheckCircleIcon label="" size="small" /><span>{permission}</span></li>)}
          </ul>
        </section>
      ) : null}

      {request.type === "Delegation" && request.managers.length ? (
        <section className="request-detail-card managers-card">
          <div className="detail-card-title"><div><h3>{request.status === "Pending review" ? "Proposed delegators" : "Selected delegators"}</h3><span>Signature and invitation tracking</span></div><span>{request.managers.filter((manager) => manager.signature === "Signed").length} of {request.managers.length} signed</span></div>
          <div className="table-shell enhancement-table-shell manager-table-shell">
            <table className="users-table enhancement-table managers-table">
              <thead><tr><th>Delegator</th><th>National ID</th><th>Mobile Number</th><th>Signature Status</th><th>Signed At</th><th>Last SMS</th><th>Actions</th></tr></thead>
              <tbody>
                {request.managers.map((manager) => {
                  const canResend = !request.completed && !manager.resendLocked && ["Pending", "Expired"].includes(manager.invitation);
                  return (
                    <tr key={manager.id}>
                      <td className="arabic-requester" lang="ar" dir="rtl">{manager.name}</td>
                      <td className="ownership-number">{manager.nationalId}</td>
                      <td className="ownership-number">{manager.phone}</td>
                      <td><Badge tone={statusTone(manager.signature)}>{manager.signature}</Badge></td>
                      <td>{manager.signedAt || "—"}</td>
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
      ) : null}

      {isPrevious ? (
        <section className="request-detail-card audit-card">
          <div className="detail-card-title"><h3>Audit log</h3><span>All request actions and status changes</span></div>
          <ol className="audit-list">
            {request.audit.map((event) => (
              <li key={event.id}><span className="audit-dot" /><div><strong>{event.event}</strong><span>{event.actor}</span></div><time>{event.at}</time></li>
            ))}
          </ol>
        </section>
      ) : null}
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
    const pendingRequests = requests.filter((request) => request.status === "Pending review");
    onStatsChange?.({
      total: requests.length,
      active: requests.filter((request) => !request.completed).length,
      historical: requests.filter((request) => request.status !== "Pending review").length,
      pending: pendingRequests.length,
      latestPending: pendingRequests[0] ? {
        requestedBy: pendingRequests[0].requestedBy,
        type: pendingRequests[0].type,
      } : null,
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
          { id: `audit-${request.id}-${Date.now()}`, event: `SMS invitation resent to ${managerName}`, actor: "Norah · Operations", at: "29 Jul 2026, 11:30 AM" },
          ...request.audit,
        ],
      };
    }));
    onNotify(`SMS invitation resent to ${managerName}`);
  }

  function approveRequest({ permissions, managerIds, practiceMethod, canDelegate }) {
    if (!selectedRequest) return;
    setRequests((current) => current.map((request) => {
      if (request.id !== selectedRequest.id) return request;

      if (request.type === "Authorization") {
        return {
          ...request,
          permissions,
          practiceMethod,
          canDelegate,
          status: "Accepted",
          completed: true,
          audit: [
            { id: `audit-${request.id}-${Date.now()}`, event: `Authorization accepted with ${permissions.length} configured permissions`, actor: "Norah · Operations", at: "29 Jul 2026, 11:30 AM" },
            ...request.audit,
          ],
        };
      }

      const selectedManagers = request.managers
        .filter((manager) => managerIds.includes(manager.id))
        .map((manager) => ({
          ...manager,
          signature: "Pending",
          signedAt: "—",
          invitation: "Pending",
          lastSms: "Just now",
          resendLocked: false,
        }));

      return {
        ...request,
        status: "Awaiting signatures",
        managers: selectedManagers,
        audit: [
          { id: `audit-${request.id}-${Date.now()}`, event: `Delegation accepted and SMS invitations sent to ${selectedManagers.length} selected delegator${selectedManagers.length === 1 ? "" : "s"}`, actor: "Norah · Operations", at: "29 Jul 2026, 11:30 AM" },
          ...request.audit,
        ],
      };
    }));
    setSelectedRequestId("");
    setDecisionMode("");
    onNotify(selectedRequest.type === "Authorization" ? "Request has been accepted successfully." : "Delegation request accepted and invitations sent");
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
            { id: `audit-${request.id}-${Date.now()}`, event: `Request rejected · ${reason}`, actor: "Norah · Operations", at: "29 Jul 2026, 11:30 AM" },
            ...request.audit,
          ],
        }
        : request
    )));
    setSelectedRequestId("");
    setDecisionMode("");
    onNotify("Permission request rejected and the borrower was notified");
    resetMainHorizontalScroll();
  }

  function acceptRequest() {
    if (!selectedRequest) return;
    setDecisionMode(selectedRequest.type === "Authorization" ? "permissions" : "delegators");
    resetMainHorizontalScroll();
  }

  return (
    <div className="enhancement-view permission-requests-view">
      {selectedRequest && decisionMode === "permissions" ? (
        <PermissionConfigurator request={selectedRequest} onBack={() => setDecisionMode("")} onApprove={approveRequest} />
      ) : selectedRequest && decisionMode === "view-permissions" ? (
        <PermissionConfigurator request={selectedRequest} onBack={() => setDecisionMode("")} onApprove={approveRequest} readOnly />
      ) : selectedRequest ? (
        <RequestDetails
          request={selectedRequest}
          onBack={closeRequest}
          onResendSms={resendSms}
          onOpenDocument={setDocumentPreview}
          onAccept={acceptRequest}
          onReject={() => setDecisionMode("reject")}
          onViewPermissions={() => { setDecisionMode("view-permissions"); resetMainHorizontalScroll(); }}
        />
      ) : <PermissionRequestList requests={requests} onOpenRequest={openRequest} />}

      {documentPreview ? <DocumentPreviewModal {...documentPreview} onClose={() => setDocumentPreview(null)} onDownload={(filename) => onNotify(`${filename} is ready to download in the production integration`)} /> : null}
      {selectedRequest && decisionMode === "delegators" ? <DelegatorSelectionModal request={selectedRequest} onClose={() => setDecisionMode("")} onApprove={approveRequest} onNotify={onNotify} /> : null}
      {selectedRequest && decisionMode === "reject" ? <RejectionModal request={selectedRequest} onClose={() => setDecisionMode("")} onReject={rejectRequest} /> : null}
    </div>
  );
}
