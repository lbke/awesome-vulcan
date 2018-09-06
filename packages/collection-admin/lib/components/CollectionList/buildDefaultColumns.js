import React from "react";
import CheckIcon from "mdi-material-ui/Check";
import HelpIcon from "mdi-material-ui/Help";
import moment from "moment";
import { setupCollectionAdminPages } from "../../modules";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";
/**
 * Build sensible columns from the schema
 * @param {*} displayedSchemaFields
 *
 */
export const buildDefaultColumns = (schema, displayedFields) =>
  displayedFields.map(field => {
    let CellComponent;
    switch (schema[field].control) {
      // TODO: do the same with 'User'
      case "datetime":
        CellComponent = ({ document }) => {
          const date = document[field];
          return (
            <div>
              <div>{moment(date).format("dddd DD/MM/YYYY HH:mm")}</div>
              <div>
                {moment.duration(moment(date).diff(moment())).humanize(true)}
              </div>
            </div>
          );
        };
        break;
      case "checkdiv":
        CellComponent = ({ document }) => {
          if (document[field] === true)
            return (
              <span>
                <CheckIcon />
                <FormattedMessage id="collectionAdmin.default.yes" />
              </span>
            );
          if (document[field] === false)
            return <FormattedMessage id="collectionAdmin.default.no" />;
          return (
            <span>
              <HelpIcon />
              <FormattedMessage id="collectionAdmin.default.unknown" />
            </span>
          );
        };
        break;
      default:
        CellComponent = undefined;
    }
    return {
      name: field,
      CellComponent
    };
  });
export default buildDefaultColumns;
