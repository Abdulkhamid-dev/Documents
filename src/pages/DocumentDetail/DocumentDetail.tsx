import { Button, Input, Select, Spin, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { StyledDetail } from "./DocumentDetail.style";
import { Form } from "antd";

const { Option } = Select;
function DocumentDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm();
  const [document, setDocument] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const getDocument = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/document/${params.id}`);
      setDocument(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getDocument();
  }, []);
  return (
    <StyledDetail>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="wrapper">
          <h2>Document title</h2>

          <div className="inp_block">
            <label>
              Name
              <Input value={document?.document_name} />
            </label>
          </div>
          {document?.fields.map((item: any) => {
            return (
              <>
                <div className="devider"></div>
                <div className="inp_block">
                  <label>
                    Field sequence
                    <Input value={item.field_seq} />
                  </label>
                </div>
                <div className="inp_block">
                  <label>
                    Field type
                    <Select
                      style={{ width: "100%" }}
                      defaultValue={item.field_type}
                      options={[
                        {
                          value: "1",
                          label: "1",
                        },
                        {
                          value: "2",
                          label: "2",
                        },
                      ]}
                    />
                  </label>
                </div>
                <div className="inp_block">
                  <label>
                    Field name
                    <Input value={item.field_name} />
                  </label>
                </div>
                <div className="inp_block">
                  <Checkbox checked={item.is_mandatory}>Mandatory</Checkbox>
                </div>
              </>
            );
          })}
          <Button type="primary" onClick={goBack}>
            Back
          </Button>
        </div>
      )}
    </StyledDetail>
  );
}

export default DocumentDetail;
