class Project < ApplicationRecord
  belongs_to :user
  belongs_to :lesson

  acts_as_votable
  paginates_per 100

  validates :repo_url, format: { with: URI.regexp, message: 'must be a url' }
  validates :live_preview_url, format: { with: URI.regexp, message: 'must be a url' }
  validates :repo_url, :live_preview_url, presence: true

  default_scope { order('updated_at desc') }
  scope :all_submissions, ->(lesson_id) { where(lesson_id: lesson_id) }

  def upvote_for(user)
    vote_by(voter: user)
  end

  def remove_vote_for(user)
    unliked_by(user)
  end

  def total_votes
    votes_for.count
  end
end
