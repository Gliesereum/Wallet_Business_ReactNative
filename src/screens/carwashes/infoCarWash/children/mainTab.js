import React from "react";
import { Text, List, ListItem, Left, Body } from "native-base";


const fields = {
  name: { title: "Название:", key: "name" },
  countBoxes: { title: "Количество боксов:", key: "spaces" },
  address: { title: "Адрес:", key: "address" },
  description: { title: "Описание:", key: "description" }
};


const MainTab = data => {
  const renderListItem = key => {
    const label = fields[key].title;
    const value = key === "countBoxes" ? data[fields[key].key].length : data[fields[key].key];
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
