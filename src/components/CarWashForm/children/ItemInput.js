import React from "react";

const fields = {
  "text": (field) => null
}
;

const Field = field => {

  if (!fields[field]) {
    return fields[field.type](field);
  }

  return fields[field.type](field);

};
