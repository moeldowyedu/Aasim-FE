# OBSOLIO Subscription & Payment System Implementation Plan

## Status: Current Implementation Review

### ✅ Already Completed
1. **Registration Flow** (`RegisterPage.jsx`)
   - Multi-step wizard
   - Account type selection (Personal/Organization)
   - Email verification flow
   - Subdomain validation
   - **Status**: Working, but needs update to remove plan selection (backend auto-assigns)

2. **Pricing Page** (`PricingPage.jsx`)
   - Plan display with Personal/Organization tabs
   - Monthly/Annual billing toggle
   - **Status**: Needs update to fetch from API instead of hardcoded data

3. **Email Verification** (`VerificationSuccessPage.jsx`, `VerificationFailedPage.jsx`)
   - Backend redirect handling
   - Workspace URL redirect
   - **Status**: ✅ Complete

4. **Basic Services**
   - `subscriptionsService.js` exists
   - **Status**: Needs review and updates for new endpoints

---

## 🔨 Implementation Tasks

### Phase 1: Update Existing Components (HIGH PRIORITY)

#### Task 1.1: Update RegisterPage.jsx
**File**: `src/pages/Auth/RegisterPage.jsx`

**Changes Needed**:
- ❌ **REMOVE** Step 2 (Plan Selection) - Backend auto-assigns trial
- ✅ **KEEP** Step 1 (Account Type)
- ✅ **KEEP** Step 3 (Account Details)
- ✅ **KEEP** Step 4 (Workspace Setup)
- Update to 3-step wizard instead of 4-step
- Remove `selectedPlan` from state (no longer needed)
- Update registration API call (already correct - no plan_id sent)

**Priority**: 🔴 CRITICAL - Must fix to match backend behavior

---

#### Task 1.2: Update PricingPage.jsx
**File**: `src/pages/Public/PricingPage.jsx`

**Changes Needed**:
- Replace hardcoded plans with API call: `GET /api/v1/subscription-plans`
- Add loading state
- Filter by `is_published: true`
- Sort by `display_order` (higher = first)
- Update button logic:
  - Free plans: "Get Started" → Navigate to `/register`
  - Paid plans: "Try Free" → Navigate to `/register` (trial auto-assigned)
- Keep existing Monthly/Annual toggle
- Keep existing Personal/Organization tabs

**API Integration**:
```javascript
// New API call needed
const fetchPlans = async () => {
  const response = await api.get('/api/v1/subscription-plans');
  return response.data.data; // Array of plans
};
```

**Priority**: 🔴 HIGH - Public-facing page

---

### Phase 2: Create New Components

#### Task 2.1: Trial Banner Component
**File**: `src/components/subscription/TrialBanner.jsx` (NEW)

**Features**:
- Fetch current subscription: `GET /api/v1/subscriptions/current`
- Calculate days remaining
- Color-coded urgency:
  - `> 7 days`: Blue/info
  - `3-7 days`: Yellow/warning
  - `< 3 days`: Red/critical
- "Upgrade Now" button → `/settings/subscription/upgrade`
- Only show if `status === 'trialing'`

**Priority**: 🟡 MEDIUM - Needed after users can register

---

#### Task 2.2: Subscription Management Page
**File**: `src/pages/Settings/SubscriptionPage.jsx` (NEW)

**Features**:
- Display current subscription details
- Change plan button
- Billing history table
- Payment methods
- Cancel subscription

**API Calls**:
- `GET /api/v1/subscriptions/current`
- `GET /api/v1/subscriptions/history`
- `GET /api/v1/billing/invoices`

**Priority**: 🟡 MEDIUM

---

#### Task 2.3: Upgrade/Change Plan Page
**File**: `src/pages/Settings/UpgradePlanPage.jsx` (NEW)

**Features**:
- Show available plans for tenant type
- Billing cycle selector (Monthly/Annual)
- Savings calculator
- "Continue to Payment" button

**API Call**:
- `GET /api/v1/subscription-plans?type={tenantType}`

**Priority**: 🟡 MEDIUM

---

#### Task 2.4: Payment Flow Components

**2.4a: Payment Initiation**
**File**: `src/pages/Payment/InitiatePaymentPage.jsx` (NEW)

**Features**:
- Call `POST /api/v1/payments/subscription` with:
  - `plan_id`
  - `billing_cycle`
  - `phone` (Egyptian format)
- Receive `iframe_url`
- Redirect to Paymob iframe

---

**2.4b: Payment Response Handler**
**File**: `src/pages/Payment/PaymentResponsePage.jsx` (NEW)

**Features**:
- Parse query params: `success`, `invoice_id`
- Call `GET /api/v1/payments/response?success=true&invoice_id=xxx`
- Show success/failure page
- Redirect to dashboard

**Priority**: 🟡 MEDIUM - Needed for paid upgrades

---

### Phase 3: Admin Console (console.obsolio.com)

#### Task 3.1: Admin Route Guard
**File**: `src/components/guards/AdminRoute.jsx` (NEW)

**Features**:
- Check `user.is_system_admin === true`
- Redirect to `/unauthorized` if not admin
- Wrap all `/admin/*` routes

**Priority**: 🔴 HIGH - Security critical

---

#### Task 3.2: Admin Subscription Plans Management

**3.2a: Plans List Page**
**File**: `src/pages/Admin/Plans/PlansListPage.jsx` (NEW)

**Features**:
- Table with filters (type, status, published)
- Create/Edit/Archive actions
- Publish/Unpublish toggle
- Show active subscriptions count

**API**: `GET /api/v1/admin/subscription-plans`

---

**3.2b: Create/Edit Plan Form**
**File**: `src/pages/Admin/Plans/PlanFormPage.jsx` (NEW)

**Form Fields**:
- Basic Info (name, type, tier, description)
- Pricing (monthly, annual, trial days)
- Limits (users, agents, storage, custom JSON)
- Features (array input)
- Visibility (published, archived, display_order)

**APIs**:
- `POST /api/v1/admin/subscription-plans`
- `PUT /api/v1/admin/subscription-plans/{id}`

**Priority**: 🟡 MEDIUM - Admin tool

---

#### Task 3.3: Admin Tenant Management

**3.3a: Tenants List**
**File**: `src/pages/Admin/Tenants/TenantsListPage.jsx` (NEW)

**Features**:
- Paginated table
- Filters (type, status, plan, search)
- Actions (View, Change Sub, Extend Trial, Delete)

**API**: `GET /api/v1/admin/tenants`

---

**3.3b: Tenant Details**
**File**: `src/pages/Admin/Tenants/TenantDetailsPage.jsx` (NEW)

**Features**:
- Subscription info
- Subscription history
- Invoices
- Team members
- Change subscription modal
- Extend trial modal

**APIs**:
- `GET /api/v1/admin/tenants/{id}`
- `PUT /api/v1/admin/tenants/{id}/subscription`
- `POST /api/v1/admin/tenants/{id}/extend-trial`

**Priority**: 🟡 MEDIUM - Admin tool

---

#### Task 3.4: Payment Transactions Admin

**3.4a: Transactions List**
**File**: `src/pages/Admin/Payments/TransactionsListPage.jsx` (NEW)

**Features**:
- Paginated table
- Filters (status, date range, tenant)
- View details
- Refund action

**API**: `GET /api/v1/admin/payment-transactions` (⚠️ Need to create backend endpoint)

---

**3.4b: Admin Dashboard**
**File**: `src/pages/Admin/DashboardPage.jsx` (NEW)

**Features**:
- Statistics cards
- Chart of subscriptions by plan
- Recent signups

**API**: `GET /api/v1/admin/tenants/statistics`

**Priority**: 🟢 LOW - Nice to have

---

### Phase 4: Services & State Management

#### Task 4.1: Update/Create Services

**4.1a: Subscription Service**
**File**: `src/services/subscriptionService.js` (UPDATE)

**Methods**:
```javascript
getCurrentSubscription()
getSubscriptionHistory()
changePlan(planId, billingCycle, startsImmediately)
getPlans(type?)
```

---

**4.1b: Payment Service**
**File**: `src/services/paymentService.js` (NEW)

**Methods**:
```javascript
initiatePayment(planId, billingCycle, phone)
verifyPayment(success, invoiceId)
getInvoices()
```

---

**4.1c: Admin Services**
**File**: `src/services/adminService.js` (NEW)

**Methods**:
```javascript
// Plans
getAdminPlans(filters)
createPlan(planData)
updatePlan(id, planData)
deletePlan(id)

// Tenants
getAdminTenants(filters, page)
getTenantDetails(id)
changeTenantSubscription(id, data)
extendTrial(id, days, reason)
getTenantStatistics()

// Payments
getPaymentTransactions(filters, page)
refundPayment(invoiceId, reason)
```

**Priority**: 🔴 HIGH - Foundation for all features

---

#### Task 4.2: Zustand Stores

**4.2a: Subscription Store**
**File**: `src/store/subscriptionStore.js` (NEW)

**State**:
```javascript
{
  currentSubscription: null,
  subscriptionHistory: [],
  isOnTrial: false,
  trialDaysRemaining: 0,
  canUpgrade: boolean
}
```

---

**4.2b: Plans Store**
**File**: `src/store/plansStore.js` (NEW)

**State**:
```javascript
{
  plans: [],
  loading: boolean,
  error: null
}
```

**Priority**: 🟡 MEDIUM

---

### Phase 5: Routing Updates

#### Task 5.1: Add New Routes
**File**: `src/router/AppRouter.jsx` (or relevant router file)

**New Routes**:
```javascript
// User routes
/settings/subscription
/settings/subscription/upgrade
/payment/initiate
/payment-response

// Admin routes (console.obsolio.com)
/admin/dashboard
/admin/plans
/admin/plans/create
/admin/plans/:id/edit
/admin/tenants
/admin/tenants/:id
/admin/payments
```

**Priority**: 🔴 HIGH

---

## Implementation Order

### Week 1: Core Updates
1. ✅ Update RegisterPage (remove plan selection)
2. ✅ Update PricingPage (API integration)
3. ✅ Create Subscription Service
4. ✅ Create Payment Service
5. ✅ Add routing

### Week 2: User Features
1. ✅ Trial Banner component
2. ✅ Subscription management page
3. ✅ Upgrade plan page
4. ✅ Payment flow (initiate + response)
5. ✅ Test end-to-end user flow

### Week 3: Admin Features
1. ✅ Admin route guard
2. ✅ Plans management (list + form)
3. ✅ Tenants management (list + details)
4. ✅ Payment transactions
5. ✅ Admin dashboard

### Week 4: Polish & Testing
1. ✅ Error handling
2. ✅ Loading states
3. ✅ Empty states
4. ✅ E2E testing
5. ✅ Documentation

---

## Critical Notes

### ⚠️ Backend Dependency
- Payment transactions admin endpoint needs to be created:
  `GET /api/v1/admin/payment-transactions`

### ⚠️ Security
- All admin routes MUST check `is_system_admin === true`
- Use AdminRoute guard component

### ⚠️ Registration Flow
- **DO NOT** show plan selection during registration
- Backend auto-assigns trial subscription after email verification
- Free trial is automatic for all users

### ⚠️ Paymob Integration
- Phone number MUST be in Egyptian format: `+201234567890`
- Payment uses iframe redirect (not inline iframe)
- Handle success/failure callbacks properly

---

## Next Steps

1. **Review this plan** - Confirm approach with team
2. **Start with Phase 1** - Update existing components first
3. **Test each phase** - Don't move forward until tested
4. **Document as you go** - Update this file with progress

---

**Last Updated**: 2025-12-25
**Status**: Planning Complete - Ready for Implementation
