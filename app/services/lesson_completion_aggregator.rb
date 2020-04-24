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

  def lesson_duration(lesson_id, last_lesson_id)
    durations = all_lesson_durations(lesson_id, last_lesson_id)
    average_array(durations)
  end

  def records_exist_for_lesson?(lesson)
    @lesson_completions\
    .where(lesson_id: lesson.id)\
    .any?
  end

  private

  def all_lesson_durations(lesson_id, last_lesson_id)
    @lesson_completions\
    .where(lesson_id: [lesson_id, last_lesson_id])\
    .group('lesson_completions.student_id')\
    .having("count(lesson_completions) = 2")\
    .pluck("max(extract(epoch from created_at)) - min(extract(epoch from created_at))")
  end

  def average_array(array)
    array_length = array.length
    array_sum = array.sum
    array_sum / array_length
  end
end
