import ExcelJS from 'exceljs';

interface Surcharge {
  key: string;
  name: string;
  amount20: number;
  amount40: number;
  currency: string;
  per: string;
}

interface RateData {
  carrier: string;
  containerType: string;
  pol: string;
  polCode: string;
  pod: string;
  podCode: string;
  dest: string;
  oceanFreight: number;
  oceanFreight20: number;
  oceanFreight40: number;
  currency: string;
  validFrom: string;
  validTo: string;
  transitTime: string;
  surcharges: Surcharge[];
  totalAmount: number;
  isReefer: boolean;
  inclText: string;
  ofInclText: string;
  viaRoute: string;
  notes: string;
}

// CRM 27-column format — matches TeamplateHLAG.xlsx
const CRM_HEADERS = [
  'POL', 'POD', 'Dest', 'SerMode', 'Commodity', 'Carrier', 'Transit', 'GROUP',
  '20DC', '40DC', '40HC', '45SH', '20RF', '40RH', 'Special',
  'CS_20DC', 'CS_40DC', 'CS_40HC', 'CS_45SH', 'CS_20RF', 'CS_40RH',
  'ValidFrom', 'ValidTo', 'S/CNumber', 'SaleCarrier', 'Incl', 'Remark',
];

function parseHlagDate(dateStr: string): Date | string {
  // Convert "8 Apr 2026" to Date object for Excel
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d;
}

function buildRemark(rate: RateData): string {
  const parts: string[] = [];

  // Surcharges NOT in Incl (Incl only has Freight Surcharges)
  const freightKeys = ['EA', 'MFR', 'EFS', 'TAO', 'TAD', 'WRS', 'PCC', 'CSF'];
  const nonInclSurcharges = rate.surcharges.filter(s => !freightKeys.includes(s.key));
  for (const s of nonInclSurcharges) {
    parts.push(`${s.name}: ${s.currency} ${s.amount20.toLocaleString()}/${s.amount40.toLocaleString()}`);
  }

  // Per-BL charges from notes
  if (rate.notes) parts.push(rate.notes);

  // Via route
  if (rate.viaRoute) parts.push(`via ${rate.viaRoute}`);

  return parts.join('. ');
}

export async function generateExcel(rate: RateData): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet2');

  // Headers
  sheet.addRow(CRM_HEADERS);

  // Style headers
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' },
  };

  // Data row — match template format exactly
  const row: (string | number | Date)[] = [
    rate.polCode || rate.pol,                          // POL (VNSGN)
    rate.podCode || rate.pod,                          // POD (DEHAM)
    rate.dest || `${rate.pod}, ${(rate.podCode || '').substring(0, 2)}`,  // Dest (HAMBURG, DE)
    'CY/CY',                                          // SerMode
    '',                                                // Commodity (template leaves blank)
    rate.carrier || 'HPL',                             // Carrier (HPL per template)
    '',                                                // Transit (template leaves blank)
    '',                                                // GROUP (template leaves blank)
    // Price columns — reefer goes to 20RF/40RH, dry goes to 20DC/40DC/40HC
    rate.isReefer ? '' : (rate.oceanFreight20 || ''),  // 20DC
    rate.isReefer ? '' : (rate.oceanFreight40 || ''),  // 40DC
    rate.isReefer ? '' : (rate.oceanFreight40 || ''),  // 40HC (same as 40DC for dry)
    '',                                                // 45SH
    rate.isReefer ? (rate.oceanFreight20 || '') : '',  // 20RF
    rate.isReefer ? (rate.oceanFreight40 || '') : '',  // 40RH
    '',                                                // Special
    '', '', '', '', '', '',                             // CS_* columns (blank)
    parseHlagDate(rate.validFrom),                     // ValidFrom (Date object)
    parseHlagDate(rate.validTo),                       // ValidTo (Date object)
    '',                                                // S/CNumber
    'MR DUNG',                                         // SaleCarrier (per template)
    rate.inclText || '',                               // Incl (MFR $313/626, TAO $100/200)
    buildRemark(rate),                                 // Remark
  ];

  sheet.addRow(row);

  // Format date columns
  const dateFormat = 'DD MMM YYYY';
  sheet.getColumn(22).numFmt = dateFormat; // ValidFrom
  sheet.getColumn(23).numFmt = dateFormat; // ValidTo

  // Auto-width columns
  sheet.columns.forEach(col => {
    let maxWidth = 10;
    col.eachCell?.({ includeEmpty: false }, cell => {
      const cellLen = cell.value ? String(cell.value).length : 0;
      if (cellLen > maxWidth) maxWidth = cellLen;
    });
    col.width = Math.min(maxWidth + 2, 40);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
