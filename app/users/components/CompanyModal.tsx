import { JSX } from "@emotion/react/jsx-runtime";
import { Modal, Box, Typography } from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../page";
import Coord from './Coord';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function CompanyModal(props: {
  open: boolean;
  onClosed: () => void;
}): JSX.Element {

  const user = useContext(UserContext);
  return (
    <Modal
      open={props.open}
      onClose={props.onClosed}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{...style, width: 400}}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {user?.company.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {user?.company.department}
        </Typography>
            <Coord/>
      </Box>
    </Modal>
  );
}
