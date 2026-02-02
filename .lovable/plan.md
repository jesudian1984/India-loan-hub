
# Add Credit Card Routes to App.tsx

## Overview
Connect the newly created HDFC Credit Card comparison pages to the application routing. This will make the credit card listing page and individual card detail pages accessible.

## Changes Required

### 1. Update App.tsx

**Add imports for the credit card pages:**
- Import `CreditCards` from `./pages/CreditCards`
- Import `CreditCardDetail` from `./pages/CreditCardDetail`

**Add new routes:**
- `/credit-cards` - Main listing page with search, filters, and comparison tool
- `/credit-cards/:cardId` - Individual card detail page with dynamic card ID parameter

**Update existing route:**
- Redirect `/loans/credit-cards` to the new `/credit-cards` page for consistency

## Route Structure After Changes

```text
/credit-cards          -> CreditCards (listing with comparison)
/credit-cards/:cardId  -> CreditCardDetail (individual card)
/loans/credit-cards    -> Redirects to /credit-cards
```

## Technical Details

The implementation will:
1. Add two import statements at the top of App.tsx
2. Add two new Route components for the credit card pages
3. Change the existing `/loans/credit-cards` route to use Navigate component for redirection

## Files to Modify
- `src/App.tsx` - Add imports and routes

## Expected Result
After implementation, users will be able to:
- Navigate to `/credit-cards` to see all HDFC credit cards with filtering and comparison
- Click on any card to view its detailed page at `/credit-cards/{card-id}`
- Compare up to 3 cards side-by-side on the listing page
