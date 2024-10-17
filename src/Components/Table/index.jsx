import React from "react";
import { Table } from "react-bootstrap";
import MemberRow from "./MemberRow";


function MemberTable({ members }) {
  return (
    <Table striped bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => (
          <MemberRow key={member.id} member={member} index={index} />
        ))}
      </tbody>
    </Table>
  );
}

export default MemberTable;
