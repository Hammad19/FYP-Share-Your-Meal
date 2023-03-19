//function to navigate to CustomTabNavigator
export const navigateToCustomTabNavigator = (navigation) => {
  navigation.navigate("CustomTabNavigator");
};

//get formated date
export const getFormatedDate = (date) => {
  const datenew = new Date(date);
  //dont use moment
  // get in 22 feb 2020 12:00:00 format dont use moment
  const formatedDate = `${datenew.getDate()} ${datenew.toLocaleString(
    "default",
    { month: "short" }
  )} ${datenew.getFullYear()} ${datenew.getHours()}:${datenew.getMinutes()}:${datenew.getSeconds()}`;

  return formatedDate;
};
