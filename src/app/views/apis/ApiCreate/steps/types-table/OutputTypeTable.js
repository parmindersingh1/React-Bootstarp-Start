/* //https://codesandbox.io/embed/react-bootstrap-table-next-basic-example-e8jbl */

import * as columnFormatters from './ActionsColumnFormatter';

import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../../../../../components/pagination/TablePaginationHelpers';
import React, { useEffect, useState } from 'react';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import ProtoViewModal from "../../../../../components/helper-components/ProtoViewModal";
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Pagination } from '../../../../../components/pagination/Pagination';
import _ from 'lodash';

const OutputTypeTable = (props) => {
  const { outputType, loading, onDeleteType, onViewType } = props;

  const [filteredOutputType, setFilteredOutputType] = useState(
    outputType || []
  );
  const [showModal, setShowModal] = useState(false);
  const [protoType, setProtoType] = useState(null);

  useEffect(() => {
    setFilteredOutputType(outputType);
  }, [outputType]);

  const handleClose = () => {
    setShowModal(false);
  };

  const columns = [
    //     {
    //     dataField: 'id',
    //     text: 'id'
    // },Docker Image, Api Name, Input Type List, Output Type List, Api Status, Joiner Status, Splitter Status
    {
      dataField: 'name',
      text: 'Type',
      // formatter:columnFormatters.DataFormatter
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        onDeleteType: onDeleteType,
        onViewType: (row, index, setFieldValue) => {
          setProtoType(row.name);
          setShowModal(true);
        },
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '200px',
      },
    },
  ];
  return (
    <>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          totalSize: filteredOutputType.length,
          page: 1,
          sizePerPage: 10,
          hideSizePerPage: filteredOutputType.length === 0,
          sizePerPageList: [
            {
              text: '10',
              value: 10,
            },
            {
              text: '25',
              value: 25,
            },
            {
              text: '50',
              value: 50,
            },
          ],
        })}
        keyField='name'
        columns={columns}
        data={filteredOutputType}
      >
        {({ paginationProps, paginationTableProps }) => (
          <Pagination
            isLoading={loading}
            paginationProps={paginationProps}
            hideToolbar={false}
          >
            <BootstrapTable
              wrapperClasses='table-responsive'
              bordered={false}
              classes='table table-head-custom table-vertical-center no-wrap v-middle'
              keyField='name'
              data={filteredOutputType}
              columns={columns}
              noDataIndication={
                <div className='text-center'>No Data Found</div>
              }
              {...paginationTableProps}
            >
              <PleaseWaitMessage entities={filteredOutputType} />
              <NoRecordsFoundMessage entities={filteredOutputType} />
            </BootstrapTable>
          </Pagination>
        )}
      </PaginationProvider>
      {showModal && (
      <ProtoViewModal
        show={showModal}
        handleClose={handleClose}
        protoType={protoType}
      />
    )}
    </>
    
  );
};

export default OutputTypeTable;
