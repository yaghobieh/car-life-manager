import { api } from '@api';

export function fetchVehicleList() {
  return api.listVehicles();
}

export function fetchDashboard(id: string) {
  return api.dashboard(id);
}

export function loginUser(identifier: string, password: string) {
  return api.login(identifier, password);
}

export function registerUser(
  email: string,
  password: string,
  name: string,
  role: string,
  username: string,
) {
  return api.register(email, password, name, role, username);
}

export function sendTestSmsRequest() {
  return api.sendTestSms();
}

export function sendTestEmailRequest() {
  return api.sendTestEmail();
}
