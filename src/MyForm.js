import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  Button,
  ButtonToolbar,
  HelpBlock
} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const myValidation = values => {
  const errors = {};
  if (!values.name) {
    errors.name = '必須項目です!'
  } else if (values.name.length > 10) {
    errors.name = '10文字以内で指定してください'
  }

  if (!values.program) {
    errors.program = '選択してください'
  }

  if (!values.favoriteColor) {
    errors.favoriteColor = '選択してください'
  }
  return errors;
}

const renderField = ({ input, label, type, placeholder, meta: {touched, error, warning} }) => {
  const validationState = error ? 'error' : warning ? 'warning' : 'success';
  return(
    <FormGroup controlId={input.name} validationState={touched ? validationState: null}>
      <Col componentClass={ControlLabel} sm={2}>{label}</Col>
      <Col sm={5}>
        <input {...input} id={input.name} placeholder={placeholder} type={type} className={'form-control'} />
        {
          touched && error && <HelpBlock>{error}</HelpBlock>
        }
      </Col>
    </FormGroup>
  );
}

const renderSelect = ({ input, label, meta: {touched, error}, children }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')}>
        <select {...input}>
          {children}
        </select>
      </div>
      {touched && (error && <p className="help is-danger">{error}</p>)}
    </div>
  );
};

const selectField =
  ({
    input,
    label,
    options,
    labelKey,
    valueKey,
    placeholder,
    ignoreCase,
    backspaceRemoves,
    clearable,
    meta: {touched, error, warning}
  }) => {
    const validationState = error ? 'error' : warning ? 'warning' : 'success';
    return(
      <FormGroup controlId={input.name} validationState={touched ? validationState : null}>
        <Col componentClass={ControlLabel} sm={2}>{label}</Col>
        <Col sm={5}>
          <Select
            id={input.name}
            value={input.value}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            onChange={param => input.onChange(param)}
            placeholder={placeholder}
            ignoreCase={ignoreCase}
            backspaceRemoves={backspaceRemoves}
            clearable={clearable}
            noResultsText="一致する結果がありません"
          />
          {
            touched && error && <HelpBlock>{error}</HelpBlock>
          }
        </Col>
      </FormGroup>
    );
  }


const MyForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const options = [
    {id: 1, "name": "Ruby"},
    {id: 2, "name": "JavaScript"},
    {id: 3, "name": "Python"}
  ];

  return(
    <Form horizontal onSubmit={handleSubmit}>
      <Field
        name="name"
        component={renderField}
        type="text"
        label="お名前"
        placeholder="Name"
      />
      <Field
        name="program"
        component={selectField}
        label="プログラム"
        options={options}
        labelKey="name"
        valueKey="id"
        placeholder="プログラム選択"
        ignoreCase={true}
        backspaceRemoves={true}
        clearable={true}
      />
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component={renderSelect}>
            <option></option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <Field
        name="tel"
        component={renderField}
        type="text"
        label="電話番号"
        placeholder="Tel"
      />
      <Col smOffset={2} sm={5}>
        <ButtonToolbar>
          <Button bsStyle={'primary'} type="submit" disabled={pristine || submitting}>登録</Button>
          <Button type="submit" disabled={pristine || submitting} onClick={reset}>クリア</Button>
        </ButtonToolbar>
      </Col>
    </Form>
  );
}

export default reduxForm({
  form: 'myForm',
  validate: myValidation,
})(MyForm);