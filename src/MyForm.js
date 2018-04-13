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

const inputRequired = value => (value ? undefined : '入力してください');
const selectRequired = value => (value ? undefined : ' 選択してください');

const renderField = ({ input, label, type, placeholder, meta: {touched, error, warning} }) => {
  console.log("renderFieldのerrorは", error)
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

class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: false
    }
  }

  render() {
    const {
      input,
      label,
      options,
      labelKey,
      valueKey,
      placeholder,
      ignoreCase,
      backspaceRemoves,
      clearable,
      meta: {error, warning}
    } = this.props;

    const validationState = error ? 'error' : warning ? 'warning' : 'success';

    return(
      <FormGroup controlId={input.name} validationState={this.state.touched ? validationState : null}>
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
            onBlur={(e) => this.setState({touched: true})}
          />
          {
            this.state.touched && error && <HelpBlock>{error}</HelpBlock>
          }
        </Col>
      </FormGroup>
    );
  }
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
        validate={inputRequired}
      />
      <Field
        name="program"
        component={SelectField}
        label="プログラム"
        options={options}
        labelKey="name"
        valueKey="id"
        placeholder="プログラム選択"
        ignoreCase={true}
        backspaceRemoves={true}
        clearable={true}
        validate={selectRequired}
      />
      <Field
        name="tel"
        component={renderField}
        type="text"
        label="電話番号"
        placeholder="Tel"
        validate={inputRequired}
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
})(MyForm);