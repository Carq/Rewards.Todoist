const getBaseUrl = () => {
  const isProd = window.location.hostname === "carq.github.io";
  return isProd ? "/Rewards.Todoist/" : "/";
};

const getApiUrl = () => {
  const isProd = window.location.hostname === "carq.github.io";
  return isProd
    ? "https://mieszkanie-rewards.azurewebsites.net/"
    : "https://localhost:7021/";
};

export const config = {
  apiUrl: getApiUrl(),
  routerBasePath: getBaseUrl(),
};
