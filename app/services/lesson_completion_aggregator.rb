class LessonCompletionAggregator
  def initialize(lesson_completions)
    @lesson_completions = lesson_completions
  end

  def lesson_completions_count
    @lesson_completions_count ||= \
    @lesson_completions \
    .group(:lesson_id) \
    .count
  end

  def all_durations_for_lesson(lesson_id, last_lesson_id)
    @lesson_completions\
    .where(lesson_id: [lesson_id, last_lesson_id])\
    .group('lesson_completions.student_id')\
    .having("count(lesson_completions) = 2")\
    .pluck("max(extract(epoch from created_at)) - min(extract(epoch from created_at))")
  end
end