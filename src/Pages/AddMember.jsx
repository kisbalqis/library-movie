import { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import MemberTable from "../Components/Table/Index";
import Navbars from "../Components/Navbar";

function AddMember() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    profilePicture: null,
  });
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    { label: "Add Member", link: "#" },
  ];

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("members"));
    if (storedMembers) {
      setMembers(storedMembers);
    }
  }, []);

  useEffect(() => {
    if (members.length > 0) {
      localStorage.setItem("members", JSON.stringify(members));
    }
  }, [members]);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file); 
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const addMember = (e) => {
    e.preventDefault();
    const newMemberWithId = { ...newMember, id: members.length + 1 };
    setMembers((prev) => [...prev, newMemberWithId]);
    setNewMember({ name: "", email: "", profilePicture: null });
    setShowModal(false);
  };

  return (
    <>
      <Navbars brandName="Movie Library" navItems={menuItems} />
      <Container className="table-container my-5">
        <h2>Member List</h2>

        <Button variant="warning" onClick={() => setShowModal(true)}>
          Add New Member
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal" >
          <Modal.Header closeButton>
            <Modal.Title>Add New Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addMember}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newMember.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                Add Member
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

    
        {members.length > 0 ? (
          <MemberTable members={members} />
        ) : (
          <p>No members available</p>
        )}
      </Container>
    </>
  );
}

export default AddMember;
