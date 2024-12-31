/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Button, Grid, TextField, Typography } from "@mui/material";
import {
  MdOutlineBedtime,
  MdOutlineCarRental,
  MdOutlineDone,
  MdOutlineFreeBreakfast,
  MdOutlineMapsHomeWork,
} from "react-icons/md";
import {
  IoCloudDoneOutline,
  IoFastFoodOutline,
  IoGameControllerOutline,
  IoWifiOutline,
} from "react-icons/io5";
import { LuContact, LuSquareParking } from "react-icons/lu";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiMobile3 } from "react-icons/ci";
import {
  PiAirplaneTakeoffLight,
  PiPersonSimpleSwimLight,
} from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

const CustomIcons = ({
  selectedIcons,
  setSelectedIcons,
  title,
  iconName,
  setIconName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iconText, setIconText] = useState("");

  const iconList = [
    { icon: <MdOutlineBedtime /> },
    { icon: <IoCloudDoneOutline /> },
    { icon: <LuContact /> },
    { icon: <TfiHeadphoneAlt /> },
    { icon: <CiMobile3 /> },
    { icon: <PiAirplaneTakeoffLight /> },
    { icon: <IoFastFoodOutline /> },
    { icon: <MdOutlineMapsHomeWork /> },
    { icon: <MdOutlineCarRental /> },
    { icon: <LuSquareParking /> },
    { icon: <IoWifiOutline /> },
    { icon: <PiPersonSimpleSwimLight /> },
    { icon: <MdOutlineDone /> },
    { icon: <RxCross2 /> },
    { icon: <IoGameControllerOutline /> },
    { icon: <MdOutlineFreeBreakfast /> },
  ];
  const ICONS_MAP = {
    MdOutlineBedtime: <MdOutlineBedtime />,
    IoCloudDoneOutline: <IoCloudDoneOutline />,
    LuContact: <LuContact />,
    TfiHeadphoneAlt: <TfiHeadphoneAlt />,
    CiMobile3: <CiMobile3 />,
    PiAirplaneTakeoffLight: <PiAirplaneTakeoffLight />,
    IoFastFoodOutline: <IoFastFoodOutline />,
    MdOutlineMapsHomeWork: <MdOutlineMapsHomeWork />,
    MdOutlineCarRental: <MdOutlineCarRental />,
    LuSquareParking: <LuSquareParking />,
    IoWifiOutline: <IoWifiOutline />,
    PiPersonSimpleSwimLight: <PiPersonSimpleSwimLight />,
    MdOutlineDone: <MdOutlineDone />,
    RxCross2: <RxCross2 />,
    IoGameControllerOutline: <IoGameControllerOutline />,
    MdOutlineFreeBreakfast: <MdOutlineFreeBreakfast />,
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (iconText.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleIconSelect = (icon) => {
    if (iconText.trim() === "") {
      alert("Please provide a text for the icon.");
      return;
    }

    setSelectedIcons([...selectedIcons, { icon: icon, text: iconText }]);
    setIconName([...iconName, { name: icon?.type?.name, text: iconText }]);
    setIconText("");
    setIsModalOpen(false);
  };

  const handleDeleteIcon = (index) => {
    const updatedIcons = selectedIcons.filter((_, i) => i !== index);
    setSelectedIcons(updatedIcons);
  };

  const renderSelectedIcons = () => {
    return selectedIcons.map((item, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ fontSize: "20px", marginRight: "10px" }}
          className="text-red-500"
        >
          {item.icon} {ICONS_MAP[item.name]}
        </div>
        <Typography variant="body1" style={{ flex: 1 }}>
          {item.text}
        </Typography>
        <RxCross2
          onClick={() => handleDeleteIcon(index)}
          style={{
            fontSize: "20px",
            cursor: "pointer",
            color: "red",
            marginLeft: "10px",
          }}
        />
      </div>
    ));
  };

  return (
    <div className="relative">
      <div style={{ marginTop: "10px" }}>{renderSelectedIcons()}</div>
      <button
        color="primary"
        onClick={handleOpenModal}
        className={`absolute bottom-[13px] right-2 rounded border p-1 px-2 z-40 ${
          iconText.length > 0
            ? "primary_text border-[#ea7645] hover:bg-[#fdf0ea]"
            : "text-gray-300"
        } text-sm`}
      >
        Add Icon
      </button>
      <TextField
        label={`What's ${title}`}
        variant="outlined"
        fullWidth
        value={iconText}
        onChange={(e) => setIconText(e.target.value)}
        margin="normal"
        size="small"
      />

      {/* Modal for icon selection */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2 className="text-[#e86731] font-semibold text-xl mb-3">
            Select Icon
          </h2>

          <Grid container spacing={3}>
            {iconList.map((iconItem, index) => {
              // console.log(iconItem.icon?.type?.name);
              return (
                <Grid item key={index}>
                  <Button
                    onClick={() => handleIconSelect(iconItem.icon)}
                    style={{
                      fontSize: "30px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px",
                      color: "#e86731",
                    }}
                  >
                    {iconItem.icon}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default CustomIcons;
