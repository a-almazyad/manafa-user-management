import { useMemo, useState } from "react";
import AddIcon from "@atlaskit/icon/core/add";
import ArrowLeftIcon from "@atlaskit/icon/core/arrow-left";
import ArrowRightIcon from "@atlaskit/icon/core/arrow-right";
import AttachmentIcon from "@atlaskit/icon/core/attachment";
import CheckIcon from "@atlaskit/icon/core/check-mark";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import ChevronRightIcon from "@atlaskit/icon/core/chevron-right";
import CrossIcon from "@atlaskit/icon/core/cross";
import DeleteIcon from "@atlaskit/icon/core/delete";
import DownloadIcon from "@atlaskit/icon/core/download";
import EditIcon from "@atlaskit/icon/core/edit";
import EyeOpenIcon from "@atlaskit/icon/core/eye-open";
import RefreshIcon from "@atlaskit/icon/core/refresh";

const fundingRequestSeed = {
  id: "REQ-FR-33767",
  productType: "100% of financing amount",
  requestDate: "2026-06-29",
  period: "1 of 42 months",
  status: "Pending",
  financingAmount: "120,000.00",
  quotationAmount: "118,500.00",
  vehicleCount: 3,
  vins: ["1HGCM82633A123456", "1HGCM82633A123457", "1HGCM82633A123458"],
};

const supplierDetails = [
  ["UNN", "7812923091"],
  ["CR Number", "4782707588"],
  ["Per Share Price", "1,000.00"],
  ["Supplier Address (SPL)", "حدة", true],
  ["Establishment Date", "1438/10/10"],
  ["Paid Up Capital", "100,000.00"],
  ["Business Type", "ذات مسؤولية محدودة", true],
  ["Business Activity", "-"],
  ["Expiry Date", "1450/09/22"],
  ["Total Shares", "100"],
  ["Company City", "جدة", true],
];

const loanStages = ["Create Loan", "Tasks", "Settings", "Live"];

const initialLoanForm = { productType: "Letter Of Guarantee", fundingRequest: "REQ-LG-34511", funder: "Crowdfunding", feeDiscount: "0%", loanAmount: "1,840,000,000.00", duration: "", opportunityCount: "1", announcement: "" };
const initialRepayments = [
  { number: 1, dueDate: "2026-09-30", amount: "613,333,333.34" },
  { number: 2, dueDate: "2027-01-31", amount: "613,333,333.33" },
  { number: 3, dueDate: "2027-05-31", amount: "613,333,333.33" },
];
const initialLoanTasks = [
  { id: "funding", label: "Funding request approval", description: "Confirm the approved amount and product", record: "REQ-LG-34511", assignee: "Credit Team", dueDate: "30 Jul 2026", completed: true },
  { id: "contract", label: "Facility contract review", description: "Verify signed facility terms", record: "7032534088-1", assignee: "Legal Team", dueDate: "31 Jul 2026", completed: true },
  { id: "repayment", label: "Repayment schedule approval", description: "Confirm payment dates and principal totals", record: "3 payments", assignee: "Finance Team", dueDate: "31 Jul 2026", completed: false },
  { id: "collateral", label: "Collateral verification", description: "Verify pledge agreement and signatory", record: "PA-22", assignee: "Operations", dueDate: "01 Aug 2026", completed: false },
];
const initialLoanSettings = { visibility: "Approved investors", eligibility: "Qualified and retail investors", opens: "2026-08-01", closes: "2026-08-14", autoClose: "Close opportunity automatically", minimumInvestment: "1,000.00", maximumInvestment: "500,000.00", confirmed: false };

const pledgeSeed = Array.from({ length: 15 }, (_, index) => {
  const id = 22 - index;
  const pending = index === 0;
  return {
    fcName: "7032534088-1",
    id: String(id),
    fundRequest: `FR-${String(1001 + (index % 3))}`,
    amount: "450,000.00",
    signatory: "1000000000 Signatory Name",
    createdAt: `2026-04-02 21:${String(Math.max(7, 22 - index)).padStart(2, "0")}`,
    agreementStatus: pending ? "Pending" : "Approved",
    taskStatus: pending ? "Expired" : "Closed",
    latestUpdate: `2026-04-02 21:${String(Math.max(7, 22 - index)).padStart(2, "0")}`,
    capexThreshold: "15",
  };
});

const productOptions = ["Working Capital", "Letter of Guarantee", "Real Estate", "CapEx"];

function Breadcrumb({ items }) {
  return (
    <nav className="finance-breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item}>{index ? <i>/</i> : null}<b className={index === items.length - 1 ? "is-current" : ""}>{item}</b></span>
      ))}
    </nav>
  );
}

function FinancePageHeader({ title, eyebrow, actions }) {
  return (
    <div className="finance-page-header">
      <div>{eyebrow ? <span>{eyebrow}</span> : null}<h1>{title}</h1></div>
      {actions ? <div className="finance-page-actions">{actions}</div> : null}
    </div>
  );
}

function Field({ label, required, hint, error, children, className = "" }) {
  return (
    <label className={`finance-field${error ? " has-error" : ""}${className ? ` ${className}` : ""}`}>
      <span className="finance-field-label">{label}{required ? <em>*</em> : null}</span>
      {children}
      {hint ? <small>{hint}</small> : null}
      {error ? <small className="finance-field-error">{error}</small> : null}
    </label>
  );
}

function SelectControl({ value, onChange, children, disabled = false }) {
  return (
    <span className={`finance-select-wrap${disabled ? " is-disabled" : ""}`}>
      <select value={value} onChange={onChange} disabled={disabled}>{children}</select>
      <ChevronDownIcon label="" size="small" />
    </span>
  );
}

function StatusBadge({ status }) {
  const tone = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`finance-status finance-status--${tone}`}>{status}</span>;
}

function Modal({ eyebrow, title, onClose, children, wide = false }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`finance-modal${wide ? " finance-modal--wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <div><span className="modal-eyebrow">{eyebrow}</span><h2>{title}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close"><CrossIcon label="" /></button>
        </div>
        {children}
      </section>
    </div>
  );
}

function DocumentTile({ name, onView }) {
  return (
    <div className="document-tile">
      <span><AttachmentIcon label="" size="small" />{name}</span>
      <button type="button" onClick={() => onView(name)}><EyeOpenIcon label="" size="small" />View</button>
    </div>
  );
}

function FundingStatusModal({ currentStatus, supplierChecked, onClose, onSave }) {
  const [status, setStatus] = useState(currentStatus);
  const [reason, setReason] = useState("");
  const approvalBlocked = status === "Approved" && !supplierChecked;
  const rejectionBlocked = status === "Rejected" && !reason.trim();

  function submit(event) {
    event.preventDefault();
    if (approvalBlocked || rejectionBlocked) return;
    onSave(status);
  }

  return (
    <Modal eyebrow="FUNDING REQUEST" title="Update fund request status" onClose={onClose}>
      <form onSubmit={submit} className="finance-modal-form">
        <Field label="Request status" required>
          <SelectControl value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>Pending</option><option>Approved</option><option>Rejected</option>
          </SelectControl>
        </Field>
        {status === "Rejected" ? <Field label="Reason to reject" required><textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Add the rejection reason" /></Field> : null}
        {approvalBlocked ? <div className="finance-inline-warning">Complete the supplier check before approving this request.</div> : null}
        <div className="modal-footer">
          <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-button" type="submit" disabled={approvalBlocked || rejectionBlocked}>Update Status</button>
        </div>
      </form>
    </Modal>
  );
}

function FundingRequestView({ onNotify }) {
  const [activeTab, setActiveTab] = useState("Fund Request Information");
  const [supplierChecked, setSupplierChecked] = useState(false);
  const [status, setStatus] = useState(fundingRequestSeed.status);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  function saveStatus(nextStatus) {
    setStatus(nextStatus);
    setStatusModalOpen(false);
    onNotify(`Funding request ${fundingRequestSeed.id} updated to ${nextStatus}`);
  }

  return (
    <section className="finance-screen funding-request-screen">
      <Breadcrumb items={["Summary", "Financing", "Funding Requests"]} />
      <article className="finance-surface finance-request-card">
        <FinancePageHeader
          title={fundingRequestSeed.id}
          actions={<><button className="primary-button" type="button" onClick={() => setStatusModalOpen(true)}>Update Fund Request Status</button><button className="finance-back-button" type="button"><ArrowLeftIcon label="" size="small" />Back</button></>}
        />

        <h2 className="finance-section-heading">Request information</h2>
        <dl className="request-summary-grid">
          <div><dt>Product type</dt><dd>{fundingRequestSeed.productType}</dd></div>
          <div><dt>Approved amount</dt><dd className={status === "Approved" ? "" : "is-muted"}>{status === "Approved" ? fundingRequestSeed.financingAmount : "—"}</dd></div>
          <div><dt>Request date</dt><dd>{fundingRequestSeed.requestDate} <small>({fundingRequestSeed.period})</small></dd></div>
          <div><dt>Request status</dt><dd><StatusBadge status={status} /></dd></div>
        </dl>

        <div className="finance-tabs" role="tablist" aria-label="Funding request detail">
          {["Fund Request Information", "Supplier Information"].map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? "is-active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}
        </div>

        {activeTab === "Fund Request Information" ? (
          <div className="request-detail-grid">
            <div className="request-value"><span>Financing amount</span><b>{fundingRequestSeed.financingAmount}</b></div>
            <div><span className="detail-label">Quotation document</span><DocumentTile name="Quotation_118500.pdf" onView={(name) => onNotify(`${name} opened in document preview`)} /></div>
            <div className="request-value"><span>Quotation amount</span><b>{fundingRequestSeed.quotationAmount}<small>manual entry · logged</small></b></div>
            <div><span className="detail-label">Customs Card</span><DocumentTile name="Customs_Card.pdf" onView={(name) => onNotify(`${name} opened in document preview`)} /></div>
            <div className="request-value"><span>Number of vehicles</span><b>{fundingRequestSeed.vehicleCount}<small>logged</small></b></div>
            <div />
            <div>
              <span className="detail-label">Vehicle Identification Numbers (VIN)</span>
              <div className="vin-list">{fundingRequestSeed.vins.map((vin) => <div key={vin}>{vin}</div>)}</div>
            </div>
          </div>
        ) : (
          <div className="supplier-panel">
            <div className="supplier-check-row">
              <h2 className="finance-section-heading">Supplier information</h2>
              <label><input type="checkbox" checked={supplierChecked} onChange={(event) => setSupplierChecked(event.target.checked)} /><span><CheckIcon label="" size="small" /></span>Supplier check <small>(required to approve)</small></label>
            </div>
            <section className="supplier-card">
              <h3 lang="ar" dir="rtl">7812923091 - شركة منافع للتمويل الجماعي بالدين</h3>
              <dl>{supplierDetails.map(([label, value, rtl]) => <div key={label}><dt>{label}</dt><dd lang={rtl ? "ar" : undefined} dir={rtl ? "rtl" : undefined}>{value}</dd></div>)}</dl>
            </section>
            <h2 className="finance-section-heading">Supplier IBAN</h2>
            <div className="table-shell finance-table-shell">
              <table className="users-table finance-table supplier-table">
                <thead><tr><th>Actions</th><th>Name</th><th>Account Title</th><th>Bank Name</th><th>IBAN Number</th><th>Currency</th><th>Swift Code</th><th>Country</th><th>Reason To Reject Bank</th><th>Bank Status</th></tr></thead>
                <tbody><tr>
                  <td><span className="table-icon-actions"><button type="button" aria-label="Refresh bank details" onClick={() => onNotify("Supplier bank details refreshed")}><RefreshIcon label="" size="small" /></button><button type="button" aria-label="View supplier" onClick={() => onNotify("Supplier profile opened")}><EyeOpenIcon label="" size="small" /></button></span></td>
                  <td className="rtl-cell" lang="ar" dir="rtl">7812923091 - شركة منافع للتمويل الجماعي بالدين</td><td className="rtl-cell" lang="ar" dir="rtl">البنكية</td><td className="rtl-cell" lang="ar" dir="rtl">مصرف الانماء</td><td>SA4500000000656931736466</td><td>SAR</td><td>INMASARI</td><td className="rtl-cell" lang="ar" dir="rtl">السعودية</td><td>-</td><td><StatusBadge status="Auto Approved" /></td>
                </tr></tbody>
              </table>
            </div>
            <h2 className="finance-section-heading supplier-aml-heading">Supplier AML</h2>
            <div className="supplier-aml-summary"><CheckIcon label="" /><span><b>Screening complete</b><small>No active AML matches found for this supplier.</small></span><StatusBadge status="Approved" /></div>
          </div>
        )}
      </article>
      {statusModalOpen ? <FundingStatusModal currentStatus={status} supplierChecked={supplierChecked} onClose={() => setStatusModalOpen(false)} onSave={saveStatus} /> : null}
    </section>
  );
}

function LoanStepper({ activeStage, highestUnlockedStage, published, onSelect }) {
  const activeIndex = loanStages.indexOf(activeStage);
  return (
    <ol className="loan-stepper" aria-label="Loan setup progress">
      {loanStages.map((stage, index) => {
        const complete = index < highestUnlockedStage || (published && index === loanStages.length - 1);
        const available = published ? index === loanStages.length - 1 : index <= highestUnlockedStage;
        return <li key={stage} className={`${index === activeIndex ? "is-active" : ""}${complete ? " is-complete" : ""}${available ? " is-available" : ""}`}>
          <button type="button" disabled={!available} onClick={() => available && onSelect(stage)} aria-current={stage === activeStage ? "step" : undefined}><span>{complete ? <CheckIcon label="" size="small" /> : null}</span>{stage}</button>
        </li>;
      })}
    </ol>
  );
}

function RepaymentModal({ rows, loanAmount, onClose, onSave }) {
  const [values, setValues] = useState(rows);
  const [submitted, setSubmitted] = useState(false);

  const expectedTotal = Number(loanAmount.replaceAll(",", ""));
  const scheduleTotal = values.reduce((total, row) => total + Number(row.amount.replaceAll(",", "") || 0), 0);
  const hasInvalidRow = values.some((row) => !row.dueDate || Number(row.amount.replaceAll(",", "")) <= 0);
  const totalMatches = Math.abs(scheduleTotal - expectedTotal) < 0.01;

  function updateRow(index, field, value) {
    setValues((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, [field]: value } : row));
  }

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (hasInvalidRow || !totalMatches) return;
    onSave(values);
  }

  return (
    <Modal eyebrow="CREATE LOAN" title="Edit repayments" onClose={onClose} wide>
      <form className="finance-modal-form" onSubmit={submit}>
        <div className="repayment-editor-head"><span>Payment</span><span>Due date</span><span>Principal amount</span></div>
        <div className="repayment-editor-list">
          {values.map((row, index) => <div key={row.number}><b>{row.number}</b><input type="date" value={row.dueDate} onChange={(event) => updateRow(index, "dueDate", event.target.value)} /><input inputMode="decimal" value={row.amount} onChange={(event) => updateRow(index, "amount", event.target.value)} /></div>)}
        </div>
        <div className={`repayment-total${totalMatches ? " is-valid" : " is-invalid"}`}><span>Schedule total</span><b>{scheduleTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR</b></div>
        {submitted && hasInvalidRow ? <div className="finance-inline-warning">Every payment needs a due date and an amount greater than zero.</div> : null}
        {submitted && !totalMatches ? <div className="finance-inline-warning">The repayment total must equal the loan amount of {loanAmount} SAR.</div> : null}
        <div className="modal-footer"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Save Repayments</button></div>
      </form>
    </Modal>
  );
}

function CreateLoanForm({ form, onChange, repayments, onRepaymentsChange, onContinue, onNotify }) {
  const [repaymentModalOpen, setRepaymentModalOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  function update(name, value) { onChange((current) => ({ ...current, [name]: value })); }

  function continueFlow() {
    setSubmitted(true);
    if (!form.duration) {
      onNotify("Complete the required loan details before continuing");
      return;
    }
    onContinue();
  }

  return (
    <>
      <FinancePageHeader title="Create Loan" />
      <article className="finance-surface create-loan-card">
        <div className="create-loan-card-header"><h2>LID-2955-238903</h2><button type="button" aria-label={cardOpen ? "Collapse loan details" : "Expand loan details"} onClick={() => setCardOpen((current) => !current)}>{cardOpen ? <ChevronDownIcon label="" size="small" /> : <ChevronRightIcon label="" size="small" />}</button></div>
        {cardOpen ? <div className="create-loan-layout">
          <div className="loan-form-grid">
            <Field label="Product Type" required><SelectControl value={form.productType} onChange={(event) => update("productType", event.target.value)}><option>Letter Of Guarantee</option><option>Working Capital</option><option>CapEx</option><option>Real Estate</option></SelectControl></Field>
            <Field label="Funding Request" required><SelectControl value={form.fundingRequest} onChange={(event) => update("fundingRequest", event.target.value)}><option>REQ-LG-34511</option><option>REQ-FR-33767</option><option>REQ-CAP-27884</option></SelectControl></Field>
            <Field label="Financing Funder"><SelectControl value={form.funder} onChange={(event) => update("funder", event.target.value)}><option>Crowdfunding</option><option>Manafa Fund</option><option>Partner Bank</option></SelectControl></Field>
            <div />
            <Field label="Management Fee Discount"><input value={form.feeDiscount} onChange={(event) => update("feeDiscount", event.target.value)} /></Field>
            <Field label="Loan Amount" required><input className="is-readonly" value={form.loanAmount} readOnly /></Field>
            <Field label="Duration (Months)" required error={submitted && !form.duration ? "Select a loan duration." : ""}><SelectControl value={form.duration} onChange={(event) => update("duration", event.target.value)}><option value="">Select Duration</option>{[6, 12, 18, 24, 36, 48, 60].map((duration) => <option key={duration}>{duration}</option>)}</SelectControl></Field>
            <Field label="Number of Opportunity" required><input className="is-readonly" value={form.opportunityCount} readOnly /></Field>
            <Field label="General Announcements"><input value={form.announcement} onChange={(event) => update("announcement", event.target.value)} placeholder="Type the general announcement here..." /></Field>
            <div className="edit-repayments-slot"><button className="subtle-action-button" type="button" onClick={() => setRepaymentModalOpen(true)}><EditIcon label="" size="small" />Edit repayments</button></div>
          </div>
          <aside className="loan-summary-card">
            <h3>{form.fundingRequest}</h3>
            <dl><div><dt>Remaining amount</dt><dd>{form.loanAmount}</dd></div><div><dt>Approved amount</dt><dd>{form.loanAmount}</dd></div><div><dt>Sub type</dt><dd>Non Government</dd></div><div><dt>Product type</dt><dd>{form.productType}</dd></div></dl>
            <h4>Funder Info</h4><dl><div><dt>Funder Name</dt><dd>{form.funder}</dd></div></dl>
          </aside>
        </div> : null}
      </article>
      <div className="finance-form-footer"><button className="secondary-button is-borderless" type="button" onClick={() => onNotify("Loan draft kept unchanged")}>Back</button><button className="primary-button" type="button" onClick={continueFlow}>Continue</button></div>
      {repaymentModalOpen ? <RepaymentModal rows={repayments} loanAmount={form.loanAmount} onClose={() => setRepaymentModalOpen(false)} onSave={(rows) => { onRepaymentsChange(rows); setRepaymentModalOpen(false); onNotify("Repayment schedule updated"); }} /> : null}
    </>
  );
}

function LoanTasks({ tasks, onChange, onBack, onContinue, onNotify }) {
  const [submitted, setSubmitted] = useState(false);
  const completedCount = tasks.filter((task) => task.completed).length;
  const allComplete = completedCount === tasks.length;

  function toggleTask(id) {
    onChange((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function continueFlow() {
    setSubmitted(true);
    if (!allComplete) {
      onNotify(`Complete all required tasks (${completedCount} of ${tasks.length} completed)`);
      return;
    }
    onContinue();
  }

  return <>
    <FinancePageHeader title="Loan Tasks" eyebrow="LID-2955-238903" />
    <article className="finance-surface loan-stage-card">
      <div className="loan-stage-heading-row"><div><h2>Required tasks</h2><p>Complete the operational checks required before publishing this loan.</p></div><StatusBadge status={allComplete ? "Completed" : "Pending"} /></div>
      <div className="loan-stage-progress"><span><b>{completedCount} of {tasks.length}</b> tasks completed</span><div><i style={{ width: `${(completedCount / tasks.length) * 100}%` }} /></div></div>
      <div className="table-shell loan-task-table-shell">
        <table className="users-table loan-task-table">
          <thead><tr><th>Complete</th><th>Task</th><th>Related record</th><th>Assignee</th><th>Due date</th><th>Status</th></tr></thead>
          <tbody>{tasks.map((task) => <tr key={task.id}>
            <td><label className="loan-task-check"><input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} /><span><CheckIcon label="" size="small" /></span></label></td>
            <td><b>{task.label}</b><small>{task.description}</small></td>
            <td>{task.record}</td><td>{task.assignee}</td><td>{task.dueDate}</td><td><StatusBadge status={task.completed ? "Completed" : "Required"} /></td>
          </tr>)}</tbody>
        </table>
      </div>
      {submitted && !allComplete ? <div className="finance-inline-warning loan-stage-warning">Complete every required task before moving to publishing settings.</div> : null}
    </article>
    <div className="finance-form-footer"><button className="secondary-button is-borderless" type="button" onClick={onBack}>Back</button><button className="primary-button" type="button" onClick={continueFlow}>Continue</button></div>
  </>;
}

function LoanSettings({ settings, onChange, onBack, onContinue, onNotify }) {
  const [submitted, setSubmitted] = useState(false);
  const minValue = Number(settings.minimumInvestment.replaceAll(",", ""));
  const maxValue = Number(settings.maximumInvestment.replaceAll(",", ""));
  const dateError = settings.opens && settings.closes && settings.closes <= settings.opens;

  function update(name, value) {
    onChange((current) => ({ ...current, [name]: value, ...(name === "confirmed" ? {} : { confirmed: false }) }));
  }

  function continueFlow() {
    setSubmitted(true);
    const invalid = !settings.visibility || !settings.eligibility || !settings.opens || !settings.closes || dateError || minValue <= 0 || maxValue < minValue || !settings.confirmed;
    if (invalid) {
      onNotify("Review the required publishing settings before continuing");
      return;
    }
    onContinue();
  }

  return <>
    <FinancePageHeader title="Loan Settings" eyebrow="LID-2955-238903" />
    <article className="finance-surface loan-stage-card loan-settings-card">
      <div className="loan-stage-heading-row"><div><h2>Publishing settings</h2><p>Control who can see the opportunity and when investors can fund it.</p></div><StatusBadge status={settings.confirmed && !dateError ? "Ready" : "Draft"} /></div>
      <section className="loan-settings-section"><h3>Access</h3><div className="finance-field-grid">
        <Field label="Opportunity visibility" required><SelectControl value={settings.visibility} onChange={(event) => update("visibility", event.target.value)}><option>Approved investors</option><option>All eligible investors</option><option>Private invitation</option></SelectControl></Field>
        <Field label="Investor eligibility" required><SelectControl value={settings.eligibility} onChange={(event) => update("eligibility", event.target.value)}><option>Qualified and retail investors</option><option>Qualified investors only</option><option>Institutional investors only</option></SelectControl></Field>
      </div></section>
      <section className="loan-settings-section"><h3>Funding window</h3><div className="finance-field-grid finance-field-grid--three">
        <Field label="Funding opens" required error={submitted && !settings.opens ? "Select an opening date." : ""}><input type="date" value={settings.opens} onChange={(event) => update("opens", event.target.value)} /></Field>
        <Field label="Funding closes" required error={submitted && (!settings.closes || dateError) ? dateError ? "Closing date must be after opening date." : "Select a closing date." : ""}><input type="date" value={settings.closes} onChange={(event) => update("closes", event.target.value)} /></Field>
        <Field label="When fully funded"><SelectControl value={settings.autoClose} onChange={(event) => update("autoClose", event.target.value)}><option>Close opportunity automatically</option><option>Keep open until closing date</option></SelectControl></Field>
      </div></section>
      <section className="loan-settings-section"><h3>Investment limits</h3><div className="finance-field-grid">
        <Field label="Minimum investment (SAR)" required error={submitted && minValue <= 0 ? "Enter an amount greater than zero." : ""}><input inputMode="decimal" value={settings.minimumInvestment} onChange={(event) => update("minimumInvestment", event.target.value)} /></Field>
        <Field label="Maximum per investor (SAR)" required error={submitted && maxValue < minValue ? "Maximum must be equal to or higher than the minimum." : ""}><input inputMode="decimal" value={settings.maximumInvestment} onChange={(event) => update("maximumInvestment", event.target.value)} /></Field>
      </div></section>
      <label className={`loan-confirmation${submitted && !settings.confirmed ? " has-error" : ""}`}><input type="checkbox" checked={settings.confirmed} onChange={(event) => update("confirmed", event.target.checked)} /><span><CheckIcon label="" size="small" /></span><b>I reviewed the publishing window and investor access settings.</b></label>
    </article>
    <div className="finance-form-footer"><button className="secondary-button is-borderless" type="button" onClick={onBack}>Back</button><button className="primary-button" type="button" onClick={continueFlow}>Review and continue</button></div>
  </>;
}

function LoanLive({ form, tasks, settings, repayments, published, onBack, onPublish, onReset }) {
  const [confirmed, setConfirmed] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const completedTasks = tasks.filter((task) => task.completed).length;

  if (published) {
    return <>
      <FinancePageHeader title="Loan is live" eyebrow="LID-2955-238903" actions={<StatusBadge status="Live" />} />
      <article className="finance-surface loan-published-card">
        <span className="loan-published-icon"><CheckIcon label="" /></span>
        <div><h2>Loan published successfully</h2><p>The opportunity is now visible to {settings.visibility.toLowerCase()} and will accept funding from {settings.opens} to {settings.closes}.</p></div>
        <dl><div><dt>Loan ID</dt><dd>LID-2955-238903</dd></div><div><dt>Funding request</dt><dd>{form.fundingRequest}</dd></div><div><dt>Status</dt><dd><StatusBadge status="Live" /></dd></div><div><dt>Funding window</dt><dd>{settings.opens} — {settings.closes}</dd></div></dl>
        <div className="loan-published-actions"><button className="primary-button" type="button" onClick={() => setPreviewOpen(true)}>View live opportunity</button><button className="secondary-button" type="button" onClick={onReset}>Create another loan</button></div>
      </article>
      {previewOpen ? <Modal eyebrow="LIVE OPPORTUNITY" title="LID-2955-238903" onClose={() => setPreviewOpen(false)} wide><div className="live-opportunity-preview"><div className="live-opportunity-preview-head"><div><h3>{form.productType}</h3><p>{form.fundingRequest} · {form.duration} months</p></div><StatusBadge status="Live" /></div><dl><div><dt>Funding target</dt><dd>{form.loanAmount} SAR</dd></div><div><dt>Funder</dt><dd>{form.funder}</dd></div><div><dt>Investor access</dt><dd>{settings.visibility}</dd></div><div><dt>Funding window</dt><dd>{settings.opens} — {settings.closes}</dd></div><div><dt>Minimum investment</dt><dd>{settings.minimumInvestment} SAR</dd></div><div><dt>Maximum per investor</dt><dd>{settings.maximumInvestment} SAR</dd></div></dl><div className="modal-footer"><button className="primary-button" type="button" onClick={() => setPreviewOpen(false)}>Close preview</button></div></div></Modal> : null}
    </>;
  }

  const readiness = [
    ["Loan details", `${form.productType} · ${form.duration} months`],
    ["Repayment schedule", `${repayments.length} payments configured`],
    ["Required tasks", `${completedTasks} of ${tasks.length} completed`],
    ["Publishing settings", `${settings.opens} to ${settings.closes}`],
  ];

  return <>
    <FinancePageHeader title="Ready to go live" eyebrow="LID-2955-238903" />
    <article className="finance-surface loan-live-card">
      <div className="loan-stage-heading-row"><div><h2>Final review</h2><p>Confirm the complete loan setup before publishing the opportunity.</p></div><StatusBadge status="Ready" /></div>
      <div className="loan-live-layout">
        <section className="loan-readiness-list"><h3>Readiness checklist</h3>{readiness.map(([label, detail]) => <div key={label}><span><CheckIcon label="" size="small" /></span><p><b>{label}</b><small>{detail}</small></p><StatusBadge status="Ready" /></div>)}</section>
        <aside className="loan-final-summary"><h3>Loan summary</h3><dl><div><dt>Funding request</dt><dd>{form.fundingRequest}</dd></div><div><dt>Facility contract</dt><dd>7032534088-1</dd></div><div><dt>Loan amount</dt><dd>{form.loanAmount} SAR</dd></div><div><dt>Funder</dt><dd>{form.funder}</dd></div><div><dt>Visibility</dt><dd>{settings.visibility}</dd></div><div><dt>Investor limit</dt><dd>{settings.minimumInvestment} – {settings.maximumInvestment} SAR</dd></div></dl></aside>
      </div>
      <label className="loan-confirmation"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span><CheckIcon label="" size="small" /></span><b>I confirm that the loan details, required tasks, repayment schedule, and publishing settings are correct.</b></label>
    </article>
    <div className="finance-form-footer"><button className="secondary-button is-borderless" type="button" onClick={onBack}>Back</button><button className="primary-button" type="button" disabled={!confirmed} onClick={onPublish}>Publish Loan</button></div>
  </>;
}

function CreateLoanView({ onNotify }) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [highestUnlockedStage, setHighestUnlockedStage] = useState(0);
  const [published, setPublished] = useState(false);
  const [form, setForm] = useState(initialLoanForm);
  const [repayments, setRepayments] = useState(initialRepayments);
  const [tasks, setTasks] = useState(initialLoanTasks);
  const [settings, setSettings] = useState(initialLoanSettings);
  const activeStage = loanStages[activeStageIndex];

  function updateLoanForm(updater) {
    setForm(updater);
    setHighestUnlockedStage((current) => Math.min(current, 0));
    setPublished(false);
  }

  function updateRepayments(rows) {
    setRepayments(rows);
    setHighestUnlockedStage((current) => Math.min(current, 0));
    setPublished(false);
  }

  function updateTasks(updater) {
    setTasks(updater);
    setHighestUnlockedStage((current) => Math.min(current, 1));
    setPublished(false);
  }

  function updateSettings(updater) {
    setSettings(updater);
    setHighestUnlockedStage((current) => Math.min(current, 2));
    setPublished(false);
  }

  function advance() {
    const nextIndex = Math.min(loanStages.length - 1, activeStageIndex + 1);
    setHighestUnlockedStage((current) => Math.max(current, nextIndex));
    setActiveStageIndex(nextIndex);
  }

  function selectStage(stage) {
    const index = loanStages.indexOf(stage);
    if (index <= highestUnlockedStage) setActiveStageIndex(index);
  }

  function publishLoan() {
    setPublished(true);
    setHighestUnlockedStage(loanStages.length - 1);
    onNotify("Loan LID-2955-238903 is now live");
  }

  function resetFlow() {
    setActiveStageIndex(0);
    setHighestUnlockedStage(0);
    setPublished(false);
    setForm(initialLoanForm);
    setRepayments(initialRepayments);
    setTasks(initialLoanTasks);
    setSettings(initialLoanSettings);
    onNotify("A new loan draft is ready");
  }

  return (
    <section className="finance-screen create-loan-screen">
      <LoanStepper activeStage={activeStage} highestUnlockedStage={highestUnlockedStage} published={published} onSelect={selectStage} />
      {activeStage === "Create Loan" ? <CreateLoanForm form={form} onChange={updateLoanForm} repayments={repayments} onRepaymentsChange={updateRepayments} onContinue={() => { onNotify("Loan details saved"); advance(); }} onNotify={onNotify} /> : null}
      {activeStage === "Tasks" ? <LoanTasks tasks={tasks} onChange={updateTasks} onBack={() => setActiveStageIndex(0)} onContinue={advance} onNotify={onNotify} /> : null}
      {activeStage === "Settings" ? <LoanSettings settings={settings} onChange={updateSettings} onBack={() => setActiveStageIndex(1)} onContinue={advance} onNotify={onNotify} /> : null}
      {activeStage === "Live" ? <LoanLive form={form} tasks={tasks} settings={settings} repayments={repayments} published={published} onBack={() => setActiveStageIndex(2)} onPublish={publishLoan} onReset={resetFlow} /> : null}
    </section>
  );
}

function MultiSelect({ options, value, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  function toggle(option) { onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]); }
  return (
    <div className={`finance-multiselect${open ? " is-open" : ""}`}>
      <div className="finance-multiselect-control" role="button" tabIndex="0" aria-label={ariaLabel} aria-expanded={open} onClick={() => setOpen((current) => !current)} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setOpen((current) => !current)}>
        <span className="finance-chip-list">{value.map((item) => <span className="finance-chip" key={item}>{item}<button type="button" aria-label={`Remove ${item}`} onClick={(event) => { event.stopPropagation(); toggle(item); }}><CrossIcon label="" size="small" /></button></span>)}</span>
        <ChevronDownIcon label="" size="small" />
      </div>
      {open ? <div className="finance-multiselect-menu">{options.map((option) => <label key={option}><input type="checkbox" checked={value.includes(option)} onChange={() => toggle(option)} /><span>{value.includes(option) ? <CheckIcon label="" size="small" /> : null}</span>{option}</label>)}</div> : null}
    </div>
  );
}

function Accordion({ title, children, onDelete, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className={`finance-accordion${open ? " is-open" : ""}`}>
      <div className="finance-accordion-head"><button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open}>{open ? <ChevronDownIcon label="" /> : <ChevronRightIcon label="" />}<span>{title}</span></button>{onDelete ? <button className="finance-delete-button" type="button" onClick={onDelete}><DeleteIcon label="" size="small" />Delete</button> : null}</div>
      {open ? <div className="finance-accordion-body">{children}</div> : null}
    </section>
  );
}

function FeeFields({ type }) {
  if (type === "Working Capital") return <div className="finance-field-grid finance-field-grid--four"><Field label="Product Upfront Management Fee"><input defaultValue="0%" /></Field><Field label="Opportunity Management Fee" required><input defaultValue="0%" /></Field><Field label="Wakalah Fee" required><input defaultValue="0.00" /></Field><Field label="Kafalah Fee"><input defaultValue="0%" /></Field></div>;
  if (type === "Letter of Guarantee") return <div className="finance-field-grid finance-field-grid--four"><Field label="Opportunity Management Fee" required><input defaultValue="0%" /></Field><Field label="Wakalah Fee" required><input defaultValue="0.00" /></Field><Field label="Kafalah Fee"><input defaultValue="0%" /></Field><Field label="Issuance and Amendment Fees"><input defaultValue="0.00 SR" /></Field></div>;
  if (type === "Real Estate") return <div className="finance-field-grid"><Field label="Product Upfront Management Fee (optional)"><input defaultValue="0%" /></Field><Field label="Opportunity Management Fee"><input defaultValue="0" /></Field><Field label="Wakalah Fee" required><input defaultValue="0.00" /></Field></div>;
  return <div className="finance-field-grid finance-field-grid--four"><Field label="Product Upfront Management Fee"><input defaultValue="0%" /></Field><Field label="Loan Management Fee" required><input defaultValue="0%" /></Field><Field label="Wakalah Fee" required><input defaultValue="0.00" /></Field><Field label="Downpayment %" required><SelectControl value="0%" onChange={() => {}}><option>0%</option><option>10%</option><option>20%</option><option>30%</option></SelectControl></Field></div>;
}

function WorkingCapitalProduct() {
  const [subproducts, setSubproducts] = useState(["Invoice", "PO", "Payroll", "Working Capital (Large)"]);
  const labels = {
    Invoice: ["Invoice Facility Limit", "Special Undertaking (Arabic)", "Special Undertaking (English)"],
    PO: ["PO Facility Limit", "Special Undertaking (Arabic)", "Special Undertaking (English)"],
    Payroll: ["Payroll Facility Limit", "Mudad Fee (%)", "Special Undertaking (Arabic)", "Special Undertaking (English)"],
    "Working Capital (Large)": ["Working Capital (Large) Facility Limit", "Special Undertaking (Arabic)", "Special Undertaking (English)"],
  };
  return <><div className="finance-field-grid"><Field label="WC Facility limit" required><input defaultValue="0.00" /></Field><Field label="Working Capital Products" required><MultiSelect options={Object.keys(labels)} value={subproducts} onChange={setSubproducts} ariaLabel="Working capital products" /></Field><Field label="Conditions"><SelectControl value="Financial Undertakings" onChange={() => {}}><option>Financial Undertakings</option><option>Special Conditions</option></SelectControl></Field></div><h3 className="finance-micro-heading">Fees</h3><FeeFields type="Working Capital" /><div className="finance-inner-grid">{subproducts.map((product) => <section className="finance-inner-block" key={product}><h4>{product}</h4><div className="finance-field-grid">{labels[product].map((label, index) => <Field key={label} label={label} required={index === 0 || label === "Mudad Fee (%)"}><input defaultValue={index === 0 ? "0.00 SR" : ""} placeholder={index ? label : ""} dir={label.includes("Arabic") ? "rtl" : undefined} /></Field>)}</div></section>)}</div></>;
}

function ContractProduct({ type }) {
  if (type === "Working Capital") return <WorkingCapitalProduct />;
  if (type === "Letter of Guarantee") return <><div className="finance-field-grid"><Field label="LG Facility limit" required><input defaultValue="0.00" /></Field><Field label="Conditions"><SelectControl value="Financial Undertakings" onChange={() => {}}><option>Financial Undertakings</option><option>Special Conditions</option></SelectControl></Field></div><h3 className="finance-micro-heading">Fees</h3><FeeFields type={type} /></>;
  if (type === "Real Estate") return <><div className="finance-field-grid"><Field label="RE Facility limit" required><input defaultValue="0.00" /></Field><Field label="Project Name" required><input placeholder="Project Name" /></Field></div><h3 className="finance-micro-heading">Fees</h3><FeeFields type={type} /></>;
  return <><div className="finance-field-grid"><Field label="CapEx Facility limit" required><input defaultValue="0.00" /></Field></div><h3 className="finance-micro-heading">Fees</h3><FeeFields type={type} /></>;
}

function ContractPreview({ form, products, guarantees, onClose }) {
  return <Modal eyebrow="FACILITY CONTRACT" title="Preview facility contract" onClose={onClose} wide><div className="contract-preview"><dl><div><dt>Type</dt><dd>{form.type}</dd></div><div><dt>Financing type</dt><dd>{form.financingType}</dd></div><div><dt>Duration</dt><dd>{form.duration} months</dd></div><div><dt>Facility amount</dt><dd>{form.amount || "Not entered"}</dd></div></dl><section><h3>Products</h3><p>{products.join(", ") || "No products selected"}</p></section><section><h3>Guarantees</h3><p>{guarantees.join(", ") || "No guarantees selected"}</p></section><div className="modal-footer"><button className="primary-button" type="button" onClick={onClose}>Close Preview</button></div></div></Modal>;
}

function FacilityContractView({ onNotify }) {
  const [form, setForm] = useState({ type: "Regular FC", financingType: "Mixed", duration: "12", amount: "7,000,000.00", upfrontFee: "0%" });
  const [guarantees, setGuarantees] = useState(["Asset Pledge", "Promissory Note", "Implied Warranty"]);
  const [conditions, setConditions] = useState(["Financial Undertakings", "Special Conditions"]);
  const [products, setProducts] = useState(productOptions);
  const [capexRequests, setCapexRequests] = useState(["REQ-CAP-27884", "REQ-CAP-37884", "REQ-CAP-78884"]);
  const [warrantyTypes, setWarrantyTypes] = useState(["Owner", "Individual", "Company"]);
  const [ownerMode, setOwnerMode] = useState("Same for All");
  const [individuals, setIndividuals] = useState([{ id: "", dob: "", amount: "" }]);
  const [companies, setCompanies] = useState([{ unn: "7000000000", name: "", amount: "" }]);
  const [previewOpen, setPreviewOpen] = useState(false);

  function update(name, value) { setForm((current) => ({ ...current, [name]: value })); }
  function removeProduct(product) { setProducts((current) => current.filter((item) => item !== product)); }

  return (
    <section className="finance-screen facility-contract-screen">
      <Breadcrumb items={["Summary", "Facility Contracts", "Create"]} />
      <div className="finance-tabs finance-page-tabs"><button className="is-active" type="button">Facility Contract</button><button type="button" onClick={() => onNotify("Appendix will be generated from the completed facility contract")}>Appendix</button></div>
      <article className="finance-surface contract-basics-card">
        <FinancePageHeader title="Create Facility Contract" actions={<button className="finance-back-button" type="button"><ArrowLeftIcon label="" size="small" />Back</button>} />
        <div className="finance-field-grid finance-field-grid--three">
          <Field label="Type" required><SelectControl value={form.type} onChange={(event) => update("type", event.target.value)}><option>Regular FC</option><option>Master FC</option><option>Revolving FC</option></SelectControl></Field>
          <Field label="Financing Type" required><SelectControl value={form.financingType} onChange={(event) => update("financingType", event.target.value)}><option>Real Estate</option><option>Working Capital</option><option>Letter of Guarantee</option><option>Mixed</option></SelectControl></Field>
          <Field label="Duration (Months)" required><SelectControl value={form.duration} onChange={(event) => update("duration", event.target.value)}>{[6, 7, 8, 9, 10, 11, 12, 18, 24, 36, 48, 60].map((duration) => <option key={duration}>{duration}</option>)}</SelectControl></Field>
          <Field label="General Financing Facility Amount" required><input value={form.amount} onChange={(event) => update("amount", event.target.value)} placeholder="General Financing Facility Amount" /></Field>
          <Field label="Guarantees" required><MultiSelect options={["Asset Pledge", "Assignment of Proceed", "Bank Account Pledge", "Promissory Note", "Real Estate Mortgage", "Implied Warranty"]} value={guarantees} onChange={setGuarantees} ariaLabel="Guarantees" /></Field>
          <Field label="Facility Upfront Management Fee"><input value={form.upfrontFee} onChange={(event) => update("upfrontFee", event.target.value)} /></Field>
          <Field label="Conditions" className="finance-field--span-two"><MultiSelect options={["Financial Undertakings", "Special Conditions", "Murabaha Transactions Special Conditions"]} value={conditions} onChange={setConditions} ariaLabel="Conditions" /></Field>
        </div>
      </article>

      <h2 className="finance-group-title">Conditions</h2>
      <Accordion title="Conditions">
        {conditions.length ? conditions.map((condition) => <section className="condition-group" key={condition}><h3>{condition}</h3><div className="finance-field-grid"><Field label={`${condition} (Arabic)`} required><input dir="rtl" placeholder={condition} /></Field><Field label={`${condition} (English)`} required><input placeholder={condition} /></Field></div></section>) : <div className="finance-empty-state">No conditions selected.</div>}
      </Accordion>

      <div className="finance-group-title-row"><h2 className="finance-group-title">Products</h2>{products.length < productOptions.length ? <Field label="Restore product"><SelectControl value="" onChange={(event) => event.target.value && setProducts((current) => [...current, event.target.value])}><option value="">Select product</option>{productOptions.filter((option) => !products.includes(option)).map((option) => <option key={option}>{option}</option>)}</SelectControl></Field> : null}</div>
      {products.map((product) => <Accordion key={product} title={`Financing Product - ${product}`} onDelete={() => removeProduct(product)}><ContractProduct type={product} /></Accordion>)}

      <h2 className="finance-group-title">Guarantees</h2>
      {guarantees.includes("Asset Pledge") ? <Accordion title="CapEx pledge"><p className="finance-helper" lang="ar" dir="rtl">سيُعرض لطالب التمويل كما يلي: "رهن المركبة ..."</p><Field label="CapEx fund request" required className="finance-field--half"><MultiSelect options={["REQ-CAP-27884", "REQ-CAP-37884", "REQ-CAP-78884"]} value={capexRequests} onChange={setCapexRequests} ariaLabel="CapEx fund requests" /></Field><div className="capex-request-list">{capexRequests.map((request, requestIndex) => <Accordion key={request} title={request} defaultOpen={requestIndex === 0}><div className="finance-field-grid">{(requestIndex === 0 ? [0, 1] : [0]).map((index) => <Field key={index} label="Vehicle Identification Number (VIN)" required><input defaultValue={requestIndex === 0 ? `X0XXX0000XX00000${index}` : ""} placeholder="Enter VIN" /></Field>)}</div></Accordion>)}</div></Accordion> : null}

      {guarantees.includes("Implied Warranty") ? <Accordion title="Implied Warranty"><p className="finance-helper" lang="ar" dir="rtl">سيُعرض لطالب التمويل كما يلي: "كفالة غرم وأداء تضامنية مقدمة من…"</p><Field label="Implied Warranty Type" required className="finance-field--half"><MultiSelect options={["Owner", "Individual", "Company"]} value={warrantyTypes} onChange={setWarrantyTypes} ariaLabel="Implied warranty types" /></Field>
        {warrantyTypes.includes("Owner") ? <section className="warranty-group"><h3>Owner</h3><div className="finance-field-grid"><Field label="Select Owners" required><SelectControl value="Ali Almazyad" onChange={() => {}}><option>Ali Almazyad</option><option>Mohammed Alqahtani</option><option>Sara Aldosari</option></SelectControl></Field><Field label="Sanad Amount per Owners" required><span className="finance-radio-group">{["Same for All", "Per Owner"].map((mode) => <label key={mode}><input type="radio" name="owner-mode" checked={ownerMode === mode} onChange={() => setOwnerMode(mode)} />{mode}</label>)}</span></Field></div></section> : null}
        {warrantyTypes.includes("Individual") ? <section className="warranty-group"><div className="warranty-group-heading"><h3>Individuals</h3><button className="subtle-action-button" type="button" onClick={() => setIndividuals((current) => [...current, { id: "", dob: "", amount: "" }])}><AddIcon label="" size="small" />Add Individual</button></div>{individuals.map((individual, index) => <div className="warranty-entry" key={index}><div className="finance-field-grid finance-field-grid--four"><Field label="ID" required><input value={individual.id} onChange={(event) => setIndividuals((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, id: event.target.value } : item))} placeholder="ID" /></Field><Field label="Date of Birth" required><input value={individual.dob} onChange={(event) => setIndividuals((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, dob: event.target.value } : item))} placeholder="Date of Birth" /></Field><Field label="Extra Amount Percentage" required><input defaultValue="0%" /></Field><Field label="Sanad Amount" required><input value={individual.amount} onChange={(event) => setIndividuals((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, amount: event.target.value } : item))} placeholder="Sanad Amount" /></Field></div><button className="finance-delete-icon" type="button" aria-label="Delete individual" onClick={() => setIndividuals((current) => current.filter((_, itemIndex) => itemIndex !== index))}><DeleteIcon label="" size="small" /></button></div>)}</section> : null}
        {warrantyTypes.includes("Company") ? <section className="warranty-group"><div className="warranty-group-heading"><h3>Company</h3><button className="subtle-action-button" type="button" onClick={() => setCompanies((current) => [...current, { unn: "", name: "", amount: "" }])}><AddIcon label="" size="small" />Add Company</button></div>{companies.map((company, index) => <div className="warranty-entry" key={index}><div className="finance-field-grid finance-field-grid--four"><Field label="Unified Number" required><input value={company.unn} onChange={(event) => setCompanies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, unn: event.target.value } : item))} /></Field><Field label="Company Name" required><input value={company.name} onChange={(event) => setCompanies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, name: event.target.value } : item))} /></Field><Field label="Extra Amount Percentage" required><input defaultValue="0%" /></Field><Field label="Sanad Amount" required><input value={company.amount} onChange={(event) => setCompanies((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, amount: event.target.value } : item))} placeholder="Sanad Amount" /></Field></div><button className="finance-delete-icon" type="button" aria-label="Delete company" onClick={() => setCompanies((current) => current.filter((_, itemIndex) => itemIndex !== index))}><DeleteIcon label="" size="small" /></button></div>)}</section> : null}
      </Accordion> : null}

      <div className="contract-action-bar"><button className="secondary-button contract-preview-button" type="button" onClick={() => setPreviewOpen(true)}><EyeOpenIcon label="" size="small" />Preview Facility Contract</button><span /><button className="secondary-button is-borderless" type="button" onClick={() => onNotify("Facility contract draft kept unchanged")}>Cancel</button><button className="primary-button" type="button" onClick={() => form.amount && products.length ? onNotify("Facility contract created successfully") : onNotify("Add a facility amount and at least one product")}>Create</button></div>
      {previewOpen ? <ContractPreview form={form} products={products} guarantees={guarantees} onClose={() => setPreviewOpen(false)} /> : null}
    </section>
  );
}

function PledgeCreateModal({ onClose, onSave }) {
  const [form, setForm] = useState({ fcName: "", fundRequest: "", amount: "", capexThreshold: "" });
  const valid = Object.values(form).every((value) => value.trim());
  function update(name, value) { setForm((current) => ({ ...current, [name]: value })); }
  return <Modal eyebrow="COLLATERAL" title="Create Pledge Agreement" onClose={onClose}><form className="finance-modal-form" onSubmit={(event) => { event.preventDefault(); if (valid) onSave(form); }}><Field label="FC Name" required><SelectControl value={form.fcName} onChange={(event) => update("fcName", event.target.value)}><option value="">Select FC Name</option><option>7032534088-1</option><option>7032534088-2</option><option>7032534088-3</option></SelectControl></Field><Field label="Fund request" required><SelectControl value={form.fundRequest} onChange={(event) => update("fundRequest", event.target.value)}><option value="">Select Fund request</option><option>FR-1001</option><option>FR-1002</option><option>FR-1003</option></SelectControl></Field><Field label="The Pledge Agreement amount" required><input type="number" min="0" value={form.amount} onChange={(event) => update("amount", event.target.value)} placeholder="Enter amount" /></Field><Field label="CapEx Value Drop Threshold" required><input type="number" min="0" max="100" value={form.capexThreshold} onChange={(event) => update("capexThreshold", event.target.value)} placeholder="Enter threshold" /></Field><div className="modal-footer"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit" disabled={!valid}>Save</button></div></form></Modal>;
}

function PledgeAgreementView({ onNotify }) {
  const [rows, setRows] = useState(pledgeSeed);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(rows.length / pageSize);
  const shownRows = useMemo(() => rows.slice((page - 1) * pageSize, page * pageSize), [page, rows]);

  function save(form) {
    const now = "2026-07-16 13:00";
    setRows((current) => [{ ...form, id: String(Math.max(...current.map((row) => Number(row.id))) + 1), amount: Number(form.amount).toLocaleString("en-US", { minimumFractionDigits: 2 }), signatory: "1000000000 Signatory Name", createdAt: now, agreementStatus: "Pending", taskStatus: "Open", latestUpdate: now }, ...current]);
    setModalOpen(false); setPage(1); onNotify("Pledge agreement created successfully");
  }

  return <section className="finance-screen pledge-screen"><Breadcrumb items={["Summary", "Collateral", "Pledge Agreement"]} /><FinancePageHeader title="Pledge Agreement" actions={<button className="primary-button" type="button" onClick={() => setModalOpen(true)}><AddIcon label="" />Create Pledge Agreement</button>} /><div className="finance-tabs finance-page-tabs"><button className="is-active" type="button">Pledge Agreement</button></div><div className="table-shell finance-table-shell pledge-table-shell"><table className="users-table finance-table pledge-table"><thead><tr><th>FC Name</th><th>Pledge Agreement ID</th><th>Fund request</th><th>The Pledge Agreement amount</th><th>Signator Name</th><th>Created at</th><th>Agreement Status</th><th>Task Status</th><th>Latest update</th><th>Action</th></tr></thead><tbody>{shownRows.map((row) => <tr key={row.id}><td>{row.fcName}</td><td>{row.id}</td><td>{row.fundRequest}</td><td>{row.amount}</td><td>{row.signatory}</td><td>{row.createdAt}</td><td><StatusBadge status={row.agreementStatus} /></td><td>{row.taskStatus}</td><td>{row.latestUpdate}</td><td><span className="table-icon-actions"><button type="button" aria-label={`Download agreement ${row.id}`} onClick={() => onNotify(`Pledge agreement ${row.id} downloaded`)}><DownloadIcon label="" size="small" /></button><button type="button" aria-label={`Refresh agreement ${row.id}`} onClick={() => onNotify(`Pledge agreement ${row.id} refreshed`)}><RefreshIcon label="" size="small" /></button></span></td></tr>)}</tbody></table></div><div className="table-footer pledge-table-footer"><div className="entries-count">Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, rows.length)} of {rows.length} entries</div><div className="pagination"><button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Previous</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button key={number} className={number === page ? "is-current" : ""} type="button" onClick={() => setPage(number)}>{number}</button>)}<button type="button" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>Next</button></div></div>{modalOpen ? <PledgeCreateModal onClose={() => setModalOpen(false)} onSave={save} /> : null}</section>;
}

export function FinanceWorkspace({ screen, onNavigate, onNotify }) {
  if (screen === "Funding Requests") return <FundingRequestView onNotify={onNotify} />;
  if (screen === "Loans") return <CreateLoanView onNotify={onNotify} />;
  if (screen === "Facility Contracts") return <FacilityContractView onNotify={onNotify} />;
  if (screen === "Pledge Agreement") return <PledgeAgreementView onNotify={onNotify} />;
  return <section className="finance-empty-page"><h1>{screen}</h1><p>This destination is outside the integrated financing flow.</p><button className="primary-button" type="button" onClick={() => onNavigate("Funding Requests")}><ArrowRightIcon label="" />Open Funding Requests</button></section>;
}
