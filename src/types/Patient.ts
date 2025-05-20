export type Status = 'Inquiry' | 'Onboarding' | 'Active' | 'Churned';

export interface Patient {
  id: string;
  name: string;        
  dob: string;
  status: Status;
  address: string;
}
