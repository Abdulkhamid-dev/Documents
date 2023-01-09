import { Button, Checkbox, Col, Input, Row, Select } from "antd";
import { Form } from "antd";
import React, { useState } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { StyledCrtForm } from "./CreateForm.style";
import axios from "../../utils/axios";
const extraInitialValue = {
  field_seq: "",
  field_type: "",
  field_name: "",
  is_mandatory: false,
};
const { Option } = Select;
function CreateForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [extraFilds, setExtraFilds] = useState(extraInitialValue);
  const [allFilds, setAllFilds] = useState<any[]>([]);
  const extraFildsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtraFilds({
      ...extraFilds,
      [e.target.name]: e.target.value,
    });
  };
  const mandatoryHandle = (e: CheckboxChangeEvent) => {
    setExtraFilds({
      ...extraFilds,
      is_mandatory: e.target.checked,
    });
  };

  const selectHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExtraFilds({ ...extraFilds, field_type: e as unknown as string });
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    addMore();
    try {
      const res = await axios.post("/api/v1/documents/create", {
        document_name: values.document_name,
        form_values: allFilds,
      });
      setLoading(false);
      setExtraFilds(extraInitialValue);
      setAllFilds([]);
      form.resetFields();
    } catch (error) {
      setLoading(false);
    }
  };

  const addMore = () => {
    if (Object.values(extraFilds).some((v) => v == true)) {
      setAllFilds([...allFilds, extraFilds]);
      setExtraFilds(extraInitialValue);
    } else {
    }
  };

  return (
    <StyledCrtForm>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Document name"
          name="document_name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <>
          {allFilds.map((item: any) => {
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

          <div className="inp_block">
            <label>
              Field sequence
              <Input
                onChange={extraFildsChange}
                name="field_seq"
                value={extraFilds.field_seq}
              />
            </label>
          </div>
          <div className="inp_block">
            <label>
              Field type
              <Select style={{ width: "100%" }} onChange={selectHandle}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
              </Select>
            </label>
          </div>
          <div className="inp_block">
            <label>
              Field name
              <Input
                onChange={extraFildsChange}
                name="field_name"
                value={extraFilds.field_name}
              />
            </label>
          </div>
          <div className="inp_block">
            <Checkbox
              onChange={mandatoryHandle}
              name="is_mandatory"
              checked={extraFilds.is_mandatory}
            >
              Mandatory
            </Checkbox>
          </div>
        </>
        <Form.Item>
          <Row>
            <Col span={12}>
              <Button onClick={addMore}>Add more</Button>
            </Col>
            <Col span={12}>
              <Button loading={loading} type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StyledCrtForm>
  );
}

export default CreateForm;
