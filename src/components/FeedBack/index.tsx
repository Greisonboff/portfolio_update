import * as React from "react";
import Snackbar from "@mui/joy/Snackbar";
import { useGlobalStore } from "../../store/useGlobalStore";

export default function FeedBack() {
  const { openFeedBack, setOpenFeedBack } = useGlobalStore();
  const message = openFeedBack?.successStatus
    ? "Operation completed successfully."
    : "An error occurred while processing your request.";

  return (
    <Snackbar
      autoHideDuration={2000}
      open={openFeedBack.isOpen}
      variant="solid"
      color={openFeedBack?.successStatus ? "success" : "danger"}
      size="sm"
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenFeedBack({
          isOpen: false,
        });
      }}
    >
      {openFeedBack?.message ? openFeedBack.message : message}
    </Snackbar>
  );
}
