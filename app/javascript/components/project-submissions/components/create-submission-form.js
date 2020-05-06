import React from 'react'

const CreateSubmissionForm = () => {
  return (
    <div>
      <h1 className="text-center accent">Upload Your Project</h1>
      <form className="form">
        <div className="form__section">
          <span className="form__icon fab fa-github"></span>
          <input className="form__element form__element--with-icon" type="text" placeholder="Repository URL"/>
        </div>

        <div className="form__section">
          <span className="form__icon fab fa-github"></span>
          <input className="form__element form__element--with-icon" type="text" placeholder="Live Preview URL"/>
        </div>

        <input type="checkbox" id="public" />
        <label for="public">Make Solution Public</label>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="toggle-switch__slider round"></span>
        </label>
        <button type="submit" className="button button--primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateSubmissionForm
