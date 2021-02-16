/* //https://codesandbox.io/embed/react-bootstrap-table-next-basic-example-e8jbl */

import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { Pagination } from "../../../../components/pagination/Pagination";
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../components/pagination/TablePaginationHelpers";
import * as columnFormatters from "./ActionsColumnFormatter";

const EventsListTableUpdated = (props) => {
  const {
    eventRegistries,
    loading,
    onDeleteEventRegistry,
    onEditEventRegistry,
  } = props;

  const [currentPage, setCurrentPage] = useState(PaginationProvider.page);

  const [filteredEvents, setFilteredEvents] = useState(eventRegistries || []);

  useEffect(() => {
    setFilteredEvents(eventRegistries);
  }, [eventRegistries]);

  const columns = [
    //     {
    //     dataField: 'id',
    //     text: 'id'
    // },Docker Image, Api Name, Input Type List, Output Type List, Api Status, Joiner Status, Splitter Status

    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "vertical",
      text: "Vertical",
    },
    {
      dataField: "logName",
      text: "Log Name",
    },
    {
      dataField: "interaction",
      text: "Interaction",
    },
    {
      dataField: "input_topic",
      text: "Input Topic",
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        onDeleteEventRegistry: onDeleteEventRegistry,
        onEditEventRegistry: onEditEventRegistry,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "200px",
      },
    },
  ];

  if (
    !(eventRegistries && onDeleteEventRegistry && onEditEventRegistry) ===
      true &&
    !loading
  ) {
    return null;
  }

  return (
    <div data-test="test-event-table">
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          reloadOnSearch: false,
          totalSize: filteredEvents.length,
          page: 1,
          sizePerPage: 10,
          page: currentPage,
          hideSizePerPage: filteredEvents.length === 0,
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
        data={filteredEvents}
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
              data={filteredEvents}
              columns={columns}
              noDataIndication={
                <div className="text-center">No Data Found</div>
              }
              {...paginationTableProps}
            >
              <PleaseWaitMessage entities={filteredEvents} />
              <NoRecordsFoundMessage entities={filteredEvents} />
            </BootstrapTable>
          </Pagination>
        )}
      </PaginationProvider>
    </div>
  );
};

export default EventsListTableUpdated;
