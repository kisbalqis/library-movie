import React from "react";

function MemberRow({ member, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <img
          src={member.profilePicture}
          alt={`${member.name}'s profile`}
          width="50"
          height="50"
        />
        <span> {member.name}</span>

      </td>
      <td>{member.email}</td>
      
    </tr>
  );
}

export default MemberRow;
