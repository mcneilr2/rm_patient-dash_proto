// Literal array of valid statuses
export const statusOptions = ['Inquiry', 'Onboarding', 'Active', 'Churned'] as const;

// Union type: "Inquiry" | "Onboarding" | ...
export type Status = typeof statusOptions[number];

// Field keys we allow sorting/filtering by (including name parts)
export const sortableKeys = ['first', 'middle', 'last', 'dob', 'status', 'address'] as const;

// Union type: "first" | "middle" | ...
export type SortableKey = typeof sortableKeys[number];

// Patient data shape
export interface Patient {
  id: string;
  name: string;
  dob: string;
  status: Status;
  address: string;
}
