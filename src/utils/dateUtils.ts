// Date formatting and helper utilities for OrganizaAí

export function formatGreetingDate(dateStr?: string): string {
  // Base date for prototype is 2026-09-17 (Quinta-feira) or current if desired
  const date = dateStr ? new Date(dateStr) : new Date(2026, 8, 17); // Month 8 is September
  
  const weekdays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];

  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${weekday}, ${day} de ${month}`;
}

export function formatFullDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];
  return `${day} de ${months[(month || 1) - 1]} de ${year}`;
}

export function formatAgendaGroupDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const weekdays = [
    'DOMINGO',
    'SEGUNDA-FEIRA',
    'TERÇA-FEIRA',
    'QUARTA-FEIRA',
    'QUINTA-FEIRA',
    'SEXTA-FEIRA',
    'SÁBADO',
  ];

  const dayStr = String(day).padStart(2, '0');
  const monthStr = months[month - 1];
  const weekdayStr = weekdays[date.getDay()];

  return `${dayStr} ${monthStr} · ${weekdayStr}`;
}

export interface DueBadgeInfo {
  text: string;
  variant: 'urgent' | 'near' | 'normal' | 'late';
  badgeClass: string;
}

export function getDueDateBadge(dueDateStr: string, referenceDateStr: string = '2026-09-17'): DueBadgeInfo {
  if (!dueDateStr) {
    return { text: 'Sem data', variant: 'normal', badgeClass: 'bg-slate-100 text-slate-600' };
  }

  // Parse strings as YYYY-MM-DD
  const [y1, m1, d1] = dueDateStr.split('-').map(Number);
  const [y2, m2, d2] = referenceDateStr.split('-').map(Number);

  const due = new Date(y1, m1 - 1, d1).getTime();
  const ref = new Date(y2, m2 - 1, d2).getTime();
  const diffDays = Math.round((due - ref) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return {
      text: 'Hoje',
      variant: 'urgent',
      badgeClass: 'bg-amber-100 text-amber-800 font-medium',
    };
  }
  if (diffDays === 1) {
    return {
      text: 'Amanhã',
      variant: 'urgent',
      badgeClass: 'bg-rose-100 text-rose-700 font-medium',
    };
  }
  if (diffDays < 0) {
    return {
      text: 'Atrasada',
      variant: 'late',
      badgeClass: 'bg-red-100 text-red-800 font-medium',
    };
  }

  // Format short date e.g. "21 set"
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const shortText = `${d1} ${months[m1 - 1]}`;

  return {
    text: shortText,
    variant: 'normal',
    badgeClass: 'bg-emerald-50 text-emerald-700 font-medium',
  };
}

export function computeReminderDescription(
  dueDateStr: string,
  timing: string,
  timeStr: string = '18:00'
): string {
  if (!dueDateStr) return 'Sem data definida';
  if (timing === 'Sem lembrete') return 'Nenhum lembrete configurado';

  const [y, m, d] = dueDateStr.split('-').map(Number);
  const targetDate = new Date(y, m - 1, d);

  if (timing === '1 dia antes') {
    targetDate.setDate(targetDate.getDate() - 1);
  } else if (timing === '2 dias antes') {
    targetDate.setDate(targetDate.getDate() - 2);
  } else if (timing === '3 horas antes') {
    const dayPad = String(targetDate.getDate()).padStart(2, '0');
    const monthPad = String(targetDate.getMonth() + 1).padStart(2, '0');
    return `${dayPad}/${monthPad}, 3 horas antes`;
  }
  // 'No dia da entrega' uses targetDate as is

  const dayPad = String(targetDate.getDate()).padStart(2, '0');
  const monthPad = String(targetDate.getMonth() + 1).padStart(2, '0');

  return `${dayPad}/${monthPad}, às ${timeStr}`;
}
