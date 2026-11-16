// Radno iskustvo za About stranicu (redosled u nizu = redosled na sajtu, najnovije prvo).
// Datumi su 'YYYY-MM'; bez `end` posao je trenutni ("Present").
// Klijenti ostaju anonimni (bez imena klijenata, kao u CV-u).
export interface Job {
  role: string;
  company: string;
  start: string;
  end?: string;
  points: string[];
}

export const jobs: Job[] = [
  {
    role: 'D365 F&O Developer',
    company: 'Infinite Solutions',
    start: '2025-06',
    points: [
      'X++ development and debugging',
      'Batch processes with the SysOperation framework',
      'Data entities, the Data management workspace and data migration',
      'BYOD: exporting F&O data to an Azure SQL database',
      'Power Platform solutions next to F&O',
    ],
  },
  {
    role: 'D365 F&O Developer',
    company: '42Dynamics',
    start: '2022-06',
    end: '2025-06',
    points: [
      'ISV module development, including a module built from scratch',
      'Led the integration of the Subscription Billing module with a custom invoicing solution for utility usage and meter data',
      'Integration portal for a D365 client: JSON messages into Accounts payable, Accounts receivable, General ledger, Product information management and Sales',
      'AX 2012 utility software for a client: bug fixing, faster database queries and XML fixes',
      'New tables, forms and fields, security objects and SysTest unit tests',
    ],
  },
  {
    role: 'Full-stack .NET Developer',
    company: 'Elikosoft',
    start: '2020-06',
    end: '2020-09',
    points: ['Civil engineering software: pivot tables for large sets of measurement data'],
  },
];

// Početak rada sa D365 F&O / AX; iz njega se računa "X+ years" (Home hero i About)
export const d365Start = '2022-06';

export const education = {
  degree: 'BSc, Computer Technologies and Engineering',
  school: 'Faculty of Electrical Engineering and Information Technologies, Ss. Cyril and Methodius University, Skopje',
};
