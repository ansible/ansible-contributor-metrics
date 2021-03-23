import React, { useEffect } from "react";
import * as moment from "moment";
import { Input, Select, DatePicker } from "antd";

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  );
};

// Search filter: This is the default filter
export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      size="small"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search (${length})`}
    />
  );
};

// Drop-down filter
export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const { Option } = Select;

  return (
    <Select
      size="small"
      style={{ width: 100 }}
      id="custom-select"
      type="select"
      defaultValue="All"
      // value={filterValue}
      onChange={(e) => {
        setFilter(e || undefined);
      }}
    >
      <Option value="">All</Option>Option
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

// Date range filter
export const DateFilter = (props) => {
  const {
    column: { setFilter, preFilteredRows },
  } = props;

  const defValue = [
    moment().subtract(13, "days").startOf("day"),
    moment().endOf("day"),
  ];

  const dateRanges = {
    Today: [moment(), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Past Week": [
      moment().subtract(6, "days").startOf("day"),
      moment().endOf("day"),
    ],
    "Past Month": [
      moment().subtract(29, "days").startOf("day"),
      moment().endOf("day"),
    ],
    "Past 3 months": [
      moment().subtract(3, "months").startOf("day"),
      moment().endOf("day"),
    ],
  };

  useEffect(() => {
    setFilter(filterByDate(defValue));
  }, []);

  const filterByDate = (value) => {
    if (!value) {
      value = defValue;
    }
    const [startDate, endDate] = value;

    return preFilteredRows.filter((row) => {
      return (
        moment(row.values["node.createdAt"]).isAfter(startDate._d) &&
        moment(row.values["node.createdAt"]).isBefore(endDate._d)
      );
    });
  };
  const { RangePicker } = DatePicker;
  return (
    <RangePicker
      size="small"
      format="ll"
      ranges={dateRanges}
      defaultValue={defValue}
      defaultPickerValue={defValue}
      onChange={(value) => setFilter(filterByDate(value))}
    />
  );
};
