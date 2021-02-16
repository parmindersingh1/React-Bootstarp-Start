// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from "react";
import SVG from "react-inlinesvg";
import { Tooltip } from "reactstrap";
import { toAbsoluteUrl } from "../../../../utils/AssetsHelper";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  formatExtraData
) {
  if (!(row && formatExtraData)) {
    return null;
  }

  return (
    <div data-test="test-ActionsColumnFormatter">
      <a
        title="Edit event"
        id="edit-event"
        className="btn btn-icon btn-light btn-hover-primary btn-sm "
        onClick={() => formatExtraData.onEditEventRegistry(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
        <strong className="ml-2">Edit</strong>
      </a>
      <a
        title="Delete Event"
        id="delete-event"
        className="btn btn-icon btn-light btn-hover-danger btn-sm "
        onClick={() => formatExtraData.onDeleteEventRegistry(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
        </span>
        <strong className="ml-2">Delete</strong>
      </a>
    </div>
  );
}
