import { Stack, Skeleton, Fade } from "@mui/material";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";

// Style constants for consistent theming
const styles = {
  loadingSkeleton: {
    baseHeight: 220,
    borderRadius: 3,
    animation: "pulse 1.5s ease-in-out infinite",
    background: `linear-gradient(90deg, ${grey[200]}, ${grey[100]}, ${grey[200]})`,
    backgroundSize: "200% 100%",
  },
};

/**
 * Reusable loading skeleton component
 * Shows animated skeleton placeholders while content is loading
 */
const LoadingSkeleton = ({
  itemCount = 1,
  heightMultipliers = [1],
  height,
}) => (
  <Fade in={true} timeout={500}>
    <Stack spacing={3} sx={{ p: 2 }}>
      {Array(itemCount)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width="100%"
            height={
              height ||
              styles.loadingSkeleton.baseHeight *
                (heightMultipliers[index % heightMultipliers.length] || 1)
            }
            sx={{ borderRadius: styles.loadingSkeleton.borderRadius }}
          />
        ))}
    </Stack>
  </Fade>
);

LoadingSkeleton.propTypes = {
  itemCount: PropTypes.number,
  heightMultipliers: PropTypes.arrayOf(PropTypes.number),
  height: PropTypes.number,
};

export default LoadingSkeleton;
