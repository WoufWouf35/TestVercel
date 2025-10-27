import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

const SPREADSHEET_ID_KEY = 'CAR_WASH_SPREADSHEET_ID';
let cachedSpreadsheetId: string | null = null;

export async function getOrCreateSpreadsheet(): Promise<string> {
  if (cachedSpreadsheetId) {
    return cachedSpreadsheetId;
  }

  const existingId = process.env[SPREADSHEET_ID_KEY];
  if (existingId) {
    cachedSpreadsheetId = existingId;
    return existingId;
  }

  const sheets = await getUncachableGoogleSheetClient();
  
  const response = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Car Wash Bookings',
      },
      sheets: [
        {
          properties: {
            title: 'Bookings',
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'ID' } },
                    { userEnteredValue: { stringValue: 'Customer Name' } },
                    { userEnteredValue: { stringValue: 'Email' } },
                    { userEnteredValue: { stringValue: 'Phone' } },
                    { userEnteredValue: { stringValue: 'Vehicle Make' } },
                    { userEnteredValue: { stringValue: 'Vehicle Model' } },
                    { userEnteredValue: { stringValue: 'Service Type' } },
                    { userEnteredValue: { stringValue: 'Appointment Date' } },
                    { userEnteredValue: { stringValue: 'Appointment Time' } },
                    { userEnteredValue: { stringValue: 'Special Requests' } },
                    { userEnteredValue: { stringValue: 'Status' } },
                    { userEnteredValue: { stringValue: 'Created At' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });

  const spreadsheetId = response.data.spreadsheetId!;
  cachedSpreadsheetId = spreadsheetId;
  console.log(`Created new spreadsheet with ID: ${spreadsheetId}`);
  console.log(`Set environment variable ${SPREADSHEET_ID_KEY}=${spreadsheetId} to persist across restarts`);
  
  return spreadsheetId;
}

export interface BookingRow {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  specialRequests: string;
  status: string;
  createdAt: string;
}

export async function appendBooking(booking: BookingRow): Promise<void> {
  const sheets = await getUncachableGoogleSheetClient();
  const spreadsheetId = await getOrCreateSpreadsheet();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Bookings!A:L',
    valueInputOption: 'RAW',
    requestBody: {
      values: [
        [
          booking.id,
          booking.customerName,
          booking.email,
          booking.phone,
          booking.vehicleMake,
          booking.vehicleModel,
          booking.serviceType,
          booking.appointmentDate,
          booking.appointmentTime,
          booking.specialRequests || '',
          booking.status,
          booking.createdAt,
        ],
      ],
    },
  });
}

export async function getAllBookings(): Promise<BookingRow[]> {
  const sheets = await getUncachableGoogleSheetClient();
  const spreadsheetId = await getOrCreateSpreadsheet();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Bookings!A2:L',
  });

  const rows = response.data.values || [];
  
  return rows.map((row) => ({
    id: row[0] || '',
    customerName: row[1] || '',
    email: row[2] || '',
    phone: row[3] || '',
    vehicleMake: row[4] || '',
    vehicleModel: row[5] || '',
    serviceType: row[6] || '',
    appointmentDate: row[7] || '',
    appointmentTime: row[8] || '',
    specialRequests: row[9] || '',
    status: row[10] || 'upcoming',
    createdAt: row[11] || '',
  }));
}
