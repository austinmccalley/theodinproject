import React from 'react';

import axios from '../../../src/js/axiosWithCsrf';

class CreateSubmissionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      this.setState({ [name]: checked})
    } else {
      this.setState({ [name]: value })
    }
  }

  handleSubmit(event) {
    const { lessonId } = this.props;
    const { repo_url, live_preview } = this.state;

    event.preventDefault()

    axios.post(
      `/lessons/${lessonId}/projects`,
      {
        project: {
          repo_url,
          live_preview,
          lesson_id: lessonId,
        }
      }
    ).then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <div>
        <h1 className="text-center accent">Upload Your Project</h1>

        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__section">
            <span className="form__icon fab fa-github"></span>
            <input
              className="form__element form__element--with-icon"
              type="text"
              name="repo_url"
              placeholder="Repository URL"
              onChange={this.handleChange}
            />
          </div>

          <div className="form__section">
            <span className="form__icon fas fa-link"></span>
            <input
              className="form__element form__element--with-icon"
              type="text"
              placeholder="Live Preview URL"
              name="live_preview"
              onChange={this.handleChange}
            />
          </div>

          <div className="form__section form__section--right-aligned">
            <span className="bold">MAKE SOLUTION PUBLIC</span>
            <label className="toggle-switch toggle-switch--space-around">
              <input type="checkbox" name="public" onChange={this.handleChange}  />
              <span className="toggle-switch__slider round"></span>
            </label>
            <button type="submit" className="button button--primary">Submit</button>
          </div>

        </form>
      </div>
    )
  }
}


export default CreateSubmissionForm
