import * as React from 'react';
import { FormGroup, Input, Label, FormText, InputGroup, FormFeedback } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import isString from 'lodash/isString';

export const TranslationLabel = (label) => {
    return (
        <Label><FormattedMessage id={label} /></Label>
    );
};

export const TranslationError = (error) => {
    return isString(error) ? (
        <FormFeedback>
            <FormattedMessage id={`validation.${error}`} />
        </FormFeedback>
    ) : null;
};

export const InputRender = (props) => {
    const placeholder = props.placeholder || props.label || null;
    const invalid = !!props.meta.touched && !!props.meta.error;

    const input = (
        <Input
            className={classNames(props.className, {
                'border-right-0': props.inputAddon,
            })}
            autoComplete={props.autoComplete}
            ref={props.refCallback()}
            type={props.type}
            placeholder={placeholder ? props.intl.formatMessage({id: placeholder}) : ''}
            name={props.input.name}
            value={props.input.value}
            checked={props.input.value}
            onChange={props.input.onChange}
            disabled={props.disabled}
            required={props.required}
            invalid={invalid}
            {...props.props}
        >
            {props.children}
        </Input>
    );

    if (!props.inputAddon) {
        return input;
    }

    return (
        <InputGroup className={classNames('with-focus', {
            'is-invalid': invalid,
        })}>
            {input}
            {props.inputAddon}
        </InputGroup>
    );
};

InputRender.defaultProps = {
    props: {},
    label: null,
    placeholder: null,
    disabled: false,
    onChange: () => {},
    refCallback: () => {},
};

export const AbstractInput = (renderInput) => {
    const component = (props) => (
        <FormGroup>
            {props.label && TranslationLabel(props.label)}
            {renderInput(props)}
            {props.meta.touched && props.meta.error && TranslationError(props.meta.error)}
            {props.help && <FormText className="small">{props.help}</FormText>}
        </FormGroup>
    );

    return component;
};
