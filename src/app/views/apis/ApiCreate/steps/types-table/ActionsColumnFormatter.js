// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import { Field } from "formik";
import React from "react";
import SVG from "react-inlinesvg";
import { Tooltip } from "reactstrap";
import { toAbsoluteUrl } from "../../../../../../utils/AssetsHelper";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { onDeleteType, onViewType }
) {
  return (
    <Field>
      {({ field, form, meta }) => (
        <>
          <a
            title="View Type"
            className="btn btn-icon btn-light btn-hover-primary btn-sm "
            onClick={() => onViewType(row, rowIndex, form)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Visible.svg")}
              />
            </span>
            <strong className="ml-2">View</strong>
          </a>
          <> </>

          <a
            title="Delete Type"
            className="btn btn-icon btn-light btn-hover-danger btn-sm "
            onClick={() => onDeleteType(row, rowIndex, form)}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
            </span>
            <strong className="ml-2">Delete</strong>
          </a>
          <> </>
        </>
      )}
    </Field>
  );
}
export function DataFormatter(cellContent, row, rowIndex) {
  return (
    <>
      <span>{row}</span>
    </>
  );
}
