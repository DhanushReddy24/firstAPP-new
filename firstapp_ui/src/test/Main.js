import React, { useState } from 'react';
import Modal from './Modal';
import HomeIcon from "@material-ui/icons/Home";
import green from "@material-ui/core/colors/green";
//import HomeIcon from "@material-ui/icons/HomeTwoTone";



function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HomeIcon style={{ color: "red" }} />
  );
}

export default Main;