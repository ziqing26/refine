import { IResourceComponentsProps } from "@refinedev/core";

import {
    List,
    useTable,
    EditButton,
    DateField,
    getDefaultSortOrder,
} from "@refinedev/antd";

import { Table } from "antd";

import { GetCategoriesQuery } from "graphql/types";
import { GetFieldsFromList } from "@refinedev/hasura";
import { CATEGORIES_QUERY } from "./queries";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorters } = useTable<
        GetFieldsFromList<GetCategoriesQuery>
    >({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        metaData: {
            gqlQuery: CATEGORIES_QUERY,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex="created_at"
                    title="Created At"
                    render={(value) => <DateField value={value} format="LLL" />}
                    defaultSortOrder={getDefaultSortOrder(
                        "created_at",
                        sorters,
                    )}
                    sorter
                />
                <Table.Column<GetFieldsFromList<GetCategoriesQuery>>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <EditButton
                            size="small"
                            hideText
                            recordItemId={record.id}
                        />
                    )}
                />
            </Table>
        </List>
    );
};
