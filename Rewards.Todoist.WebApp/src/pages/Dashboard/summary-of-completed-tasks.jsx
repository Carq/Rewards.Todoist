import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

const SummaryOfCompletedTasks = ({ tasks }) => {
  // Group completed tasks by projectName
  const tasksByProject = tasks.reduce((acc, task) => {
    if (acc[task.projectName]) {
      acc[task.projectName].push(task);
    } else {
      acc[task.projectName] = [task];
    }
    return acc;
  }, {});

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Podsumowanie 7 dni
        </Typography>
        <Typography variant="subtitle1">
          {"Wszystkie: " + tasks.length}
        </Typography>
        {Object.entries(tasksByProject).map(([projectName, tasks]) => (
          <div key={projectName}>
            <Typography variant="subtitle2">
              {projectName + ": " + tasks.length}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SummaryOfCompletedTasks;
