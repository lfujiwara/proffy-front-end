import IAvailableTimeWindow from "./IAvailableTimeWindow";

export default interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  biography: string;
  hourlyRate: number;
  currency: string;
  subjectId: string;
  isActive: boolean;
  phoneNumber: string;
  availableTimeWindows: IAvailableTimeWindow[];
}
