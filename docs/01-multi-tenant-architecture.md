# Multi-Tenant Architecture

Version: 1.0

Status: Draft

---

# 1. Purpose

This document defines how the Enterprise Banking Management System (EBMS) supports multiple banks on a single platform.

The platform is built using a **shared application, shared infrastructure, and logical tenant isolation** model.

Every module in the system must follow the rules defined in this document.

---

# 2. Goal

Provide a secure, scalable, and maintainable platform where:

- Multiple banks use the same application.
- Each bank only accesses its own data.
- New banks can be onboarded quickly.
- Platform updates are deployed once for all tenants.
- Infrastructure costs remain low.

---

# 3. Architecture

```
                   Enterprise Banking Platform

                           Platform

                               │
      ┌────────────────────────┼────────────────────────┐
      │                        │                        │
      │                        │                        │
  Tenant A                 Tenant B                Tenant C
  ABC Bank                 XYZ Bank               PQR Bank
      │                        │                        │
      │                        │                        │
  Branches                Branches                Branches
  Employees               Employees               Employees
  Customers               Customers               Customers
  Accounts                Accounts                Accounts
  Loans                   Loans                   Loans
  Transactions            Transactions            Transactions
```

A single deployment serves all tenants.

Tenants are isolated by application logic and database design.

---

# 4. Tenant Definition

A Tenant represents one financial institution using the platform.

Examples:

- Cooperative Bank
- Credit Society
- NBFC
- Small Finance Bank
- Rural Bank

Every tenant has its own:

- Branches
- Employees
- Customers
- Accounts
- Loans
- Transactions
- Reports
- Settings
- Roles
- Permissions

---

# 5. Platform Ownership

Our company owns and operates the platform.

Banks subscribe to the software.

Banks do not receive dedicated deployments.

Platform upgrades are managed centrally.

---

# 6. Tenant Isolation

Every business record belongs to exactly one tenant.

Example

Customer

```
Customer
---------
_id
tenantId
branchId
...
```

Account

```
Account
---------
_id
tenantId
customerId
...
```

Loan

```
Loan
---------
_id
tenantId
customerId
...
```

Transaction

```
Transaction
-------------
_id
tenantId
accountId
...
```

Every collection must contain a `tenantId`.

---

# 7. Request Flow

```
User Login
      │
      ▼
Authenticate User
      │
      ▼
Identify Tenant
      │
      ▼
Load Permissions
      │
      ▼
Execute Business Logic
      │
      ▼
Return Tenant Data Only
```

No request should access data from another tenant.

---

# 8. Authentication

Authentication identifies:

- User
- Tenant
- Roles
- Permissions

Every authenticated request contains:

- userId
- tenantId
- branchId
- roleId

Business logic should never trust values supplied by the client.

---

# 9. Authorization

Authorization is evaluated using:

```
Tenant

↓

Role

↓

Permission

↓

Business Operation
```

Example

```
Tenant

ABC Bank

↓

Branch Manager

↓

customer:create

↓

Create Customer
```

---

# 10. Data Ownership

Every business object belongs to a tenant.

Examples

- Branch
- Employee
- Customer
- KYC
- Account
- Loan
- Ledger
- Transaction
- Report
- Notification

System-level data does not belong to a tenant.

Examples

- Platform Configuration
- Supported Languages
- Feature Flags
- Country List

---

# 11. Database Strategy

Current Strategy

Shared Database

Shared Collections

Logical Isolation using tenantId

Example

customers

```
{
    _id,
    tenantId,
    customerId,
    name,
    mobile,
    ...
}
```

Future strategies can include:

- Database per Tenant
- Cluster per Region

The application layer should be designed so database strategies can evolve without changing business logic.

---

# 12. Indexing Standard

Every major collection should include tenantId in its indexes.

Examples

Customer

```
tenantId + customerId
tenantId + mobile
tenantId + pan
```

Account

```
tenantId + accountNumber
tenantId + customerId
```

Transaction

```
tenantId + accountId
tenantId + transactionDate
```

This keeps queries efficient and tenant-scoped.

---

# 13. Tenant Configuration

Each tenant can configure:

- Bank Name
- Logo
- Branches
- Products
- Interest Rates
- Charges
- Holidays
- Working Hours
- Roles
- Permissions
- Notification Templates

Configurations must not affect other tenants.

---

# 14. Audit Logging

Every audit record includes:

- tenantId
- userId
- branchId
- action
- resource
- timestamp
- previousValue
- newValue

Audit logs are tenant-isolated.

---

# 15. Security Principles

- Never expose another tenant's data.
- Never trust tenantId from the client.
- Derive tenantId from the authenticated session.
- Validate permissions before every operation.
- Log all critical actions.
- Encrypt sensitive data where required.

---

# 16. Scalability

The architecture should support:

- Thousands of tenants
- Millions of customers
- Horizontal application scaling
- Redis caching
- Background jobs
- Event-driven services (future)

No module should assume a single tenant.

---

# 17. Development Rules

Every new module must:

✓ Support multi-tenancy

✓ Store tenantId

✓ Filter queries by tenantId

✓ Include tenantId in indexes

✓ Include tenantId in audit logs

✓ Validate permissions

✓ Be independently testable

---

# 18. Future Enhancements

- Multiple deployment regions
- Read replicas
- Event-driven architecture
- Kafka integration
- Tenant-specific plugins
- White-label branding
- Per-tenant feature flags
- Multi-currency support
- Multi-language support

---

# 19. Summary

The Enterprise Banking Management System is designed as a **multi-tenant SaaS platform**.

A single application serves multiple banks while ensuring complete logical isolation of data, configuration, and operations.

Every module developed in this project must follow the tenant isolation principles defined in this document.
