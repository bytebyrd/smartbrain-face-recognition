import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./container/App";
import "./index.css";
const appRoot = createRoot(document.getElementById('root'));

appRoot.render(<App />)