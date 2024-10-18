import * as XLSX from 'xlsx'


export const xlsxReader = (filePath) => {
    try {
        // https://stackoverflow.com/questions/30859901/parse-xlsx-with-node-and-create-json
        let workbook = XLSX.readFile(filePath);
        let sheet_name_list = workbook.SheetNames;
        return (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
    } catch (error) {
        console.error("error reading file", error)
        throw error
    }
}