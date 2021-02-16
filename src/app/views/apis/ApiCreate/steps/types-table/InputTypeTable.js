// /* //https://codesandbox.io/embed/react-bootstrap-table-next-basic-example-e8jbl */

import * as columnFormatters from "./ActionsColumnFormatter";

import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../components/pagination/TablePaginationHelpers";
import React, { useEffect, useState } from "react";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import BootstrapTable from "react-bootstrap-table-next";
import { Field } from "formik";
import { Input } from "../../../../../components/forms/Input";
import { Pagination } from "../../../../../components/pagination/Pagination";
import ProtoViewModal from "../../../../../components/helper-components/ProtoViewModal";
import { Select } from "../../../../../components/forms/Select";

const InputTypeTable = (props) => {
  const { inputType, loading, onDeleteType } = props;

  const [filteredInputType, setFilteredInputType] = useState(inputType || []);
  const [showModal, setShowModal] = useState(false);
  const [protoType, setProtoType] = useState(null);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setFilteredInputType(inputType);
  }, [inputType]);

  const columns = [
    {
      dataField: "name",
      text: "Type",
      // formatter:columnFormatters.DataFormatter
    },
    {
      dataField: "required",
      text: "Required",
      formatter(cell, row, index) {
        return (
          <>
            <Field
              type="number"
              name={`apiInputTypes[${index}].required`}
              component={Input}
            >
              {({ field, form, meta }) => (
                <Select
                  name="required"
                  {...field}
                  // value={row.required}
                  // onChange={(e) => handleChange(row, e.target.value)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
              )}
            </Field>
          </>
        );
      },
    },

    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        onDeleteType: onDeleteType,
        onViewType: (row, index, setFieldValue) => {
          setProtoType(row.name);
          setShowModal(true);
        },
        // openCourseModal: props.openCourseModal,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "200px",
      },
    },
  ];
  return (
    <>
      <Field type="text" name="apiInputTypes">
        {({ field, form, meta }) => (
          <PaginationProvider
            pagination={paginationFactory({
              custom: true,
              totalSize: filteredInputType.length,
              page: 1,
              sizePerPage: 10,
              hideSizePerPage: filteredInputType.length === 0,
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
            keyField="name"
            columns={columns}
            data={filteredInputType}
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
                  keyField="name"
                  data={filteredInputType}
                  columns={columns}
                  noDataIndication={
                    <div className="text-center">No Data Found</div>
                  }
                  {...paginationTableProps}
                >
                  <PleaseWaitMessage entities={filteredInputType} />
                  <NoRecordsFoundMessage entities={filteredInputType} />
                </BootstrapTable>
              </Pagination>
            )}
          </PaginationProvider>
        )}
      </Field>
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

export default InputTypeTable;
