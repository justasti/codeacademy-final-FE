export default interface Appointment {
  doctorPersonalCode: string;
  patientPersonalCode: string;
  appointmentDate: string;
  description: string;
  status: string;
  id?: string;
}
