import React from 'react';
import { Field } from 'formik';
import ReCAPTCHA from "react-google-recaptcha"
import { DefaultInput } from '../../ui-inputs/DefaultInput';
import { SubmitButton } from '../../ui-inputs/SubmitButton';

let recaptchaInstance;

export const InnerForm = ({
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    dirty,
    setFieldValue
}) => {
    if(errors.recaptchaExpired) {
        recaptchaInstance.reset()
        errors.recaptchaExpired = false
    }

    return (
        <form onSubmit={handleSubmit}>
            <DefaultInput label="username">
                <Field type="text" name="username" className="form-control" />
                {touched.username && errors.username && <p className="form-text text-danger"> {errors.username} </p>}
            </DefaultInput>
            <DefaultInput label="Email">
                <Field type="email" name="email" className="form-control" />
                {touched.email && errors.email && <p className="form-text text-danger"> {errors.email} </p>}
            </DefaultInput>
            <DefaultInput label="feild">
                <Field type="feild" name="feild" className="form-control" />
                {touched.feild && errors.feild && <p className="form-text text-danger"> {errors.feild} </p>}
            </DefaultInput>
            <DefaultInput label="country">
                <Field type="country" name="country" className="form-control" />
                {touched.country && errors.country && <p className="form-text text-danger"> {errors.country} </p>}
            </DefaultInput>
            <DefaultInput label="phone">
                <Field type="phone" name="phone" className="form-control" />
                {touched.phone && errors.phone && <p className="form-text text-danger"> {errors.phone} </p>}
            </DefaultInput>
            <DefaultInput label="Password">
                <Field type="password" name="password" className="form-control" />
                {touched.password && errors.password && <div>{errors.password}</div>}
            </DefaultInput>
            <DefaultInput label="Confirm Password">
                <Field type="password" name="passwordConfirm" className="form-control" />
            </DefaultInput>
            <ReCAPTCHA 
            ref={el => {recaptchaInstance = el}}
            name="recaptcha" sitekey="6Legp2EUAAAAAKZhVvBOIj-d6mbHGwrWBfPEoiMX" onChange={(value) => setFieldValue("recaptcha", value)}
            />
            <SubmitButton disabled={!dirty || isSubmitting || Object.keys(errors).length} />
        </form>

    );
}
