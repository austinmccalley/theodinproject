class LessonCompletionData
  def initialize(course, start_date, end_date=Time.now)
    @course = course
    @lesson_completions = lesson_completions_in_between(start_date, end_date)
    @lesson_duration_data = LessonDurationData.new(@lesson_completions, ordered_lessons)
    @aggregated_lesson_completions = LessonCompletionAggregator.new(@lesson_completions)
  end

  def lessons_with_known_completion_durations
    @lesson_duration_data.lessons_with_known_completion_durations
  end

  def lesson_duration(lesson)
    @lesson_duration_data.known_completion_durations[lesson.id].inspect
  end
  
  private

  attr_reader :course
  
  def lesson_completions_in_between(start_date, end_date)
    lesson_completions\
    .where('extract(epoch from lesson_completions.created_at) > ?', start_date.to_i)\
    .where('extract(epoch from lesson_completions.created_at) < ?', end_date.to_i)
  end

  def lesson_completions
    LessonCompletion.where(lesson_id: lesson_ids)
  end

  def lesson_ids
    @lesson_ids ||= course.lessons.pluck(:id)
  end

  def ordered_lessons
    Lesson\
    .where(id: lesson_ids)
    .order(:position)
  end
end

