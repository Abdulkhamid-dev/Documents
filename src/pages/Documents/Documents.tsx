import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { IDocument } from "../../types";
import type { ColumnsType } from "antd/es/table";
import { StyledDocuments } from "./Documents.style";

function Documents() {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const getDocuments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/documents");
      setDocuments(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const navigateToForm = () => {
    navigate("/create");
  };
  const columns: ColumnsType<IDocument> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => {
        return <h5>{text}</h5>;
      },
    },
    {
      title: "DOCUMENT TITLE",
      dataIndex: "document_name",
      key: "document_name",
      render: (text: string) => {
        return <h5>{text}</h5>;
      },
    },
    {
      title: "CREATED DATE",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => {
        return <h5>{moment(text).format("DD.MM.YYYY")}</h5>;
      },
    },
    {
      title: "DOCUMENT SIZE",
      dataIndex: "field_count",
      key: "field_count",
      render: (text: number) => {
        return <h5>{text}</h5>;
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "action",
      render: (text: number) => {
        return <Link to={`/document/${text}`}>Document preview</Link>;
      },
    },
  ];
  useEffect(() => {
    getDocuments();
  }, []);
  return (
    <StyledDocuments>
      <div className="header">
        <Button type="primary" onClick={navigateToForm}>
          New document form
        </Button>
      </div>
      <Table columns={columns} dataSource={documents} loading={loading} />
    </StyledDocuments>
  );
}

export default Documents;
