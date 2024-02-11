import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const rowStyle = {
    '&:last-child td, &:last-child th': { border: 0 },
    "& td" : { color : "black" }
}

export default function ResponseHeader({ panelValue ,editable}:any) {
    const headers = Object.entries(panelValue || {}).map(
        ([key, value]: [string, any], index: number) => { // Specify the type of key and value
          return (
            <TableRow key={index} sx={rowStyle}>
              <TableCell>{key}</TableCell>
              <TableCell>{value ? value : ''}</TableCell>
            </TableRow>
          );
        }
      );

  return (
    <TableContainer className="rounded-lg border border-black/10 bg-black/10">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ "& th" : { color : "black" } }}>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{headers}</TableBody>
      </Table>
    </TableContainer>
    )
}
