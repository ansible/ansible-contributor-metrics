import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { Filter, DefaultColumnFilter } from "../../utils/filters";
import { Empty, Input, Select, Statistic, Typography } from "antd";
import { Button } from "antd";
import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import moment from "moment";

const DataTable = ({
  title,
  tag,
  repositoryName,
  tableData,
  totalCount,
  tableColumns,
}) => {
  // const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => issues, []);

  const columns = tableColumns;
  const data = tableData;

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance;

  console.log("Total Count", totalCount);

  const { pageIndex, pageSize } = state;

  const { Option } = Select;

  const { Link } = Typography;

  return (
    <>
      {/* {totalCount === rows.length ? (
        <p>
          <em>( Fetched data since beginning )</em>
        </p>
      ) : null} */}

      {/* <h3>
        {tag}:{" "}
        {rows.length === 100
          ? rows.length.toString() + "+"
          : rows.length.toString()}
      </h3> */}

      {/* <h3>
        {tag}: {rows.length} of {totalCount}
      </h3> */}

      <Statistic
        valueStyle={{ color: "#3d5861" }}
        title={tag}
        value={rows.length}
        suffix={" of " + totalCount}
      />

      {/* Boilerplate table code */}
      <table
        className="table-data"
        {...getTableProps()}
        // width={1450}
        style={{ width: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length === 0 ? (
            <td colSpan="5">
              <Empty />
            </td>
          ) : (
            <>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <Input
            min="1"
            size="small"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          ></Input>{" "}
        </span>
        <Select
          size="small"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e))}
        >
          {[10, 25, 50].map((pageSize) => (
            <Option key={pageSize} value={pageSize}>
              Show {pageSize}
            </Option>
          ))}
        </Select>
        {" | "}
        <Button
          size="small"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <BackwardOutlined />
        </Button>{" "}
        <Button
          size="small"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>{" "}
        <Button size="small" onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>{" "}
        <Button
          size="small"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <ForwardOutlined />
        </Button>
      </div>
    </>
  );
};

export default DataTable;
