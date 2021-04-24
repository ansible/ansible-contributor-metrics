import { DateFilter, SelectColumnFilter } from "../../utils/filters";
import moment from "moment";

export const ISSUE_COLUMNS = [
  {
    Header: "Created At",
    Footer: "Created At",
    accessor: "node.createdAt",
    Cell: ({ value }) => {
      return moment(new Date(value)).format("ll");
    },
    disableSortBy: true,
    Filter: DateFilter,
    filter: (rows, columnId, filterValues) => {
      return filterValues;
    },
    width: 100,
  },
  // {
  //     id: 'node.closed',
  //     Header: 'Status',
  //     Footer: 'Status',
  //     accessor: d => { return d.node.closed ? "Closed" : "Open" },
  //     Filter: SelectColumnFilter,
  //     filter: 'equals'
  // },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "node.state",
    Filter: SelectColumnFilter,
    filter: "equals",
    disableSortBy: true,
    width: 100,
  },
  {
    Header: "Title",

    Footer: "Title",
    accessor: "node.title",
    Cell: ({ cell: { value }, row: { original } }) => (
      <a href={original.node.url} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    ),
    disableSortBy: true,
    width: 250,
  },
  {
    Header: "Number",
    Footer: "Number",
    accessor: "node.number",
    Filter: SelectColumnFilter,
    disableFilters: true,
    disableSortBy: true,
    width: 100,
  },
  // {
  //   Header: "Updated At",
  //   Footer: "Updated At",
  //   accessor: "node.updatedAt",
  //   Cell: ({ value }) => {
  //     return moment(new Date(value)).format("ll");
  //   },
  //   disableFilters: true,
  //   width: 100,
  // },
  {
    Header: "Author",
    Footer: "Author",
    accessor: "node.author.login",
    disableFilters: true,
    width: 100,
  },
];
