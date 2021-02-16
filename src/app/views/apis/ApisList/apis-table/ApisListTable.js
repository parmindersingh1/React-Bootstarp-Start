/* //https://codesandbox.io/embed/react-bootstrap-table-next-basic-example-e8jbl */

import * as columnFormatters from './ActionsColumnFormatter';

import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../../../../components/pagination/TablePaginationHelpers';
import React, { useEffect, useState } from 'react';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';

import { ApisFilter } from '../../api-filter/ApisFilter';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import { Pagination } from '../../../../components/pagination/Pagination';
import SVG from 'react-inlinesvg';
import _ from 'lodash';
import { toAbsoluteUrl } from '../../../../../utils/AssetsHelper';

const ApisListTable = (props) => {
  const {
    apiConfigs,
    loading,
    onDeleteApi,
    onEditApi,
    handleApiInput,
    handleApiOutput,
  } = props;

  const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
  const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
  const toggleEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
  const toggleDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);

  const [filteredApis, setFilteredApis] = useState(apiConfigs || []);
  const [currentPage,setCurrentPage]=useState(PaginationProvider.page)

  const initialValues = {
    query: '',
  };

  useEffect(() => {
    setFilteredApis(apiConfigs);
  }, [apiConfigs]);

  const applyFilter = (filter = initialValues) => {
    setFilteredApis(
      _.filter(apiConfigs, (o) =>
        o.apiName && filter.query
          ? _.includes(o.apiName.toLowerCase(), filter.query.toLowerCase())
          : true
      )
    );
  };

  const columns = [
    //     {
    //     dataField: 'id',
    //     text: 'id'
    // },Docker Image, Api Name, Input Type List, Output Type List, Api Status, Joiner Status, Splitter Status
    {
      dataField: 'apiName',
      text: 'Api Name',
    },
    {
      dataField: 'apiVersion',
      text: 'Api Version',
    },
    {
      dataField: 'apiPath',
      text: 'Api Path',
    },
    {
      dataField: 'apiCollection',
      text: 'Collection',
    },
    {
      dataField: 'apiSubCollection',
      text: 'Sub Collection',
    },
    {
      dataField: "dockerImage",
      text: "Docker Image",
      formatter: (cell, row) =>
        `${row.apiName}/${row.apiVersion}`,
    },
    {
      dataField: 'apiInputTypes',
      text: 'Input Type',
      // formatter: (cell, row) =>
      //   row.apiInputType &&
      //   Object.keys(row.apiInputType).map((it, i) => <span key={i}>{it}, </span>),
      formatter: (cell, row) => {
        return (
          <>
            <a
              title='Input Type'
              className='btn btn-icon btn-light btn-hover-danger btn-sm mx-3'
              onClick={() => handleApiInput(cell)}
            >
              <span className='svg-icon svg-icon-md svg-icon-danger'>
                <SVG
                  src={toAbsoluteUrl('/media/svg/icons/General/Visible.svg')}
                />
              </span>
              <strong className='ml-2'>Show </strong>
            </a>
          </>
        );
      },
    },
    {
      dataField: 'apiOutputTypes',
      text: 'Output Type',
      // formatter: (cell, row) =>
      //   row.apiOutputType &&
      //   row.apiOutputType.map((ot, i) => <span key={i}>{ot}, </span>),
      formatter: (cell, row) => {
        return (
          <>
            <a
              title='Output Type'
              className='btn btn-icon btn-light btn-hover-danger btn-sm mx-3'
              onClick={() => handleApiOutput(cell)}
            >
              <span className='svg-icon svg-icon-md svg-icon-danger'>
                <SVG
                  src={toAbsoluteUrl('/media/svg/icons/General/Visible.svg')}
                />
              </span>
              <strong className='ml-2'>Show </strong>
            </a>
          </>
        );
      },
    },
    {
      dataField: 'apiBuildStatus',
      text: 'Api Status',
      formatter: (cell, row) => (
        <h6 className='badge  badge-primary badge-pill mr-2'>
          {row.apiBuildStatus}
        </h6>
      ),
    },
    {
      dataField: 'joiningStrategy',
      text: 'Joining Strategy'
    },
    {
      dataField: 'splitterStrategy',
      text: 'Splitter Strategy'
    },
    // {
    //   dataField: 'joinerDeploymentStatus',
    //   text: 'Joiner Status',
    //   formatter: (cell, row) => (
    //     <h6 className='badge  badge-primary badge-pill mr-2'>
    //       {row.joinerDeploymentStatus === 'JOINER_NOT_APPLICABLE' ? (
    //         <span>{row.joinerDeploymentStatus}</span>
    //       ) : (
    //         <Link to={`/apis/${row.id}/joiners`}>
    //           <span style={{ color: '#fff' }}>
    //             {row.joinerDeploymentStatus}
    //           </span>
    //         </Link>
    //       )}
    //     </h6>
    //   ),
    // },
    // {
    //   dataField: 'splitterDeploymentStatus',
    //   text: 'Splitter Status',
    //   formatter: (cell, row) => (
    //     <h6 className='badge  badge-primary badge-pill mr-2'>
    //       {row.splitterDeploymentStatus === 'SPLITTER_NOT_APPLICABLE' ? (
    //         <span>{row.splitterDeploymentStatus}</span>
    //       ) : (
    //         <Link to={`/apis/${row.id}/splitters`}>
    //           <span style={{ color: '#fff' }}>
    //             {row.splitterDeploymentStatus}
    //           </span>
    //         </Link>
    //       )}
    //     </h6>
    //   ),
    // },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        tooltipOpenEdit: tooltipOpenEdit,
        tooltipOpenDelete: tooltipOpenDelete,
        toggleEdit: toggleEdit,
        toggleDelete: toggleDelete,
        onDeleteApi: onDeleteApi,
        onEditApi: onEditApi,
        // openCourseModal: props.openCourseModal,
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
      <div className='mb-3'>
        <ApisFilter applyFilter={applyFilter} initialValues={initialValues} />
      </div>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          totalSize: filteredApis.length,
          page: currentPage,
          sizePerPage: 10,
          hideSizePerPage: filteredApis.length === 0,
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
        keyField='id'
        columns={columns}
        data={filteredApis}
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
              keyField='id'
              data={filteredApis}
              columns={columns}
              noDataIndication={
                <div className='text-center'>No Data Found</div>
              }
              {...paginationTableProps}
            >
              <PleaseWaitMessage entities={filteredApis} />
              <NoRecordsFoundMessage entities={filteredApis} />
            </BootstrapTable>
          </Pagination>
        )}
      </PaginationProvider>
    </>
  );
};

export default ApisListTable;
