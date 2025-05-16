// src/components/HeaderSection.jsx
import { Button } from "./Button"
import "../styles/components/HeaderSection.css";

export default function HeaderSection({ title, onCreateClick, createLabel = "Create" }) {
  return (
    <div className="header-section">
      <h2 className="32px">{title}</h2>
      {onCreateClick && (
        <Button
          className="" 
          onClick={onCreateClick}
        >
          {createLabel}
        </Button>
      )}
    </div>
  );
}