import React from 'react';
import { Field, reduxForm } from 'redux-form';

import ReactModal from 'react-modal';
import TimePicker from 'components/TimePicker';
import DayPicker from 'components/DayPicker';
import Button from 'components/Button';
import { required, validFrequency } from './helpers';
import {
  Form,
  Heading,
  FieldsWrapper,
  InputStyled,
  TextareaStyled,
  FieldRow,
  Label,
  FieldStyled,
  Footer,
  FrequencyInputStyled,
  style
} from './styles';

const InputWithErrorStyling = ({ meta: { touched, error }, children }) => (
  <InputStyled renderErrorText={touched && error}>
    {children}
    <div style={{ fontSize: '12px', color: '#cc0000' }}>{touched && error}</div>
  </InputStyled>
);

const renderTextarea = ({ meta: { touched, error }, input }) => (
  <InputStyled renderErrorText={touched && error}>
    <TextareaStyled {...input} />
    <div style={{ fontSize: '12px', color: '#cc0000' }}>{touched && error}</div>
  </InputStyled>
);

const renderFrequency = ({ input, ...rest }) => (
  <InputWithErrorStyling {...rest}>
    <FrequencyInputStyled {...input} placeholder="How often?" />
  </InputWithErrorStyling>
);

const Modal = ({
  showModal,
  showCheckbox,
  handleCloseModal,
  handleSubmit,
  handleFormSubmit,
  handleOpenCheckbox,
  handleCloseCheckbox,
  ...props
}) => (
  <ReactModal
    isOpen={showModal}
    onRequestClose={handleCloseModal}
    style={{ ...style }}
    ariaHideApp={false}>
    {showCheckbox && <DayPicker handleCloseCheckbox={handleCloseCheckbox} {...props} />}
    <Form onSubmit={handleSubmit(handleFormSubmit)} autocomplete="off">
      <Heading>Create a new message</Heading>
      <FieldsWrapper>
        <FieldRow>
          <Label htmlFor="text">Text</Label>
          <FieldStyled
            name="text"
            component={renderTextarea}
            type="text"
            validate={required}
            autocomplete="off"
            placeholder="Your message"
            style={{ maxWidth: '178px', resize: 'none' }}
          />
        </FieldRow>
        <FieldRow>
          <Label htmlFor="frequency">Frequency</Label>
          <div onFocus={handleOpenCheckbox}>
            <FieldStyled
              focusColorOff
              name="frequency"
              component={renderFrequency}
              placeholder="How often?"
              validate={[required, validFrequency]}
            />
          </div>
        </FieldRow>
        <FieldRow>
          <Label htmlFor="send_time">Send At</Label>
          <Field
            name="send_time"
            component={TimePicker}
            validate={required}
            type="text"
            placeholder="What time?"
          />
        </FieldRow>
      </FieldsWrapper>
      <Footer>
        <Button
          type="button"
          width="70px"
          fontSize="13px"
          height="32px"
          style={{ marginRight: '8px' }}
          bgColor="#fff"
          color="rgb(4, 4, 2)"
          hoverBgColor="rgba(235, 87, 87, 0.03)"
          border="1px solid #e9ebeb"
          onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          width="125px"
          fontSize="13px"
          height="30px"
          type="button"
          onClick={handleSubmit(handleFormSubmit)}>
          Create Message
        </Button>
      </Footer>
    </Form>
  </ReactModal>
);

export default reduxForm({ form: 'create_message' })(Modal);
