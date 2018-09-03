import React from "react";
import CheckIcon from "mdi-material-ui/Check";
import HelpIcon from "mdi-material-ui/Help";
import moment from "moment";
/**
 * Build sensible columns from the schema
 * @param {*} displayedSchemaFields
 *
 */
export const buildDefaultColumns = (schema, displayedFields) =>
  displayedFields.map(field => {
    let component;
    switch (schema[field].control) {
      // TODO: do the same with 'User'
      case "datetime":
        component = ({ document }) => {
          const date = document[field];
          return (
            <div>
              <div>{moment(date).format("dddd DD/MM/YYYY à HH:mm")}</div>
              <div>
                {moment.duration(moment(date).diff(moment())).humanize(true)}
              </div>
            </div>
          );
        };
        break;
      case "checkdiv":
        component = ({ document }) => {
          if (document[field] === true)
            return (
              <span>
                <CheckIcon />
                Oui
              </span>
            );
          if (document[field] === false) return <span>Non</span>;
          return (
            <span>
              <HelpIcon />
              Inconnu
            </span>
          );
        };
        break;
      default:
        component = undefined;
    }
    return {
      name: field,
      component
    };
  });
export default buildDefaultColumns;
