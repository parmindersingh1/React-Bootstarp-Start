/* //https://codesandbox.io/embed/react-bootstrap-table-next-basic-example-e8jbl */

// import * as columnFormatters from "../../MetaQueueList/metaQueue-table/ActionColumnFormatter";

import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../components/pagination/TablePaginationHelpers";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import React from "react";

import BootstrapTable from "react-bootstrap-table-next";
import { Pagination } from "../../../../components/pagination/Pagination";

const JoinersTable = (props) => {
  const { joinerData, loading } = props;

  const columns = [
    //     {
    //     dataField: 'id',
    //     text: 'id'
    // },
    {
      dataField: "joinerData",
      text: "Joiner ID",
      formatter: (cell, row) => {
        const inputTypes =
          row.apiInputTypes && Object.keys(row.apiInputTypes).map((it, i) => it)|| [];
        return <span>{inputTypes.join("_")}</span>;
      },
      //   formatter:columnFormatters.DataFormatter
    },
    {
      dataField: "apiInputTypes",
      text: "Input Type",
      formatter: (cell, row) =>
        row.apiInputTypes &&
        Object.keys(row.apiInputTypes).map((it, i) => (
          <span key={i}>{it},</span>
        )),
    },
    {
      dataField: "jfJoinerTimeOut",
      text: "Joiner TimeOut",
    },
    {
      dataField: "joinerTopic",
      text: "Joiner Topic",
    },
    {
      dataField: "joiningStrategy",
      text: "Joiner Strategy",
    },
    {
      dataField: "joinerDeploymentStatus",
      text: "Joiner Status",
      formatter: (cell, row) => (
        <h6 className="badge  badge-primary badge-pill mr-2">
          {row.joinerDeploymentStatus}
        </h6>
      ),
    },
    // {
    //   dataField: "userName",
    //   text: "Username",
    // },
    // {
    //   dataField: "status",
    //   text: "Status",
    //   formatter: (cell, row) => (
    //     <h6 className="badge  badge-primary badge-pill mr-2">{row.status}</h6>
    //   ),
    // },
    // {
    //   dataField: "action",
    //   text: "Actions",
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     // onEditExpert: props.onEditExpert,
    //     // openDeleteExpertDialog: props.openDeleteExpertDialog,
    //     // openCourseModal: props.openCourseModal,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "200px",
    //   },
    // },
  ];
  return (
    <>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          totalSize: joinerData.length,
          page: 1,
          sizePerPage: 10,
          hideSizePerPage: joinerData.length === 0,
          sizePerPageList: [
            {
              text: "10",
              value: 10,
            },
            {
              text: "25",
              value: 25,
            },
            {
              text: "50",
              value: 50,
            },
          ],
        })}
        keyField="id"
        columns={columns}
        data={joinerData}
      >
        {({ paginationProps, paginationTableProps }) => (
          <Pagination
            isLoading={loading}
            paginationProps={paginationProps}
            hideToolbar={false}
          >
            <BootstrapTable
              wrapperClasses="table-responsive"
              bordered={false}
              classes="table table-head-custom table-vertical-center no-wrap v-middle"
              keyField="id"
              data={joinerData}
              columns={columns}
              noDataIndication={
                <div className="text-center">No Data Found</div>
              }
              {...paginationTableProps}
            >
              <PleaseWaitMessage entities={joinerData} />
              <NoRecordsFoundMessage entities={joinerData} />
            </BootstrapTable>
          </Pagination>
        )}
      </PaginationProvider>
    </>
  );
};

export default JoinersTable;
