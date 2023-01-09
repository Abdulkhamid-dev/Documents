import styled from "styled-components";

export const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 550px;
  min-height: 550px;
  width: 100%;
  margin: auto;
  /* text-align: center; */
  .wrapper {
    width: 50%;
    h2 {
      text-align: center;
    }
    .inp_block {
      margin: 4px 0;
      input {
        margin: 4px 0;
      }
    }
    .devider {
      border: 1px solid grey;
      background: grey;
      margin: 8px 0;
    }
  }
`;
