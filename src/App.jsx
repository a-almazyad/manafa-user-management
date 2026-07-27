import { useEffect, useMemo, useRef, useState } from "react";
import AddIcon from "@atlaskit/icon/core/add";
import ChartIcon from "@atlaskit/icon/core/chart-trend-up";
import CheckIcon from "@atlaskit/icon/core/check-mark";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import ClockIcon from "@atlaskit/icon/core/clock";
import CreditCardIcon from "@atlaskit/icon/core/credit-card";
import DatabaseIcon from "@atlaskit/icon/core/database";
import EditIcon from "@atlaskit/icon/core/edit";
import FilterIcon from "@atlaskit/icon/core/filter";
import HeadphonesIcon from "@atlaskit/icon/core/headphones";
import InformationIcon from "@atlaskit/icon/core/information-circle";
import MenuIcon from "@atlaskit/icon/core/menu";
import NoteIcon from "@atlaskit/icon/core/note";
import PageIcon from "@atlaskit/icon/core/page";
import PeopleGroupIcon from "@atlaskit/icon/core/people-group";
import PersonIcon from "@atlaskit/icon/core/person";
import QuestionIcon from "@atlaskit/icon/core/question-circle";
import RefreshIcon from "@atlaskit/icon/core/refresh";
import SearchIcon from "@atlaskit/icon/core/search";
import TaskIcon from "@atlaskit/icon/core/task";
import { FinanceWorkspace } from "./FinanceWorkspace.jsx";
import { OwnershipManagement, PermissionRequests } from "./UserManagementEnhancements.jsx";

const usersSeed = [
  {
    id: "1001068640",
    name: "هاني سليمان عبدالرحمن الصالح",
    type: "Executive",
    designation: "Company Director",
    status: "Unregistered",
    phone: "-",
    birth: "-",
    source: "Wathq",
  },
  {
    id: "1001806502",
    name: "بكر عاطف بكر سندي",
    type: "Executive",
    designation: "Company Director, Company Board Member",
    status: "Unregistered",
    phone: "-",
    birth: "-",
    source: "Wathq",
  },
  {
    id: "1004711212",
    name: "عبدالعزيز عبدالله محمد حكمي",
    type: "Executive",
    designation: "Company Board Member",
    status: "Unregistered",
    phone: "-",
    birth: "-",
    source: "Wathq",
  },
  {
    id: "1004745871",
    name: "سعود بن عبدالله بن إبراهيم البواردي",
    type: "Executive",
    designation: "Company Board Member",
    status: "Unregistered",
    phone: "-",
    birth: "-",
    source: "Wathq",
  },
  {
    id: "1007304304",
    name: "احمد محمد عبدالرحمن الفالح",
    type: "Owner",
    designation: "Chairman",
    status: "Deactivated",
    phone: "540660000",
    birth: "1381-11-14 | 64y",
    source: "Wathq",
  },
  {
    id: "1008343939",
    name: "عيسى بسام فرح باعيسى",
    type: "User",
    designation: "Chairman",
    status: "Registered",
    phone: "553637002",
    birth: "1392-11-24 | 53y",
    source: "Added by borrowers",
  },
  {
    id: "1025036128",
    name: "عبدالله بن عبدالعزيز بن ناصر الزيريدي",
    type: "Executive",
    designation: "Company Board Member",
    status: "Unregistered",
    phone: "-",
    birth: "-",
    source: "Wathq",
  },
  {
    id: "1030929341",
    name: "حامد سعيد حمدان الغامدي",
    type: "User",
    designation: "Company Director",
    status: "Registered",
    phone: "555781730",
    birth: "1391-07-01 | 54y",
    source: "Admin Added",
  },
  {
    id: "1034611333",
    name: "أيمن هلال ابن علي الجابر",
    type: "Executive",
    designation: "Company Board Member",
    status: "Unregistered",
    phone: "-",
    birth: "-",
    source: "Wathq",
  },
  {
    id: "1041316504",
    name: "منصور ابراهيم الهيدان",
    type: "Executive",
    designation: "Company Director",
    status: "Unregistered",
    phone: "500045698",
    birth: "1383-07-01 | 62y",
    source: "Admin Added",
  },
  {
    id: "1042589130",
    name: "محمد بن صالح العتيبي",
    type: "User",
    designation: "Authorized Signatory",
    status: "Registered",
    phone: "551208704",
    birth: "1390-02-15 | 55y",
    source: "Admin Added",
  },
  {
    id: "1046031781",
    name: "عبدالرحمن فهد القحطاني",
    type: "Executive",
    designation: "Company Director",
    status: "Unregistered",
    phone: "-",
    birth: "-",
    source: "Wathq",
  },
  {
    id: "1050034372",
    name: "تركي عبدالله الزهراني",
    type: "Owner",
    designation: "Partner",
    status: "Registered",
    phone: "559316209",
    birth: "1394-05-20 | 51y",
    source: "Added by borrowers",
  },
  {
    id: "1052174389",
    name: "سلطان أحمد الحربي",
    type: "User",
    designation: "Finance Manager",
    status: "Deactivated",
    phone: "558104322",
    birth: "1395-10-07 | 50y",
    source: "Admin Added",
  },
  {
    id: "1058016294",
    name: "خالد بن عمر السبيعي",
    type: "Executive",
    designation: "Company Board Member",
    status: "Unregistered",
    phone: "-",
    birth: "-",
    source: "Wathq",
  },
  {
    id: "1061942783",
    name: "نايف محمد الدوسري",
    type: "User",
    designation: "Company Representative",
    status: "Registered",
    phone: "556902182",
    birth: "1393-08-09 | 52y",
    source: "Admin Added",
  },
];

const invitedUsers = [
  { name: "نورة عبدالله السالم", email: "n.alsalem@example.com", role: "Company User", sent: "12 Jul 2026" },
  { name: "سلمان أحمد العمري", email: "s.alomari@example.com", role: "Executive", sent: "14 Jul 2026" },
];

const ownershipSeed = [
  {
    id: "1006745231",
    name: "سلمان بن عبدالعزيز آل سعود",
    type: "Individual",
    level: "Direct",
    ownership: 35,
    source: "Commercial Registration",
    status: "Active",
  },
  {
    id: "1012345678",
    name: "محمد بن عبدالله آل سعود",
    type: "Individual",
    level: "Direct",
    ownership: 25,
    source: "Verified Company Records",
    status: "Active",
  },
  {
    id: "1010123456",
    name: "الشركة الوطنية للاستثمار الصناعي",
    type: "Company",
    level: "Direct",
    ownership: 30,
    source: "Commercial Registration",
    status: "Active",
  },
  {
    id: "1010123456-IND-01",
    name: "الشركة الوطنية للاستثمار الصناعي (محفظة القطاع الصناعي)",
    type: "Company",
    level: "Indirect",
    ownership: 10,
    source: "Internal Ownership Declaration",
    status: "Active",
    nested: true,
  },
];

const groupRelationsSeed = [
  { id: "1010225259", name: "شركة اسمنت الجوف", relationship: "Current Company", control: "—", status: "Active" },
  { id: "1010456789", name: "شركة اسمنت الشمالية", relationship: "Sister Company", control: "Common parent", status: "Active" },
  { id: "1010789123", name: "شركة اسمنت القصيم", relationship: "Sister Company", control: "Common parent", status: "Active" },
  { id: "1011122334", name: "شركة الجوف للخرسانة الجاهزة", relationship: "Subsidiary", control: "80%", status: "Active" },
  { id: "1011677889", name: "شركة الجوف لمواد البناء", relationship: "Subsidiary", control: "60%", status: "Active" },
  { id: "1011999001", name: "شركة وادي الشمال للتعدين", relationship: "Affiliate", control: "30%", status: "Inactive" },
];

const navItems = ["Dashboard", "Boards", "Users", "Companies", "Investors", "Compliance", "More", "Short Links"];

const sidebarItems = [
  { label: "Commercial Contract Info", icon: InformationIcon },
  { label: "User Management", icon: PeopleGroupIcon, active: true },
  { label: "Reports", icon: ChartIcon },
  { label: "Documents", icon: PageIcon, expand: true },
  { label: "Financial Statements", icon: DatabaseIcon, expand: true },
  { label: "Credit History", icon: CreditCardIcon, expand: true },
  { label: "Company Stakeholders", icon: PeopleGroupIcon, expand: true },
  { label: "Financing", icon: ChartIcon, children: ["Funding Requests", "Loans"] },
  { label: "Tasks", icon: TaskIcon },
  { label: "Facility Contracts", icon: NoteIcon },
  { label: "Collateral", icon: PageIcon, children: ["Pledge Agreement"] },
  { label: "Wallet", icon: CreditCardIcon },
  { label: "Communications", icon: HeadphonesIcon, expand: true },
];

function Header({ onCrSearch }) {
  const [openMenu, setOpenMenu] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [crNumber, setCrNumber] = useState("1010225259");

  function submitSearch(event) {
    event.preventDefault();
    onCrSearch(crNumber);
  }

  return (
    <header className="app-header">
      <div className="top-navigation">
        <div className="brand-suite" aria-label="Manafa admin">
          <img className="manafa-logo" src={`${import.meta.env.BASE_URL}assets/manafa-logo.svg`} alt="Manafa" />
          <img className="suite-image" src={`${import.meta.env.BASE_URL}assets/header-apps.png`} alt="" />
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const hasMenu = item !== "Dashboard";
            return (
              <div className="nav-item-wrap" key={item}>
                <button
                  className="nav-link"
                  type="button"
                  onClick={() => hasMenu && setOpenMenu((value) => value === item ? "" : item)}
                  aria-expanded={hasMenu ? openMenu === item : undefined}
                >
                  {item}
                  {hasMenu ? <ChevronDownIcon label="" size="small" /> : null}
                </button>
                {openMenu === item ? (
                  <div className="header-popover" role="menu">
                    <button type="button" role="menuitem">View all {item.toLowerCase()}</button>
                    <button type="button" role="menuitem">Recently viewed</button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="profile-wrap">
          <button className="profile-button" type="button" onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen}>
            <span className="profile-avatar"><PersonIcon label="" /></span>
            <span className="profile-name">Norah</span>
            <ChevronDownIcon label="Open profile menu" size="small" />
          </button>
          {profileOpen ? (
            <div className="profile-popover" role="menu">
              <strong>Norah</strong>
              <span>Administrator</span>
              <button type="button" role="menuitem">Account settings</button>
              <button type="button" role="menuitem">Sign out</button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="company-context-bar">
        <form className="cr-search" onSubmit={submitSearch}>
          <button className="cr-selector" type="button">
            CR Number <ChevronDownIcon label="" size="small" />
          </button>
          <label className="sr-only" htmlFor="cr-number">Commercial registration number</label>
          <input id="cr-number" value={crNumber} onChange={(event) => setCrNumber(event.target.value)} />
          <button className="cr-search-button" type="submit" aria-label="Search commercial registration">
            <SearchIcon label="" />
          </button>
        </form>
        <div className="company-name" lang="ar" dir="rtl">شركة اسمنت الجوف</div>
      </div>
    </header>
  );
}

function Sidebar({ activeItem, collapsed, onSelect, onToggleCollapse }) {
  const [openGroups, setOpenGroups] = useState(() => ({
    Financing: ["Funding Requests", "Loans"].includes(activeItem),
    Collateral: activeItem === "Pledge Agreement",
  }));

  function selectItem(item) {
    if (item.children) {
      setOpenGroups((current) => ({ ...current, [item.label]: !current[item.label] }));
      onSelect(item.children[0]);
      return;
    }
    onSelect(item.label);
  }

  return (
    <aside className={`sidebar${collapsed ? " is-collapsed" : ""}`}>
      <button
        className="sidebar-collapse"
        type="button"
        aria-controls="company-sidebar-navigation"
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Expand side navigation" : "Collapse side navigation"}
        onClick={onToggleCollapse}
      >
        <MenuIcon label="" />
      </button>
      <nav id="company-sidebar-navigation" className="sidebar-nav" aria-label="Company navigation">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label || item.children?.includes(activeItem);
          const isOpen = Boolean(item.children && openGroups[item.label] && !collapsed);
          return (
            <div className={`sidebar-item-group${isOpen ? " is-open" : ""}`} key={item.label}>
              <button
                type="button"
                className={`sidebar-link${isActive ? " is-active" : ""}`}
                onClick={() => selectItem(item)}
                aria-label={collapsed ? item.label : undefined}
                title={collapsed ? item.label : undefined}
                aria-expanded={item.children ? isOpen : undefined}
              >
                <span className="sidebar-link-icon"><Icon label="" /></span>
                <span className="sidebar-link-label">{item.label}</span>
                {item.children || item.expand ? <span className="sidebar-chevron">{isOpen ? <ChevronDownIcon label="" size="small" /> : <ChevronRightIcon label="" size="small" />}</span> : null}
              </button>
              {isOpen ? <div className="sidebar-subnav">{item.children.map((child) => <button key={child} className={activeItem === child ? "is-active" : ""} type="button" onClick={() => onSelect(child)}>{child}</button>)}</div> : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function CardTitle({ children, action, status, showAll, onShowAll }) {
  return (
    <div className="card-title-row">
      <div className="card-title-group">
        <h2>{children}</h2>
        {status ? <span className="status-pill status-pill--pending">{status}</span> : null}
      </div>
      <div className="card-title-actions">
        {action}
        {showAll ? <button className="show-all-link" type="button" onClick={onShowAll}>Show All</button> : null}
      </div>
    </div>
  );
}

function KycRing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const size = 136;
    canvas.width = size * ratio;
    canvas.height = size * ratio;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    context.scale(ratio, ratio);
    context.clearRect(0, 0, size, size);
    context.beginPath();
    context.arc(68, 68, 61, 0, Math.PI * 2);
    context.strokeStyle = "#dfe4ff";
    context.lineWidth = 8;
    context.stroke();
    context.beginPath();
    context.arc(68, 68, 61, -Math.PI / 2, Math.PI * 1.5);
    context.strokeStyle = "#2f43e6";
    context.lineWidth = 8;
    context.lineCap = "butt";
    context.stroke();
  }, []);

  return (
    <div className="kyc-ring" aria-label="3 of 3 users complete">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="kyc-ring-label"><b>3</b><span>/3</span><small>Users</small></div>
    </div>
  );
}

function OverviewCards({ onPermissionRequests }) {
  return (
    <section className="overview-grid" aria-label="User management overview">
      <article className="overview-card pinned-card">
        <CardTitle action={<button className="icon-action" type="button" aria-label="Edit pinned user"><EditIcon label="" size="small" /></button>}>
          Pinned Users
        </CardTitle>
        <div className="pinned-name-row">
          <strong lang="ar" dir="rtl">عيسى بسام فرح باعيسى</strong>
          <span className="status-pill status-pill--neutral">No Permission</span>
        </div>
        <dl className="key-values">
          <div><dt>User Type</dt><dd>Owner</dd></div>
          <div><dt>National ID</dt><dd>1008343939</dd></div>
          <div><dt>Mobile Number</dt><dd>553637002</dd></div>
        </dl>
      </article>

      <article className="overview-card empty-card">
        <CardTitle action={<ClockIcon label="Last updated" />}>Main Owners</CardTitle>
        <div className="empty-copy">No main owners selected</div>
      </article>

      <article className="overview-card empty-card">
        <CardTitle showAll onShowAll={onPermissionRequests}>Permissions Request</CardTitle>
        <div className="permission-card-summary"><strong>5 requests</strong><span>1 requires action · 4 historical</span></div>
      </article>

      <article className="overview-card owners-card">
        <CardTitle status="Pending" action={<ClockIcon label="Last updated" />}>Owners &amp; Executives info</CardTitle>
        <div className="owners-list">
          <div><span><CreditCardIcon label="" />Owners' Net worth</span><b>-</b></div>
          <div><span><PeopleGroupIcon label="" />Owners' Experience</span><b>-</b></div>
        </div>
      </article>

      <article className="overview-card permissions-card">
        <CardTitle status="Pending" action={<ClockIcon label="Last updated" />}>Primary Permissions assignee</CardTitle>
        <ul className="permission-list">
          <li><span>Facility Contract</span><b>0</b></li>
          <li><span>Company Promissory Note</span><b>0</b></li>
          <li><span>Assignment of Proceeds</span><b>0</b></li>
          <li><span>Non-Objection Letter</span><b>0</b></li>
        </ul>
      </article>

      <article className="overview-card kyc-card">
        <CardTitle status={null} action={<ClockIcon label="Last updated" />} showAll>KYC &amp; SIMAH</CardTitle>
        <div className="kyc-content">
          <div className="kyc-table">
            <div className="kyc-row kyc-head"><span>User Name</span><span><RefreshIcon label="" size="small" /></span><span>K</span><span>S</span></div>
            <div className="kyc-row"><span lang="ar" dir="rtl">عيسى بسام فرح باعيسى</span><i>—</i><b>✓</b><b>✓</b></div>
            <div className="kyc-row"><span lang="ar" dir="rtl">حامد سعيد حمدان الغامدي</span><i>—</i><b>✓</b><b>✓</b></div>
            <div className="kyc-row"><span lang="ar" dir="rtl">محمد بن عائض الرحبي</span><i>—</i><b>✓</b><b>✓</b></div>
          </div>
          <KycRing />
        </div>
      </article>
    </section>
  );
}

function StatusLozenge({ status }) {
  return <span className={`account-status account-status--${status.toLowerCase()}`}>{status}</span>;
}

function UserTable({ users, page, pageSize, onPageChange, query, statusFilter }) {
  const filteredUsers = useMemo(() => users.filter((user) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || [user.name, user.id, user.phone, user.designation]
      .some((value) => value.toLowerCase().includes(normalizedQuery));
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesQuery && matchesStatus;
  }), [query, statusFilter, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageUsers = filteredUsers.slice(start, start + pageSize);

  return (
    <>
      <div className="table-shell">
        <table className="users-table">
          <colgroup>
            <col className="col-name" /><col className="col-type" /><col className="col-designation" />
            <col className="col-id" /><col className="col-status" /><col className="col-nationality" />
            <col className="col-phone" /><col className="col-birth" /><col className="col-source" />
          </colgroup>
          <thead>
            <tr>
              <th>User Name</th><th>User Type</th><th>Designation</th><th>ID Number</th>
              <th>Account Status</th><th>Nationality</th><th>Phone Number</th><th>Date of Birth</th><th>Source</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.map((user) => (
              <tr key={user.id}>
                <td className={`arabic-name${user.name.length > 30 ? " is-long" : ""}`} lang="ar" dir="rtl">{user.name}</td>
                <td>{user.type}</td>
                <td className="designation-cell">{user.designation}</td>
                <td className="numeric">{user.id}</td>
                <td className="status-cell"><StatusLozenge status={user.status} /></td>
                <td className="nationality-cell"><span className="nationality"><img src={`${import.meta.env.BASE_URL}assets/saudi-flag.png`} alt="" />Saudi Arabia</span></td>
                <td className="numeric">{user.phone}</td>
                <td className="numeric birth-cell">{user.birth}</td>
                <td className="source-cell">{user.source}</td>
              </tr>
            ))}
            {pageUsers.length === 0 ? (
              <tr><td colSpan="9" className="no-results">No users match the selected filters.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <div className="entries-count">Showing {filteredUsers.length ? start + 1 : 0} to {Math.min(start + pageSize, filteredUsers.length)} of {filteredUsers.length} entries</div>
        <div className="pagination" aria-label="Table pagination">
          <button type="button" disabled={safePage === 1} onClick={() => onPageChange(Math.max(1, safePage - 1))}>Previous</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button key={pageNumber} type="button" className={safePage === pageNumber ? "is-current" : ""} onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
          ))}
          <button type="button" disabled={safePage === totalPages} onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}>Next</button>
        </div>
      </div>
    </>
  );
}

function InvitedUsersTable() {
  return (
    <div className="table-shell invited-table-shell">
      <table className="users-table invited-table">
        <thead><tr><th>User Name</th><th>Email</th><th>Invited Role</th><th>Invitation Sent</th><th>Status</th></tr></thead>
        <tbody>
          {invitedUsers.map((user) => (
            <tr key={user.email}>
              <td className="arabic-name" lang="ar" dir="rtl">{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>{user.sent}</td><td><span className="status-pill status-pill--pending">Pending</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OwnershipBadge({ tone, children }) {
  return <span className={`ownership-badge ownership-badge--${tone}`}>{children}</span>;
}

function OwnershipStructure({ rows, onEdit }) {
  const totalOwnership = rows.reduce((total, row) => total + row.ownership, 0);
  const directOwners = rows.filter((row) => row.level === "Direct").length;

  return (
    <div className="structure-view">
      <div className="structure-section-header">
        <div>
          <h2 id="users-heading">Ownership Structure</h2>
          <p>{directOwners} direct owners · {totalOwnership}% total</p>
        </div>
        <button className="add-user-button structure-edit-button" type="button" onClick={onEdit}>
          <EditIcon label="" size="small" />
          Edit Ownership
        </button>
      </div>

      <div className="table-shell">
        <table className="users-table structure-table ownership-structure-table">
          <colgroup>
            <col className="ownership-col-owner" />
            <col className="ownership-col-type" />
            <col className="ownership-col-level" />
            <col className="ownership-col-id" />
            <col className="ownership-col-percentage" />
            <col className="ownership-col-source" />
            <col className="ownership-col-status" />
          </colgroup>
          <thead>
            <tr>
              <th>Owner / Entity</th>
              <th>Type</th>
              <th>Ownership Level</th>
              <th>National ID / CR Number</th>
              <th>Ownership %</th>
              <th>Source</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={row.nested ? "is-nested" : ""}>
                <td className="ownership-name" lang="ar" dir="rtl">
                  <span>{row.name}</span>
                </td>
                <td><OwnershipBadge tone={row.type === "Individual" ? "individual" : "company"}>{row.type}</OwnershipBadge></td>
                <td><OwnershipBadge tone={row.level === "Direct" ? "direct" : "indirect"}>{row.level}</OwnershipBadge></td>
                <td className="ownership-number">{row.id}</td>
                <td className="ownership-number">{row.ownership}%</td>
                <td>{row.source}</td>
                <td><OwnershipBadge tone="active">{row.status}</OwnershipBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="structure-note">
        <InformationIcon label="" />
        <span>Ownership percentages are based on the latest verified company records.</span>
      </div>
    </div>
  );
}

function GroupStructure({ rows, onEdit }) {
  return (
    <div className="structure-view">
      <div className="structure-section-header">
        <div>
          <h2 id="users-heading">Group Structure</h2>
          <p>{rows.length - 1} related companies</p>
        </div>
        <button className="add-user-button structure-edit-button" type="button" onClick={onEdit}>
          <EditIcon label="" size="small" />
          Edit Group Structure
        </button>
      </div>

      <div className="table-shell">
        <table className="users-table structure-table group-structure-table">
          <colgroup>
            <col className="group-col-company" />
            <col className="group-col-relationship" />
            <col className="group-col-cr" />
            <col className="group-col-control" />
            <col className="group-col-status" />
          </colgroup>
          <thead>
            <tr>
              <th>Company</th>
              <th>Relationship</th>
              <th>CR Number</th>
              <th>Ownership / Control</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="ownership-name" lang="ar" dir="rtl"><span>{row.name}</span></td>
                <td><OwnershipBadge tone={row.relationship === "Current Company" ? "company" : "individual"}>{row.relationship}</OwnershipBadge></td>
                <td className="ownership-number">{row.id}</td>
                <td>{row.control}</td>
                <td><OwnershipBadge tone={row.status === "Active" ? "active" : "inactive"}>{row.status}</OwnershipBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="structure-note">
        <InformationIcon label="" />
        <span>Relationships are based on the latest verified company and ownership records.</span>
      </div>
    </div>
  );
}

function EditOwnershipModal({ rows, onClose, onSave }) {
  const [values, setValues] = useState(() => Object.fromEntries(rows.map((row) => [row.id, row.ownership])));
  const total = Object.values(values).reduce((sum, value) => sum + Number(value || 0), 0);
  const isValid = total === 100;

  function submit(event) {
    event.preventDefault();
    if (!isValid) return;
    onSave(rows.map((row) => ({ ...row, ownership: Number(values[row.id]) })));
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="ownership-modal" role="dialog" aria-modal="true" aria-labelledby="edit-ownership-title">
        <div className="modal-header">
          <div><span className="modal-eyebrow">USER MANAGEMENT</span><h2 id="edit-ownership-title">Edit ownership</h2></div>
          <button type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={submit}>
          <p className="ownership-modal-intro">Update the verified ownership percentages. The total must equal 100%.</p>
          <div className="ownership-editor-list">
            {rows.map((row) => (
              <label key={row.id} className={row.nested ? "is-nested" : ""}>
                <span><b lang="ar" dir="rtl">{row.name}</b><small>{row.level} · {row.id}</small></span>
                <span className="ownership-input-wrap">
                  <input
                    aria-label={`${row.name} ownership percentage`}
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={values[row.id]}
                    onChange={(event) => setValues((current) => ({ ...current, [row.id]: event.target.value }))}
                  />
                  <span>%</span>
                </span>
              </label>
            ))}
          </div>
          <div className={`ownership-total${isValid ? " is-valid" : " is-invalid"}`}>
            <span>Total ownership</span><b>{total}%</b>
          </div>
          <div className="modal-footer">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit" disabled={!isValid}>Save Changes</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function EditGroupStructureModal({ rows, onClose, onSave }) {
  const [values, setValues] = useState(() => rows.map((row) => ({ ...row })));
  const isValid = values.every((row) => row.relationship.trim() && row.control.trim());

  function updateRow(id, field, value) {
    setValues((current) => current.map((row) => row.id === id ? { ...row, [field]: value } : row));
  }

  function submit(event) {
    event.preventDefault();
    if (!isValid) return;
    onSave(values);
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="ownership-modal group-structure-modal" role="dialog" aria-modal="true" aria-labelledby="edit-group-title">
        <div className="modal-header">
          <div><span className="modal-eyebrow">USER MANAGEMENT</span><h2 id="edit-group-title">Edit group structure</h2></div>
          <button type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={submit}>
          <p className="ownership-modal-intro">Update how each company is related to this company. Changes are reflected in the Group Structure table.</p>
          <div className="group-editor-table" role="group" aria-label="Group relationships">
            <div className="group-editor-head" aria-hidden="true">
              <span>Company</span><span>Relationship</span><span>Ownership / Control</span><span>Status</span>
            </div>
            {values.map((row) => (
              <div className="group-editor-row" key={row.id}>
                <span className="group-editor-company"><b lang="ar" dir="rtl">{row.name}</b><small>{row.id}</small></span>
                <label>
                  <span className="sr-only">{row.name} relationship</span>
                  <select aria-label={`${row.name} relationship`} value={row.relationship} onChange={(event) => updateRow(row.id, "relationship", event.target.value)}>
                    <option>Current Company</option>
                    <option>Parent Company</option>
                    <option>Sister Company</option>
                    <option>Subsidiary</option>
                    <option>Affiliate</option>
                  </select>
                </label>
                <label>
                  <span className="sr-only">{row.name} ownership or control</span>
                  <input aria-label={`${row.name} ownership or control`} value={row.control} onChange={(event) => updateRow(row.id, "control", event.target.value)} />
                </label>
                <label>
                  <span className="sr-only">{row.name} status</span>
                  <select aria-label={`${row.name} status`} value={row.status} onChange={(event) => updateRow(row.id, "status", event.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </label>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit" disabled={!isValid}>Save Changes</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function FilterPopover({ query, setQuery, statusFilter, setStatusFilter, onClose }) {
  return (
    <div className="filter-popover" role="dialog" aria-label="Filter users">
      <div className="popover-title"><strong>Filter users</strong><button type="button" onClick={onClose}>Done</button></div>
      <label htmlFor="filter-search">Name, ID, or phone</label>
      <div className="filter-search-field"><SearchIcon label="" size="small" /><input id="filter-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search users" /></div>
      <fieldset>
        <legend>Account status</legend>
        {["All", "Registered", "Unregistered", "Deactivated"].map((status) => (
          <label key={status}><input type="radio" name="status" checked={statusFilter === status} onChange={() => setStatusFilter(status)} />{status}</label>
        ))}
      </fieldset>
      <button className="clear-filters" type="button" onClick={() => { setQuery(""); setStatusFilter("All"); }}>Clear filters</button>
    </div>
  );
}

function AddUserModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", id: "", phone: "", type: "User", designation: "Company Representative" });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.name || !form.id || !form.phone) return;
    onAdd({
      ...form,
      status: "Registered",
      birth: "-",
      source: "Admin Added",
    });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="add-user-modal" role="dialog" aria-modal="true" aria-labelledby="add-user-title">
        <div className="modal-header"><div><span className="modal-eyebrow">USER MANAGEMENT</span><h2 id="add-user-title">Add company user</h2></div><button type="button" onClick={onClose} aria-label="Close">×</button></div>
        <form onSubmit={submit}>
          <label>Full name <span>*</span><input name="name" value={form.name} onChange={updateField} placeholder="Enter the user's full name" autoFocus /></label>
          <div className="form-row">
            <label>National ID <span>*</span><input name="id" inputMode="numeric" value={form.id} onChange={updateField} placeholder="10-digit ID" /></label>
            <label>Mobile number <span>*</span><input name="phone" inputMode="tel" value={form.phone} onChange={updateField} placeholder="5XXXXXXXX" /></label>
          </div>
          <div className="form-row">
            <label>User type<select name="type" value={form.type} onChange={updateField}><option>User</option><option>Owner</option><option>Executive</option></select></label>
            <label>Designation<select name="designation" value={form.designation} onChange={updateField}><option>Company Representative</option><option>Company Director</option><option>Chairman</option><option>Finance Manager</option></select></label>
          </div>
          <div className="modal-footer"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit"><AddIcon label="" />Add User</button></div>
        </form>
      </section>
    </div>
  );
}

function UsersSection({ users, onAddUser, onNotify }) {
  const [activeTab, setActiveTab] = useState("Company Users");
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const isDirectoryTab = activeTab === "Company Users" || activeTab === "Invited Users";

  function changeTab(tab) {
    setActiveTab(tab);
    setPage(1);
    setFilterOpen(false);
    const scrollContainer = document.querySelector(".content-scroll");
    const currentTop = scrollContainer?.scrollTop || 0;
    window.requestAnimationFrame(() => scrollContainer?.scrollTo({ top: currentTop, left: 0 }));
  }

  return (
    <>
      <OverviewCards onPermissionRequests={() => changeTab("Permission Requests")} />
      <section className="users-section has-overview" aria-labelledby="users-heading">
        <div className="users-tabs" role="tablist" aria-label="User management views">
          {["Company Users", "Invited Users", "Ownership & Management", "Permission Requests"].map((tab) => (
            <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "is-active" : ""} onClick={() => changeTab(tab)}>{tab}</button>
          ))}
        </div>

        {isDirectoryTab ? (
          <>
            <div className="users-section-header">
              <h2 id="users-heading">{activeTab}</h2>
              <div className="users-actions">
                <div className="filter-wrap">
                  <button className={`filter-button${filterOpen || query || statusFilter !== "All" ? " is-active" : ""}`} type="button" onClick={() => setFilterOpen((value) => !value)} aria-label="Filter users" aria-expanded={filterOpen}>
                    <FilterIcon label="" />
                  </button>
                  {filterOpen ? <FilterPopover query={query} setQuery={(value) => { setQuery(value); setPage(1); }} statusFilter={statusFilter} setStatusFilter={(value) => { setStatusFilter(value); setPage(1); }} onClose={() => setFilterOpen(false)} /> : null}
                </div>
                <button className="add-user-button" type="button" onClick={onAddUser}><AddIcon label="" />Add User</button>
              </div>
            </div>
            {activeTab === "Company Users" ? (
              <>
                <UserTable users={users} page={page} pageSize={pageSize} onPageChange={setPage} query={query} statusFilter={statusFilter} />
                <div className="page-size-control">Show <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}><option value="5">5</option><option value="10">10</option></select> entries</div>
                <div className="bottom-scroll-indicator" aria-hidden="true" />
              </>
            ) : <InvitedUsersTable />}
          </>
        ) : null}

        {activeTab === "Ownership & Management" ? <OwnershipManagement onNotify={onNotify} /> : null}
        {activeTab === "Permission Requests" ? <PermissionRequests onNotify={onNotify} /> : null}
      </section>
    </>
  );
}

export function App() {
  const [activeSidebarItem, setActiveSidebarItem] = useState("User Management");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState(usersSeed);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const contentScrollRef = useRef(null);
  const financeScreens = ["Funding Requests", "Loans", "Facility Contracts", "Pledge Agreement"];

  function handleCrSearch(value) {
    setToast(value === "1010225259" ? "Company information refreshed" : `No company found for CR ${value}`);
  }

  function handleAddUser(user) {
    setUsers((current) => [user, ...current]);
    setModalOpen(false);
    setToast(`${user.name} was added successfully`);
  }

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, left: 0 });
  }, [activeSidebarItem]);

  return (
    <div className={`admin-app${sidebarCollapsed ? " is-sidebar-collapsed" : ""}`}>
      <Header onCrSearch={handleCrSearch} />
      <div className="app-body">
        <Sidebar
          activeItem={activeSidebarItem}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
          onSelect={(item) => {
            setActiveSidebarItem(item);
            if (item !== "User Management" && !financeScreens.includes(item)) setToast(`${item} is available as a visual navigation state in this prototype`);
          }}
        />
        <main className="content-scroll" ref={contentScrollRef}>
          <div className={`content-canvas${activeSidebarItem !== "User Management" ? " content-canvas--finance" : ""}`}>
            {activeSidebarItem === "User Management" ? <UsersSection users={users} onAddUser={() => setModalOpen(true)} onNotify={setToast} /> : null}
            {financeScreens.includes(activeSidebarItem) ? <FinanceWorkspace screen={activeSidebarItem} onNavigate={setActiveSidebarItem} onNotify={setToast} /> : null}
            {activeSidebarItem !== "User Management" && !financeScreens.includes(activeSidebarItem) ? <FinanceWorkspace screen={activeSidebarItem} onNavigate={setActiveSidebarItem} onNotify={setToast} /> : null}
          </div>
        </main>
      </div>
      <div className="help-wrap">
        {helpOpen ? <div className="help-popover"><strong>Need help?</strong><span>Contact the Manafa operations team.</span></div> : null}
        <button className="help-button" type="button" onClick={() => setHelpOpen((value) => !value)} aria-label="Help"><QuestionIcon label="" /></button>
      </div>
      {modalOpen ? <AddUserModal onClose={() => setModalOpen(false)} onAdd={handleAddUser} /> : null}
      {toast ? <div className="toast" role="status"><CheckIcon label="" /><span>{toast}</span></div> : null}
    </div>
  );
}
