import * as React from "react";
import Snackbar from "@mui/joy/Snackbar";
import { useStore } from "../../store/useStore";

export default function FeedBack() {
  const { openFeedBack, setOpenFeedBack } = useStore();
  const message = openFeedBack?.successStatus
    ? "Operation completed successfully."
    : "An error occurred while processing your request.";

  return (
    <Snackbar
      autoHideDuration={2000}
      open={openFeedBack.isOpen}
      variant="solid"
      color={openFeedBack?.successStatus ? "success" : "danger"}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenFeedBack({
          isOpen: false,
          message: undefined,
          successStatus: undefined,
        });
      }}
    >
      {openFeedBack?.message ? openFeedBack.message : message}
    </Snackbar>
  );
}
