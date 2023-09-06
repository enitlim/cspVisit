import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface CSPDetail {
  csp_name: string;
  br_code: number;
  csp_code: number;
}
interface CSPDocument {
  id: string;
  br_name: string;
  reg_name: string;
  csp_phone: string;
  csp_status: string;
  csp_details: CSPDetail;
  csp_vendor: string;
  csp_village: string;
  csp_distance: string;
  visit_date_time: string;
  visit_latitude: string;
  visit_longitude: string;
  emp_id: string;
  is_csp_working: boolean;
}
const TableShow = ({ cspdata }: { cspdata: CSPDocument[] }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Branch Code</TableCell>
              <TableCell>Branch Name</TableCell>
              <TableCell>Region Name</TableCell>
              <TableCell>CSP Status</TableCell>
              <TableCell>CSP Code</TableCell>
              <TableCell>CSP Name</TableCell>
              <TableCell>CSP Distance</TableCell>
              <TableCell>Visit Date</TableCell>
              <TableCell>Visit Latitude</TableCell>
              <TableCell>Visit Longitude</TableCell>
              <TableCell>Visit By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cspdata.map((csp: CSPDocument, index: number) => (
              <TableRow key={csp.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{csp.csp_details.br_code}</TableCell>
                <TableCell>{csp.br_name}</TableCell>
                <TableCell>{csp.reg_name}</TableCell>
                <TableCell>{csp.is_csp_working?<>Working</>:<>Not Working</>}</TableCell>
                <TableCell>{csp.csp_details.csp_code}</TableCell>
                <TableCell>{csp.csp_details.csp_name}</TableCell>
                <TableCell>{csp.csp_distance}</TableCell>
                <TableCell>{csp.visit_date_time}</TableCell>
                <TableCell>{csp.visit_latitude}</TableCell>
                <TableCell>{csp.visit_longitude}</TableCell>
                <TableCell>{csp.emp_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableShow;