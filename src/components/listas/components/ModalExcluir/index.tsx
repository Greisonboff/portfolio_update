import * as React from "react";
import { Button, Modal, ModalClose, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { useGlobalStore } from "../../../../store/useGlobalStore";

export default function ModalExcluir() {
  const { openDeletModal, setOpenDeletModal } = useGlobalStore();

  const [load, setLoad] = React.useState<boolean>(false);

  const close = () => {
    setOpenDeletModal({ isOpen: false, calback: () => {} });
  };

  const runClaback = async () => {
    setLoad(true);
    await openDeletModal.calback();
    setLoad(false);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openDeletModal.isOpen}
      onClose={() => close()}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: { xs: "100%", sm: 500, md: 600 },
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
        className="bg-white dark:bg-[#1c1c1c]"
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <div className="dark:text-white text-slate-950">
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: "lg", mb: 1 }}
          >
            Você realmente quer excluir este item?
          </Typography>
          <div className="flex gap-4">
            <Button
              sx={{ marginTop: 1, width: "100%" }}
              type="submit"
              variant="outlined"
              className="dark:text-white dark:hover:text-slate-950"
              onClick={close}
              disabled={load}
            >
              Não
            </Button>
            <Button
              sx={{ marginTop: 1, width: "100%" }}
              type="submit"
              variant="outlined"
              className="dark:text-white dark:hover:text-slate-950"
              onClick={runClaback}
              loading={load}
              disabled={load}
            >
              Sim
            </Button>
          </div>
        </div>
      </Sheet>
    </Modal>
  );
}
