import React from 'react';
import SubmissionsList from '../components/submissions-list'
import Modal from '../components/modal'
import CreateSubmissionForm from '../components/create-submission-form'

class ProjectSubmissions extends React.Component {

    state = {
      showCreateModal: false,
    }

  hideModal = () => {
    console.log("This being called?")
    this.setState({ showCreateModal: false })
  }

  openModal = () => {
    this.setState({ showCreateModal: true })
  }

  render() {
    const { submissions, course, lesson } = this.props;

    return (
      <div className="submissions">
        <div className="submissions__header">

          <div className="submissions__course">
            <h3 className="submissions__title">Solutions:</h3>
            <h4 className="submissions__project-title">{course.title}: ({lesson.title})</h4>
          </div>
          <Modal show={this.state.showCreateModal} handleClose={this.hideModal}>
            <CreateSubmissionForm lessonId={lesson.id}/>
          </Modal>

          <div>
            <button
              className="submissions__add button button--primary"
              onClick={this.openModal}
            >
              Add Solution
            </button>
          </div>
        </div>

        <SubmissionsList submissions={submissions} />
      </div>
    )
  }
}

export default ProjectSubmissions
