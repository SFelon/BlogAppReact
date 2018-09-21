import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions/index';

class PostsNew extends Component {
    renderField(field) {
        const { meta: {touched, error} } = field;
        const className = ` form-group ${touched && error ? 'has-danger' : ''}`;
        
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
    
    onSubmit(values) {
        //Calling action just after the request return with OK
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Tytuł"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Kategorie"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Treść Postu"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Zatwierdź</button>
                <Link to="/" className="btn btn-danger">Cofnij</Link>
            </form>
        );
    }
}

function validate(values){
    const errors = {};
    //Validate the inputs from 'values'
    if(!values.title) {
        errors.title = "Wprowadź tytuł";
    }
    if(!values.categories) {
        errors.categories = "Wprowadź kategorie";
    }
    if(!values.content) {
        errors.content = "Wprowadź treść postu";
    }


    //If errors is empty, form is ok to submit
    //If erros has *any* prop, redux form assumes is invalid
    return errors;

}

export default reduxForm({
    //Unikalna nazwa naszego formularza
    form: 'PostsNewForm',
    validate
})(
    //Łączenie formularza i akcji createPost razem metodą connect
    connect(null, {createPost})(PostsNew)
);