// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import React from 'react';
import SVG from 'react-inlinesvg';
import { Tooltip } from 'reactstrap';
import { toAbsoluteUrl } from '../../../../../utils/AssetsHelper';

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { toggleDelete,toggleEdit,tooltipOpenEdit,tooltipOpenDelete, onDeleteApi, onEditApi }
) {
  return (
    <>
      <a
        title='Edit user'
        id='edit-user'
        className='btn btn-icon btn-light btn-hover-primary btn-sm '
        onClick={() => onEditApi(row.id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-primary'>
          <SVG
            src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
          />
        </span>
        <strong className="ml-2">Edit</strong>  
      </a>
      <Tooltip isOpen={tooltipOpenEdit} target='edit-user' toggle={toggleEdit}>
        Edit Api
      </Tooltip>
      <> </>

      <a
        title='Delete Api'
        id='delete-api'
        className='btn btn-icon btn-light btn-hover-danger btn-sm '
        onClick={() => onDeleteApi(row.id)}
      >
        <span className='svg-icon svg-icon-md svg-icon-danger'>
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
        </span>
        <strong className="ml-2">Delete</strong>  
      </a>
      <Tooltip isOpen={tooltipOpenDelete} target='delete-api' toggle={toggleDelete}>
        Delete Api
      </Tooltip>
      <> </>

      {/* <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openCourseModal(row)}
        title="Attach Course"
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/General/Attachment1.svg")}
          />
        </span>
      </a> */}
    </>
  );
}
