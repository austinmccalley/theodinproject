import React from 'react';
import { useForm } from "react-hook-form";

import axios from '../../../src/js/axiosWithCsrf';

const CreateSubmissionForm = (props) => {
  const { register, errors, handleSubmit, watch } = useForm();
  console.log(errors)

  const onSubmit = (data) => {
    console.log(data)
    const { lessonId } = props;
    const { repo_url, live_preview_url, is_public } = data

    event.preventDefault()

    axios.post(
      `/lessons/${lessonId}/projects`,
      {
        project: {
          repo_url,
          live_preview_url,
          is_public,
          lesson_id: lessonId,
        }
      }
    ).then(response => {
      console.log(response)
    })
  }

  return (
    <div>
      <h1 className="text-center accent">Upload Your Project</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__section">
          <span className="form__icon fab fa-github"></span>
          <input
            className="form__element form__element--with-icon"
            type="text"
            name="repo_url"
            placeholder="Repository URL"
            ref={register({
              required: 'Required',
              pattern: {
                value: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
                message: "Must be a URL"
              }

            })}
            // onChange={this.handleChange}
          />
        </div>
        {errors.repo_url && <div className="form__error-message push-down"> {errors.repo_url.message}</div> }

        <div className="form__section">
          <span className="form__icon fas fa-link"></span>
          <input
            className="form__element form__element--with-icon"
            type="text"
            placeholder="Live Preview URL"
            name="live_preview_url"
            ref={register({
              required: "Required",
              pattern: {
                value: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
                message: "Must be a URL"
              }
            })}
            // onChange={this.handleChange}
          />
        </div>
        {errors.live_preview_url && <div className="form__error-message push-down"> {errors.live_preview_url.message}</div> }

        <div className="form__section form__section--right-aligned">
          <span className="bold">MAKE SOLUTION PUBLIC</span>
          <label className="toggle-switch toggle-switch--space-around">
            <input type="checkbox" name="is_public" ref={register}  />
            <span className="toggle-switch__slider round"></span>
          </label>
          <button type="submit" className="button button--primary">Submit</button>
        </div>

      </form>
    </div>
  )
}


export default CreateSubmissionForm
