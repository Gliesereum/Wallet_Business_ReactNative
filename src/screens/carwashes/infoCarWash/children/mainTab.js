import React from "react";
import { Text, List, ListItem, Left, Body } from "native-base";


const fields = {
  name: { title: "Название:" },
  spaces: { title: "Количество боксов:" },
  address: { title: "Адрес:" },
  description: { title: "Описание:" }
};


const MainTab = data => {
  const renderListItem = key => {
    const label = fields[key].title;
    const value = key === "spaces" ? data[key].length : data[key];
    return (
      <ListItem key={key}>
        <Left><Text>{label}</Text></Left>
        <Body><Text>{value}</Text></Body>
      </ListItem>
    );
  };

  return (
    <List>
      {Object.keys(fields).map(renderListItem)}
    </List>
  );
};


export default MainTab;
