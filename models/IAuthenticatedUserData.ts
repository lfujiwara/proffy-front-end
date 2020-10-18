export default interface IAuthenticatedUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  lastUpdated: Date;
  subjectId: string;
  currency: string;
  hourlyRate: number;
  isActive: boolean;
}
