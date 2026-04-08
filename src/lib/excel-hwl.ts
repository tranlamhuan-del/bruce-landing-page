import ExcelJS from 'exceljs';

interface RateData {
  carrier: string;
  containerType: string;
  pol: string;
  polCode: string;
  pod: string;
  podCode: string;
  oceanFreight: number;
  currency: string;
  validFrom: string;
  validTo: string;
  transitTime: string;
  surcharges: { name: string; amount: number; currency: string; per: string }[];
  totalAmount: number;
  notes: string;
}

// CRM 27-column format
const CRM_HEADERS = [
  'POL', 'POD', 'Dest', 'SerMode', 'Commodity', 'Carrier', 'Transit', 'GROUP',
  '20DC', '40DC', '40HC', '45SH', '20RF', '40RH', 'Special',
  'CS_20DC', 'CS_40DC', 'CS_40HC', 'CS_45SH', 'CS_20RF', 'CS_40RH',
  'ValidFrom', 'ValidTo', 'S/CNumber', 'SaleCarrier', 'Incl', 'Remark',
];

function mapContainerToColumn(containerType: string): { col20RF?: number; col40RH?: number; col20DC?: number; col40DC?: number; col40HC?: number } {
  switch (containerType) {
    case '20RE': return { col20RF: 1 };
    case '40RE': case '40RH': return { col40RH: 1 };
    case '20GP': return { col20DC: 1 };
    case '40GP': return { col40DC: 1 };
    case '40HC': return { col40HC: 1 };
    default: return {};
  }
}

function buildRemarkFromSurcharges(surcharges: RateData['surcharges'], notes: string): string {
  if (surcharges.length === 0) return notes;

  const lines = surcharges.map(s => `${s.name}: ${s.currency} ${s.amount} per ${s.per}`);
  if (notes) lines.push(notes);
  return lines.join('; ');
}

function buildInclFromSurcharges(surcharges: RateData['surcharges']): string {
  // Surcharges commonly included in O/F
  const included = surcharges
    .filter(s => ['CSF', 'PSS', 'DTHC', 'BAF', 'CAF'].includes(s.name))
    .map(s => s.name);
  return included.join(', ');
}

export async function generateExcel(rate: RateData): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Rates');

  // Headers
  sheet.addRow(CRM_HEADERS);

  // Style headers
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, size: 11 };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' },
  };
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };

  // Determine which rate column to fill
  const colMap = mapContainerToColumn(rate.containerType);
  const isReefer = ['20RE', '40RE', '40RH'].includes(rate.containerType);
  const commodity = isReefer ? 'FAK - RF' : 'FAK';

  // Data row
  const row: (string | number)[] = [
    rate.polCode || rate.pol,                    // POL
    rate.podCode || rate.pod,                    // POD
    `${rate.pod}, ${rate.podCode?.slice(0, 2) || ''}`, // Dest
    'CY/CY',                                    // SerMode
    commodity,                                   // Commodity
    rate.carrier,                                // Carrier
    rate.transitTime,                            // Transit
    'FAK',                                       // GROUP
    colMap.col20DC ? rate.oceanFreight : '',      // 20DC
    colMap.col40DC ? rate.oceanFreight : '',      // 40DC
    colMap.col40HC ? rate.oceanFreight : '',      // 40HC
    '',                                          // 45SH
    colMap.col20RF ? rate.oceanFreight : '',      // 20RF
    colMap.col40RH ? rate.oceanFreight : '',      // 40RH
    '',                                          // Special
    '', '', '', '', '', '',                       // CS_* columns
    rate.validFrom,                              // ValidFrom
    rate.validTo,                                // ValidTo
    '',                                          // S/CNumber
    '',                                          // SaleCarrier
    buildInclFromSurcharges(rate.surcharges),     // Incl
    buildRemarkFromSurcharges(rate.surcharges, rate.notes), // Remark
  ];

  sheet.addRow(row);

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
