import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Box from "./components/Box";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listas from "./pages/Lista";
import Form from "./pages/FormCertification";
import FormProject from "./pages/FormProject";
import Header from "./components/Header";
import Home from "./pages/Home";
import UpImg from "./pages/UploadImg";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeedBack from "./components/FeedBack";

// Create a client
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Box element={[Home]} />} />
          <Route path="/certificado" element={<Box element={[Form]} />} />
          <Route path="/projeto" element={<Box element={[FormProject]} />} />
          <Route path="/listas" element={<Box element={[Listas]} />} />
          <Route path="/up-img" element={<Box element={[UpImg]} />} />
        </Routes>
        <FeedBack />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
