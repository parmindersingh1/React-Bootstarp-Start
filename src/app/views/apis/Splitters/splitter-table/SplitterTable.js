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

const SplitterTable = (props) => {
  const { splitterData, loading } = props;

  const columns = [
    //     {
    //     dataField: 'id',
    //     text: 'id'
    // },
    {
      dataField: "splitterData",
      text: "Splitter ID",
      formatter: (cell, row) => {
        const outputTypes =
          row.apiOutputTypes &&
          row.apiOutputTypes.map((it, i) => it) || [];
        return <span>{outputTypes.join("_")}</span>;
      },
    },
    {
      dataField: "splitterTopic",
      text: "Splitter Topic",
      // formatter: (cell, row) => (
      //  row.inputType && row.inputType.map((it, i) => (
      //    <span key={i}>{it}</span>
      //  ))
      // ),
    },
    {
      dataField: "apiOutputTypes",
      text: "Output Type",
      formatter: (cell, row) =>
        row.apiOutputTypes &&
        row.apiOutputTypes.map((ot, i) => <span key={i}>{ot}</span>),
    },
    {
      dataField: "splitterStrategy",
      text: "Splitter Strategy",
      // formatter: (cell, row) => (
      //   row.inputType && row.inputType.map((ot, i) => (
      //     <span key={i}>{ot}</span>
      //   ))
      //  ),
    },
    {
      dataField: "splitterDeploymentStatus",
      text: "Splitter Status",
      formatter: (cell, row) => (
        <h6 className="badge  badge-primary badge-pill mr-2">
          {row.splitterDeploymentStatus}
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
          totalSize: splitterData.length,
          page: 1,
          sizePerPage: 10,
          hideSizePerPage: splitterData.length === 0,
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
        data={splitterData}
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
              data={splitterData}
              columns={columns}
              noDataIndication={
                <div className="text-center">No Data Found</div>
              }
              {...paginationTableProps}
            >
              <PleaseWaitMessage entities={splitterData} />
              <NoRecordsFoundMessage entities={splitterData} />
            </BootstrapTable>
          </Pagination>
        )}
      </PaginationProvider>
    </>
  );
};

export default SplitterTable;
