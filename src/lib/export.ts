/**
 * Utility to export data to CSV
 * @param data Array of objects to export
 * @param filename Name of the file (without .csv)
 * @param headers Optional custom headers mapping { [key in keyof T]: string }
 */
export function exportToCSV<T extends object>(
    data: T[],
    filename: string,
    headers?: Record<string, string>
) {
    if (!data || data.length === 0) return;

    // Get keys from first object or headers
    const keys = Object.keys(data[0]) as (keyof T)[];

    // Create header row
    const headerRow = keys.map(key => {
        const header = headers ? headers[key as string] : String(key);
        // Replace underscores with spaces and capitalize
        return header.replace(/_/g, ' ').toUpperCase();
    }).join(',');

    // Create data rows
    const rows = data.map(item => {
        return keys.map(key => {
            const value = item[key];
            // Format value: handle nulls, wrap strings in quotes, escape existing quotes
            if (value === null || value === undefined) return '';
            const stringValue = String(value).replace(/"/g, '""');
            return `"${stringValue}"`;
        }).join(',');
    });

    // Combine all rows
    const csvContent = [headerRow, ...rows].join('\n');

    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
