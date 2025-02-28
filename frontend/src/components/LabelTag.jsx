import PropTypes from "prop-types";
import { Box } from "@mui/material";

function LabelTag({ label, color }) {
  const getTagColor = (color) => {
    switch (color) {
      case "primary":
        return { bg: "rgba(25, 118, 210, 0.08)", text: "#1976d2" };
      case "gold":
        return { bg: "rgba(255, 196, 0, 0.08)", text: "#A29415" };
      default:
        return { bg: "rgba(0, 0, 0, 0.06)", text: "text.secondary" };
    }
  };

  const tagColor = getTagColor(color);

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "0.75rem",
        fontWeight: 500,
        fontFamily: '"Segoe UI", "Roboto", sans-serif',
        backgroundColor: tagColor.bg,
        color: tagColor.text,
        borderRadius: "4px",
        px: 0.8,
        py: 0.3,
        lineHeight: 1,
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {label}
    </Box>
  );
}

LabelTag.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LabelTag;
