Update the consolidation eligibility calculator to use a FOIR cap of 70% instead of 55%.

## Changes

**File: `src/components/ConsolidationForm.tsx`**
- Change `const FOIR = 0.55` → `const FOIR = 0.70`
- Update the helper text under the tenor-wise eligibility table: "FOIR cap 55%" → "FOIR cap 70%"
- Update the fallback warning message ("Existing other EMIs already exceed the 55% FOIR cap...") to reference 70%

No calculation logic, schema, submission payload, or admin dashboard changes needed — the max-EMI-affordable, max-loan-eligible, refinance-EMI, and cash-in-hand values will automatically reflect the higher cap.