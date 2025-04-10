import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  Divider,
  Box,
  Fade,
  Collapse,
  IconButton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import BlurredText from "../../componets/BlurredText";
import LabelTag from "../../components/LabelTag";
import { howLongAgo } from "../../utils/date-utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
 * Group activities by their activityArea
 */
const groupActivitiesByArea = (activities) => {
  if (!activities) return [];

  // Create a map of activityArea -> activities
  const groupedMap = activities.reduce((groups, activity) => {
    const area = activity.activityArea || "Inne";
    if (!groups[area]) {
      groups[area] = [];
    }
    groups[area].push(activity);
    return groups;
  }, {});

  // Convert map to array of groups
  return Object.entries(groupedMap).map(([area, items]) => ({
    area,
    icon: MapProjectNameToIcon(area, ""),
    activities: items,
  }));
};

/**
 * Activity Group component that displays grouped activities
 */
const ActivityGroup = ({ group, onItemClick, disabled }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ mb: 2, width: "100%" }}>
      {/* Group header with avatar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          px: 1,
          py: 0.5,
          borderRadius: 2,
          backgroundColor: getAvatarBgColor(group.area),
          width: "100%",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "transparent",
            color: "text.primary",
            width: 32,
            height: 32,
            mr: 1.5,
            fontSize: "1.2rem",
          }}
        >
          {group.icon}
        </Avatar>

        <Typography
          sx={{
            fontWeight: 500,
            color: grey[800],
            flexGrow: 1,
          }}
        >
          {group.area}
        </Typography>

        <IconButton
          size="small"
          onClick={toggleExpanded}
          sx={{ color: grey[600] }}
        >
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>

      {/* Group activities */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List
          dense
          disablePadding
          sx={{
            ml: 2, // Indent to align with avatar
            borderLeft: `2px solid ${grey[200]}`,
            pl: 2,
          }}
        >
          {group.activities.map((activity, index) => (
            <ListItem
              key={activity.id || index}
              disablePadding
              disableGutters
              sx={{ mb: 0.75 }}
            >
              {onItemClick ? (
                <ListItemButton
                  onClick={() => !disabled && onItemClick(activity)}
                  disabled={disabled}
                  disableGutters
                  sx={{
                    py: 0.5,
                    px: 1,
                    borderRadius: 1,
                    opacity: disabled ? 0.7 : 1,
                    "&:hover": !disabled
                      ? {
                          backgroundColor: grey[100],
                        }
                      : {},
                  }}
                >
                  <ActivityContent activity={activity} />
                </ListItemButton>
              ) : (
                <Box sx={{ py: 0.5, px: 1, width: "100%" }}>
                  <ActivityContent activity={activity} />
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

/**
 * Content of an activity item without the avatar
 */
const ActivityContent = ({ activity }) => (
  <Box sx={{ width: "100%" }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "0.9rem",
          color: grey[800],
          mr: 1,
          flex: 1,
        }}
      >
        <BlurredText>{activity.name}</BlurredText>
      </Typography>

      {activity.occurredOn && (
        <Typography
          variant="caption"
          sx={{
            color: grey[500],
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
          }}
        >
          {howLongAgo(new Date(activity.occurredOn), new Date())}
        </Typography>
      )}
    </Box>

    {activity.tags && activity.tags.length > 0 && (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          mt: 0.5,
        }}
      >
        {activity.tags.map((label) => (
          <LabelTag
            key={label}
            label={label}
            color={MapTagToColor(label)}
            size="small"
          />
        ))}
      </Box>
    )}
  </Box>
);

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

  // Group activities by area
  const groupedActivities = useMemo(
    () => groupActivitiesByArea(activities),
    [activities]
  );

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

        {/* List of grouped activities */}
        {groupedActivities && groupedActivities.length > 0 ? (
          groupedActivities.map((group, index) => (
            <React.Fragment key={group.area || index}>
              <ActivityGroup
                group={group}
                onItemClick={onItemClick}
                disabled={disabled}
              />
              {index < groupedActivities.length - 1 && (
                <Divider sx={{ my: 1, opacity: 0.6 }} />
              )}
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" sx={styles.noActivities}>
            Brak aktywności do wyświetlenia
          </Typography>
        )}
      </Box>
    </Fade>
  );

  if (hideTitle) {
    return <Box sx={{ width: "100%", ...sx }}>{content}</Box>;
  }

  return (
    <Card variant="outlined" sx={{ ...styles.card, width: "100%", ...sx }}>
      <CardContent sx={{ p: 3, width: "100%" }}>{content}</CardContent>
    </Card>
  );
};

ActivityContent.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    occurredOn: PropTypes.string,
  }).isRequired,
};

ActivityGroup.propTypes = {
  group: PropTypes.shape({
    area: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    activities: PropTypes.array.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func,
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
