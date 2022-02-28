import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  p: 4,
  color: '#000',
  fontfamily: 'inherit',
};

export default function BasicModal(props) {
  return (
    <div className="c-black">
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          {/* <Typography id="modal-modal-title" variant="h3" component="h1">
            Log In
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.children}
          </Typography> */}
          {props.children}
        </Box>
      </Modal>
    </div>
  );
}
