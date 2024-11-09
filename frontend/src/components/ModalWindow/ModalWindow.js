import { Box, Modal } from "@mui/material"

const ModalWindow = ({ open, onClose, children }) => {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box className="border gap-20 bg-[#FFFFFF] flex flex-col justify-center items-center">
        {children}
      </Box>
    </Modal>
  )
}

export { ModalWindow }
