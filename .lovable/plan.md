## Goal

Capture the customer's employer and income so the consolidation quote shows the maximum top-up they can borrow at each tenor (12–84 months) and how much cash they'd actually receive in hand after paying off existing loans.

## UI changes — `src/components/ConsolidationForm.tsx`

1. Add a new "Your Profile" section above "Existing Loans" with three inputs:
   - Company / Employer name (text, required)
   - Net monthly salary ₹ (numeric, required)
   - Other monthly EMIs ₹ — for loans NOT being consolidated (numeric, defaults 0)

2. Extend the "Live Consolidation Estimate" panel with a new "Maximum Eligibility (tenor-wise)" table.
   - Rows for tenors: 12, 24, 36, 48, 60, 72, 84 months
   - Columns:
     - Tenor
     - Max EMI affordable (FOIR-based)
     - Max loan eligibility at that EMI
     - Estimated new EMI to refinance current outstanding
     - **Cash in hand** = max loan − total outstanding (shown only if positive; otherwise show "Shortfall ₹X")
   - Highlight the best tenor (highest positive cash-in-hand).

3. Small summary line above the table:
   "Based on salary ₹X, existing other EMIs ₹Y, and ₹Z consolidation outstanding, here's what you can get in hand."

## Calculation logic

- Effective rate: existing toggle (12.5% default or user-entered) — reused.
- FOIR (foot-on-income-ratio) cap = 55% of net salary (single fixed value to keep it simple; matches the eligibility model used elsewhere in the app).
- `maxTotalEMI = salary * 0.55`
- `availableEMIForNewLoan = maxTotalEMI − otherEMIs` (the consolidation loan replaces the listed loans, so their EMIs are excluded from the deduction).
- For each tenor n in [12, 24, …, 84]:
  - `maxLoan = availableEMI * (1 − (1+r)^-n) / r` (standard PV-of-annuity formula, r = monthly rate)
  - `newEMIForOutstanding = computeEMI(totalOutstanding, r, n)` (already in file)
  - `cashInHand = maxLoan − totalOutstanding`
- Render gracefully when `availableEMI <= 0` (show "Existing obligations exceed FOIR cap").

## Submission payload

Include the new fields in the `existing_loans`/payload JSON so admin sees them. Specifically extend `payload` with:
- `company_name`
- `monthly_salary`
- `other_emis`

These will be stored inside the existing `existing_loans` jsonb wrapper as a top-level `applicant_profile` key — no schema migration needed (jsonb is flexible). Total/EMI columns stay unchanged.

## Out of scope

- No DB migration.
- No changes to admin table layout (data will still be visible inside the JSON payload column).
- No change to the lead-enquiry/eligibility form on the homepage.
