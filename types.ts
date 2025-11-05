
export enum UserRole {
  BORROWER = 'borrower',
  AGENT = 'agent',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export enum LoanStatus {
    PENDING = 'Pending Review',
    APPROVED = 'Approved',
    FUNDED = 'Funded',
    REJECTED = 'Rejected',
}

export interface LoanRequest {
    id: string;
    borrowerId: string;
    borrowerName: string;
    amount: number;
    purpose: string;
    term: number; // in months
    interestRate: number; // annual
    status: LoanStatus;
    dateRequested: string;
    creditScore: number;
}
