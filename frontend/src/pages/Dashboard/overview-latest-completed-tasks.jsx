import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Stack,
  Box,
  Fade,
} from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import BlurredText from "../../componets/BlurredText";
import LabelTag from "../../components/LabelTag";
import { howLongAgo } from "../../utils/date-utils";

// Style constants for consistent theming with personal-profile
const styles = {
  card: {
    borderRadius: 3,
    background: `linear-gradient(145deg, ${grey[100]}, ${grey[50]})`,
    boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
    overflow: "visible",
  },
  title: {
    fontWeight: 600,
    color: grey[800],
    fontSize: "1.1rem",
    mb: 2,
    pb: 1,
    borderBottom: `1px solid ${grey[200]}`,
  },
  list: {
    p: 0,
    width: "100%",
    "& .MuiListItem-root": {
      px: 0,
      py: 0.5,
      width: "100%",
    },
  },
  listItemButton: (disabled) => ({
    borderRadius: 2,
    mb: 0.5,
    p: 1,
    width: "100%",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.7 : 1,
    "&:hover": !disabled
      ? {
          backgroundColor: `${grey[100]}`,
          transform: "translateY(-1px)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        }
      : {},
  }),
  listItemContent: {
    px: 1,
    py: 0.5,
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  avatar: (activityArea) => ({
    bgcolor: getAvatarBgColor(activityArea),
    color: "text.primary",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    fontSize: "1.1rem",
    width: 40,
    height: 40,
    mr: 2,
    // Removed hover transform effect
  }),
  activityName: {
    fontWeight: 500,
    color: grey[800],
    fontSize: "0.95rem",
    mb: 0.5,
    lineHeight: 1.3,
  },
  noActivities: {
    textAlign: "center",
    color: grey[600],
    fontStyle: "italic",
    py: 2,
  },
  dateText: {
    color: grey[600],
    fontSize: "0.75rem",
    flexShrink: 0,
    ml: 1, // Add margin to separate from tags
  },
};

/**
 * Maps project name to emoji icon
 */
function MapProjectNameToIcon(projectName, activityName) {
  switch (projectName) {
    case "Dom 🏡":
      return "🏡";
    case "Dzieci 👶":
      return "👶";
    case "Wykończenie domu":
      return "🔨";
    case "Życie ♥":
      return "💖";
    case "Reward":
      return MapRewardNameToIcon(activityName);
    default:
      return "❓";
  }
}

/**
 * Maps reward name to emoji icon
 */
function MapRewardNameToIcon(rewardName) {
  switch (rewardName) {
    case "Słodycze":
      return "🍬";
    case "Słone przekąski":
      return "🍿";
    case "Czas dla siebie - 1h":
    case "Czas dla siebie - 2h":
      return "🕒";
    default:
      return "🎁";
  }
}

/**
 * Maps tag to color
 */
function MapTagToColor(tag) {
  if (tag.startsWith("XP")) {
    return "primary";
  } else if (tag.startsWith("Gold")) {
    return "gold";
  } else {
    return "default";
  }
}

/**
 * Gets avatar background color based on activity area
 */
function getAvatarBgColor(activityArea) {
  switch (activityArea) {
    case "Dom 🏡":
      return "rgba(139, 195, 74, 0.15)";
    case "Dzieci 👶":
      return "rgba(33, 150, 243, 0.15)";
    case "Wykończenie domu":
      return "rgba(255, 152, 0, 0.15)";
    case "Życie ♥":
      return "rgba(233, 30, 99, 0.15)";
    case "Reward":
      return "rgba(255, 196, 0, 0.15)";
    default:
      return grey[100];
  }
}

/**
 * Activity item component
 */
const ActivityItem = ({ activity, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(activity);
    }
  };

  const content = (
    <Box sx={styles.listItemContent}>
      <Avatar sx={styles.avatar(activity.activityArea)}>
        {MapProjectNameToIcon(activity.activityArea, activity.name)}
      </Avatar>

      <Box sx={{ flexGrow: 1, width: "calc(100% - 60px)" }}>
        <Typography sx={styles.activityName}>
          <BlurredText>{activity.name}</BlurredText>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              maxWidth: activity.occurredOn ? "75%" : "100%",
            }}
          >
            {activity.tags &&
              activity.tags.map((label) => (
                <LabelTag
                  key={label}
                  label={label}
                  color={MapTagToColor(label)}
                  size="small"
                />
              ))}
          </Box>

          {/* Date aligned to right */}
          {activity.occurredOn && (
            <Typography variant="caption" sx={styles.dateText}>
              {howLongAgo(new Date(activity.occurredOn), new Date())}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );

  if (onClick && !disabled) {
    return (
      <ListItemButton
        onClick={handleClick}
        disableGutters
        sx={{
          ...styles.listItemButton(disabled),
          justifyContent: "flex-start",
        }}
      >
        {content}
      </ListItemButton>
    );
  }

  return (
    <ListItem disableGutters sx={{ px: 1, py: 0.5, width: "100%" }}>
      {content}
    </ListItem>
  );
};

/**
 * Main ListOfLatestActivities component
 */
const ListOfLatestActivities = ({
  title,
  activities,
  onItemClick,
  disabled = false,
  hideTitle = false,
  sx = {},
}) => {
  const [animateIn, setAnimateIn] = useState(false);

  // Animate after initial render
  useState(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const content = (
    <Fade in={animateIn} timeout={800}>
      <Box sx={{ width: "100%" }}>
        {/* Title (if not hidden) */}
        {!hideTitle && (
          <Typography variant="h6" sx={styles.title}>
            {title}
          </Typography>
        )}

        {/* List of activities */}
        {activities && activities.length > 0 ? (
          <List sx={styles.list}>
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id || index}
                activity={activity}
                onClick={onItemClick}
                disabled={disabled}
              />
            ))}
          </List>
        ) : (
          <Typography variant="body2" sx={styles.noActivities}>
            Brak aktywności do wyświetlenia
          </Typography>
        )}
      </Box>
    </Fade>
  );

  // If we're hiding the title, we're likely using this as a nested component
  if (hideTitle) {
    return <Box sx={{ width: "100%", ...sx }}>{content}</Box>;
  }

  // Default display with Card wrapper
  return (
    <Card variant="outlined" sx={{ ...styles.card, width: "100%", ...sx }}>
      <CardContent sx={{ p: 3, width: "100%" }}>{content}</CardContent>
    </Card>
  );
};

// PropTypes validation
ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    activityArea: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    occurredOn: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

ListOfLatestActivities.propTypes = {
  title: PropTypes.string,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      name: PropTypes.string.isRequired,
      activityArea: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      occurredOn: PropTypes.string,
    })
  ),
  onItemClick: PropTypes.func,
  disabled: PropTypes.bool,
  hideTitle: PropTypes.bool,
  sx: PropTypes.object,
};

export default ListOfLatestActivities;
