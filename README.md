# Transfer App

I tried to recreate this mostly from memory of what we spoke about. I did look at the Stash app for ui help, but really wanted to mimic what I had in mind during our conversation. It's not 100% the same, for example, I am using Vaul, for the bottom sheet. It handles it's own triggers, so I didn't need the "isOpen" state I mentioned during our convo. Most of the rest is what I had in mind. 

I know this wasn't asked of me and I didn't want to spend too much time on it, so I used Cursor and Gemini to speed me through this. It was a fun little project on my free time. 

Thanks for the opportunity! 

## Component Tree

```
App
 ├─ Loading (conditional)
 ├─ Success (conditional)
 └─ TransferContainer
     ├─ AmountInput
     ├─ BottomSheet (FROM)
     │   ├─ SelectionItem
     │   └─ AccountSelector
     ├─ BottomSheet (TO)
     │   ├─ SelectionItem
     │   └─ AccountSelector
     ├─ ErrorToast (conditional)
     └─ SubmitButton
```

This tree reflects the user flow:

1. Enter amount
2. Select FROM account
3. Select TO account
4. Submit transfer
5. See loading → success or error

---

## Getting Started (Local Development)

#### Install Dependencies 
`yarn install`

#### Start the App (Client + Server)
`yarn dev`

This runs both:
Frontend (Vite) & 
Backend server (TypeScript via tsx)


## High-Level State Architecture (Where State Lives & Why)

### 1. Global/Async State (Custom Hook)

**Location:** `useTransfer` hook
**State:**

* `accounts`
* `isLoading`
* `isSuccess`
* `error`

#### Why it lives in a hook:

* Encapsulates business logic (API calls, async flow)
* Keeps `App` focused on UI orchestration
* Reusable and testable logic layer
* Prevents prop drilling across components

This hook acts as the **source of truth** for transfer lifecycle state.

---

### 2. Local UI State (App Component)

**Location:** `App`

```ts
const [amount, setAmount] = useState<string>('0');
const [fromAccount, setFromAccount] = useState<Account | null>(null);
const [toAccount, setToAccount] = useState<Account | null>(null);
```

#### Why state lives in `App`:

* These values are shared across multiple child components
* They control validation and submission logic
* They represent the core form state of the transfer flow
* Lifting state prevents desynchronization between:

  * AmountInput
  * BottomSheet (FROM)
  * BottomSheet (TO)
  * Submit Button

This follows the **single source of truth** pattern for form state.

---

### 3. Presentational Components (Stateless)

These components do NOT own state:

* `AmountInput`
* `SelectionItem`
* `AccountSelector`
* `HorizontalDivider`
* `ErrorToast`
* `BottomSheet` (UI wrapper)

#### Why:

* Keeps components predictable
* Easier testing
* Clear separation of concerns (UI vs logic)

---

## When We Call APIs (and Why)

### 1. Initial Accounts Fetch

**Triggered:** Inside `useTransfer` (on mount)

**Why:**

* The app needs account data before user interaction
* Enables validation (e.g., insufficient funds)
* Supports filtering (internal vs external accounts)

Flow:

```
App Mount → useTransfer runs → Fetch Accounts API → Populate accounts state
```

---

### 2. Transfer API Call

**Triggered:** On Submit Button click

```ts
submit(fromAccount, toAccount, numAmount);
```

**Why:**

* Only executed when:

  * Amount is valid (> 0)
  * FROM account selected
  * TO account selected
* Prevents unnecessary API calls
* Ensures client-side validation first

Flow:

```
User Clicks Submit
 → Validate state
 → Call submit()
 → Trigger transfer API
 → Update loading/success/error states
```

---

## Application States (UI State Machine)

### 1. Loading State

**Condition:** `isLoading === true`
**Render:** `<Loading />` (early return)

Why:

* Blocks UI during async operations
* Prevents user interaction during API calls
* Provides clear feedback

---

### 2. Success State

**Condition:** `isSuccess === true`
**Render:** `<Success />` (early return)

Why:

* Dedicated success screen improves UX
* Allows clean reset flow
* Avoids mixing success UI with form UI

---

### 3. Error State

**Condition:** `error !== null`
**Render:** `<ErrorToast />`

Why:

* Non-blocking feedback
* Keeps user in the flow instead of full screen error
* Allows correction and retry

---

### 4. Idle / Form State (Default)

This is the main interactive state where:

* User enters amount
* Selects accounts via bottom sheets
* Sees validation logic in real-time
* Submit button enables/disables dynamically

Key derived states:

* `isAmountValid`
* `isSelectionDisabled`
* `canSubmit`

---

## Validation Logic

```ts
const isAmountValid = amount !== '' && numAmount > 0;
const isSelectionDisabled = !isAmountValid;
const canSubmit = fromAccount && toAccount && isAmountValid;
```

In this small demo, it was okay to leave this within the components. In a larger app, I would prefer to separate this into it's own service(s).

## Architectural Summary

* **App** = Orchestrator (form + UI state)
* **useTransfer** = Business logic + async state
* **BottomSheet + Selectors** = Composable UI
* **Derived state** = Validation & UX control
* **Early returns** = Clean state-based rendering (Loading / Success)

This results in:

* Clear separation of concerns
* Predictable data flow (top-down)
* Scalable and testable architecture
