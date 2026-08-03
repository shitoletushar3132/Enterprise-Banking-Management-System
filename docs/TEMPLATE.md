# Module Design Template

Use this template for every module design document under `docs/modules/`.

Keep the document practical (about 3–5 pages). Prefer concrete rules and examples over theory.

---

## Goal

What problem does this module solve for the bank?

---

## Features

- Feature 1
- Feature 2

---

## User Roles

| Role | Capabilities |
| ---- | ------------ |
|      |              |

---

## Workflow

1. Step
2. Step

```text
Actor → Action → System → Outcome
```

---

## Business Rules

1. Rule
2. Rule

---

## Database Collections

### `<collection_name>`

| Field     | Type     | Required | Notes                 |
| --------- | -------- | -------- | --------------------- |
| _id       | ObjectId | yes      |                       |
| status    | string   | yes      | ACTIVE / INACTIVE / … |
| createdAt | Date     | yes      | audit                 |
| updatedAt | Date     | yes      | audit                 |
| createdBy | ObjectId | no       | audit                 |
| updatedBy | ObjectId | no       | audit                 |
| deletedAt | Date     | no       | soft delete           |
| deletedBy | ObjectId | no       | soft delete           |

---

## Indexes

| Collection | Fields | Type | Reason |
| ---------- | ------ | ---- | ------ |
|            |        |      |        |

---

## APIs

Base path: `/api/v1/<resource>`

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| GET    | /        | List        |      |
| GET    | /:id     | Get by id   |      |
| POST   | /        | Create      |      |
| PATCH  | /:id     | Update      |      |
| DELETE | /:id     | Soft delete |      |

---

## Permissions

| Permission key | Description |
| -------------- | ----------- |
|                |             |

---

## Validation Rules

| Field | Rules |
| ----- | ----- |
|       |       |

---

## Edge Cases

- Case and expected behavior

---

## Audit Logs

| Action | Logged fields |
| ------ | ------------- |
| CREATE |               |
| UPDATE |               |
| DELETE |               |

---

## Notifications

Optional. List events that should notify users/systems.

---

## Testing Checklist

- [ ] Unit tests (service)
- [ ] Unit tests (controller)
- [ ] Repository tests
- [ ] Integration / e2e tests
- [ ] Authorization tests
- [ ] Validation tests
- [ ] Soft-delete / edge-case tests

---

## Future Improvements

Deferred items that are intentionally out of scope for the first delivery.
